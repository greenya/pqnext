const meta = {
    name:   'en',
    title:  'English',
    icon:   'https://www.countryflags.io/gb/shiny/32.png'
}

const dict: { readonly [key: string]: string } = {

    // attributes

    'attr-str-title':       'Strength',
    'attr-str-desc':        'Increases bag capacity',
    'attr-str-format':      '+X Strength',

    'attr-dex-title':       'Dexterity',
    'attr-dex-desc':        'Descreases chance to lose in combat',
    'attr-dex-format':      '+X Dexterity',

    'attr-int-title':       'Intellect',
    'attr-int-desc':        'Increases maximum mana',
    'attr-int-format':      '+X Intellect',

    'attr-sta-title':       'Stamina',
    'attr-sta-desc':        'Increases maximum health',
    'attr-sta-format':      '+X Stamina',

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
    // TODO: translate 'class-warrior-desc'

    'class-rogue-title':    'Rogue',
    // TODO: translate 'class-rogue-desc'

    'class-mage-title':     'Mage',
    // TODO: translate 'class-mage-desc'

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

    // ui

    'ui-game-subtitle':     'Original idea from <a href="http://progressquest.com/" target="_blank">Progress Quest</a>',
    'ui-game-desc':         'Create a hero and spectate his adventures in the crazy world of never ending progress bars, dangerous enemies and rare loot.',
    'ui-language-note':     'Note: created character can only be played in the language it was created.',
    'ui-new-hero':          'New Hero',
    'ui-continue':          'Continue',
    'ui-hero-summary':      '{name}, Level {level} {class}',

}

export default {
    meta,
    dict
}
