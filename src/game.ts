import {
    Hero,
    HeroAction,
    HeroTarget,
    Item,
    ItemQuality,
    ItemSlot,
    ItemSource,
    Map,
    Mob,
    MobMight,
    Trait,
    ZoneType
} from './type.ts'

import data from './data.ts'
import format from './format.ts'
import rand from './rand.ts'

const version = () => 1

const knownHeroActions: HeroAction[] = [
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
        duration: (hero) => Math.floor(hero.bag.length / 2),
        onFinish: (hero) => {
            sellJunk(hero)
        },
        next: (hero) => {
            // todo: come up with better condition
            // maybe generate rare item for current level and use that price x5 as a threshold; so don't spend time if low on gold
            if (hero.gold > hero.level.num * 40 + 100) {
                return 'buy-gear'
            } else {
                return rand.dice(hero, 3) ? 'afk' : 'move-to-wilderness'
            }
        }
    },
    {
        name: 'buy-gear',
        title: () => 'Скуповується...',
        duration: (hero) => 8,
        onFinish: (hero) => {
            // todo: buy gear
            // the buying process can be following:
            //  - generate 4 items (simple, just like mob drops)
            //  - pick single one with best hero value
            //  - buying price is x10 of normal calculated price
        },
        next: (hero) => rand.dice(hero, 3) ? 'afk' : 'move-to-wilderness'
    }
]

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
        items.push(getGearItem(hero, ItemSource.Drop))
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

function getGearItem(hero: Hero, source: ItemSource): Item {
    const level = hero.level.num
    const slot = rand.item(hero, Object.values(ItemSlot))

    const roll = rand.int(hero, 1000 - (source == ItemSource.Quest ? 500 : 0))
    const quality = [ ItemQuality.Epic, ItemQuality.Rare, ItemQuality.Uncommon ].reduce((a, c) => {
        const q = data.itemQualities[c]
        return roll < q.chance && level >= q.level ? c : a
    }, ItemQuality.Common)

    const title = quality + ' ' + slot // todo: randomize
    const price = getItemPrice(hero, title, quality, slot)

    const item: Item = {
        title,
        quality,
        gear: { slot, attr: {}, level, source },
        price
    }

    const attrCount = data.itemQualities[quality].attrCount
    if (attrCount > 0) {
        const bonus = Math.floor(level / 5)
        const stat = rand.shuffle(hero, data.attributes.filter(e => e.primary).map(e => e.name))
        for (let i = 0; i < attrCount; i++) {
            item.gear!.attr[stat[i]] = bonus + (i == 0 && source == ItemSource.Quest ? 1 : 0)
        }
    }

    return item
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
    const base = title.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const mod = base % 8
    return mod > 0 ? mod : base % hero.level.num * 4
}

function getItemPrice(hero: Hero, title: string, quality: ItemQuality, slot?: ItemSlot, extraMult?: number): number {
    return Math.floor(
        (quality == ItemQuality.Poor ? getPoorItemPriceDeviation(hero, title) : 0)
        + hero.level.num
        * data.itemQualities[quality].priceMult
        * (slot ? data.itemSlotPriceMult[slot] : 1)
        * (extraMult ? extraMult : 1)
    )
}

function sellJunk(hero: Hero) {
    hero.bag
        .splice(0)
        .forEach(slot => addGold(hero, slot.item.price * slot.count, 'junk'))
}

function getQuestTitle(hero: Hero): string {
    // todo: randomize
    return 'Зменшити популяцію вовків'
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

    let bestValue = 0
    let bestItem: Item | undefined = undefined

    for (let i = 0; i < 3; i++) {
        const choiceItem = getGearItem(hero, ItemSource.Quest)
        const choiceValue = getGearItemValue(hero, choiceItem)
        if (bestValue < choiceValue) {
            bestValue = choiceValue
            bestItem = choiceItem
        }
    }

    if (bestItem) {
        lootItems(hero, [ bestItem ])
    }

    hero.quest = undefined
    stats.questsPassed++
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

    hero.attr.bagCap = 8 + Math.floor(str / 10)
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
    stats.goldCollected[source] += amount
    hero.gold += amount
}

function getGearItemValue(hero: Hero, item: Item) {
    if (item.gear) {
        const attr = item.gear.attr
        const prio = hero.attrPrio
        return data.attributes
            .filter(e => e.primary)
            .map(e => e.name)
            .reduce((a, c) => a + prio[c] * (attr[c] ?? 0), 0)
    } else {
        return 1
    }
}

function equipItem(hero: Hero, newItem: Item): { done: boolean, oldItem?: Item } {
    if (!newItem.gear) {
        return { done: false }
    }

    const oldItem = hero.gear[newItem.gear.slot]
    if (oldItem) {
        const oldValue = getGearItemValue(hero, oldItem)
        const newValue = getGearItemValue(hero, newItem)
        if (newValue <= oldValue) {
            return { done: false }
        }
    }

    if (oldItem) {
        removeAttr(hero, oldItem.gear!.attr)
    }

    hero.gear[newItem.gear.slot] = newItem
    addAttr(hero, newItem.gear.attr)

    stats.itemsEquipped++
    return { done: true, oldItem }
}

function getItemStackSize(item: Item) {
    return item.gear ? 1 : 10
}

function moveItemToBag(hero: Hero, item: Item) {
    const stackSize = getItemStackSize(item)
    const slot = hero.bag.find(s =>
        s.item.title == item.title &&
        s.item.price == item.price &&
        !s.item.gear &&
        s.count < stackSize
    )

    if (slot) {
        slot.count++
    } else {
        if (hero.bag.length < hero.attr.bagCap) {
            hero.bag.push({ item, count: 1 })
        } else {
            // in rare cases item can actually get lost:
            // when changing gear, str might become lower => lower bag cap => fail to place item in bag
            // (the item that was equipped moment ago with str giving more bag cap)
            // todo: maybe do somthing about it? maybe search for lowest slot cost and drop it, because
            // its obvious there will be some stack of junk that is much lower cost than gear item
            stats.itemsLost++
            stats.itemsLostInGold += item.price
        }
    }
}

function lootItems(hero: Hero, items: Item[]) {
    items.forEach(newItem => {
        const equip = equipItem(hero, newItem)
        if (equip.done) {
            if (equip.oldItem) {
                moveItemToBag(hero, equip.oldItem)
            }
        } else {
            moveItemToBag(hero, newItem)
        }

        stats.itemsLootedByQuality[newItem.quality]++
        if (newItem.gear) {
            stats.itemsLootedBySlot[newItem.gear.slot]++
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
        gear: Object.values(ItemSlot)
            .reduce<Map<undefined>>((a, c) => { a[c] = undefined; return a }, {}),
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
    itemsLootedByQuality: Object.values(ItemQuality)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    itemsLootedBySlot: Object.values(ItemSlot)
        .reduce<Map<number>>((a, c) => { a[c] = 0; return a }, {}),
    itemsEquipped: 0,
    itemsLost: 0,
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
        return { k, v, '%': format.progress({ cur: v, max: stats.time }) }
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
        roll: rollAttr,
        create: createHero,
        save: (hero: Hero) => {
            if (hero) {
                window.localStorage.hero = JSON.stringify(hero)
            }
        },
        load: (): Hero | undefined => {
            if (window.localStorage.hero) {
                const hero: Hero = JSON.parse(window.localStorage.hero)
                return hero.ver == version() ? hero : undefined
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
        format,
        dump
    }
}
