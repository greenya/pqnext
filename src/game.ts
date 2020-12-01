import {
    GearSlot,
    GearSource,
    Hero,
    HeroAction,
    HeroTarget,
    Item,
    ItemQuality,
    Map,
    Mob,
    MobMight,
    Trait,
    ZoneType
} from './type.ts'

import data from './data.ts'
import format from './format.ts'
import rand from './rand.ts'

const version = () => 2

const knownHeroActions: readonly HeroAction[] = [
    {
        name: '?',
        title: () => '?',
        duration: () => 0,
        next: () => 'intro'
    },
    {
        name: 'intro',
        title: () => 'Дивиться вступний сінематик...',
        duration: () => 10,
        next: () => 'accept-quest'
    },
    {
        name: 'afk',
        title: (hero) => '[AFK] ' + rand.text(hero, rand.item(hero, data.afkMessages)) + '...',
        duration: (hero) => 8 + rand.int(hero, 2),
        next: (hero) => {
            if (rand.dice(hero, 5)) {
                return 'afk'
            } else if (hero.bag.length > 0) {
                return 'sell-junk'
            } else {
                return 'move-to-wilderness'
            }
        }
    },
    {
        name: 'accept-quest',
        title: () => 'Ознайомлюється з новим завданням...',
        duration: (hero) => 5 + rand.int(hero, 2),
        onFinish: (hero) => {
            acceptQuest(hero)
        },
        next: (hero) => {
            if (rand.dice(hero, 4)) {
                return 'afk'
            } else if (hero.bag.length > 0) {
                return 'sell-junk'
            } else {
                return 'move-to-wilderness'
            }
        }
    },
    {
        name: 'pass-quest',
        title: () => 'Завершує завдання...',
        duration: (hero) => 5 + rand.int(hero, 2),
        onFinish: (hero) => {
            passQuest(hero)
        },
        next: () => 'accept-quest'
    },
    {
        name: 'move-to-wilderness',
        title: () => 'Прямує до дикої місцевості...',
        duration: () => 10,
        onStart: (hero) => {
            updateZone(hero, ZoneType.Traveling)
        },
        onFinish: (hero) => {
            updateZone(hero, ZoneType.Wilderness)
        },
        next: () => 'combat'
    },
    {
        name: 'combat',
        title: (hero) => 'В бою, ціль: ' + hero.target!.title,
        duration: (hero) => 5 + (hero.target!.might == MobMight.Reinforced ? 2 : 0),
        onStart: (hero) => {
            startCombat(hero)
        },
        onFinish: (hero) => {
            finishCombat(hero)
        },
        next: (hero) => {
            if (hero.bag.length == hero.attr.bagCap) {
                return 'move-to-town'
            } else if (hero.quest && hero.quest.progress.cur == hero.quest.progress.max) {
                return 'move-to-town'
            } else {
                return 'combat'
            }
        }
    },
    {
        name: 'move-to-town',
        title: () => 'Прямує до міста...',
        duration: () => 10,
        onStart: (hero) => {
            updateZone(hero, ZoneType.Traveling)
        },
        onFinish: (hero) => {
            updateZone(hero, ZoneType.Town)
        },
        next: (hero) => {
            if (hero.quest && hero.quest.progress.cur == hero.quest.progress.max) {
                return 'pass-quest'
            } else {
                return rand.item(hero, [ 'afk', 'sell-junk' ])
            }
        }
    },
    {
        name: 'sell-junk',
        title: () => 'Продає мотлох...',
        duration: (hero) => Math.max(1, Math.floor(hero.bag.length / 2)),
        onFinish: (hero) => {
            sellJunk(hero)
        },
        next: (hero) => {
            if (haveEnoughGoldToGoShopping(hero)) {
                return 'buy-gear'
            } else {
                return rand.dice(hero, 4) ? 'afk' : 'move-to-wilderness'
            }
        }
    },
    {
        name: 'buy-gear',
        title: () => 'Перевіряє асортимент місцевих крамниць...',
        duration: (hero) => 8,
        onFinish: (hero) => {
            buyGear(hero)
        },
        next: (hero) => rand.dice(hero, 3) ? 'afk' : 'move-to-wilderness'
    }
]

function haveEnoughGoldToGoShopping(hero: Hero): boolean {
    const bestQualityAvail = data.itemQualities.slice().reverse().find(q => q.level <= hero.level.num)!.name
    const priceThreshold = data.itemBuyPriceMult * getItemPrice(hero, '?', bestQualityAvail, GearSlot.Chest)
    return hero.gold >= priceThreshold
}

function buyGear(hero: Hero) {
    rollItemsAndLootSingleBestOne(hero, GearSource.Vendor)
}

function getHeroTarget(hero: Hero): HeroTarget {
    const level = hero.level.num
    const mobs = data.mobs.filter(m => (m.trait & hero.zone.biome) == hero.zone.biome && m.level <= level)
    const mob = rand.item(hero, mobs)

    const genders = [
        mob.masculine,
        mob.feminine,
        mob.neuter
    ].reduce<{ i: number, gen: string }[]>((a, c, i) => {
        if (c) { a.push({ i, gen: c }) }
        return a
    }, [])

    const gender = rand.item(hero, genders)
    const title = rand.text(hero, gender.gen)

    let might = MobMight.Normal
    let prefix = ''

    if (level >= mob.level + 10 && rand.dice(hero, 8)) {
        const prefixes = data.mobReinforcedPrefixes.filter(p => p.trait & mob.trait).map(p => p.gen)
        prefix = rand.item(hero, prefixes).split('/')[gender.i]
        might = MobMight.Reinforced
    }

    return {
        title: (prefix ? prefix + ' ' : '') + title,
        mob: mob.name,
        might
    }
}

function startCombat(hero: Hero) {
    hero.target = getHeroTarget(hero)
}

function finishCombat(hero: Hero) {
    const level = hero.level.num
    const target = hero.target!
    const mob = data.mobs.find(m => m.name == target.mob)!
    const reinforced = target.might == MobMight.Reinforced

    addExp(hero, level + 1 + (reinforced ? 1 : 0), 'mob')

    if ((mob.trait & Trait.Human) == Trait.Human) {
        addGold(hero, rand.int(hero, 3) + level * 2 + (reinforced ? 10 : 0), 'mob')
    }

    if (rand.dice(hero, 2)) {
        progressQuest(hero)
    }

    const items: Item[] = []

    if (rand.dice(hero, 14)) {
        items.push(getGearItem(hero, GearSource.Drop))
    } else {
        if (reinforced) {
            items.push(getMobPreciousItem(hero, mob))
        } else {
            items.push(getMobJunkItem(hero, mob))
        }
    }

    if (items.length > 0) {
        lootItems(hero, items)
    }

    hero.target = undefined
    stats.mobsKilled[target.might]++
}

function getGearItemTitle(hero: Hero, slot: GearSlot, quality: ItemQuality): string {
    const items = data.gearSlots.find(s => s.name == slot)!.items
    const item = rand.item(hero, items.filter(i => i.level <= hero.level.num))
    const ggKey = item.ggm ? 'm' : item.ggf ? 'f' : item.ggn ? 'n' : 'x'
    const qMeta = data.itemQualities.find(q => q.name == quality)!
    return rand.item(hero, qMeta.templates)
        .replace('{item-title}', item.title)
        .replace('{quality-title}', rand.text(hero, qMeta.title[ggKey]))
        .replace('{uncommon-prefix}', rand.text(hero, data.itemQualities.find(q => q.name == ItemQuality.Uncommon)!.prefix![ggKey]))
        .replace('{rare-prefix}', rand.text(hero, data.itemQualities.find(q => q.name == ItemQuality.Rare)!.prefix![ggKey]))
        .replace('{epic-suffix}', rand.text(hero, data.itemQualities.find(q => q.name == ItemQuality.Epic)!.suffix!))
}

function getItemQuality(hero: Hero, source: GearSource): ItemQuality {
    const level = hero.level.num
    const roll = rand.int(hero, 1000 - (source == GearSource.Quest ? 500 : 0))
    const quality = data.itemQualities.reduce(
        (a, c) => c.chance > 0 && c.chance > roll && c.level <= level ? c.name : a,
        level < 20 && rand.dice(hero, 1 + Math.floor(level / 4)) ? ItemQuality.Poor : ItemQuality.Common
    )
    return quality
}

function getGearItemAttributes(hero: Hero, quality: ItemQuality, source: GearSource): Map<number> {
    const level = hero.level.num
    const attr: Map<number> = {}

    const count = data.itemQualities.find(q => q.name == quality)!.attrCount
    if (count) {
        const bonus = Math.floor(level / 5)
        const stat = rand.shuffle(hero, data.attributes.filter(e => e.primary).map(e => e.name))
        for (let i = 0; i < count; i++) {
            attr[stat[i]] = bonus + (i == 0 && source == GearSource.Quest ? 1 : 0)
        }
    }

    return attr
}

function getGearItem(hero: Hero, source: GearSource): Item {
    const level = hero.level.num
    const availSlots = data.gearSlots.filter(s => s.level <= level).map(s => s.name)

    const slot = rand.item(hero, availSlots)
    const quality = getItemQuality(hero, source)
    const title = getGearItemTitle(hero, slot, quality)
    const price = getItemPrice(hero, title, quality, slot)
    const attr = getGearItemAttributes(hero, quality, source)

    return {
        title,
        quality,
        gear: { slot, attr, level, source },
        price
    }
}

function getMobPreciousItem(hero: Hero, mob: Mob): Item {
    const preciousItems = data.preciousItems.filter(i => (mob.trait & i.trait) == i.trait)
    const preciousItem = rand.item(hero, preciousItems)
    const title = rand.text(hero, preciousItem.gen)
    const quality = ItemQuality.Common
    const price = getItemPrice(hero, title, quality, undefined, preciousItem.value)
    return { title, quality, price }
}

function getMobJunkItem(hero: Hero, mob: Mob): Item {
    const title = rand.text(hero, mob.junk)
    const quality = ItemQuality.Poor
    const price = getItemPrice(hero, title, quality)
    return { title, quality, price }
}

function getPoorItemPriceDeviation(hero: Hero, title: string): number {
    const level = hero.level.num
    const base = title.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const mod = (base % 5) * Math.ceil(level / 3)
    return mod > 0 ? mod : (base % level) * 7
}

function getItemPrice(hero: Hero, title: string, quality: ItemQuality, slot?: GearSlot, extraMult?: number): number {
    return Math.floor(
        (quality == ItemQuality.Poor ? getPoorItemPriceDeviation(hero, title) : 0)
        + hero.level.num
        * data.itemQualities.find(q => q.name == quality)!.priceMult
        * (slot ? data.gearSlots.find(s => s.name == slot)!.priceMult : 1)
        * (extraMult ? extraMult : 1)
    )
}

function sellJunk(hero: Hero) {
    hero.bag
        .splice(0)
        .forEach(slot => addGold(hero, slot.item.price * slot.count, 'junk'))
}

function getQuestTitle(hero: Hero): string {
    let text = rand.text(hero, rand.item(hero, data.questTitles))

    if (text.includes('{number-5-20}')) {
        text = text.replace('{number-5-20}', `${rand.int(hero, 16) + 5}`)
    }

    if (text.includes('{mob-gcm-n}')) {
        text = text.replace('{mob-gcm-n}', rand.item(hero, data.mobs).gcm.n)
    }

    if (text.includes('{mob-gcm-r}')) {
        text = text.replace('{mob-gcm-r}', rand.item(hero, data.mobs).gcm.r)
    }

    if (text.includes('{mob-flesh-gcm-r}')) {
        text = text.replace('{mob-flesh-gcm-r}', rand.item(hero, data.mobs.filter(m => m.trait & Trait.Flesh)).gcm.r)
    }

    if (text.includes('{precious-item-ggmn}')) {
        text = text.replace('{precious-item-ggmn}', rand.text(hero, rand.item(hero, data.preciousItems.filter(i => i.ggm || i.ggn)).gen))
    }

    if (text.includes('{precious-item-ggf}')) {
        text = text.replace('{precious-item-ggf}', rand.text(hero, rand.item(hero, data.preciousItems.filter(i => i.ggf)).gen))
    }

    return text.charAt(0).toUpperCase() + text.slice(1)
}

function acceptQuest(hero: Hero) {
    const level = hero.level.num
    hero.quest = {
        title: getQuestTitle(hero),
        progress: {
            cur: 0,
            max: 5 + Math.ceil(level * 1.5) + rand.int(hero, Math.ceil(level / 5))
        }
    }
}

function passQuest(hero: Hero) {
    if (!hero.quest || hero.quest.progress.cur < hero.quest.progress.max) {
        return
    }

    const level = hero.level.num
    addExp(hero, Math.ceil(hero.level.progress.max / (10 + (level / 10))) + level * 4 + 3, 'quest')
    addGold(hero, rand.int(hero, 10) + Math.ceil(Math.pow(level, 3) / 8) + 20, 'quest')

    rollItemsAndLootSingleBestOne(hero, GearSource.Quest)

    hero.quest = undefined
    stats.questsPassed++
}

function rollItemsAndLootSingleBestOne(hero: Hero, source: GearSource.Quest | GearSource.Vendor) {
    const amount =
        source == GearSource.Quest ? 3 :
        source == GearSource.Vendor ? 5 :
        0

    let bestItem: Item | undefined = undefined
    let bestDeltaValue = 0
    let bestBuyPrice = 0

    for (let i = 0; i < amount; i++) {
        const item = getGearItem(hero, source)
        const buyPrice = source == GearSource.Vendor ? item.price * data.itemBuyPriceMult : 0
        if (hero.gold < buyPrice) {
            continue
        }

        const value = getGearItemValue(hero, item)
        const equippedItem = hero.gear.find(i => i.gear!.slot == item.gear!.slot)
        const equippedValue = equippedItem ? getGearItemValue(hero, equippedItem) : -1
        const delta = value - equippedValue

        if (!bestItem || bestDeltaValue < delta) {
            bestItem = item
            bestDeltaValue = delta
            bestBuyPrice = buyPrice
        }
    }

    if (bestItem && (bestBuyPrice == 0 || bestDeltaValue > 0)) {
        lootItems(hero, [ bestItem ])
        if (bestBuyPrice > 0) {
            removeGold(hero, bestBuyPrice, 'gear')
        }
    }
}

function updateZone(hero: Hero, newType: ZoneType) {
    hero.zone.type = newType
    hero.zone.biome = newType == ZoneType.Wilderness
        ? rand.item(hero, data.biomes.filter(b => b.level <= hero.level.num)).biome
        : Trait.None
}

function addExp(hero: Hero, value: number, source: 'mob' | 'quest') {
    stats.expGained[source] += value
    hero.level.progress.cur += value
    while (hero.level.progress.cur >= hero.level.progress.max) {
        levelUp(hero)
    }
}

function attrUpdated(hero: Hero) {
    const level = hero.level.num
    const { str, int, sta } = hero.attr

    hero.attr.bagCap = 10 + Math.floor(str / 10)
    hero.attr.maxHp = 20 + level * 8 + sta * 10 + Math.floor(Math.pow(level, 2) / 100) * 40
    hero.attr.maxMp = 20 + level * 2 + int * 10 + Math.floor(Math.pow(level, 2) / 100) * 20
}

function addAttr(hero: Hero, attr: Map<number>) {
    Object.keys(attr).forEach(a => hero.attr[a] += attr[a])
    attrUpdated(hero)
}

function removeAttr(hero: Hero, attr: Map<number>) {
    Object.keys(attr).forEach(a => hero.attr[a] -= attr[a])
    attrUpdated(hero)
}

function levelUp(hero: Hero) {
    const level = ++hero.level.num
    hero.level.progress.cur -= hero.level.progress.max
    hero.level.progress.max = Math.ceil((Math.pow(level, 2) * (level + 1)) / 10) * 10 + 40

    const attr: Map<number> = { str: 0, dex: 0, int: 0, sta: 0 }

    if (level > 1) {
        const prio = hero.attrPrio

        for (let i = 0; i < 4; i++) {
            const roll = rand.int(hero, prio.str + prio.dex + prio.int + prio.sta)
            if (roll < prio.str) { attr.str++ }
            else if (roll < prio.str + prio.dex) { attr.dex++ }
            else if (roll < prio.str + prio.dex + prio.int) { attr.int++ }
            else { attr.sta++ }
        }
    }

    addAttr(hero, attr)

    stats.levelUpTimestamps[level] = stats.time
    stats.levelUpGoldstamps[level] = Object.values(stats.goldCollected).reduce((a, c) => a + c, 0)
}

function progressQuest(hero: Hero) {
    if (hero.quest && hero.quest.progress.cur < hero.quest.progress.max) {
        hero.quest.progress.cur++
    }
}

function addGold(hero: Hero, amount: number, source: 'mob' | 'quest' | 'junk') {
    if (amount > 0) {
        stats.goldCollected[source] += amount
        hero.gold += amount
    }
}

function removeGold(hero: Hero, amount: number, source: 'gear') {
    if (amount > 0) {
        stats.goldSpent[source] += amount
        hero.gold -= amount
    }
}

function getGearItemValue(hero: Hero, item: Item) {
    let value = 0

    if (item.gear) {
        const attr = item.gear.attr
        const prio = hero.attrPrio
        value = data.attributes
            .filter(e => e.primary)
            .map(e => e.name)
            .reduce((a, c) => a + prio[c] * (attr[c] ?? 0), 0)
    }

    if (value < 1) {
        value = data.itemQualities.findIndex(q => q.name == item.quality)
    }

    return value
}

function equipItemIfBetter(hero: Hero, newItem: Item): { equipped: boolean, oldItem?: Item } {
    if (!newItem.gear) {
        return { equipped: false }
    }

    const oldItem = hero.gear.find(i => i.gear!.slot == newItem.gear!.slot)
    if (oldItem) {
        const oldValue = getGearItemValue(hero, oldItem)
        const newValue = getGearItemValue(hero, newItem)
        if (newValue <= oldValue) {
            return { equipped: false }
        }

        removeAttr(hero, oldItem.gear!.attr)
        hero.gear = hero.gear.filter(i => i != oldItem)
    }

    addAttr(hero, newItem.gear.attr)
    hero.gear.push(newItem)

    stats.gearItemsEquipped++
    return { equipped: true, oldItem }
}

function ensureBagHasFreeSlots(hero: Hero, target: number) {
    while (hero.bag.length > 0 && hero.bag.length > hero.attr.bagCap - target) {
        const slot = hero.bag.reduce(
            (a, c) => c.item.price * c.count < a.item.price * a.count ? c : a,
            hero.bag[0]
        )

        hero.bag = hero.bag.filter(s => s != slot)
        stats.itemsLostInGold += slot.item.price * slot.count
    }
}

function moveItemToBag(hero: Hero, item: Item) {
    const stackSize = item.gear ? 1 : data.itemStackSize
    const slot = hero.bag.find(s =>
        s.item.title == item.title &&
        s.item.price == item.price &&
        !s.item.gear &&
        s.count < stackSize
    )

    if (slot) {
        slot.count++
    } else {
        ensureBagHasFreeSlots(hero, 1)
        hero.bag.push({ item, count: 1 })
    }
}

function lootItems(hero: Hero, items: Item[]) {
    items.forEach(newItem => {
        const r = equipItemIfBetter(hero, newItem)
        if (r.equipped) {
            if (r.oldItem) {
                moveItemToBag(hero, r.oldItem)
            }
        } else {
            moveItemToBag(hero, newItem)
        }

        stats.itemsLootedByQuality[newItem.quality]++
        if (newItem.gear) {
            stats.gearItemsLootedByQuality[newItem.quality]++
            stats.gearItemsLootedBySlot[newItem.gear.slot]++
            stats.gearItemsLootedBySource[newItem.gear.source]++
        }
    })
}

function advanceAction(hero: Hero) {
    if (hero.action.progress.cur < hero.action.progress.max) {
        hero.action.progress.cur++
        return
    }

    const curAction = knownHeroActions.find(a => a.name == hero.action.name)!
    if (curAction.onFinish) {
        curAction.onFinish(hero)
    }

    const nextActionName = curAction.next(hero)
    const nextAction = knownHeroActions.find(a => a.name == nextActionName)!
    if (nextAction.onStart) {
        nextAction.onStart(hero)
    }

    hero.action.name = nextAction.name
    hero.action.title = nextAction.title(hero)
    hero.action.progress.cur = 0
    hero.action.progress.max = nextAction.duration(hero)
}

function advanceTime(hero: Hero) {
    hero.seed = rand.int(hero, 2e9)
    advanceAction(hero)

    stats.time++

    switch (hero.action.name) {
        case 'afk': stats.timeSpent.afk++; break
        case 'combat': stats.timeSpent.combat++; break
        case 'sell-junk': stats.timeSpent.selling++; break
        case 'buy-gear': stats.timeSpent.buying++; break
        case 'accept-quest':
        case 'pass-quest': stats.timeSpent.quest++; break
    }

    switch (hero.zone.type) {
        case ZoneType.Town: stats.timeSpent.town++; break
        case ZoneType.Wilderness: stats.timeSpent.wilderness++; break
        case ZoneType.Traveling: stats.timeSpent.traveling++; break
    }
}

function rollAttr(): Map<number> {
    const keys = data.attributes.filter(e => e.primary).map(e => e.name)
    const attr: Map<number> = {}
    keys.forEach(k => attr[k] = 10)

    const state = { seed: Math.floor(Math.random() * 1000000) }
    for (let t = 0; t < 8; t++) {
        const k1 = rand.item(state, keys)
        let k2 = k1
        while (k2 == k1) {
            k2 = rand.item(state, keys)
        }

        attr[k1]--
        attr[k2]++
    }

    return attr
}

function createHero(nickname: string, raceName: string, className: string, attrRoll: Map<number>): Hero {
    const race = data.races.find(r => r.name == raceName)!
    const clazz = data.classes.find(c => c.name == className)!

    const hero: Hero = {
        ver: version(),
        born: Math.floor(Date.now() / 1000),
        seed: Math.floor(7e7 + Math.random() * 2e9),
        nickname,
        race: raceName,
        class: className,
        attr: Object.values(data.attributes)
            .reduce<Map<number>>((a, { name }) => {
                a[name] = attrRoll[name] ?? 0
                return a
            }, {}),
        attrPrio: Object.values(data.attributes)
            .filter(e => e.primary)
            .reduce<Map<number>>((a, { name }) => {
                a[name] = (race.attrPrio[name] ?? 0) + (clazz.attrPrio[name] ?? 0)
                return a
            }, {}),
        level: { num: 0, progress: { cur: 0, max: 0 } },
        action: { name: knownHeroActions[0].name, title: '?', progress: { cur: 0, max: 0 } },
        zone: { type: ZoneType.Town, biome: Trait.None },
        gold: 0,
        gear: [],
        bag: []
    }

    levelUp(hero)
    lootItems(hero, clazz.startItems)
    updateZone(hero, ZoneType.Town)
    advanceAction(hero)

    return hero
}

const stats = {
    time: 0,
    timeSpent: <Map<number>>{ town: 0, wilderness: 0, traveling: 0, combat: 0, afk: 0, selling: 0, buying: 0, quest: 0 },
    expGained: { mob: 0, quest: 0 },
    goldCollected: { mob: 0, quest: 0, junk: 0 },
    goldSpent: { gear: 0 },
    itemsLootedByQuality: Object.values(ItemQuality)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    gearItemsLootedByQuality: Object.values(ItemQuality)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    gearItemsLootedBySlot: Object.values(GearSlot)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    gearItemsLootedBySource: Object.values(GearSource)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    gearItemsEquipped: 0,
    itemsLostInGold: 0,
    mobsKilled: Object.values(MobMight)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    questsPassed: 0,
    levelUpTimestamps: [ 0 ],
    levelUpGoldstamps: [ 0 ]
}

function dump(hero: Hero) {
    console.log('==================================================== TIME:', format.duration(stats.time), '==== GOLD:', format.gold(hero.gold))
    console.log('#### HERO', hero)
    console.log('#### STATS', stats)
    console.log('#### TIME SPENT BREAKDOWN')
    console.table(Object.keys(stats.timeSpent).map(k => {
        const v = stats.timeSpent[k]
        return { k, v, '%': format.progress({ cur: v, max: stats.time }, 1) }
    }))
    console.log('#### GEAR')
    console.table(hero.gear)
    console.table(Object.values(hero.gear).map(e => {
        const a = e?.gear?.attr || {}
        return { slot: e?.gear?.slot ?? '-', str: a.str ?? '-', dex: a.dex ?? '-', int: a.int ?? '-', sta: a.sta ?? '-' }
    }))
    console.log('#### BAG')
    console.table(hero.bag)
    console.log('#### LEVEL || TIME TO LEVEL || TIME AT LEVEL || GOLD COLLECTED')
    const totalGoldCollected = Object.values(stats.goldCollected).reduce((a, c) => a + c, 0)
    console.table(stats.levelUpTimestamps.map((e, i, a) => {
        const et = format.duration(e)
        const dt = format.duration((i < a.length - 1 ? a[i + 1] : stats.time) - e)
        const dg = format.gold((i < a.length - 1 ? stats.levelUpGoldstamps[i + 1] : totalGoldCollected) - stats.levelUpGoldstamps[i])
        return [ et, dt, dg ]
    }))
    console.log('====================================================')
}

export default {
    rollAttr,
    createHero,
    advanceTime,
    dump
}

// deno-lint-ignore no-explicit-any
function migrate(obj: any): boolean {
    if (obj.ver == 1) { // v1 => v2 // 201126
        obj.gear = Object.values(obj.gear)
        obj.ver = 2
        return true
    }
    return false
}

declare global {
    // deno-lint-ignore no-explicit-any
    interface Window { game: any, localStorage: { hero: any } }
}

if (!window.Deno) {
    let activeIntervalId = 0
    window.game = {
        version: `pqnext-${version()}-[BUILDSTAMP]`,
        races: () => data.races.map(({ name, title, desc }) => { return { name, title, desc } }),
        classes: () => data.classes.map(({ name, title, desc }) => { return { name, title, desc } }),
        attributes: () => data.attributes.map(({ name, title, desc, format, primary }) => { return { name, title, desc, format, primary } }),
        gearSlots: () => data.gearSlots.map(({ name, title }) => { return { name, title } }),
        roll: rollAttr,
        create: createHero,
        save: (hero: Hero) => {
            if (hero) {
                window.localStorage.hero = JSON.stringify(hero)
            }
        },
        load: (): Hero | undefined => {
            if (window.localStorage.hero) {
                const obj = JSON.parse(window.localStorage.hero)
                if (obj.ver == version()) {
                    return <Hero> obj
                } else {
                    console.log(`Saved hero version mismatch. Migrating from v${obj.ver} to v${version()}...`)
                    while (migrate(obj) && obj.ver != version()) { /* empty */ }
                    if (obj.ver == version()) {
                        console.log('Success.')
                        return <Hero> obj
                    } else {
                        console.log('Failure. Probably the hero cannot be restored ._. Please create new one')
                    }
                }
            }
        },
        start: (hero: Hero) => {
            if (!activeIntervalId && hero && hero.ver == version()) {
                activeIntervalId = setInterval(() => {
                    advanceTime(hero)
                }, 1000)
            }
        },
        stop: () => {
            if (activeIntervalId > 0) {
                clearInterval(activeIntervalId)
                activeIntervalId = 0
            }
        },
        playing: () => activeIntervalId > 0,
        dump
    }
}
