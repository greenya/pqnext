import {
    Attribute,
    Class,
    GearSlot,
    GearSlotMeta,
    ItemQuality,
    ItemQualityMeta,
    Mob,
    Race,
    Trait
} from './type.ts'

const attributes: readonly Attribute[] = [
    {
        name: 'str',
        title: 'attr-str-title',
        desc: 'attr-str-desc',
        format: 'attr-str-format',
        primary: true
    },
    {
        name: 'dex',
        title: 'attr-dex-title',
        desc: 'attr-dex-desc',
        format: 'attr-dex-format',
        primary: true
    },
    {
        name: 'int',
        title: 'attr-int-title',
        desc: 'attr-int-desc',
        format: 'attr-int-format',
        primary: true
    },
    {
        name: 'sta',
        title: 'attr-sta-title',
        desc: 'attr-sta-desc',
        format: 'attr-sta-format',
        primary: true
    },
    {
        name: 'maxHp',
        title: 'attr-maxHp-title',
        desc: 'attr-maxHp-desc'
    },
    {
        name: 'curMp',
        title: 'attr-curMp-title',
        desc: 'attr-curMp-desc'
    },
    {
        name: 'maxMp',
        title: 'attr-maxMp-title',
        desc: 'attr-maxMp-desc'
    },
    {
        name: 'bagCap',
        title: 'attr-bagCap-title',
        desc: 'attr-bagCap-desc'
    }
]

const races: readonly Race[] = [
    {
        name: 'human',
        title: 'race-human-title',
        desc: 'race-human-desc',
        attrPrio: { str: 4, dex: 4, int: 4, sta: 6 }
    },
    {
        name: 'dwarf',
        title: 'race-dwarf-title',
        desc: 'race-dwarf-desc',
        attrPrio: { str: 5, dex: 3, int: 3, sta: 7 }
    },
    {
        name: 'elf',
        title: 'race-elf-title',
        desc: 'race-elf-desc',
        attrPrio: { str: 3, dex: 5, int: 5, sta: 5 }
    }
]

const classes: readonly Class[] = [
    {
        name: 'warrior',
        title: 'class-warrior-title',
        desc: 'class-warrior-desc',
        attrPrio: { str: 3, dex: 1 }
    },
    {
        name: 'rogue',
        title: 'class-rogue-title',
        desc: 'class-rogue-desc',
        attrPrio: { str: 1, dex: 3 }
    },
    {
        name: 'mage',
        title: 'class-mage-title',
        desc: 'class-mage-desc',
        attrPrio: { dex: 1, int: 3 }
    }
]

const biomes: readonly { biome: Trait, level: number }[] = [
    { biome: Trait.Forest, level: 1 },
    { biome: Trait.Desert, level: 10 },
    { biome: Trait.Tundra, level: 20 },
    { biome: Trait.Swamp, level: 30 },
    { biome: Trait.Water, level: 40 }
]

const mobs: readonly Mob[] = [
    {
        name: 'ambusher',
        level: 10,
        trait: Trait.Human | Trait.Forest | Trait.Desert | Trait.Swamp
    },
    {
        name: 'ape',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest
    },
    {
        name: 'assassin',
        level: 16,
        trait: Trait.Human | Trait.Desert
    },
    {
        name: 'bandit',
        level: 4,
        trait: Trait.Human | Trait.Forest | Trait.Swamp
    },
    {
        name: 'bat',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Swamp
    },
    {
        name: 'bear',
        level: 8,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra
    },
    {
        name: 'bee',
        level: 6,
        trait: Trait.Beast | Trait.Insect | Trait.Forest | Trait.Swamp
    },
    {
        name: 'boar',
        level: 4,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra
    },
    {
        name: 'cannibal',
        level: 28,
        trait: Trait.Human | Trait.Tundra | Trait.Swamp
    },
    {
        name: 'crab',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Swamp | Trait.Water
    },
    {
        name: 'crayfish',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Water
    },
    {
        name: 'crocodile',
        level: 30,
        trait: Trait.Beast | Trait.Flesh | Trait.Swamp | Trait.Water
    },
    {
        name: 'cultist',
        level: 22,
        trait: Trait.Human | Trait.Desert | Trait.Tundra
    },
    {
        name: 'deer',
        level: 1,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra
    },
    {
        name: 'desert-turtle',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'hawk',
        level: 22,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra
    },
    {
        name: 'hyena',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'jellyfish',
        level: 30,
        trait: Trait.Beast | Trait.Water
    },
    {
        name: 'koyote',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'lama',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra
    },
    {
        name: 'lizard',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'lynx',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra
    },
    {
        name: 'mountain-lion',
        level: 20,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra
    },
    {
        name: 'mountain-ram',
        level: 20,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra
    },
    {
        name: 'octopus',
        level: 40,
        trait: Trait.Beast | Trait.Flesh | Trait.Water
    },
    {
        name: 'owl',
        level: 2,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra | Trait.Swamp
    },
    {
        name: 'pirate',
        level: 22,
        trait: Trait.Human | Trait.Water
    },
    {
        name: 'raptor',
        level: 24,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra
    },
    {
        name: 'raven',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra | Trait.Swamp
    },
    {
        name: 'renegade',
        level: 32,
        trait: Trait.Human | Trait.Swamp
    },
    {
        name: 'robber',
        level: 6,
        trait: Trait.Human | Trait.Forest | Trait.Tundra
    },
    {
        name: 'sand-vortex',
        level: 16,
        trait: Trait.Magic | Trait.Air | Trait.Desert | Trait.Tundra
    },
    {
        name: 'sand-snake',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'scavenger',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'scorpion',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert
    },
    {
        name: 'sea-giant',
        level: 36,
        trait: Trait.Magic | Trait.Water
    },
    {
        name: 'sea-snake',
        level: 28,
        trait: Trait.Beast | Trait.Flesh | Trait.Water
    },
    {
        name: 'sea-turtle',
        level: 26,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra | Trait.Water
    },
    {
        name: 'shark',
        level: 38,
        trait: Trait.Beast | Trait.Flesh | Trait.Water
    },
    {
        name: 'spider',
        level: 12,
        trait: Trait.Beast | Trait.Insect | Trait.Forest | Trait.Desert | Trait.Tundra | Trait.Swamp
    },
    {
        name: 'steppe-lion',
        level: 12,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra
    },
    {
        name: 'stone-giant',
        level: 30,
        trait: Trait.Magic | Trait.Desert | Trait.Tundra
    },
    {
        name: 'thief',
        level: 14,
        trait: Trait.Human | Trait.Tundra | Trait.Swamp
    },
    {
        name: 'thug',
        level: 10,
        trait: Trait.Human | Trait.Forest | Trait.Desert | Trait.Swamp
    },
    {
        name: 'tiger',
        level: 22,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra | Trait.Swamp
    },
    {
        name: 'walking-tree',
        level: 18,
        trait: Trait.Magic | Trait.Forest | Trait.Swamp
    },
    {
        name: 'warlock',
        level: 26,
        trait: Trait.Human | Trait.Swamp
    },
    {
        name: 'wizard',
        level: 20,
        trait: Trait.Human | Trait.Forest | Trait.Tundra
    },
    {
        name: 'wolf',
        level: 1,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra
    },
    {
        name: 'wood-lurker',
        level: 14,
        trait: Trait.Beast | Trait.Insect | Trait.Forest | Trait.Swamp
    },
]

const afkMessages: readonly string[] = [
    'Біо афк',
    'Секунду/Хвилинку/Хвильку',
    `Відійшов на_одну/дві/три/чотири/п\'ять_хв`,
    'Прийшла платіжка за_тепло./світло./газ./воду._Роздивляється',
    'Побіг_на кухню/до холодильника/у сусідню квартиру/у сусідній будинок_за їжею',
    'Пішов/Пошкандибав/Побіг/Полетів/Телепортанувся_води/чаю/кофе/вина_налити/націдити/накапати',
    'Швидко/Квапливо/Нашвидкду/Спішно/Живо/Прискорено_курить/палить/димить/смалить/релогається/ребутається',
    'Хтось_стукає/грюкає/гатить_в двері,/у вікно,/в стелю,/в підлогу,/по голові,/по мізкам,_відійшов_подивитися/розібратися',
    'Комп\'ютер припинив відповідати!/Монітор відмовляється змінювати картинку!/Миша не слухається!/Клавіатура не друкує!_Скоро перезавантажується',
    'Зачарованно_дивиться/таращиться_на героїню, що_танцює/стоїть/сидить/вляглася_на поштовій скринці',
    'Інет_лагає/тормозить/зупинився_капєєєц! Швидко_перевантажує/б\'є ногою/вмовляє_роутер',
    'Колупається у налаштуваннях_гри/графіки/аддонів/макросів/вікаур',
    'Оновлює_батлнет/гру/аддони/вікаури/трасмог'
]

const itemQualities: readonly ItemQualityMeta[] = [
    {
        name: ItemQuality.Poor,
        level: 1,
        chance: -1, // Poor and Common share chance pool on low levels, see rollItemQuality()
        priceMult: 1
    },
    {
        name: ItemQuality.Common,
        level: 1,
        chance: -1, // 87.9% => 1000 (all) - 100 (uncommon) - 20 (rare) - 1 (epic)
        priceMult: 5
    },
    {
        name: ItemQuality.Uncommon,
        level: 7,
        chance: 121, // 10% => 100 (uncommon) + 20 (rare) + 1 (epic)
        priceMult: 20,
        attrCount: 1
    },
    {
        name: ItemQuality.Rare,
        level: 18,
        chance: 21, // 2% => 20 (rare) + 1 (epic)
        priceMult: 150,
        attrCount: 2
    },
    {
        name: ItemQuality.Epic,
        level: 39,
        chance: 1, // 0.1% => 1 (epic)
        priceMult: 1800,
        attrCount: 3
    }
]

const gearSlots: readonly GearSlotMeta[] = [
    {
        name: GearSlot.MainHand,
        title: 'gear-slot-mainhand-title',
        level: 1,
        priceMult: 3.5
    },
    {
        name: GearSlot.OffHand,
        title: 'gear-slot-offhand-title',
        level: 1,
        priceMult: 3.2
    },
    {
        name: GearSlot.Head,
        title: 'gear-slot-head-title',
        level: 8,
        priceMult: 1.7
    },
    {
        name: GearSlot.Shoulders,
        title: 'gear-slot-shoulders-title',
        level: 10,
        priceMult: 1.9
    },
    {
        name: GearSlot.Chest,
        title: 'gear-slot-chest-title',
        level: 1,
        priceMult: 2.0
    },
    {
        name: GearSlot.Back,
        title: 'gear-slot-back-title',
        level: 4,
        priceMult: 1.2
    },
    {
        name: GearSlot.Wrist,
        title: 'gear-slot-wrist-title',
        level: 1,
        priceMult: 1.3
    },
    {
        name: GearSlot.Hands,
        title: 'gear-slot-hands-title',
        level: 1,
        priceMult: 1.6
    },
    {
        name: GearSlot.Waist,
        title: 'gear-slot-waist-title',
        level: 2,
        priceMult: 1.4
    },
    {
        name: GearSlot.Legs,
        title: 'gear-slot-legs-title',
        level: 1,
        priceMult: 1.8
    },
    {
        name: GearSlot.Feet,
        title: 'gear-slot-feet-title',
        level: 1,
        priceMult: 1.5
    },
    {
        name: GearSlot.Neck,
        title: 'gear-slot-neck-title',
        level: 15,
        priceMult: 2.4
    },
    {
        name: GearSlot.Finger,
        title: 'gear-slot-finger-title',
        level: 12,
        priceMult: 2.2
    },
    {
        name: GearSlot.Trinket,
        title: 'gear-slot-trinket-title',
        level: 20,
        priceMult: 2.6
    }
]

const itemBuyPriceMult = 10
const itemStackSize = 10

export default {
    afkMessages,
    attributes,
    biomes,
    classes,
    gearSlots,
    itemBuyPriceMult,
    itemQualities,
    itemStackSize,
    mobs,
    races
}
