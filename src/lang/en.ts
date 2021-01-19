const meta = {
    name:   'en',
    title:  'English'
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
    // TODO: translate 'race-human-desc'

    'race-dwarf-title': 'Dwarf',
    // TODO: translate 'race-dwarf-desc'

    'race-elf-title':   'Elf',
    // TODO: translate 'race-elf-desc'

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

}

export default {
    meta,
    dict
}
