export interface Map<T> {
    [key: string]: T
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
    Bone        = 1 << 11,
    Mech        = 1 << 12,
    Fire        = 1 << 13,
    Ice         = 1 << 14,
    Air         = 1 << 15,
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
    masculine?: string,
    feminine?: string,
    neuter?: string,
    junk: string
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
    attrPrio: Map<number>,
    // useableWeaponTypes
    // useableArmorTypes
    startItems: Item[]
}

export interface HeroTarget {
    title: string,
    mob: string,
    might: MobMight
}

export interface HeroAction {
    name: string,
    title: (hero: Hero) => string,
    duration: (hero: Hero) => number,
    onStart?: (hero: Hero) => void,
    onFinish?: (hero: Hero) => void,
    next: (hero: Hero) => string
}

export interface Hero {
    nickname: string,
    race: string,
    class: string,
    attr: Map<number>,
    attrPrio: Map<number>,
    level: { num: number, progress: Progress },
    action: { name: string, title: string, progress: Progress },
    quest?: { title: string, progress: Progress },
    target?: HeroTarget,
    zone: { type: ZoneType, biome: Trait },
    gold: number,
    gear: Item[],
    bag: BagSlot[],
    seed: number,
    born: number,
    ver: number
}
