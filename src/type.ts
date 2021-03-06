export interface Map<T> {
    [_: string]: T
}

export interface Progress {
    cur: number,
    max: number
}

export interface Attribute {
    name: string,
    title: string,
    desc: string,
    format?: string,
    primary?: boolean
}

export enum ItemQuality {
    Poor        = 'poor',
    Common      = 'common',
    Uncommon    = 'uncommon',
    Rare        = 'rare',
    Epic        = 'epic'
    // Legendary
}

export interface ItemQualityMeta {
    name: ItemQuality,
    level: number,
    chance: number,
    priceMult: number,
    attrCount?: number
}

export enum GearSlot {
    MainHand    = 'mainhand',
    OffHand     = 'offhand',
    Head        = 'head',
    Shoulders   = 'shoulders',
    Chest       = 'chest',
    Back        = 'back',
    Wrist       = 'wrist',
    Hands       = 'hands',
    Waist       = 'waist',
    Legs        = 'legs',
    Feet        = 'feet',
    Neck        = 'neck',
    Finger      = 'finger',
    Trinket     = 'trinket'
}

export interface GearSlotMeta {
    name: GearSlot,
    title: string,
    level: number,
    priceMult: number
}

export enum GearSource {
    Drop    = 'drop',
    Vendor  = 'vendor',
    Quest   = 'quest'
}

export interface Item {
    title: string,
    quality: ItemQuality,
    gear?: {
        slot: GearSlot,
        attr: Map<number>,
        level: number,
        source: GearSource
    },
    price: number
}

export interface BagSlot {
    item: Item,
    count: number
}

export enum ZoneType {
    Town        = 'town',
    Wilderness  = 'wilderness',
    Traveling   = 'traveling'
}

export enum MobMight {
    Normal      = 'normal',
    Reinforced  = 'reinforced'
    // Rare
    // Unique
}

export enum Trait {
    None        = 0,
    // nature
    Human       = 1,
    Beast       = 1 << 1,
    Magic       = 1 << 2,
    // content
    Flesh       = 1 << 10,
    Insect      = 1 << 11,
    Bone        = 1 << 12,
    Mech        = 1 << 13,
    Fire        = 1 << 14,
    Ice         = 1 << 15,
    Air         = 1 << 16,
    // biome
    Forest      = 1 << 20,
    Desert      = 1 << 21,
    Tundra      = 1 << 22,
    Swamp       = 1 << 23,
    Water       = 1 << 24
}

export interface Mob {
    name: string,
    level: number,
    trait: Trait,
}

export interface Race {
    name: string,
    title: string,
    desc: string,
    attrPrio: Map<number>
}

export interface Class {
    name: string,
    title: string,
    desc: string,
    attrPrio: Map<number>
}

export interface HeroTarget {
    title: string,
    mob: string,
    might: MobMight
}

export enum HeroAction {
    Init                = 'init',
    Intro               = 'intro',
    AcceptQuest         = 'accept-quest',
    PassQuest           = 'pass-quest',
    MoveToWilderness    = 'move-to-wilderness',
    Combat              = 'combat',
    Rest                = 'rest',
    MoveToTown          = 'move-to-town',
    SellJunk            = 'sell-junk',
    BuyGear             = 'buy-gear'
}

export interface HeroActionMeta {
    name: HeroAction,
    start: (hero: Hero) => [ string, number ], // returns title and duration of the action
    finish: (hero: Hero) => HeroAction // returns next action
}

export interface Hero {
    nickname: string,
    race: string,
    class: string,
    attr: Map<number>,
    attrPrio: Map<number>,
    level: { num: number, progress: Progress },
    action: { name: HeroAction, title: string, progress: Progress },
    quest?: { title: string, progress: Progress },
    target?: HeroTarget,
    zone: { type: ZoneType, biome: Trait },
    gold: number,
    gear: Item[],
    bag: BagSlot[],
    seed: number,
    born: number,
    lang: string,
    ver: number
}

export interface LingoRoll {
    rollCharName: (lang: string) => string,
    rollMobTitle: (hero: Hero, mob: Mob, might: MobMight) => string,
    rollMobJunkItemTitle: (hero: Hero, mob: Mob) => string,
    rollMobPreciousItemTitle: (hero: Hero, mob: Mob) => string,
    rollGearItemTitle: (hero: Hero, slot: GearSlot, quality: ItemQuality) => string,
    rollQuestTitle: (hero: Hero) => string
}

export interface Lingo extends LingoRoll {
    meta: { name: string, title: string, icon: string },
    dict: { readonly [_: string]: string }
}
