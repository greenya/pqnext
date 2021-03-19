import {
    GearSlot,
    Hero,
    ItemQuality,
    Lingo,
    Mob,
    MobMight,
    // Trait
} from '../type.ts'

// import data from '../data.ts'
// import rand from '../rand.ts'

const meta = {
    name:   'en',
    title:  'English',
    icon:   'https://www.countryflags.io/gb/shiny/32.png'
}

const dict: { readonly [_: string]: string } = {

    // attributes

    'attr-str-title':       'Strength',
    'attr-str-desc':        'Increases bag capacity',
    'attr-str-format':      '+{value} Strength',

    'attr-dex-title':       'Dexterity',
    'attr-dex-desc':        'Descreases chance to lose in combat',
    'attr-dex-format':      '+{value} Dexterity',

    'attr-int-title':       'Intellect',
    'attr-int-desc':        'Increases maximum mana',
    'attr-int-format':      '+{value} Intellect',

    'attr-sta-title':       'Stamina',
    'attr-sta-desc':        'Increases maximum health',
    'attr-sta-format':      '+{value} Stamina',

    'attr-curHp-title':     'Health',
    'attr-curHp-desc':      'The higher the better',

    'attr-maxHp-title':     'Maximum Health',
    'attr-maxHp-desc':      'Increases with level and _stamina_',

    'attr-curMp-title':     'Mana',
    'attr-curMp-desc':      'Consumed in combat',

    'attr-maxMp-title':     'Maximum Mana',
    'attr-maxMp-desc':      'Increases with level and _intellect_',

    'attr-bagCap-title':    'Bag Capacity',
    'attr-bagCap-desc':     'Increases with _strength_',

    // races

    'race-human-title': 'Human',
    'race-human-desc':  'Humans can perform any role, able to get used to any conditions. They keep balance, as they never behind in any descipline, but also never truly excel at anything.\n\n[i] Attribute priority is balanced',

    'race-dwarf-title': 'Dwarf',
    'race-dwarf-desc':  'The native lands of dwarves are hard and demanding. Natural selection determined the direction of their body development.\n\n[i] _Strength_ and _stamina_ are prioritized',

    'race-elf-title':   'Elf',
    'race-elf-desc':    'Elves prefer to develop body and mind.\n\n[i] _Intellect_ and _dexterity_ are prioritized',

    // classes

    'class-warrior-title':  'Warrior',
    'class-warrior-desc':   '"Strength is the only power!", a warrior yelled and hit his head with a rusty stick. They always knew how to intimidate their foes.\n\n[i] _Strength_ is prioritized',

    'class-rogue-title':    'Rogue',
    'class-rogue-desc':     'The life of foes of a rogue is quite bright and fleeting. Often they notice him when it\'s way too late.\n\n[i] _Dexterity_ is prioritized',

    'class-mage-title':     'Mage',
    'class-mage-desc':      'In-depth study of everything a magic wand reaches. Foes are defeated with powerful spells.\n\n[i] _Intellect_ is prioritized',

    // gear slots

    'gear-slot-mainhand-title':     'Main Hand',
    'gear-slot-offhand-title':      'Off Hand',
    'gear-slot-head-title':         'Head',
    'gear-slot-shoulders-title':    'Shoulders',
    'gear-slot-chest-title':        'Chest',
    'gear-slot-back-title':         'Back',
    'gear-slot-wrist-title':        'Wrist',
    'gear-slot-hands-title':        'Hands',
    'gear-slot-waist-title':        'Waist',
    'gear-slot-legs-title':         'Legs',
    'gear-slot-feet-title':         'Feet',
    'gear-slot-neck-title':         'Neck',
    'gear-slot-finger-title':       'Finger',
    'gear-slot-trinket-title':      'Trinket',

    // hero actions

    'hero-action-intro':                'Watching intro cinematic...',
    'hero-action-accept-quest':         'Obtaining a new quest...',
    'hero-action-pass-quest':           'Completing the quest...',
    'hero-action-move-to-wilderness':   'Heading to the killing fields...',
    'hero-action-combat':               'Executing {target}...',
    'hero-action-rest':                 'Restoring mana...',
    'hero-action-move-to-town':         'Heading to the closest town...',
    'hero-action-sell-junk':            'Selling junk...',
    'hero-action-buy-gear':             'Negotiating purchase of better equipment...',

    // ui

    'ui-game-subtitle':         'Original idea from <a href="http://progressquest.com/" target="_blank">Progress Quest</a>',
    'ui-game-desc':             'Create a hero and spectate his adventures in the crazy world of never ending progress bars, dangerous enemies and rare loot.',
    'ui-language-note':         'Note: created character can only be played in the language it was created.',
    'ui-new-hero':              'New Hero',
    'ui-continue':              'Continue',
    'ui-hero-summary':          '{name}, Level {level} {class}',
    'ui-losing-prev-hero-warn': 'Previous hero, <b>{hero}</b>, will be lost in case you create new one.',
    'ui-nickname':              'Nickname',
    'ui-nickname-hint':         'Type or generate...',
    'ui-attributes':            'Attributes',
    'ui-race':                  'Race',
    'ui-class':                 'Class',
    'ui-create':                'Create',
    'ui-cancel':                'Cancel',
    'ui-level':                 'Level',
    'ui-bag':                   'Bag',
    'ui-item-count':            '{count} pcs',
    'ui-item-level':            'Level {level}',
    'ui-item-source-quest':     'Quest reward',

}

const mobMeta: readonly {
    name: string,
    single: string,
    junk: string
}[] = [
    {
        name: 'ambusher',
        single: 'insidious/moonlight/frost-eyed/blackhair_ambusher',
        junk: 'ambusher\'s_eye patch/torn boot/dull knife/cigarette lighter'
    },
    {
        name: 'ape',
        single: 'crazy/screaming/red-faced/long heel/wet nose_ape',
        junk: 'ape\'s_peeled off ear/big_finger/wisdom tooth/saliva',
    },
    {
        name: 'assassin',
        single: 'cunning/obscured/bearded/cocky_assassin',
        junk: 'assassin\'s_cut off ear/frayed belt/false eye',
    },
    {
        name: 'bandit',
        single: 'fearless/grey-toothed/one-armed/red-head_bandit',
        junk: 'bandit\'s_faded wallet/cut off finger/broken jaw',
    },
    {
        name: 'bat',
        single: 'nasty/black/night/black-eyed/grey-eyed_bat',
        junk: 'bat\'s_wing/head/chipped tooth',
    },
    {
        name: 'bear',
        single: 'furious/forest/black/tundra/mad_bear',
        junk: 'bear\'s_peeled off ear/heart/thick fur/chipped fang',
    },
    {
        name: 'bee',
        single: 'spring/striped/forest/field/swamp_bee',
        junk: 'bee\'s_antenna/sting/oculus/iridescent wing_бджоли',
    },
    {
        name: 'boar',
        single: 'irritated/bold snout/grey heel/curly tail_boar',
        junk: 'boar\'s_ear/stomach/liver/chipped hoof/grey tusk',
    },
    {
        name: 'cannibal',
        single: 'white-toothed/enraged/wide-jawed/filthy-faced_cannibal',
        junk: 'cannibal\'s_dirty nail/cut scalp/chunky club',
    },
    {
        name: 'crab',
        single: 'irritated/coastal/red-striped/white-shelled/clicking claws_crab',
        junk: 'crab\'s_white meat/eye/cracky shell/torn claw',
    },
]

function rollCharName(_: string): string {
    return '[char name]'
}

function rollMobTitle(hero: Hero, mob: Mob, might: MobMight): string {
    return `[${might} ${mob.name}]`
}

function rollMobJunkItemTitle(hero: Hero, mob: Mob): string {
    return `[junk item from ${mob.name}]`
}

function rollMobPreciousItemTitle(hero: Hero, mob: Mob): string {
    return `[precious item from ${mob.name}]`
}

function rollGearItemTitle(hero: Hero, slot: GearSlot, quality: ItemQuality): string {
    return `[${quality} ${slot}]`
}

function rollQuestTitle(hero: Hero): string {
    return `[quest]`
}

const lingo: Lingo = {
    meta,
    dict,
    rollCharName,
    rollMobTitle,
    rollMobJunkItemTitle,
    rollMobPreciousItemTitle,
    rollGearItemTitle,
    rollQuestTitle
}

export default lingo
