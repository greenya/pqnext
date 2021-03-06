var ItemQuality;
(function(ItemQuality1) {
    ItemQuality1["Poor"] = 'poor';
    ItemQuality1["Common"] = 'common';
    ItemQuality1["Uncommon"] = 'uncommon';
    ItemQuality1["Rare"] = 'rare';
    ItemQuality1["Epic"] = 'epic';
})(ItemQuality || (ItemQuality = {
}));
var GearSlot;
(function(GearSlot1) {
    GearSlot1["MainHand"] = 'mainhand';
    GearSlot1["OffHand"] = 'offhand';
    GearSlot1["Head"] = 'head';
    GearSlot1["Shoulders"] = 'shoulders';
    GearSlot1["Chest"] = 'chest';
    GearSlot1["Back"] = 'back';
    GearSlot1["Wrist"] = 'wrist';
    GearSlot1["Hands"] = 'hands';
    GearSlot1["Waist"] = 'waist';
    GearSlot1["Legs"] = 'legs';
    GearSlot1["Feet"] = 'feet';
    GearSlot1["Neck"] = 'neck';
    GearSlot1["Finger"] = 'finger';
    GearSlot1["Trinket"] = 'trinket';
})(GearSlot || (GearSlot = {
}));
var GearSource;
(function(GearSource1) {
    GearSource1["Drop"] = 'drop';
    GearSource1["Vendor"] = 'vendor';
    GearSource1["Quest"] = 'quest';
})(GearSource || (GearSource = {
}));
var ZoneType;
(function(ZoneType1) {
    ZoneType1["Town"] = 'town';
    ZoneType1["Wilderness"] = 'wilderness';
    ZoneType1["Traveling"] = 'traveling';
})(ZoneType || (ZoneType = {
}));
const ZoneType1 = ZoneType;
var MobMight;
(function(MobMight1) {
    MobMight1["Normal"] = 'normal';
    MobMight1["Reinforced"] = 'reinforced';
})(MobMight || (MobMight = {
}));
var Trait;
(function(Trait1) {
    Trait1[Trait1["None"] = 0] = "None";
    Trait1[Trait1["Human"] = 1] = "Human";
    Trait1[Trait1["Beast"] = 2] = "Beast";
    Trait1[Trait1["Magic"] = 4] = "Magic";
    Trait1[Trait1["Flesh"] = 1024] = "Flesh";
    Trait1[Trait1["Insect"] = 2048] = "Insect";
    Trait1[Trait1["Bone"] = 4096] = "Bone";
    Trait1[Trait1["Mech"] = 8192] = "Mech";
    Trait1[Trait1["Fire"] = 16384] = "Fire";
    Trait1[Trait1["Ice"] = 32768] = "Ice";
    Trait1[Trait1["Air"] = 65536] = "Air";
    Trait1[Trait1["Forest"] = 1048576] = "Forest";
    Trait1[Trait1["Desert"] = 2097152] = "Desert";
    Trait1[Trait1["Tundra"] = 4194304] = "Tundra";
    Trait1[Trait1["Swamp"] = 8388608] = "Swamp";
    Trait1[Trait1["Water"] = 16777216] = "Water";
})(Trait || (Trait = {
}));
const Trait1 = Trait;
function number(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function duration(seconds) {
    if (seconds < 60) {
        const v = seconds;
        return Number(v).toFixed(0) + ' s';
    } else if (seconds < 60 * 60) {
        const v = seconds / 60;
        return Number(v).toFixed(0) + ' m';
    } else if (seconds < 60 * 60 * 24) {
        const v = seconds / 60 / 60;
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' h';
    } else if (seconds < 60 * 60 * 24 * 30) {
        const v = seconds / 60 / 60 / 24;
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' d';
    } else if (seconds < 60 * 60 * 24 * 365.25) {
        const v = seconds / 60 / 60 / 24 / 30;
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' M';
    } else {
        const v = seconds / 60 / 60 / 24 / 365.25;
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' Y';
    }
}
function gold(value) {
    const c = value % 100;
    value -= c;
    value /= 100;
    const s = value % 100;
    value -= s;
    value /= 100;
    const g = value;
    const p = [];
    if (g > 0) {
        p.push(number(g) + 'g');
    }
    if (s > 0) {
        p.push(s + 's');
    }
    if (c > 0) {
        p.push(c + 'c');
    }
    return p.length > 0 ? p.join(' ') : '0c';
}
function progress(value, fractionDigits = 0) {
    return Number(value.cur * 100 / value.max).toFixed(fractionDigits) + '%';
}
const __default = {
    duration,
    gold,
    number,
    progress
};
const meta = {
    name: 'en',
    title: 'English',
    icon: 'https://www.countryflags.io/gb/shiny/32.png'
};
const dict = {
    'attr-str-title': 'Strength',
    'attr-str-desc': 'Increases bag capacity',
    'attr-str-format': '+{value} Strength',
    'attr-dex-title': 'Dexterity',
    'attr-dex-desc': 'Descreases chance to lose in combat',
    'attr-dex-format': '+{value} Dexterity',
    'attr-int-title': 'Intellect',
    'attr-int-desc': 'Increases maximum mana',
    'attr-int-format': '+{value} Intellect',
    'attr-sta-title': 'Stamina',
    'attr-sta-desc': 'Increases maximum health',
    'attr-sta-format': '+{value} Stamina',
    'attr-curHp-title': 'Health',
    'attr-curHp-desc': 'The higher the better',
    'attr-maxHp-title': 'Maximum Health',
    'attr-maxHp-desc': 'Increases with level and _stamina_',
    'attr-curMp-title': 'Mana',
    'attr-curMp-desc': 'Consumed in combat',
    'attr-maxMp-title': 'Maximum Mana',
    'attr-maxMp-desc': 'Increases with level and _intellect_',
    'attr-bagCap-title': 'Bag Capacity',
    'attr-bagCap-desc': 'Increases with _strength_',
    'race-human-title': 'Human',
    'race-human-desc': 'Humans can perform any role, able to get used to any conditions. They keep balance, as they never behind in any descipline, but also never truly excel at anything.\n\n[i] Attribute priority is balanced',
    'race-dwarf-title': 'Dwarf',
    'race-dwarf-desc': 'The native lands of dwarves are hard and demanding. Natural selection determined the direction of their body development.\n\n[i] _Strength_ and _stamina_ are prioritized',
    'race-elf-title': 'Elf',
    'race-elf-desc': 'Elves prefer to develop body and mind.\n\n[i] _Intellect_ and _dexterity_ are prioritized',
    'class-warrior-title': 'Warrior',
    'class-warrior-desc': '"Strength is the only power!", a warrior yelled and hit his head with a rusty stick. They always knew how to intimidate their foes.\n\n[i] _Strength_ is prioritized',
    'class-rogue-title': 'Rogue',
    'class-rogue-desc': 'The life of foes of a rogue is quite bright and fleeting. Often they notice him when it\'s way too late.\n\n[i] _Dexterity_ is prioritized',
    'class-mage-title': 'Mage',
    'class-mage-desc': 'In-depth study of everything a magic wand reaches. Foes are defeated with powerful spells.\n\n[i] _Intellect_ is prioritized',
    'gear-slot-mainhand-title': 'Main Hand',
    'gear-slot-offhand-title': 'Off Hand',
    'gear-slot-head-title': 'Head',
    'gear-slot-shoulders-title': 'Shoulders',
    'gear-slot-chest-title': 'Chest',
    'gear-slot-back-title': 'Back',
    'gear-slot-wrist-title': 'Wrist',
    'gear-slot-hands-title': 'Hands',
    'gear-slot-waist-title': 'Waist',
    'gear-slot-legs-title': 'Legs',
    'gear-slot-feet-title': 'Feet',
    'gear-slot-neck-title': 'Neck',
    'gear-slot-finger-title': 'Finger',
    'gear-slot-trinket-title': 'Trinket',
    'hero-action-intro': 'Watching intro cinematic...',
    'hero-action-accept-quest': 'Obtaining a new quest...',
    'hero-action-pass-quest': 'Completing the quest...',
    'hero-action-move-to-wilderness': 'Heading to the killing fields...',
    'hero-action-combat': 'Executing {target}...',
    'hero-action-rest': 'Restoring mana...',
    'hero-action-move-to-town': 'Heading to the closest town...',
    'hero-action-sell-junk': 'Selling junk...',
    'hero-action-buy-gear': 'Negotiating purchase of better equipment...',
    'ui-game-subtitle': 'Original idea from <a href="http://progressquest.com/" target="_blank">Progress Quest</a>',
    'ui-game-desc': 'Create a hero and spectate his adventures in the crazy world of never ending progress bars, dangerous enemies and rare loot.',
    'ui-language-note': 'Note: created character can only be played in the language it was created.',
    'ui-new-hero': 'New Hero',
    'ui-continue': 'Continue',
    'ui-hero-summary': '{name}, Level {level} {class}',
    'ui-losing-prev-hero-warn': 'Previous hero, <b>{hero}</b>, will be lost in case you create new one.',
    'ui-nickname': 'Nickname',
    'ui-nickname-hint': 'Type or generate...',
    'ui-attributes': 'Attributes',
    'ui-race': 'Race',
    'ui-class': 'Class',
    'ui-create': 'Create',
    'ui-cancel': 'Cancel',
    'ui-level': 'Level',
    'ui-bag': 'Bag',
    'ui-item-count': '{count} pcs',
    'ui-item-level': 'Level {level}',
    'ui-item-source-quest': 'Quest reward'
};
function rollCharName(_) {
    return '[char name]';
}
function rollMobTitle(hero, mob, might) {
    return `[${might} ${mob.name}]`;
}
function rollMobJunkItemTitle(hero, mob) {
    return `[junk item from ${mob.name}]`;
}
function rollMobPreciousItemTitle(hero, mob) {
    return `[precious item from ${mob.name}]`;
}
function rollGearItemTitle(hero, slot, quality) {
    return `[${quality} ${slot}]`;
}
function rollQuestTitle(hero) {
    return `[quest]`;
}
const lingo = {
    meta,
    dict,
    rollCharName,
    rollMobTitle,
    rollMobJunkItemTitle,
    rollMobPreciousItemTitle,
    rollGearItemTitle,
    rollQuestTitle
};
const attributes = [
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
];
const races = [
    {
        name: 'human',
        title: 'race-human-title',
        desc: 'race-human-desc',
        attrPrio: {
            str: 4,
            dex: 4,
            int: 4,
            sta: 6
        }
    },
    {
        name: 'dwarf',
        title: 'race-dwarf-title',
        desc: 'race-dwarf-desc',
        attrPrio: {
            str: 5,
            dex: 3,
            int: 3,
            sta: 7
        }
    },
    {
        name: 'elf',
        title: 'race-elf-title',
        desc: 'race-elf-desc',
        attrPrio: {
            str: 3,
            dex: 5,
            int: 5,
            sta: 5
        }
    }
];
const classes = [
    {
        name: 'warrior',
        title: 'class-warrior-title',
        desc: 'class-warrior-desc',
        attrPrio: {
            str: 3,
            dex: 1
        }
    },
    {
        name: 'rogue',
        title: 'class-rogue-title',
        desc: 'class-rogue-desc',
        attrPrio: {
            str: 1,
            dex: 3
        }
    },
    {
        name: 'mage',
        title: 'class-mage-title',
        desc: 'class-mage-desc',
        attrPrio: {
            dex: 1,
            int: 3
        }
    }
];
const biomes = [
    {
        biome: Trait.Forest,
        level: 1
    },
    {
        biome: Trait.Desert,
        level: 10
    },
    {
        biome: Trait.Tundra,
        level: 20
    },
    {
        biome: Trait.Swamp,
        level: 30
    },
    {
        biome: Trait.Water,
        level: 40
    }
];
const mobs = [
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
];
const itemQualities = [
    {
        name: ItemQuality.Poor,
        level: 1,
        chance: -1,
        priceMult: 1
    },
    {
        name: ItemQuality.Common,
        level: 1,
        chance: -1,
        priceMult: 5
    },
    {
        name: ItemQuality.Uncommon,
        level: 7,
        chance: 121,
        priceMult: 20,
        attrCount: 1
    },
    {
        name: ItemQuality.Rare,
        level: 18,
        chance: 21,
        priceMult: 150,
        attrCount: 2
    },
    {
        name: ItemQuality.Epic,
        level: 39,
        chance: 1,
        priceMult: 1800,
        attrCount: 3
    }
];
const gearSlots = [
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
        priceMult: 2
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
];
const __default1 = {
    attributes,
    biomes,
    classes,
    gearSlots,
    itemBuyPriceMult: 10,
    itemQualities,
    itemStackSize: 10,
    mobs,
    races
};
const data = __default1;
function __int(state, max) {
    const x = Math.sin(state.seed++) * 1000000;
    return Math.floor((x - Math.floor(x)) * max);
}
function dice(state, faceCount, targetCap = 1) {
    const i = __int(state, faceCount) + 1;
    return targetCap >= i;
}
function item(state, arr) {
    const i = __int(state, arr.length);
    return arr[i];
}
function shuffle(state, arr) {
    for(let i = arr.length - 1; i > 0; i--){
        const j = __int(state, arr.length);
        if (i != j) {
            const t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    return arr;
}
function text(state, template) {
    return template.split('_').map((s)=>s.includes('/') ? item(state, s.split('/')) : s
    ).join(' ');
}
const __default2 = {
    int: __int,
    dice,
    item,
    shuffle,
    text
};
const rand = __default2;
const rand1 = __default2;
const meta1 = {
    name: 'ua',
    title: 'Українська',
    icon: 'https://www.countryflags.io/ua/shiny/32.png'
};
const dict1 = {
    'attr-str-title': 'Сила',
    'attr-str-desc': 'Збільшує ємність сумки',
    'attr-str-format': '+{value} до сили',
    'attr-dex-title': 'Спритність',
    'attr-dex-desc': 'Зменьшує шанс програти бій',
    'attr-dex-format': '+{value} до спритності',
    'attr-int-title': 'Інтелект',
    'attr-int-desc': 'Збільшує максимум мани',
    'attr-int-format': '+{value} до інтелекту',
    'attr-sta-title': 'Витривалість',
    'attr-sta-desc': 'Збільшує максимум здоров\'я',
    'attr-sta-format': '+{value} до витривалості',
    'attr-curHp-title': 'Здоров\'я',
    'attr-curHp-desc': 'Краще коли його більше',
    'attr-maxHp-title': 'Максимум здоров\'я',
    'attr-maxHp-desc': 'Зростає з рівнем та _витривалістю_',
    'attr-curMp-title': 'Мана',
    'attr-curMp-desc': 'Витрачається в бою',
    'attr-maxMp-title': 'Максимум мани',
    'attr-maxMp-desc': 'Зростає з рівнем та _інтелектом_',
    'attr-bagCap-title': 'Ємність сумки',
    'attr-bagCap-desc': 'Зростає з _силою_',
    'race-human-title': 'Людина',
    'race-human-desc': 'Люди добре почуваються у будь-якій ролі, приживаються до будь-яких умов. Утримують баланс, не відстають в жодній дисципліні, але й не хватають зірок.\n\n[i] Пріорітет атрибутів збалансований',
    'race-dwarf-title': 'Дворф',
    'race-dwarf-desc': 'Рідні краї дворфів жорсткі та вимогливі. Природний добір визначив напрямок розвитку їхнього тіла.\n\n[i] _Сила_ та _витривалість_ в пріорітеті',
    'race-elf-title': 'Ельф',
    'race-elf-desc': 'Ельфи одночасно розвивають тіло та розум.\n\n[i] _Інтелект_ і _спритність_ в пріорітеті',
    'class-warrior-title': 'Воїн',
    'class-warrior-desc': '"Сила наше всьо!", скаже воїн і вдарить іржавим дрином себе по голові. Він завжди вмів залякувати своїх ворогів.\n\n[i] _Сила_ в пріорітеті',
    'class-rogue-title': 'Пройдисвіт',
    'class-rogue-desc': 'Життя ворогів пройдисвіта яскраве й швидкоплинне. Вони часто помічають його тоді коли вже запізно.\n\n[i] _Спритність_ в пріорітеті',
    'class-mage-title': 'Маг',
    'class-mage-desc': 'Поглибленне вивчення всього до чого дістає магічна паличка. Ворогів перемагають словом і ділом одночасно.\n\n[i] _Інтелект_ в пріорітеті',
    'gear-slot-mainhand-title': 'Права рука',
    'gear-slot-offhand-title': 'Ліва рука',
    'gear-slot-head-title': 'Голова',
    'gear-slot-shoulders-title': 'Плечі',
    'gear-slot-chest-title': 'Груди',
    'gear-slot-back-title': 'Спина',
    'gear-slot-wrist-title': 'Зап\'ястя',
    'gear-slot-hands-title': 'Руки',
    'gear-slot-waist-title': 'Пояс',
    'gear-slot-legs-title': 'Ноги',
    'gear-slot-feet-title': 'Ступні',
    'gear-slot-neck-title': 'Шия',
    'gear-slot-finger-title': 'Палець',
    'gear-slot-trinket-title': 'Дрібничка',
    'hero-action-intro': 'Дивиться вступний сінематик...',
    'hero-action-accept-quest': 'Ознайомлюється з новим завданням...',
    'hero-action-pass-quest': 'Завершує завдання...',
    'hero-action-move-to-wilderness': 'Прямує до дикої місцевості...',
    'hero-action-combat': 'В бою, ціль: {target}...',
    'hero-action-rest': 'Відновлює сили...',
    'hero-action-move-to-town': 'Прямує до найближчого поселення...',
    'hero-action-sell-junk': 'Продає мотлох...',
    'hero-action-buy-gear': 'Перевіряє асортимент місцевих крамниць...',
    'ui-game-subtitle': 'Оригінальна ідея від <a href="http://progressquest.com/" target="_blank">Progress Quest</a>',
    'ui-game-desc': 'Створіть героя та спостерігайте за його пригодами у шаленомі світі нескінчених смуг прогресу, небезпечних ворогів та рідкісних предметів.',
    'ui-language-note': 'Примітка: гра за створеного героя можлива буде лише на мові в якій він був створений.',
    'ui-new-hero': 'Новий герой',
    'ui-continue': 'Продовжити',
    'ui-hero-summary': '{name}, {class} {level}-го рівня',
    'ui-losing-prev-hero-warn': 'Попередній герой, <b>{hero}</b>, буде втрачений при створенні нового.',
    'ui-nickname': 'Прізвисько',
    'ui-nickname-hint': 'Введіть або згенеруйте...',
    'ui-attributes': 'Атрибути',
    'ui-race': 'Раса',
    'ui-class': 'Клас',
    'ui-create': 'Створити',
    'ui-cancel': 'Відміна',
    'ui-level': 'Рівень',
    'ui-bag': 'Сумка',
    'ui-item-count': '{count} шт',
    'ui-item-level': '{level}-го рівня',
    'ui-item-source-quest': 'Винагорода за завдання'
};
const mobMeta = [
    {
        name: 'ambusher',
        masculine: 'підступний/нічний/кригоокий/темноволосий_душитель',
        feminine: 'підступна/нічна/кригоока/темноволоса_душителька',
        junk: 'пов\'язка на око/розірваний чобіт/тупий ніж/запальничка_душителя',
        gcm: {
            n: 'душителі',
            r: 'душителів'
        }
    },
    {
        name: 'ape',
        feminine: 'скажена/криклива/червономорда/довгоп\'ята/мокроноса_мавпа',
        junk: 'облізле вухо/великий палець/зуб мудрості/слина_мавпи',
        gcm: {
            n: 'мавпи',
            r: 'мавп'
        }
    },
    {
        name: 'assassin',
        masculine: 'хитрий/непомітний/бородатий/зухвалий_душогуб',
        feminine: 'хитра/непомітна/зеленоока/зухвала_душогубка',
        junk: 'відрізане вухо/потертий пасок/вставне око_душогуба',
        gcm: {
            n: 'душогуби',
            r: 'душогубів'
        }
    },
    {
        name: 'bandit',
        masculine: 'безстрашний/сірозубий/однорукий/рудоволосий_бандит',
        feminine: 'безстрашна/сірозуба/однорука/рудоволоса_бандитка',
        junk: 'вицвілий гаманець/відсічений палець/вибита щелепа_бандита',
        gcm: {
            n: 'бандити',
            r: 'бандитів'
        }
    },
    {
        name: 'bat',
        masculine: 'бридкий/чорний/нічний/чорнокрилий/сіроокий_кажан',
        junk: 'крило/голова/надщерблений зуб_кажана',
        gcm: {
            n: 'кажани',
            r: 'кажанів'
        }
    },
    {
        name: 'bear',
        masculine: 'розлючений/лісовий/чорний/тундровий/білий_ведмідь',
        feminine: 'розлючена/лісова/чорна/тундрова/біла_ведмедиця',
        junk: 'обдерте вухо/серце/товсте хутро/вищерблене ікло_ведмедя',
        gcm: {
            n: 'ведмеді',
            r: 'ведмедів'
        }
    },
    {
        name: 'bee',
        feminine: 'яра/смугаста/лісова/польова/болотна_бджола',
        junk: 'вусик/жало/око/райдужне крило_бджоли',
        gcm: {
            n: 'бджоли',
            r: 'бджіл'
        }
    },
    {
        name: 'boar',
        masculine: 'роздратований/твердорилий/сірокопитий/дрючкохвостий_кнур',
        feminine: 'роздратована/твердорила/сірокопита/дрючкохвоста_свиня',
        junk: 'вухо/шлунок/печінка/щерблене копито/сірий бивень_кнура',
        gcm: {
            n: 'кнури',
            r: 'кнурів'
        }
    },
    {
        name: 'cannibal',
        masculine: 'білозубий/оскаженілий/широкощелепий/бруднопикий_людожер',
        feminine: 'білозуба/оскаженіла/широкощелепа/бруднопика_людожерка',
        junk: 'брудний ніготь/зрізаний скальп/кремезна дубина_людожера',
        gcm: {
            n: 'людожери',
            r: 'людожерів'
        }
    },
    {
        name: 'crab',
        masculine: 'розлючений/береговий/червоновусий/білопанцирний/клацаючий клешнями_краб',
        junk: 'біле м\'ясо/око/потрісканий панцир/відірвана клешня_краба',
        gcm: {
            n: 'краби',
            r: 'крабів'
        }
    },
    {
        name: 'crayfish',
        masculine: 'зловіщий/іловий/плоскохвостий/цокаючий_рак',
        junk: 'міцний вус/зелена луска/пробитий панцир/понівечена клешня_рака',
        gcm: {
            n: 'раки',
            r: 'раків'
        }
    },
    {
        name: 'crocodile',
        masculine: 'лихий/ненажерливий/широкощелепий/шипований_крокодил',
        junk: 'темна луска/чиста сльоза/пошкоджена лапа/щільний шлунок_крокодила',
        gcm: {
            n: 'крокодили',
            r: 'крокодилів'
        }
    },
    {
        name: 'cultist',
        masculine: 'очманілий/відданий/печерний/довгорясий_культист',
        feminine: 'очманіла/віддана/печерна/довгоряса_культистка',
        junk: 'шматок мантії/сторінка книги/тріснувший посох_культиста',
        gcm: {
            n: 'культисти',
            r: 'культистів'
        }
    },
    {
        name: 'deer',
        masculine: 'навіжений/лісовий/подертий/довгорогий/сірочеревий_олень',
        feminine: 'навіжена/лісова/подерта/довгорога/сірочерева_олениця',
        junk: 'товсте ребро/нирка/стерте копито/роги_оленя',
        gcm: {
            n: 'олені',
            r: 'оленів'
        }
    },
    {
        name: 'desert-turtle',
        feminine: 'ошаленіла/плямиста/твердопанцирна/пудова_пустельна черепаха',
        junk: 'яйце/слиз/твердий панцир_черепахи',
        gcm: {
            n: 'пустельні черепахи',
            r: 'пустельних черепах'
        }
    },
    {
        name: 'hawk',
        masculine: 'роз\'ярілий/темнокрилий/срібногрудий/клинодзьобий_яструб',
        junk: 'яйце/довге перо/мутне око/уламки дзьоба_яструба',
        gcm: {
            n: 'яструби',
            r: 'яструбів'
        }
    },
    {
        name: 'hyena',
        feminine: 'розлютована/голодна/плямиста/оазисна/кочова_гієна',
        junk: 'окривавлена лапа/облізла шкура/брудний хвіст_гієни',
        gcm: {
            n: 'гієни',
            r: 'гієн'
        }
    },
    {
        name: 'jellyfish',
        feminine: 'люта/велика жовта/прозоро-плямиста/фіолетово-смугаста/мутнотіла/місячна_медуза',
        junk: 'водянисте щупальце/мезоглея_медузи',
        gcm: {
            n: 'медузи',
            r: 'медуз'
        }
    },
    {
        name: 'koyote',
        masculine: 'затятий/спритний/пустельний/смугастий/темнолапий_койот',
        junk: 'видертий кіготь/шлунок/язик_койота',
        gcm: {
            n: 'койоти',
            r: 'койотів'
        }
    },
    {
        name: 'lama',
        feminine: 'біснувата/польова/світловуха/довгошия/кучерява_лама',
        junk: 'сухий язик/вухо/розбите копито_лами',
        gcm: {
            n: 'лами',
            r: 'лам'
        }
    },
    {
        name: 'lizard',
        feminine: 'пустельна/довгоязика/темносмугаста/леопардова/драконова_ящірка',
        junk: 'яйце/довгий язик/тонка шкіра/хвіст_ящірки',
        gcm: {
            n: 'ящірки',
            r: 'ящірок'
        }
    },
    {
        name: 'lynx',
        feminine: 'пекельна/бродяжна/плямиста/гостровуха/гнилошкура_рись',
        junk: 'плямиста шкура/довгі вуса/зламаний кіготь/лапа_рисі',
        gcm: {
            n: 'рисі',
            r: 'рисей'
        }
    },
    {
        name: 'mountain-lion',
        masculine: 'розлючений/обережний/блукаючий/вогнегривий/морозогривий_гірський лев',
        feminine: 'розлючена/обережна/блукаюча/вогнегрива/морозогрива_гірська левиця',
        junk: 'тяжка лапа/міцна шкура/гостре ікло_льва',
        gcm: {
            n: 'гірські леви',
            r: 'гірських левів'
        }
    },
    {
        name: 'mountain-ram',
        masculine: 'злий/шорсткоязикий/круторогий/вузькомордий_гірський баран',
        feminine: 'зла/шорсткоязика/круторога/вузькоморда_гірська вівця',
        junk: 'печінка/хутро/копито_гірського барана',
        gcm: {
            n: 'гірські барани',
            r: 'гірських баранів'
        }
    },
    {
        name: 'octopus',
        masculine: 'глибоководний/чорний древній/іржавоплямистий/дев\'ятиногий_восьминіг',
        junk: 'густий слиз/присоска/рвані зябра/кручене щупальце/отрута_восьминога',
        gcm: {
            n: 'восьминоги',
            r: 'восьминогів'
        }
    },
    {
        name: 'owl',
        feminine: 'лісова/нічна/смугаста/довгопера/ширококрила_сова',
        junk: 'пазуриста лапа/довге пір\'я/чорний дзьоб_сови',
        gcm: {
            n: 'сови',
            r: 'сов'
        }
    },
    {
        name: 'pirate',
        masculine: 'маячний/одноокий/одноногий/золотозубий/мулобородий_пірат',
        junk: 'іржавий крюк/карта скарбів/пов\'язка на око/зламана рапіра_пірата',
        gcm: {
            n: 'пірати',
            r: 'піратів'
        }
    },
    {
        name: 'raptor',
        masculine: 'степовий/ненажерливий/червоноокий/короткохвостий/хлястохвостий_раптор',
        junk: 'ціле яйце/шорохувата шкіра/серце/потуплений кіготь/сутужний хвіст_раптора',
        gcm: {
            n: 'раптори',
            r: 'рапторів'
        }
    },
    {
        name: 'raven',
        masculine: 'степовий/чорний/сірий/темночеревий/гостродзьобий_крук',
        junk: 'тріснувше яйце/чорне перо/око/міцний пазур_крука',
        gcm: {
            n: 'круки',
            r: 'круків'
        }
    },
    {
        name: 'renegade',
        masculine: 'зловісний/безжалісний/криваворукий/мовчазний_відступник',
        feminine: 'зловісна/безжалісна/криваворука/мовчазна_відступниця',
        junk: 'зірваний кулон/пробитий шолом/гральна карта/сторінка контракту_відступника',
        gcm: {
            n: 'відступники',
            r: 'відступників'
        }
    },
    {
        name: 'robber',
        masculine: 'гнівний/окривавлений/бритоголовий/косоокий_грабіжник',
        feminine: 'гнівна/окривавлена/бритоголова/косоока_грабіжниця',
        junk: 'затуплена сокира/жувальний табак/смердючий жупан/балаклава_грабіжника',
        gcm: {
            n: 'грабіжники',
            r: 'грабіжників'
        }
    },
    {
        name: 'sand-vortex',
        masculine: 'шалений/відлюдний/вітровитий/пекучий_пісчаний вихор',
        junk: 'есенція/камінь/пил_пісчаного вихору',
        gcm: {
            n: 'пісчані вихори',
            r: 'пісчаних вихорів'
        }
    },
    {
        name: 'sand-snake',
        masculine: 'прудкий/крапчатий/довжелезний/пилоплямистий/жовтосмугастий_пісчаний змій',
        feminine: 'прудка/крапчата/довжелезна/пилоплямиста/жовтосмугаста_пісчана змія',
        junk: 'видерте ікло/шкіра/хвіст/отрута_змії',
        gcm: {
            n: 'пісчані змії',
            r: 'пісчаних змій'
        }
    },
    {
        name: 'scavenger',
        masculine: 'пустельний/крикливий/приоазисний/довгодзьобий_падальник',
        junk: 'серце/шлунок/чорне перо/тріснувший дзьоб_падальника',
        gcm: {
            n: 'падальники',
            r: 'падальників'
        }
    },
    {
        name: 'scorpion',
        masculine: 'пустельний/в\'язкочорний/королівський/клацаючий клешнями_скорпіон',
        junk: 'відірвана лапа/гострокінечний хвіст/понівечена клешня/отруйна залоза_скорпіона',
        gcm: {
            n: 'скорпіони',
            r: 'скорпіонів'
        }
    },
    {
        name: 'sea-giant',
        masculine: 'ярий/мандруючий/голодний/донний/глибоководний_морський велетень',
        junk: 'есенція/щільна луска/слина_морського велетня',
        gcm: {
            n: 'морські велетні',
            r: 'морських велетнів'
        }
    },
    {
        name: 'sea-snake',
        masculine: 'розшалілий/кручений/напівсмугастий/товстошкірий/глибинний_морський змій',
        feminine: 'розшаліла/кручена/напівсмугаста/товстошкіра/глибинна_морська змія',
        junk: 'видертий зуб/шкіра/хвіст/отрута_змії',
        gcm: {
            n: 'морські змії',
            r: 'морських змій'
        }
    },
    {
        name: 'sea-turtle',
        feminine: 'ошаленіла/зеленоплямиста/твердопанцирна/двоголова_морська черепаха',
        junk: 'яйце/легені/твердий панцир_черепахи',
        gcm: {
            n: 'морські черепахи',
            r: 'морських черепах'
        }
    },
    {
        name: 'shark',
        feminine: 'заклята/страшна/глибоководна/гострозуба_акула',
        junk: 'велике ікло/зябра/плавник/пожухлий хвіст_акули',
        gcm: {
            n: 'акули',
            r: 'акул'
        }
    },
    {
        name: 'spider',
        masculine: 'біснуватий/лісовий/чорний/маскований/велетенський/отруйний_павук',
        feminine: 'біснувата/лісова/чорна/маскована/велетенська/отруйна_павучиха',
        junk: 'зламана лапка/довгий вусик/отруйна залоза_павука',
        gcm: {
            n: 'павуки',
            r: 'павуків'
        }
    },
    {
        name: 'steppe-lion',
        masculine: 'озвірілий/голодний/полюючий/хижоокий_степний лев',
        feminine: 'озвіріла/голодна/полююча/хижоока_степна левиця',
        junk: 'серце/дебела лапа/міцна шкура/гостре ікло_льва',
        gcm: {
            n: 'степні леви',
            r: 'степних левів'
        }
    },
    {
        name: 'stone-giant',
        masculine: 'несамовитий/жорстокий/порослий травою/потрісканий_кам\'яний велетень',
        junk: 'есенція/уламки/пил_кам\'яного велетня',
        gcm: {
            n: 'кам\'яні велетні',
            r: 'кам\'яних велетнів'
        }
    },
    {
        name: 'thief',
        masculine: 'підлий/довговусий/чорноокий/блискозубий_злодій',
        feminine: 'підла/хмуроброва/чорноока/блискозуба_злодійка',
        junk: 'іржавий палаш/погнуте кулко/розірвана пальчатка/пошматовані замітки_злодія',
        gcm: {
            n: 'злодії',
            r: 'злодіїв'
        }
    },
    {
        name: 'thug',
        masculine: 'незграбний/густобородий/грубопикий/темнобровий/товстопузий_головоріз',
        junk: 'сталевий різак/заплічний мішок/тріснувша попільничка/намисто з зубів жертв_головоріза',
        gcm: {
            n: 'головорізи',
            r: 'головорізів'
        }
    },
    {
        name: 'tiger',
        masculine: 'розгніваний/укритий/яскраво-смугастий/сталевошкурий_тигр',
        feminine: 'розгнівана/укрита/яскраво-смугаста/сталевошкура_тигриця',
        junk: 'хвіст/цупка шкура/рапате вухо/гострий кіготь/легені_тигра',
        gcm: {
            n: 'тигри',
            r: 'тигрів'
        }
    },
    {
        name: 'walking-tree',
        neuter: 'несамовите/пробуджене/порубане/випалене/тріскуче_блукаюче дерево',
        junk: 'есенція/кора/гілля/листя_блукаючого дерева',
        gcm: {
            n: 'блукаючі дерева',
            r: 'блукаючих дерев'
        }
    },
    {
        name: 'warlock',
        masculine: 'темноклятий/шепочучий/кривоносий/шкутильгаючий_чорнокнижник',
        feminine: 'темноклята/шепочуча/кривоноса/шкутильгаюча_чорнокнижниця',
        junk: 'пустий флакон мани/дирява накидка/згаслий кристал_чорнокнижника',
        gcm: {
            n: 'чорнокнижники',
            r: 'чорнокнижників'
        }
    },
    {
        name: 'wizard',
        masculine: 'сліпий/завиваючий/таврований/палаючоокий_чародій',
        feminine: 'сліпа/завиваюча/таврована/палаючоока_чародійка',
        junk: 'обгорілий свиток/фіолетовий каптур/руна знань_чародія',
        gcm: {
            n: 'чародії',
            r: 'чародіїв'
        }
    },
    {
        name: 'wolf',
        masculine: 'здичавілий/ненаситний/голодний/лісовий/сірий_вовк',
        feminine: 'здичавіла/ненаситна/голодна/лісова/сіра_вовчиця',
        junk: 'понівечена лапа/обдерте хутро/ікло_вовка',
        gcm: {
            n: 'вовки',
            r: 'вовків'
        }
    },
    {
        name: 'wood-lurker',
        masculine: 'розлючений/темнолапий/приозерний/прихований_лісовий скрадач',
        junk: 'павутина/око/сукровиця_лісового скрадача',
        gcm: {
            n: 'лісові скрадачі',
            r: 'лісових скрадачів'
        }
    }, 
];
const mobReinforcedPrefixes = [
    {
        gen: 'понюхавший пороху/понюхавша пороху/понюхавше пороху',
        trait: Trait.Human
    },
    {
        gen: 'досвідчений/досвідчена/досвідчене',
        trait: Trait.Human
    },
    {
        gen: 'навчений/навчена/навчене',
        trait: Trait.Human
    },
    {
        gen: 'бувалий/бувала/бувале',
        trait: Trait.Human
    },
    {
        gen: 'знаючий/знаюча/знаюче',
        trait: Trait.Human
    },
    {
        gen: 'зрілий/зріла/зріле',
        trait: Trait.Beast
    },
    {
        gen: 'дорослий/доросла/доросле',
        trait: Trait.Beast | Trait.Water
    },
    {
        gen: 'посивілий/посивіла/посивіле',
        trait: Trait.Beast
    },
    {
        gen: 'старий/стара/старе',
        trait: Trait.Beast | Trait.Magic
    },
    {
        gen: 'старезний/старезна/старезне',
        trait: Trait.Beast | Trait.Water
    },
    {
        gen: 'прадавній/прадавня/прадавнє',
        trait: Trait.Magic
    },
    {
        gen: 'дряхлий/дряхла/дряхле',
        trait: Trait.Beast | Trait.Water
    },
    {
        gen: 'давній/давня/давнє',
        trait: Trait.Magic
    },
    {
        gen: 'древній/древня/древне',
        trait: Trait.Magic | Trait.Water
    },
    {
        gen: 'доісторичний/доісторична/доісторичне',
        trait: Trait.Magic | Trait.Water
    },
    {
        gen: 'чумний/чумна/чумне',
        trait: Trait.Human | Trait.Beast
    },
    {
        gen: 'проклятий/проклята/прокляте',
        trait: Trait.Human | Trait.Beast
    },
    {
        gen: 'покалічений/покалічена/покалічене',
        trait: Trait.Human | Trait.Beast
    },
    {
        gen: 'мутований/мутована/мутоване',
        trait: Trait.Beast
    },
    {
        gen: 'хворий/хвора/хворе',
        trait: Trait.Beast
    },
    {
        gen: 'хворобливий/хвороблива/хворобливе',
        trait: Trait.Beast
    },
    {
        gen: 'страждаючий/страждаюча/страждаюче',
        trait: Trait.Beast
    },
    {
        gen: 'видозмінений/видозмінена/видозмінене',
        trait: Trait.Beast | Trait.Magic
    },
    {
        gen: 'коматозний/коматозна/коматозне',
        trait: Trait.Beast
    },
    {
        gen: 'згасаючий/згасаюча/згасаюче',
        trait: Trait.Magic
    },
    {
        gen: 'кремезний/кремезна/кремезне',
        trait: Trait.Human | Trait.Beast | Trait.Magic
    },
    {
        gen: 'збільшений/збільшена/збільшене',
        trait: Trait.Magic
    },
    {
        gen: 'крупний/крупна/крупне',
        trait: Trait.Beast
    },
    {
        gen: 'великий/велика/велике',
        trait: Trait.Beast | Trait.Magic
    },
    {
        gen: 'масивний/масивна/масивне',
        trait: Trait.Magic
    },
    {
        gen: 'велетенський/велетенська/велетенське',
        trait: Trait.Beast | Trait.Magic
    },
    {
        gen: 'титанічний/титанічна/титанічне',
        trait: Trait.Magic
    }
];
const preciousItems = [
    {
        gen: 'лівий/правий_чобіт_42-го/44-го/46-го/48-го_розміру',
        trait: Trait.Human,
        ggm: true
    },
    {
        gen: 'випрана_біла/синя/зелена/червона/чорна/смугаста_шкарпетка',
        trait: Trait.Human,
        ggf: true
    },
    {
        gen: 'шматок/комір/рукав_брудної/чистої/заляпаної кров\'ю_сорочки',
        trait: Trait.Human,
        ggm: true
    },
    {
        gen: 'міцна_червона/зелена/блакитна_мотузка',
        trait: Trait.Human,
        ggf: true
    },
    {
        gen: 'рулон_щільної/тонкої/шовкової/бавовняної_тканини',
        trait: Trait.Human,
        ggm: true
    },
    {
        gen: 'старий/подертий/вицвілий_наручний_годинник/браслет',
        trait: Trait.Human,
        ggm: true
    },
    {
        gen: 'пляшка_білого/червоного_сухого/солодкого/напівсухого/напівсолодкого_вина',
        trait: Trait.Human,
        ggf: true
    },
    {
        gen: 'коралі/намисто_з золота/із срібла/із зубів',
        trait: Trait.Human,
        ggn: true
    },
    {
        gen: 'кулко_з діамантом/з рубіном/зі смарагдом/з сапфіром',
        trait: Trait.Human,
        ggn: true
    },
    {
        gen: 'свіже/сире/знекровлене_м\'ясо_без запаху/з запахом',
        trait: Trait.Flesh,
        ggn: true
    },
    {
        gen: 'ідеально/досконало/чудово/прекрасно_оброблена шкіра',
        trait: Trait.Flesh,
        ggf: true
    },
    {
        gen: 'бездоганно_ампутований/вирізаний_знебарвлений/знекровлений/пожухлий_язик',
        trait: Trait.Flesh,
        ggm: true
    },
    {
        gen: 'блискучий/білий_неушкоджений/міцний_передній/верхній/кутній_зуб',
        trait: Trait.Flesh,
        ggm: true
    },
    {
        gen: 'досконале/бездоганне/ідеально нагострене/майстерно видалене_ікло',
        trait: Trait.Flesh,
        ggn: true
    },
    {
        gen: 'ідеально відрізана/бездоганно відтята/вціліла/неушкоджена/міцна_чорна/сіра/жовта/темна_лапка',
        trait: Trait.Insect,
        ggf: true
    },
    {
        gen: 'довгий_вцілілий/неушкоджений/міцний/тривкий_чутливий вусик',
        trait: Trait.Insect,
        ggm: true
    },
    {
        gen: 'вціліле/неушкоджене/міцне_чорне/сіре_жало',
        trait: Trait.Insect,
        ggn: true
    },
    {
        gen: 'обережно відібрана_чиста/свіжа/тепла/прозора/густа/слизоподібна_сукровиця',
        trait: Trait.Insect,
        ggf: true
    },
    {
        gen: 'неушкоджена/велетенська_отруйна залоза',
        trait: Trait.Insect,
        ggf: true
    },
    {
        gen: 'перетерта/дрібна/груба_кістяна сіль',
        trait: Trait.Bone,
        ggf: true
    },
    {
        gen: 'білий/сірий/темний/чорний_кістяний пил',
        trait: Trait.Bone,
        ggm: true
    },
    {
        gen: 'біла/зламана/порожниста_кістка',
        trait: Trait.Bone,
        ggf: true
    },
    {
        gen: 'скалка/тріска/скіпка_черепа/гомілки/ребра/тазової кістки_правильної форми',
        trait: Trait.Bone,
        ggf: true
    },
    {
        gen: 'бездоганний/очищений_прах',
        trait: Trait.Bone,
        ggm: true
    },
    {
        gen: 'чиста магічна есенція',
        trait: Trait.Magic,
        ggf: true
    },
    {
        gen: 'прозора магічна субстанція',
        trait: Trait.Magic,
        ggf: true
    },
    {
        gen: 'крихітний/малий/великий_магічний камінь',
        trait: Trait.Magic,
        ggm: true
    },
    {
        gen: 'кришталевий фіал з арканічною есенцією',
        trait: Trait.Magic,
        ggm: true
    },
    {
        gen: 'міцний_знебарвлений/пожухлий/закам\'янілий_хітин',
        trait: Trait.Water,
        ggm: true
    },
    {
        gen: 'міцний/вцілілий/неушкоджений_гострокістковий хребет',
        trait: Trait.Water,
        ggm: true
    },
    {
        gen: 'товста_міцна/блискуча/неушкоджена_луска',
        trait: Trait.Water,
        ggf: true
    },
    {
        gen: 'фіал із_прозорою/мутною/чистою/слизоподібною_сумішшю',
        trait: Trait.Water,
        ggm: true
    }
];
const gearQualities = [
    {
        name: ItemQuality.Poor,
        title: {
            m: 'кепський/жахливий/зламаний/жебрацький/розірваний/розтрощений/поганий/неладний/ніякий/казна-який/такий-сякий/неважний/неякісний/миршавий/стертий/порепаний/дірявий/драний/жалюгідний/убогий/мізерний/нікчемний',
            f: 'кепська/жахлива/зламана/жебрацька/розірвана/розтрощена/погана/неладна/ніяка/казна-яка/така-сяка/неважна/неякісна/миршава/стерта/порепана/дірява/драна/жалюгідна/убога/мізерна/нікчемна',
            n: 'кепське/жахливе/зламане/жебрацьке/розірване/розтрощене/погане/неладне/ніяке/казна-яке/таке-сяке/неважне/неякісне/миршаве/стерте/порепане/діряве/дране/жалюгідне/убоге/мізерне/нікчемне',
            x: 'кепські/жахливі/зламані/жебрацькі/розірвані/розтрощені/погані/неладні/ніякі/казна-які/такі-сякі/неважні/неякісні/миршаві/стерті/порепані/діряві/драні/жалюгідні/убогі/мізерні/нікчемні'
        },
        templates: [
            '{quality-title} {item-title}'
        ]
    },
    {
        name: ItemQuality.Common,
        title: {
            m: 'звичайний/простий/простецький/повсякденний/стандартний/непоганий/нескладний/нехитрий/скромний/хороший/добрячий/славний/гожий/міцний/товстий/твердий',
            f: 'звичайна/проста/простецька/повсякденна/стандартна/непогана/нескладна/нехитра/скромна/хороша/добряча/славна/гожа/міцна/товста/тверда',
            n: 'звичайне/просте/простецьке/повсякденне/стандартне/непогане/нескладне/нехитре/скромне/хороше/добряче/славне/гоже/міцне/товсте/тверде',
            x: 'звичайні/прості/простецькі/повсякденні/стандартні/непогані/нескладні/нехитрі/скромні/хороші/добрячі/славні/гожі/міцні/товсті/тверді'
        },
        templates: [
            '{quality-title} {item-title}'
        ]
    },
    {
        name: ItemQuality.Uncommon,
        title: {
            m: 'незвичайний/непростий/неабиякий/неординарний/особливий/неправдоподібний/файний/дивний/чудний/чарівний/гарний/прегарний/подвійний/потрійний',
            f: 'незвичайна/непроста/неабияка/неординарна/особлива/неправдоподібна/файна/дивна/чудна/чарівна/гарна/прегарна/подвійна/потрійна',
            n: 'незвичайне/непросте/неабияке/неординарне/особливе/неправдоподібне/файне/дивне/чудне/чарівне/гарне/прегарне/подвійне/потрійне',
            x: 'незвичайні/непрості/неабиякі/неординарні/особливі/неправдоподібні/файні/дивні/чудні/чарівні/гарні/прегарні/подвійні/потрійні'
        },
        templates: [
            '{quality-title} {item-title}'
        ]
    },
    {
        name: ItemQuality.Rare,
        title: {
            m: 'рідкісний/дивовижний/неймовірний/винятковий/немислимий/невидимий/небачений/нечуваний/незрівняний/неперевершений/чудовий/потойбічний/туманний',
            f: 'рідкісна/дивовижна/неймовірна/виняткова/немислима/невидима/небачена/нечувана/незрівняна/неперевершена/чудова/потойбічна/туманна',
            n: 'рідкісне/дивовижне/неймовірне/виняткове/немислиме/невидиме/небачене/нечуване/незрівняне/неперевершене/чудове/потойбічне/туманне',
            x: 'рідкісні/дивовижні/неймовірні/виняткові/немислимі/невидимі/небачені/нечувані/незрівняні/неперевершені/чудові/потойбічні/туманні'
        },
        templates: [
            '{quality-title} {item-title}',
            '{rare-prefix} {quality-title} {item-title}'
        ],
        prefix: {
            m: 'магічний/зачарований/очищений/блискучий/сяйливий/сяючий/променистий/розкішний/ясний/шикарний/ефектний/палкий/палахкий/ярий/інтенсивний/завзятий/рясний',
            f: 'магічна/зачарована/очищена/блискуча/сяйлива/сяюча/промениста/розкішна/ясна/шикарна/ефектна/палка/палахка/яра/інтенсивна/завзята/рясна',
            n: 'магічне/зачароване/очищене/блискуче/сяйливе/сяюче/променисте/розкішне/ясне/шикарне/ефектне/палке/палахке/яре/інтенсивне/завзяте/рясне',
            x: 'магічні/зачаровані/очищені/блискучі/сяйливі/сяючі/променисті/розкішні/ясні/шикарні/ефектні/палкі/палахкі/ярі/інтенсивні/завзяті/рясні'
        }
    },
    {
        name: ItemQuality.Epic,
        title: {
            m: 'епічний/фантастичний/казковий/міфічний/феєричний/аномальний/неможливий/парадоксальний/пречудовий/чудесний/екзотичний/чудернацький',
            f: 'епічна/фантастична/казкова/міфічна/феєрична/аномальна/неможлива/парадоксальна/пречудова/чудесна/екзотична/чудернацька',
            n: 'епічне/фантастичне/казкове/міфічне/феєричне/аномальне/неможливе/парадоксальне/пречудове/чудесне/екзотичне/чудернацьке',
            x: 'епічні/фантастичні/казкові/міфічні/феєричні/аномальні/неможливі/парадоксальні/пречудові/чудесні/екзотичні/чудернацькі'
        },
        templates: [
            '{quality-title} {item-title} {epic-suffix}',
            '{rare-prefix} {item-title} {epic-suffix}',
            '{rare-prefix} {quality-title} {item-title} {epic-suffix}',
            '{epic-prefix} {item-title} {epic-suffix}',
            '{epic-prefix} {quality-title} {item-title} {epic-suffix}'
        ],
        prefix: {
            m: 'зоряний/сонячний/місячний/сліпучий/вогняний/полум\'яний/вітровий/водяний/іскристий/ангельский/небесний/божественний/досконалий/ідеальний/безкрайній/бездонний',
            f: 'зоряна/сонячна/місячна/сліпуча/вогняна/полум\'яна/вітрова/водяна/іскриста/ангельска/небесна/божественна/досконала/ідеальна/безкрайня/бездонна',
            n: 'зоряне/сонячне/місячне/сліпуче/вогняне/полум\'яне/вітрове/водяне/іскристе/ангельске/небесне/божественне/досконале/ідеальне/безкрайнє/бездонне',
            x: 'зоряні/сонячні/місячні/сліпучі/вогняні/полум\'яні/вітрові/водяні/іскристі/ангельскі/небесні/божественні/досконалі/ідеальні/безкрайні/бездонні'
        },
        suffix: 'ангела/архангела/зірок/космосу/неба/полум\'я/серця' + '/бійця/воїна/мага/мисливця/паладіна/монаха/друїда/чорнокнижника/шамана/гладіатора/поборника/мародера/вбивці' + '/монстра/чудовиська/страховиська/примари/потвори/демона/елементаля/велетня/хижака/злості/лютощі' + '/природи/життя/дикості/тиранії/руйнування/знищення/стихій/вихорів/торнадо/хвиль/водовороту/виру' + '/сповільнення/прискорення/висушення/затоплення/випалювання/елементів/знань/вмінь/свідомості' + '/мисливця за скарбами/грабіжника гробниць/внутрішнього вогню/сили дворфів/мудрості ельфів'
    }
];
const gearSlots1 = [
    {
        name: GearSlot.MainHand,
        options: [
            {
                title: 'дубина',
                ggf: true
            },
            {
                title: 'бита',
                ggf: true
            },
            {
                title: 'молоток',
                ggm: true
            },
            {
                title: 'сокира',
                ggf: true
            },
            {
                title: 'серп',
                ggm: true
            },
            {
                title: 'тесак',
                ggm: true
            },
            {
                title: 'кастет',
                ggm: true
            },
            {
                title: 'кортик',
                ggm: true
            },
            {
                title: 'сікач',
                ggm: true
            },
            {
                title: 'молот',
                ggm: true
            },
            {
                title: 'меч',
                ggm: true
            },
            {
                title: 'копеш',
                ggm: true
            },
            {
                title: 'клинок',
                ggm: true
            },
            {
                title: 'булава',
                ggf: true
            },
            {
                title: 'джамбія',
                ggf: true
            },
            {
                title: 'фальшіон',
                ggm: true
            },
            {
                title: 'томагавк',
                ggm: true
            },
            {
                title: 'мачете',
                ggn: true
            },
            {
                title: 'дирк',
                ggm: true
            },
            {
                title: 'крис',
                ggm: true
            },
            {
                title: 'копіс',
                ggm: true
            },
            {
                title: 'катана',
                ggf: true
            },
            {
                title: 'шпага',
                ggf: true
            },
            {
                title: 'рапіра',
                ggf: true
            },
            {
                title: 'ксифос',
                ggm: true
            },
            {
                title: 'келеп',
                ggm: true
            },
            {
                title: 'пірнач',
                ggm: true
            },
            {
                title: 'клевець',
                ggm: true
            },
            {
                title: 'кинджал',
                ggm: true
            },
            {
                title: 'палаш',
                ggm: true
            },
            {
                title: 'пугіо',
                ggm: true
            },
            {
                title: 'сай',
                ggm: true
            },
            {
                title: 'спатіон',
                ggm: true
            },
            {
                title: 'гладіус',
                ggm: true
            },
            {
                title: 'буздиган',
                ggm: true
            },
            {
                title: 'фальката',
                ggf: true
            },
            {
                title: 'гіршфанґер',
                ggm: true
            },
            {
                title: 'бойовий ціп',
                ggm: true
            },
            {
                title: 'бойова гиря',
                ggf: true
            },
            {
                title: 'моргенштерн',
                ggm: true
            },
            {
                title: 'кацбальгер',
                ggm: true
            },
            {
                title: 'чинкуеда',
                ggf: true
            },
            {
                title: 'сагарис',
                ggm: true
            },
            {
                title: 'лабрис',
                ggm: true
            }
        ]
    },
    {
        name: GearSlot.OffHand,
        options: [
            {
                title: 'парасолька',
                ggf: true
            },
            {
                title: 'тертиця',
                ggf: true
            },
            {
                title: 'книга',
                ggf: true
            },
            {
                title: 'дошка',
                ggf: true
            },
            {
                title: 'лист',
                ggm: true
            },
            {
                title: 'куля',
                ggf: true
            },
            {
                title: 'фіал',
                ggm: true
            },
            {
                title: 'келих',
                ggm: true
            },
            {
                title: 'кубок',
                ggm: true
            },
            {
                title: 'диск',
                ggm: true
            },
            {
                title: 'фетиш',
                ggm: true
            },
            {
                title: 'ограда',
                ggf: true
            },
            {
                title: 'заслона',
                ggf: true
            },
            {
                title: 'пластина',
                ggf: true
            },
            {
                title: 'кружало',
                ggn: true
            },
            {
                title: 'завіса',
                ggf: true
            },
            {
                title: 'плита',
                ggf: true
            },
            {
                title: 'екран',
                ggm: true
            },
            {
                title: 'сфера',
                ggf: true
            },
            {
                title: 'ідол',
                ggm: true
            },
            {
                title: 'щит',
                ggm: true
            },
            {
                title: 'тарч',
                ggm: true
            },
            {
                title: 'аспіс',
                ggm: true
            },
            {
                title: 'баклер',
                ggm: true
            },
            {
                title: 'гоплон',
                ggm: true
            },
            {
                title: 'кліпеус',
                ggm: true
            },
            {
                title: 'павеза',
                ggf: true
            },
            {
                title: 'кетра',
                ggf: true
            },
            {
                title: 'парма',
                ggf: true
            },
            {
                title: 'пельта',
                ggf: true
            },
            {
                title: 'скутум',
                ggm: true
            },
            {
                title: 'туреос',
                ggm: true
            }
        ]
    },
    {
        name: GearSlot.Head,
        options: [
            {
                title: 'пов\'язка',
                ggf: true
            },
            {
                title: 'вінок',
                ggm: true
            },
            {
                title: 'шапка',
                ggf: true
            },
            {
                title: 'бриль',
                ggm: true
            },
            {
                title: 'капюшон',
                ggm: true
            },
            {
                title: 'кепка',
                ggf: true
            },
            {
                title: 'окуляри',
                ggx: true
            },
            {
                title: 'берет',
                ggm: true
            },
            {
                title: 'кучма',
                ggf: true
            },
            {
                title: 'зюйдвестка',
                ggf: true
            },
            {
                title: 'котелок',
                ggm: true
            },
            {
                title: 'циліндр',
                ggm: true
            },
            {
                title: 'сомбреро',
                ggn: true
            },
            {
                title: 'коло',
                ggn: true
            },
            {
                title: 'койф',
                ggm: true
            },
            {
                title: 'ковпак',
                ggm: true
            },
            {
                title: 'лінза',
                ggf: true
            },
            {
                title: 'монокль',
                ggm: true
            },
            {
                title: 'башлик',
                ggm: true
            },
            {
                title: 'стетсон',
                ggm: true
            },
            {
                title: 'штурмак',
                ggm: true
            },
            {
                title: 'шолом',
                ggm: true
            },
            {
                title: 'мисюрка',
                ggf: true
            },
            {
                title: 'топхельм',
                ggm: true
            },
            {
                title: 'митра',
                ggf: true
            },
            {
                title: 'діадема',
                ggf: true
            },
            {
                title: 'тіара',
                ggf: true
            }
        ]
    },
    {
        name: GearSlot.Shoulders,
        options: [
            {
                title: 'підкладки',
                ggx: true
            },
            {
                title: 'накладки',
                ggx: true
            },
            {
                title: 'плече',
                ggn: true
            },
            {
                title: 'наплічники',
                ggx: true
            },
            {
                title: 'щитки',
                ggx: true
            },
            {
                title: 'погони',
                ggx: true
            },
            {
                title: 'еполети',
                ggx: true
            },
            {
                title: 'мантія',
                ggf: true
            }
        ]
    },
    {
        name: GearSlot.Chest,
        options: [
            {
                title: 'лейбик',
                ggm: true
            },
            {
                title: 'сардак',
                ggm: true
            },
            {
                title: 'серапе',
                ggn: true
            },
            {
                title: 'жупан',
                ggm: true
            },
            {
                title: 'тегиляй',
                ggm: true
            },
            {
                title: 'кептар',
                ggm: true
            },
            {
                title: 'куртка',
                ggf: true
            },
            {
                title: 'юшман',
                ggm: true
            },
            {
                title: 'кожух',
                ggm: true
            },
            {
                title: 'броня',
                ggf: true
            },
            {
                title: 'бехтер',
                ggm: true
            },
            {
                title: 'дублет',
                ggm: true
            },
            {
                title: 'обладунок',
                ggm: true
            },
            {
                title: 'гауберк',
                ggm: true
            },
            {
                title: 'мундир',
                ggm: true
            },
            {
                title: 'панцир',
                ggm: true
            },
            {
                title: 'кираса',
                ggf: true
            },
            {
                title: 'сполас',
                ggm: true
            },
            {
                title: 'кольчуга',
                ggf: true
            },
            {
                title: 'клібаніон',
                ggm: true
            },
            {
                title: 'ліноторакс',
                ggm: true
            },
            {
                title: 'бригантина',
                ggf: true
            }
        ]
    },
    {
        name: GearSlot.Back,
        options: [
            {
                title: 'фіранка',
                ggf: true
            },
            {
                title: 'завіска',
                ggf: true
            },
            {
                title: 'накидка',
                ggf: true
            },
            {
                title: 'макінтош',
                ggm: true
            },
            {
                title: 'пелена',
                ggf: true
            },
            {
                title: 'шторка',
                ggf: true
            },
            {
                title: 'покрив',
                ggm: true
            },
            {
                title: 'мантія',
                ggf: true
            },
            {
                title: 'опанча',
                ggf: true
            },
            {
                title: 'попона',
                ggf: true
            },
            {
                title: 'ковдра',
                ggf: true
            },
            {
                title: 'пончо',
                ggn: true
            },
            {
                title: 'бунда',
                ggf: true
            },
            {
                title: 'рядно',
                ggn: true
            },
            {
                title: 'чуга',
                ggf: true
            },
            {
                title: 'плащ',
                ggm: true
            },
            {
                title: 'шкура',
                ggf: true
            },
            {
                title: 'саван',
                ggm: true
            },
            {
                title: 'крило',
                ggn: true
            }
        ]
    },
    {
        name: GearSlot.Wrist,
        options: [
            {
                title: 'браслети',
                ggx: true
            },
            {
                title: 'бранзолети',
                ggx: true
            },
            {
                title: 'нарукавники',
                ggx: true
            },
            {
                title: 'наруччя',
                ggx: true
            },
            {
                title: 'поручі',
                ggx: true
            },
            {
                title: 'маніки',
                ggx: true
            },
            {
                title: 'щитки',
                ggx: true
            }
        ]
    },
    {
        name: GearSlot.Hands,
        options: [
            {
                title: 'рукавиці',
                ggx: true
            },
            {
                title: 'рукавички',
                ggx: true
            },
            {
                title: 'піврукавички',
                ggx: true
            },
            {
                title: 'пальчатки',
                ggx: true
            }
        ]
    },
    {
        name: GearSlot.Waist,
        options: [
            {
                title: 'пасок',
                ggm: true
            },
            {
                title: 'пояс',
                ggm: true
            },
            {
                title: 'поясина',
                ggf: true
            },
            {
                title: 'опасок',
                ggm: true
            },
            {
                title: 'смуга',
                ggf: true
            },
            {
                title: 'ремінь',
                ggm: true
            }
        ]
    },
    {
        name: GearSlot.Legs,
        options: [
            {
                title: 'штани',
                ggx: true
            },
            {
                title: 'брюки',
                ggx: true
            },
            {
                title: 'рейтузи',
                ggx: true
            },
            {
                title: 'кальсони',
                ggx: true
            },
            {
                title: 'ногавиці',
                ggx: true
            },
            {
                title: 'шаровари',
                ggx: true
            },
            {
                title: 'набедреники',
                ggx: true
            },
            {
                title: 'наголінники',
                ggx: true
            },
            {
                title: 'налядвенники',
                ggx: true
            },
            {
                title: 'бутурлики',
                ggx: true
            },
            {
                title: 'бриджі',
                ggx: true
            },
            {
                title: 'хакама',
                ggx: true
            },
            {
                title: 'кюлоти',
                ggx: true
            }
        ]
    },
    {
        name: GearSlot.Feet,
        options: [
            {
                title: 'бахили',
                ggx: true
            },
            {
                title: 'личаки',
                ggx: true
            },
            {
                title: 'калоші',
                ggx: true
            },
            {
                title: 'босоніжки',
                ggx: true
            },
            {
                title: 'трескури',
                ggx: true
            },
            {
                title: 'повстяники',
                ggx: true
            },
            {
                title: 'мокасини',
                ggx: true
            },
            {
                title: 'сандалі',
                ggx: true
            },
            {
                title: 'ходаки',
                ggx: true
            },
            {
                title: 'царухи',
                ggx: true
            },
            {
                title: 'капці',
                ggx: true
            },
            {
                title: 'опанці',
                ggx: true
            },
            {
                title: 'каліги',
                ggx: true
            },
            {
                title: 'боти',
                ggx: true
            },
            {
                title: 'бурки',
                ggx: true
            },
            {
                title: 'чоботи',
                ggx: true
            },
            {
                title: 'високі чоботи',
                ggx: true
            },
            {
                title: 'чоботи ґоу-ґоу',
                ggx: true
            },
            {
                title: 'ботфорти',
                ggx: true
            },
            {
                title: 'унти',
                ggx: true
            },
            {
                title: 'чув\'яки',
                ggx: true
            },
            {
                title: 'черевики',
                ggx: true
            },
            {
                title: 'котурни',
                ggx: true
            },
            {
                title: 'вібрами',
                ggx: true
            },
            {
                title: 'броги',
                ggx: true
            }, 
        ]
    },
    {
        name: GearSlot.Neck,
        options: [
            {
                title: 'ланцюжок',
                ggm: true
            },
            {
                title: 'коралі',
                ggx: true
            },
            {
                title: 'намисто',
                ggn: true
            },
            {
                title: 'кольє',
                ggn: true
            },
            {
                title: 'амулет',
                ggm: true
            },
            {
                title: 'кулон',
                ggm: true
            },
            {
                title: 'ґердан',
                ggm: true
            },
            {
                title: 'підвіска',
                ggf: true
            },
            {
                title: 'медальйон',
                ggm: true
            },
            {
                title: 'талісман',
                ggm: true
            },
            {
                title: 'гривна',
                ggf: true
            },
            {
                title: 'торквес',
                ggm: true
            },
            {
                title: 'пектораль',
                ggf: true
            }
        ]
    },
    {
        name: GearSlot.Finger,
        options: [
            {
                title: 'обідок',
                ggm: true
            },
            {
                title: 'кільце',
                ggn: true
            },
            {
                title: 'перстень',
                ggm: true
            },
            {
                title: 'каблучка',
                ggf: true
            },
            {
                title: 'печатка',
                ggf: true
            },
            {
                title: 'сигнет',
                ggm: true
            }
        ]
    },
    {
        name: GearSlot.Trinket,
        options: [
            {
                title: 'сережка',
                ggf: true
            },
            {
                title: 'шпилька',
                ggf: true
            },
            {
                title: 'брошка',
                ggf: true
            },
            {
                title: 'брелок',
                ggm: true
            },
            {
                title: 'значок',
                ggm: true
            },
            {
                title: 'бляха',
                ggf: true
            },
            {
                title: 'орден',
                ggm: true
            },
            {
                title: 'ґудзик',
                ggm: true
            },
            {
                title: 'фібула',
                ggf: true
            },
            {
                title: 'запонки',
                ggx: true
            },
            {
                title: 'кліпси',
                ggx: true
            },
            {
                title: 'кульчики',
                ggx: true
            },
            {
                title: 'емблема',
                ggf: true
            },
            {
                title: 'знамено',
                ggx: true
            },
            {
                title: 'прикраса',
                ggf: true
            },
            {
                title: 'аксесуар',
                ggm: true
            },
            {
                title: 'атрибут',
                ggm: true
            },
            {
                title: 'відзнака',
                ggf: true
            },
            {
                title: 'символ',
                ggm: true
            },
            {
                title: 'оберег',
                ggm: true
            }
        ]
    }
];
const quests = [
    'зменшити/знизити/вбавити_популяцію {mob-gcm-r}',
    '{mob-gcm-n}_занадто розплодилися/загрожують нашому врожаю/несуть небезпеку поселенню/перекрили торговий шлях',
    'принести/зібрати/добути_{number-5-20}_шкур/кликів/ікол/шлунків/нирок/сердець/есенцій_{mob-flesh-gcm-r}',
    'принести/дістати/добути/знайти/відшукати/доставити_{precious-item-ggmn}',
    '{precious-item-ggf} має бути_знайдена/повернута/відновлена/знищена'
];
const charNameParts = [
    'б,б,б,бр,бл,бс,\
    в,в,в,в,вк,вн,вр,вл,вт,вс,\
    г,г,гр,гн,гл,\
    ґ,ґ,ґр,ґн,ґл,\
    д,д,дл,дн,дв,\
    з,з,зр,зн,зг,зґ,зт,зв,зм,\
    к,к,к,к,кр,кн,кв,км,кл,кт,\
    м,м,м,м,мн,мр,мл,мс,мт,\
    н,н,н,н,нк,нн,нз,нх,нф,нв,\
    п,п,п,п,пр,пл,\
    с,с,с,с,ст,сц,ск,сн,сг,сґ,сх,сф,св,сп,ср,сл,сд,см,сс,\
    т,т,т,т,тр,тв,тл,тс,тм,\
    х,х,х,х,хр,хв,хл,хс,хм,хт,\
    ш,ш,ш,ш,шр,шк,шн,шв,шп,шл,шм,шт'.split(','),
    'а,а,а,а,ай,аа,ау,ае,ає,аі,аї,ао,аю,ая,\
    е,е,е,е,ей,ее,еу,ео,еі,еї,ею,ея,\
    є,є,є,є,єй,єу,єі,єю,єя,\
    і,і,і,і,ій,іу,ії,іа,іо,ія,\
    и,и,и,и,ий,иу,ие,иє,иі,иї,иа,ио,ию,ия,\
    о,о,о,о,ой,оо,оу,ое,оє,оі,ої,оа,ою,оя,\
    у,у,у,у,уу,уе,ує,уі,уї,уа,уо,ую,уя,\
    ю,ю,ю,ю,юй,ює,юі,юї,юа,юо,юя,\
    я,я,я,я,яй,яу,яе,яє,яі,яї,яа,яо,яю,яя'.split(',')
];
const charNameProfanity = [
    [
        'бля',
        'блу'
    ],
    [
        'гєй',
        'гай'
    ],
    [
        'єб',
        'уб'
    ],
    [
        'йоб',
        'мон'
    ],
    [
        'пізд',
        'под'
    ],
    [
        'сук',
        'сок'
    ],
    [
        'хуй',
        'хор'
    ],
    [
        'шлюх',
        'шліс'
    ]
];
function rollCharName1(_) {
    const state = {
        seed: Math.floor(Math.random() * 1000000)
    };
    let text1 = '';
    for(let i = 0; i < __default2.int(state, 4) + 2; i++){
        text1 += rand1.item(state, charNameParts[i % charNameParts.length]).trim();
    }
    charNameProfanity.forEach((s)=>text1 = text1.replaceAll(s[0], s[1])
    );
    return text1.charAt(0).toUpperCase() + text1.slice(1);
}
function rollMobTitle1(hero, mob, might) {
    const meta2 = mobMeta.find((e)=>e.name == mob.name
    );
    const genders = [
        meta2.masculine,
        meta2.feminine,
        meta2.neuter
    ].reduce((a, c, i)=>{
        if (c) {
            a.push({
                i,
                gen: c
            });
        }
        return a;
    }, []);
    const gender = __default2.item(hero, genders);
    const title = __default2.text(hero, gender.gen);
    let prefix = '';
    if (might == MobMight.Reinforced) {
        const prefixes = mobReinforcedPrefixes.filter((p)=>p.trait & mob.trait
        ).map((p)=>p.gen
        );
        prefix = rand1.item(hero, prefixes).split('/')[gender.i];
    }
    return `${prefix} ${title}`.trim();
}
function rollMobJunkItemTitle1(hero, mob) {
    const meta2 = mobMeta.find((e)=>e.name == mob.name
    );
    return __default2.text(hero, meta2.junk);
}
function rollMobPreciousItemTitle1(hero, mob) {
    const items = preciousItems.filter((i)=>(mob.trait & i.trait) == i.trait
    );
    const item1 = __default2.item(hero, items);
    return __default2.text(hero, item1.gen);
}
function rollGearItemTitle1(hero, slot, quality) {
    const options = gearSlots1.find((e)=>e.name == slot
    ).options;
    const option = __default2.item(hero, options);
    const ggKey = option.ggm ? 'm' : option.ggf ? 'f' : option.ggn ? 'n' : 'x';
    const qualityMeta = gearQualities.find((e)=>e.name == quality
    );
    return __default2.item(hero, qualityMeta.templates).replace('{item-title}', option.title).replace('{quality-title}', __default2.text(hero, qualityMeta.title[ggKey])).replace('{rare-prefix}', __default2.text(hero, gearQualities.find((e)=>e.name == ItemQuality.Rare
    ).prefix[ggKey])).replace('{epic-prefix}', __default2.text(hero, gearQualities.find((e)=>e.name == ItemQuality.Epic
    ).prefix[ggKey])).replace('{epic-suffix}', __default2.text(hero, gearQualities.find((e)=>e.name == ItemQuality.Epic
    ).suffix));
}
function rollQuestTitle1(hero) {
    const fleshMobName = __default2.item(hero, __default1.mobs.filter((m)=>m.trait & Trait.Flesh
    )).name;
    const fleshMobMeta = mobMeta.find((e)=>e.name == fleshMobName
    );
    const text1 = __default2.text(hero, __default2.item(hero, quests)).replace('{number-5-20}', `${__default2.int(hero, 16) + 5}`).replace('{mob-gcm-n}', __default2.item(hero, mobMeta).gcm.n).replace('{mob-gcm-r}', __default2.item(hero, mobMeta).gcm.r).replace('{mob-flesh-gcm-r}', fleshMobMeta.gcm.r).replace('{precious-item-ggmn}', __default2.text(hero, __default2.item(hero, preciousItems.filter((i)=>i.ggm || i.ggn
    )).gen)).replace('{precious-item-ggf}', __default2.text(hero, __default2.item(hero, preciousItems.filter((i)=>i.ggf
    )).gen));
    return text1.charAt(0).toUpperCase() + text1.slice(1);
}
const lingo1 = {
    meta: meta1,
    dict: dict1,
    rollCharName: rollCharName1,
    rollMobTitle: rollMobTitle1,
    rollMobJunkItemTitle: rollMobJunkItemTitle1,
    rollMobPreciousItemTitle: rollMobPreciousItemTitle1,
    rollGearItemTitle: rollGearItemTitle1,
    rollQuestTitle: rollQuestTitle1
};
const lingos = [
    lingo,
    lingo1
];
function lingo2(lang) {
    return lingos.find((e)=>e.meta.name == lang
    ) || lingos[0];
}
function languages() {
    return lingos.map((e)=>({
            name: e.meta.name,
            title: e.meta.title,
            icon: e.meta.icon
        })
    );
}
function text1(lang, key, args = {
}) {
    let result = lingo2(lang).dict[key] || lingo.dict[key];
    if (result) {
        for(const arg in args){
            result = result.replace('{' + arg + '}', args[arg]);
        }
        return result;
    } else {
        return `[${key}]`;
    }
}
const gen = {
    rollCharName: (lang)=>lingo2(lang).rollCharName(lang)
    ,
    rollMobTitle: (hero, ...args)=>lingo2(hero.lang).rollMobTitle(hero, ...args)
    ,
    rollMobJunkItemTitle: (hero, ...args)=>lingo2(hero.lang).rollMobJunkItemTitle(hero, ...args)
    ,
    rollMobPreciousItemTitle: (hero, ...args)=>lingo2(hero.lang).rollMobPreciousItemTitle(hero, ...args)
    ,
    rollGearItemTitle: (hero, ...args)=>lingo2(hero.lang).rollGearItemTitle(hero, ...args)
    ,
    rollQuestTitle: (hero)=>lingo2(hero.lang).rollQuestTitle(hero)
};
const __default3 = {
    languages,
    text: text1,
    ...gen
};
const lingo3 = __default3;
const knownHeroActions = [
    {
        name: '?',
        title: ()=>'?'
        ,
        duration: ()=>0
        ,
        next: ()=>'intro'
    },
    {
        name: 'intro',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-intro')
        ,
        duration: ()=>10
        ,
        next: ()=>'accept-quest'
    },
    {
        name: 'accept-quest',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-accept-quest')
        ,
        duration: (hero)=>5 + __default2.int(hero, 2)
        ,
        onFinish: (hero)=>{
            acceptQuest(hero);
        },
        next: (hero)=>{
            if (hero.bag.length > 0) {
                return 'sell-junk';
            } else {
                return 'move-to-wilderness';
            }
        }
    },
    {
        name: 'pass-quest',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-pass-quest')
        ,
        duration: (hero)=>5 + __default2.int(hero, 2)
        ,
        onFinish: (hero)=>{
            completeQuest(hero);
        },
        next: ()=>'accept-quest'
    },
    {
        name: 'move-to-wilderness',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-move-to-wilderness')
        ,
        duration: ()=>15
        ,
        onStart: (hero)=>{
            updateZone(hero, ZoneType.Traveling);
        },
        onFinish: (hero)=>{
            updateZone(hero, ZoneType.Wilderness);
        },
        next: ()=>'combat'
    },
    {
        name: 'combat',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-combat', {
                target: hero.target.title
            })
        ,
        duration: (hero)=>5 + (hero.target.might == MobMight.Reinforced ? 2 : 0)
        ,
        onStart: (hero)=>{
            startCombat(hero);
        },
        onFinish: (hero)=>{
            finishCombat(hero);
        },
        next: (hero)=>{
            if (hero.bag.length == hero.attr.bagCap) {
                return 'move-to-town';
            } else if (hero.quest && hero.quest.progress.cur == hero.quest.progress.max) {
                return 'move-to-town';
            } else if (hero.attr.curMp < manaNeededForCombat(hero)) {
                return 'rest';
            } else {
                return 'combat';
            }
        }
    },
    {
        name: 'rest',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-rest')
        ,
        duration: ()=>15
        ,
        onFinish: (hero)=>{
            hero.attr.curMp = hero.attr.maxMp;
        },
        next: ()=>'combat'
    },
    {
        name: 'move-to-town',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-move-to-town')
        ,
        duration: ()=>15
        ,
        onStart: (hero)=>{
            updateZone(hero, ZoneType.Traveling);
        },
        onFinish: (hero)=>{
            updateZone(hero, ZoneType.Town);
        },
        next: (hero)=>{
            if (hero.quest && hero.quest.progress.cur == hero.quest.progress.max) {
                return 'pass-quest';
            } else {
                return 'sell-junk';
            }
        }
    },
    {
        name: 'sell-junk',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-sell-junk')
        ,
        duration: (hero)=>Math.max(1, Math.floor(hero.bag.length / 2))
        ,
        onFinish: (hero)=>{
            sellJunk(hero);
        },
        next: (hero)=>{
            if (haveEnoughGoldToGoShopping(hero)) {
                return 'buy-gear';
            } else {
                return 'move-to-wilderness';
            }
        }
    },
    {
        name: 'buy-gear',
        title: (hero)=>__default3.text(hero.lang, 'hero-action-buy-gear')
        ,
        duration: ()=>8
        ,
        onFinish: (hero)=>{
            buyGear(hero);
        },
        next: ()=>'move-to-wilderness'
    }
];
function haveEnoughGoldToGoShopping(hero) {
    const bestQualityAvail = __default1.itemQualities.slice().reverse().find((q)=>q.level <= hero.level.num
    ).name;
    const priceThreshold = __default1.itemBuyPriceMult * getItemPrice(hero, '?', bestQualityAvail, GearSlot.Chest);
    return hero.gold >= priceThreshold;
}
function buyGear(hero) {
    rollItemsAndLootSingleBestOne(hero, GearSource.Vendor);
}
function rollMobHeroTarget(hero) {
    const level = hero.level.num;
    const mobs1 = __default1.mobs.filter((m)=>(m.trait & hero.zone.biome) == hero.zone.biome && m.level <= level
    );
    const mob = __default2.item(hero, mobs1);
    const might = level >= mob.level + 10 && __default2.dice(hero, 8) ? MobMight.Reinforced : MobMight.Normal;
    const title = __default3.rollMobTitle(hero, mob, might);
    return {
        title,
        mob: mob.name,
        might
    };
}
function manaNeededForCombat(hero) {
    const level = hero.level.num;
    return Math.min(20 + level, hero.attr.maxMp);
}
function startCombat(hero) {
    hero.target = rollMobHeroTarget(hero);
}
function finishCombat(hero) {
    const level = hero.level.num;
    const target = hero.target;
    const mob = __default1.mobs.find((m)=>m.name == target.mob
    );
    const reinforced = target.might == MobMight.Reinforced;
    addExp(hero, level + 1 + (reinforced ? 1 : 0), 'mob');
    if ((mob.trait & Trait.Human) == Trait.Human) {
        addGold(hero, __default2.int(hero, 3) + level * 2 + (reinforced ? level * 10 : 0), 'mob');
    }
    if (__default2.dice(hero, 2)) {
        progressQuest(hero);
    }
    const items = [];
    if (__default2.dice(hero, 14)) {
        items.push(rollGearItem(hero, GearSource.Drop));
    } else {
        if (reinforced) {
            items.push(rollMobPreciousItem(hero, mob));
        } else {
            items.push(rollMobJunkItem(hero, mob));
        }
    }
    if (items.length > 0) {
        lootItems(hero, items);
    }
    hero.target = undefined;
    hero.attr.curMp -= manaNeededForCombat(hero);
    stats.mobsKilled[target.might]++;
}
function rollItemQuality(hero, source) {
    const level = hero.level.num;
    const roll = __default2.int(hero, 1000 - (source == GearSource.Quest ? 500 : 0));
    const quality = __default1.itemQualities.reduce((a, c)=>c.chance > 0 && c.chance > roll && c.level <= level ? c.name : a
    , level < 20 && __default2.dice(hero, 1 + Math.floor(level / 4)) ? ItemQuality.Poor : ItemQuality.Common);
    return quality;
}
function rollGearItemAttributes(hero, quality, source) {
    const level = hero.level.num;
    const attr = {
    };
    const count = __default1.itemQualities.find((q)=>q.name == quality
    ).attrCount;
    if (count) {
        const bonus = Math.floor(level / 5);
        const stat = __default2.shuffle(hero, __default1.attributes.filter((e)=>e.primary
        ).map((e)=>e.name
        ));
        for(let i = 0; i < count; i++){
            let value = bonus;
            if (i == 0 && source == GearSource.Quest) {
                value += Math.ceil(level / 50);
            }
            attr[stat[i]] = value;
        }
    }
    return attr;
}
function rollGearItem(hero, source, forSlot) {
    const level = hero.level.num;
    const availSlots = forSlot ? [
        forSlot
    ] : __default1.gearSlots.filter((s)=>s.level <= level
    ).map((s)=>s.name
    );
    const slot = __default2.item(hero, availSlots);
    const quality = rollItemQuality(hero, source);
    const title = __default3.rollGearItemTitle(hero, slot, quality);
    const price = getItemPrice(hero, title, quality, slot);
    const attr = rollGearItemAttributes(hero, quality, source);
    return {
        title,
        quality,
        gear: {
            slot,
            attr,
            level,
            source
        },
        price
    };
}
function rollMobPreciousItem(hero, mob) {
    const level = hero.level.num;
    const title = __default3.rollMobPreciousItemTitle(hero, mob);
    const quality = ItemQuality.Common;
    const priceDev = getItemPriceDeviation(hero, title);
    const priceMult = 5 + Math.floor(priceDev % level / 2);
    const price = getItemPrice(hero, title, quality, undefined, priceMult);
    return {
        title,
        quality,
        price
    };
}
function rollMobJunkItem(hero, mob) {
    const title = __default3.rollMobJunkItemTitle(hero, mob);
    const quality = ItemQuality.Poor;
    const price = getItemPrice(hero, title, quality);
    return {
        title,
        quality,
        price
    };
}
function getItemPriceDeviation(hero, title) {
    const level = hero.level.num;
    const base = title.split('').reduce((a, c)=>a + c.charCodeAt(0)
    , 0);
    const mod = base % 5 * Math.ceil(level / 3);
    return mod > 0 ? mod : base % level * 7;
}
function getItemPrice(hero, title, quality, slot, extraMult = 1) {
    const level = hero.level.num;
    const price = Math.floor((quality == ItemQuality.Poor ? getItemPriceDeviation(hero, title) : 0) + level * __default1.itemQualities.find((q)=>q.name == quality
    ).priceMult * (slot ? level / 10 * __default1.gearSlots.find((s)=>s.name == slot
    ).priceMult : 1) * extraMult);
    return Math.max(price, 1);
}
function sellJunk(hero) {
    hero.bag.splice(0).forEach((slot)=>addGold(hero, slot.item.price * slot.count, 'junk')
    );
}
function acceptQuest(hero) {
    const level = hero.level.num;
    hero.quest = {
        title: lingo3.rollQuestTitle(hero),
        progress: {
            cur: 0,
            max: 5 + Math.ceil(level * 1.5) + rand.int(hero, Math.ceil(level / 5))
        }
    };
}
function completeQuest(hero) {
    if (!hero.quest || hero.quest.progress.cur < hero.quest.progress.max) {
        return;
    }
    const level = hero.level.num;
    addExp(hero, Math.ceil(hero.level.progress.max / (10 + level / 10)) + level * 4 + 3, 'quest');
    addGold(hero, __default2.int(hero, 10) + Math.ceil(Math.pow(level, 3) / 8) + 20, 'quest');
    rollItemsAndLootSingleBestOne(hero, GearSource.Quest);
    hero.quest = undefined;
    stats.questsPassed++;
}
function rollItemsAndLootSingleBestOne(hero, source) {
    const amount = source == GearSource.Quest ? 4 : source == GearSource.Vendor ? 12 : 0;
    let bestItem = undefined;
    let bestDeltaValue = 0;
    let bestBuyPrice = 0;
    for(let i = 0; i < amount; i++){
        const item1 = rollGearItem(hero, source);
        const buyPrice = source == GearSource.Vendor ? item1.price * __default1.itemBuyPriceMult : 0;
        if (hero.gold < buyPrice) {
            continue;
        }
        const value = getGearItemValue(hero, item1);
        const equippedItem = hero.gear.find((i1)=>i1.gear.slot == item1.gear.slot
        );
        const equippedValue = equippedItem ? getGearItemValue(hero, equippedItem) : -1;
        const delta = value - equippedValue;
        if (!bestItem || bestDeltaValue < delta) {
            bestItem = item1;
            bestDeltaValue = delta;
            bestBuyPrice = buyPrice;
        }
    }
    if (bestItem && (bestBuyPrice == 0 || bestDeltaValue > 0)) {
        lootItems(hero, [
            bestItem
        ]);
        if (bestBuyPrice > 0) {
            removeGold(hero, bestBuyPrice, 'gear');
        }
    }
}
function updateZone(hero, newType) {
    hero.zone.type = newType;
    hero.zone.biome = newType == ZoneType1.Wilderness ? rand.item(hero, data.biomes.filter((b)=>b.level <= hero.level.num
    )).biome : Trait1.None;
    if (newType == ZoneType.Town) {
        hero.attr.curMp = hero.attr.maxMp;
    }
}
function addExp(hero, value, source) {
    stats.expGained[source] += value;
    hero.level.progress.cur += value;
    while(hero.level.progress.cur >= hero.level.progress.max){
        levelUp(hero);
    }
}
function attrUpdated(hero) {
    const level = hero.level.num;
    const { str , int: __int1 , sta , curMp: curMpPrev , maxMp: maxMpPrev  } = hero.attr;
    hero.attr.bagCap = 10 + Math.floor(str / 10);
    hero.attr.maxHp = 20 + level * 8 + sta * 10 + Math.floor(Math.pow(level, 2) / 100) * 40;
    hero.attr.maxMp = 20 + level * 2 + __int1 * 10 + Math.floor(Math.pow(level, 2) / 100) * 20;
    const mpFraction = curMpPrev >= 0 && maxMpPrev > 0 ? curMpPrev / maxMpPrev : 1;
    hero.attr.curMp = Math.floor(mpFraction * hero.attr.maxMp);
}
function addAttr(hero, attr) {
    Object.keys(attr).forEach((a)=>hero.attr[a] += attr[a]
    );
    attrUpdated(hero);
}
function removeAttr(hero, attr) {
    Object.keys(attr).forEach((a)=>hero.attr[a] -= attr[a]
    );
    attrUpdated(hero);
}
function levelUp(hero) {
    const level = ++hero.level.num;
    hero.level.progress.cur -= hero.level.progress.max;
    hero.level.progress.max = Math.ceil(Math.pow(level, 2) * (level + 1) / 10) * 10 + 40;
    hero.attr.curMp = hero.attr.maxMp;
    const attr = {
        str: 0,
        dex: 0,
        int: 0,
        sta: 0
    };
    if (level > 1) {
        const prio = hero.attrPrio;
        for(let i = 0; i < 4; i++){
            const roll = __default2.int(hero, prio.str + prio.dex + prio.int + prio.sta);
            if (roll < prio.str) {
                attr.str++;
            } else if (roll < prio.str + prio.dex) {
                attr.dex++;
            } else if (roll < prio.str + prio.dex + prio.int) {
                attr.int++;
            } else {
                attr.sta++;
            }
        }
    }
    addAttr(hero, attr);
    stats.levelUpTimestamps[level] = stats.time;
    stats.levelUpGoldstamps[level] = Object.values(stats.goldCollected).reduce((a, c)=>a + c
    , 0);
}
function progressQuest(hero) {
    if (hero.quest && hero.quest.progress.cur < hero.quest.progress.max) {
        hero.quest.progress.cur++;
    }
}
function addGold(hero, amount, source) {
    if (amount > 0) {
        stats.goldCollected[source] += amount;
        hero.gold += amount;
    }
}
function removeGold(hero, amount, source) {
    if (amount > 0) {
        stats.goldSpent[source] += amount;
        hero.gold -= amount;
    }
}
function getGearItemValue(hero, item1) {
    let value = 0;
    if (item1.gear) {
        const attr = item1.gear.attr;
        const prio = hero.attrPrio;
        value = data.attributes.filter((e)=>e.primary
        ).map((e)=>e.name
        ).reduce((a, c)=>a + prio[c] * (attr[c] ?? 0)
        , 0);
    }
    if (value < 1) {
        value = data.itemQualities.findIndex((q)=>q.name == item1.quality
        );
    }
    return value;
}
function equipItemIfBetter(hero, newItem) {
    if (!newItem.gear) {
        return {
            equipped: false
        };
    }
    const oldItem = hero.gear.find((i)=>i.gear.slot == newItem.gear.slot
    );
    if (oldItem) {
        const oldValue = getGearItemValue(hero, oldItem);
        const newValue = getGearItemValue(hero, newItem);
        if (newValue <= oldValue) {
            return {
                equipped: false
            };
        }
        removeAttr(hero, oldItem.gear.attr);
        hero.gear = hero.gear.filter((i)=>i != oldItem
        );
    }
    addAttr(hero, newItem.gear.attr);
    hero.gear.push(newItem);
    stats.gearItemsEquipped++;
    return {
        equipped: true,
        oldItem
    };
}
function ensureBagHasFreeSlots(hero, target) {
    while(hero.bag.length > 0 && hero.bag.length > hero.attr.bagCap - target){
        const slot = hero.bag.reduce((a, c)=>c.item.price * c.count < a.item.price * a.count ? c : a
        , hero.bag[0]);
        hero.bag = hero.bag.filter((s)=>s != slot
        );
        stats.itemsLostInGold += slot.item.price * slot.count;
    }
}
function moveItemToBag(hero, item1) {
    const stackSize = item1.gear ? 1 : __default1.itemStackSize;
    const slot = hero.bag.find((s)=>s.item.title == item1.title && s.item.price == item1.price && !s.item.gear && s.count < stackSize
    );
    if (slot) {
        slot.count++;
    } else {
        ensureBagHasFreeSlots(hero, 1);
        hero.bag.push({
            item: item1,
            count: 1
        });
    }
}
function lootItems(hero, items) {
    items.forEach((newItem)=>{
        const r = equipItemIfBetter(hero, newItem);
        if (r.equipped) {
            if (r.oldItem) {
                moveItemToBag(hero, r.oldItem);
            }
        } else {
            moveItemToBag(hero, newItem);
        }
        stats.itemsLootedByQuality[newItem.quality]++;
        if (newItem.gear) {
            stats.gearItemsLootedByQuality[newItem.quality]++;
            stats.gearItemsLootedBySlot[newItem.gear.slot]++;
            stats.gearItemsLootedBySource[newItem.gear.source]++;
        }
    });
}
function advanceAction(hero) {
    if (hero.action.progress.cur < hero.action.progress.max) {
        hero.action.progress.cur++;
        return;
    }
    const curAction = knownHeroActions.find((a)=>a.name == hero.action.name
    );
    if (curAction.onFinish) {
        curAction.onFinish(hero);
    }
    const nextActionName = curAction.next(hero);
    const nextAction = knownHeroActions.find((a)=>a.name == nextActionName
    );
    if (nextAction.onStart) {
        nextAction.onStart(hero);
    }
    hero.action.name = nextAction.name;
    hero.action.title = nextAction.title(hero);
    hero.action.progress.cur = 0;
    hero.action.progress.max = nextAction.duration(hero);
}
function advanceTime(hero) {
    hero.seed = rand.int(hero, 2000000000);
    advanceAction(hero);
    stats.time++;
    switch(hero.action.name){
        case 'combat':
            stats.timeSpent.combat++;
            break;
        case 'rest':
            stats.timeSpent.resting++;
            break;
        case 'sell-junk':
            stats.timeSpent.selling++;
            break;
        case 'buy-gear':
            stats.timeSpent.buying++;
            break;
        case 'accept-quest':
        case 'pass-quest':
            stats.timeSpent.quest++;
            break;
    }
    switch(hero.zone.type){
        case ZoneType.Town:
            stats.timeSpent.town++;
            break;
        case ZoneType.Wilderness:
            stats.timeSpent.wilderness++;
            break;
        case ZoneType.Traveling:
            stats.timeSpent.traveling++;
            break;
    }
}
function rollAttr() {
    const keys = __default1.attributes.filter((e)=>e.primary
    ).map((e)=>e.name
    );
    const attr = {
    };
    keys.forEach((k)=>attr[k] = 10
    );
    const state = {
        seed: Math.floor(Math.random() * 1000000)
    };
    for(let t = 0; t < 8; t++){
        const k1 = __default2.item(state, keys);
        let k2 = k1;
        while(k2 == k1){
            k2 = rand.item(state, keys);
        }
        attr[k1]--;
        attr[k2]++;
    }
    return attr;
}
function createHero(lang, nickname, raceName, className, attrRoll) {
    const race = __default1.races.find((r)=>r.name == raceName
    );
    const clazz = __default1.classes.find((c)=>c.name == className
    );
    const hero = {
        ver: version(),
        born: Math.floor(Date.now() / 1000),
        seed: Math.floor(70000000 + Math.random() * 2000000000),
        lang: __default3.languages().find((l)=>l.name == lang
        ) ? lang : __default3.languages()[0].name,
        nickname,
        race: raceName,
        class: className,
        attr: Object.values(__default1.attributes).reduce((a, { name  })=>{
            a[name] = attrRoll[name] ?? 0;
            return a;
        }, {
        }),
        attrPrio: Object.values(__default1.attributes).filter((e)=>e.primary
        ).reduce((a, { name  })=>{
            a[name] = (race.attrPrio[name] ?? 0) + (clazz.attrPrio[name] ?? 0);
            return a;
        }, {
        }),
        level: {
            num: 0,
            progress: {
                cur: 0,
                max: 0
            }
        },
        action: {
            name: knownHeroActions[0].name,
            title: '?',
            progress: {
                cur: 0,
                max: 0
            }
        },
        zone: {
            type: ZoneType.Town,
            biome: Trait.None
        },
        gold: 0,
        gear: [],
        bag: []
    };
    levelUp(hero);
    lootItems(hero, [
        rollGearItem(hero, GearSource.Drop, GearSlot.MainHand)
    ]);
    updateZone(hero, ZoneType.Town);
    advanceAction(hero);
    return hero;
}
const stats = {
    time: 0,
    timeSpent: {
        town: 0,
        wilderness: 0,
        traveling: 0,
        combat: 0,
        resting: 0,
        selling: 0,
        buying: 0,
        quest: 0
    },
    expGained: {
        mob: 0,
        quest: 0
    },
    goldCollected: {
        mob: 0,
        quest: 0,
        junk: 0
    },
    goldSpent: {
        gear: 0
    },
    itemsLootedByQuality: Object.values(ItemQuality).reduce((a, c)=>{
        a[c] = 0;
        return a;
    }, {
    }),
    gearItemsLootedByQuality: Object.values(ItemQuality).reduce((a, c)=>{
        a[c] = 0;
        return a;
    }, {
    }),
    gearItemsLootedBySlot: Object.values(GearSlot).reduce((a, c)=>{
        a[c] = 0;
        return a;
    }, {
    }),
    gearItemsLootedBySource: Object.values(GearSource).reduce((a, c)=>{
        a[c] = 0;
        return a;
    }, {
    }),
    gearItemsEquipped: 0,
    itemsLostInGold: 0,
    mobsKilled: Object.values(MobMight).reduce((a, c)=>{
        a[c] = 0;
        return a;
    }, {
    }),
    questsPassed: 0,
    levelUpTimestamps: [
        0
    ],
    levelUpGoldstamps: [
        0
    ]
};
function dump(hero) {
    console.log('==================================================== TIME:', __default.duration(stats.time), '==== GOLD:', __default.gold(hero.gold));
    console.log('#### HERO', hero);
    console.log('#### STATS', stats);
    console.log('#### TIME SPENT BREAKDOWN');
    console.table(Object.keys(stats.timeSpent).map((k)=>{
        const v = stats.timeSpent[k];
        return {
            k,
            v,
            '%': __default.progress({
                cur: v,
                max: stats.time
            }, 1)
        };
    }));
    console.log('#### GEAR');
    console.table(hero.gear);
    console.table(Object.values(hero.gear).map((e)=>{
        const a = e?.gear?.attr || {
        };
        return {
            slot: e?.gear?.slot ?? '-',
            str: a.str ?? '-',
            dex: a.dex ?? '-',
            int: a.int ?? '-',
            sta: a.sta ?? '-'
        };
    }));
    console.log('#### BAG');
    console.table(hero.bag);
    console.log('#### LEVEL || TIME TO LEVEL || TIME AT LEVEL || GOLD COLLECTED');
    const totalGoldCollected = Object.values(stats.goldCollected).reduce((a, c)=>a + c
    , 0);
    console.table(stats.levelUpTimestamps.map((e, i, a)=>{
        const et = __default.duration(e);
        const dt = __default.duration((i < a.length - 1 ? a[i + 1] : stats.time) - e);
        const dg = __default.gold((i < a.length - 1 ? stats.levelUpGoldstamps[i + 1] : totalGoldCollected) - stats.levelUpGoldstamps[i]);
        return [
            et,
            dt,
            dg
        ];
    }));
    console.log('====================================================');
}
const version = ()=>5
;
const game = {
    version: `pqnext-${version()}-210301`,
    languages: ()=>__default3.languages()
    ,
    text: (lang, key, args = {
    })=>__default3.text(lang, key, args)
    ,
    races: ()=>__default1.races.map(({ name , title , desc  })=>{
            return {
                name,
                title,
                desc
            };
        })
    ,
    classes: ()=>__default1.classes.map(({ name , title , desc  })=>{
            return {
                name,
                title,
                desc
            };
        })
    ,
    attributes: ()=>__default1.attributes.map(({ name , title , desc , format , primary  })=>{
            return {
                name,
                title,
                desc,
                format,
                primary
            };
        })
    ,
    gearSlots: ()=>__default1.gearSlots.map(({ name , title  })=>{
            return {
                name,
                title
            };
        })
    ,
    rollAttr,
    rollName: __default3.rollCharName,
    create: createHero
};
const __default4 = {
    ...game,
    advanceTime,
    dump
};
export { __default4 as default };
function migrate(obj) {
    if (obj.ver == 1) {
        obj.gear = Object.values(obj.gear);
        obj.ver = 2;
        return true;
    }
    if (obj.ver == 2) {
        obj.attr.curMp = obj.attr.maxMp;
        obj.ver = 3;
        return true;
    }
    if (obj.ver == 3) {
        obj.lang = 'ua';
        obj.ver = 4;
        return true;
    }
    if (obj.ver == 4) {
        if (obj.action.name == 'afk') {
            obj.action.name = 'sell-junk';
        }
        obj.ver = 5;
        return true;
    }
    return false;
}
if (!window.Deno) {
    let activeIntervalId = 0;
    window.game = {
        ...game,
        save: (hero)=>{
            if (hero) {
                window.localStorage.hero = JSON.stringify(hero);
            }
        },
        load: ()=>{
            if (window.localStorage.hero) {
                const obj = JSON.parse(window.localStorage.hero);
                if (obj.ver == version()) {
                    return obj;
                } else {
                    console.log(`Saved hero version mismatch. Migrating from v${obj.ver} to v${version()}...`);
                    while(migrate(obj) && obj.ver != version()){
                    }
                    if (obj.ver == version()) {
                        console.log('Success.');
                        return obj;
                    } else {
                        console.log('Failure. Probably the hero cannot be restored ._. Please create new one');
                    }
                }
            }
        },
        start: (hero)=>{
            if (!activeIntervalId && hero && hero.ver == version()) {
                activeIntervalId = setInterval(()=>{
                    advanceTime(hero);
                }, 1000);
            }
        },
        stop: ()=>{
            if (activeIntervalId > 0) {
                clearInterval(activeIntervalId);
                activeIntervalId = 0;
            }
        },
        playing: ()=>activeIntervalId > 0
    };
}
