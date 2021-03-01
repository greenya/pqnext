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
import lingo from './lingo.ts'
import rand from './rand.ts'

const knownHeroActions: readonly HeroAction[] = [
    {
        name: '?',
        title: () => '?',
        duration: () => 0,
        next: () => 'intro'
    },
    {
        name: 'intro',
        title: (hero) => lingo.text(hero.lang, 'hero-action-intro'),
        duration: () => 10,
        next: () => 'accept-quest'
    },
    {
        name: 'accept-quest',
        title: (hero) => lingo.text(hero.lang, 'hero-action-accept-quest'),
        duration: (hero) => 5 + rand.int(hero, 2),
        onFinish: (hero) => {
            acceptQuest(hero)
        },
        next: (hero) => {
            if (hero.bag.length > 0) {
                return 'sell-junk'
            } else {
                return 'move-to-wilderness'
            }
        }
    },
    {
        name: 'pass-quest',
        title: (hero) => lingo.text(hero.lang, 'hero-action-pass-quest'),
        duration: (hero) => 5 + rand.int(hero, 2),
        onFinish: (hero) => {
            completeQuest(hero)
        },
        next: () => 'accept-quest'
    },
    {
        name: 'move-to-wilderness',
        title: (hero) => lingo.text(hero.lang, 'hero-action-move-to-wilderness'),
        duration: () => 15,
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
        title: (hero) => lingo.text(hero.lang, 'hero-action-combat', { target: hero.target!.title }),
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
            } else if (hero.attr.curMp < manaNeededForCombat(hero)) {
                return 'rest'
            } else {
                return 'combat'
            }
        }
    },
    {
        name: 'rest',
        title: (hero) => lingo.text(hero.lang, 'hero-action-rest'),
        duration: () => 15,
        onFinish: (hero) => {
            hero.attr.curMp = hero.attr.maxMp
        },
        next: () => 'combat'
    },
    {
        name: 'move-to-town',
        title: (hero) => lingo.text(hero.lang, 'hero-action-move-to-town'),
        duration: () => 15,
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
                return 'sell-junk'
            }
        }
    },
    {
        name: 'sell-junk',
        title: (hero) => lingo.text(hero.lang, 'hero-action-sell-junk'),
        duration: (hero) => Math.max(1, Math.floor(hero.bag.length / 2)),
        onFinish: (hero) => {
            sellJunk(hero)
        },
        next: (hero) => {
            if (haveEnoughGoldToGoShopping(hero)) {
                return 'buy-gear'
            } else {
                return 'move-to-wilderness'
            }
        }
    },
    {
        name: 'buy-gear',
        title: (hero) => lingo.text(hero.lang, 'hero-action-buy-gear'),
        duration: () => 8,
        onFinish: (hero) => {
            buyGear(hero)
        },
        next: () => 'move-to-wilderness'
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

function rollMobHeroTarget(hero: Hero): HeroTarget {
    const level = hero.level.num
    const mobs = data.mobs.filter(m => (m.trait & hero.zone.biome) == hero.zone.biome && m.level <= level)
    const mob = rand.item(hero, mobs)
    const might = level >= mob.level + 10 && rand.dice(hero, 8) ? MobMight.Reinforced : MobMight.Normal
    const title = lingo.rollMobTitle(hero, mob, might)

    return {
        title,
        mob: mob.name,
        might
    }
}

function manaNeededForCombat(hero: Hero) {
    const level = hero.level.num
    return Math.min(20 + level, hero.attr.maxMp)
}

function startCombat(hero: Hero) {
    hero.target = rollMobHeroTarget(hero)
}

function finishCombat(hero: Hero) {
    const level = hero.level.num
    const target = hero.target!
    const mob = data.mobs.find(m => m.name == target.mob)!
    const reinforced = target.might == MobMight.Reinforced

    addExp(hero, level + 1 + (reinforced ? 1 : 0), 'mob')

    if ((mob.trait & Trait.Human) == Trait.Human) {
        addGold(hero, rand.int(hero, 3) + level * 2 + (reinforced ? level * 10 : 0), 'mob')
    }

    if (rand.dice(hero, 2)) {
        progressQuest(hero)
    }

    const items: Item[] = []

    if (rand.dice(hero, 14)) {
        items.push(rollGearItem(hero, GearSource.Drop))
    } else {
        if (reinforced) {
            items.push(rollMobPreciousItem(hero, mob))
        } else {
            items.push(rollMobJunkItem(hero, mob))
        }
    }

    if (items.length > 0) {
        lootItems(hero, items)
    }

    hero.target = undefined
    hero.attr.curMp -= manaNeededForCombat(hero)
    stats.mobsKilled[target.might]++
}

function rollItemQuality(hero: Hero, source: GearSource): ItemQuality {
    const level = hero.level.num
    const roll = rand.int(hero, 1000 - (source == GearSource.Quest ? 500 : 0))
    const quality = data.itemQualities.reduce(
        (a, c) => c.chance > 0 && c.chance > roll && c.level <= level ? c.name : a,
        level < 20 && rand.dice(hero, 1 + Math.floor(level / 4)) ? ItemQuality.Poor : ItemQuality.Common
    )
    return quality
}

function rollGearItemAttributes(hero: Hero, quality: ItemQuality, source: GearSource): Map<number> {
    const level = hero.level.num
    const attr: Map<number> = {}

    const count = data.itemQualities.find(q => q.name == quality)!.attrCount
    if (count) {
        const bonus = Math.floor(level / 5)
        const stat = rand.shuffle(hero, data.attributes.filter(e => e.primary).map(e => e.name))
        for (let i = 0; i < count; i++) {
            let value = bonus
            if (i == 0 && source == GearSource.Quest) {
                value += Math.ceil(level / 50)
            }
            attr[stat[i]] = value
        }
    }

    return attr
}

function rollGearItem(hero: Hero, source: GearSource, forSlot?: GearSlot): Item {
    const level = hero.level.num
    const availSlots = forSlot
        ? [ forSlot ]
        : data.gearSlots.filter(s => s.level <= level).map(s => s.name)

    const slot = rand.item(hero, availSlots)
    const quality = rollItemQuality(hero, source)
    const title = lingo.rollGearItemTitle(hero, slot, quality)
    const price = getItemPrice(hero, title, quality, slot)
    const attr = rollGearItemAttributes(hero, quality, source)

    return {
        title,
        quality,
        gear: { slot, attr, level, source },
        price
    }
}

function rollMobPreciousItem(hero: Hero, mob: Mob): Item {
    const level = hero.level.num
    const title = lingo.rollMobPreciousItemTitle(hero, mob)
    const quality = ItemQuality.Common
    const priceDev = getItemPriceDeviation(hero, title)
    const priceMult = 5 + Math.floor((priceDev % level) / 2)
    const price = getItemPrice(hero, title, quality, undefined, priceMult)
    return { title, quality, price }
}

function rollMobJunkItem(hero: Hero, mob: Mob): Item {
    const title = lingo.rollMobJunkItemTitle(hero, mob)
    const quality = ItemQuality.Poor
    const price = getItemPrice(hero, title, quality)
    return { title, quality, price }
}

function getItemPriceDeviation(hero: Hero, title: string): number {
    const level = hero.level.num
    const base = title.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const mod = (base % 5) * Math.ceil(level / 3)
    return mod > 0 ? mod : (base % level) * 7
}

function getItemPrice(hero: Hero, title: string, quality: ItemQuality, slot?: GearSlot, extraMult = 1): number {
    const level = hero.level.num
    const price = Math.floor(
        (quality == ItemQuality.Poor ? getItemPriceDeviation(hero, title) : 0)
        + level
        * data.itemQualities.find(q => q.name == quality)!.priceMult
        * (slot ? (level / 10) * data.gearSlots.find(s => s.name == slot)!.priceMult : 1)
        * extraMult
    )
    return Math.max(price, 1)
}

function sellJunk(hero: Hero) {
    hero.bag
        .splice(0)
        .forEach(slot => addGold(hero, slot.item.price * slot.count, 'junk'))
}

function acceptQuest(hero: Hero) {
    const level = hero.level.num
    hero.quest = {
        title: lingo.rollQuestTitle(hero),
        progress: {
            cur: 0,
            max: 5 + Math.ceil(level * 1.5) + rand.int(hero, Math.ceil(level / 5))
        }
    }
}

function completeQuest(hero: Hero) {
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
        source == GearSource.Quest ? 4 :
        source == GearSource.Vendor ? 12 :
        0

    let bestItem: Item | undefined = undefined
    let bestDeltaValue = 0
    let bestBuyPrice = 0

    for (let i = 0; i < amount; i++) {
        const item = rollGearItem(hero, source)
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

    if (newType == ZoneType.Town) {
        hero.attr.curMp = hero.attr.maxMp
    }
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
    const { str, int, sta, curMp: curMpPrev, maxMp: maxMpPrev } = hero.attr

    hero.attr.bagCap = 10 + Math.floor(str / 10)
    hero.attr.maxHp = 20 + level * 8 + sta * 10 + Math.floor(Math.pow(level, 2) / 100) * 40
    hero.attr.maxMp = 20 + level * 2 + int * 10 + Math.floor(Math.pow(level, 2) / 100) * 20

    const mpFraction = curMpPrev >= 0 && maxMpPrev > 0 ? curMpPrev / maxMpPrev : 1
    hero.attr.curMp = Math.floor(mpFraction * hero.attr.maxMp)
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
    hero.attr.curMp = hero.attr.maxMp

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

function lootItems(hero: Hero, items: readonly Item[]) {
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
        case 'combat': stats.timeSpent.combat++; break
        case 'rest': stats.timeSpent.resting++; break
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

function createHero(lang: string, nickname: string, raceName: string, className: string, attrRoll: Map<number>): Hero {
    const race = data.races.find(r => r.name == raceName)!
    const clazz = data.classes.find(c => c.name == className)!

    const hero: Hero = {
        ver: version(),
        born: Math.floor(Date.now() / 1000),
        seed: Math.floor(7e7 + Math.random() * 2e9),
        lang: lingo.languages().find(l => l.name == lang) ? lang : lingo.languages()[0].name,
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
    lootItems(hero, [ rollGearItem(hero, GearSource.Drop, GearSlot.MainHand) ])
    updateZone(hero, ZoneType.Town)
    advanceAction(hero)

    return hero
}

const stats = {
    time: 0,
    timeSpent: <Map<number>>{ town: 0, wilderness: 0, traveling: 0, combat: 0, resting: 0, selling: 0, buying: 0, quest: 0 },
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

const version = () => 5

const game = {
    version: `pqnext-${version()}-[BUILDSTAMP]`,
    languages: () => lingo.languages(),
    text: (lang: string, key: string, args: { [_: string]: string } = {}) => lingo.text(lang, key, args),
    races: () => data.races.map(({ name, title, desc }) => { return { name, title, desc } }),
    classes: () => data.classes.map(({ name, title, desc }) => { return { name, title, desc } }),
    attributes: () => data.attributes.map(({ name, title, desc, format, primary }) => { return { name, title, desc, format, primary } }),
    gearSlots: () => data.gearSlots.map(({ name, title }) => { return { name, title } }),
    rollAttr,
    rollName: lingo.rollCharName,
    create: createHero
}

export default {
    ...game,
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

    if (obj.ver == 2) { // v2 => v3 // 210111
        obj.attr.curMp = obj.attr.maxMp
        obj.ver = 3
        return true
    }

    if (obj.ver == 3) { // v3 => v4 // 210121
        obj.lang = 'ua'
        obj.ver = 4
        return true
    }

    if (obj.ver == 4) { // v4 => v5 // 210301
        if (obj.action.name == 'afk') {
            obj.action.name = 'sell-junk'
        }
        obj.ver = 5
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
        ...game,
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
        playing: () => activeIntervalId > 0
    }
}
