const meta = {
    name:   'ua',
    title:  'Українська'
}

const dict: { readonly [key: string]: string } = {

    // attributes

    'attr-str-title':       'Сила',
    'attr-str-desc':        'Збільшує ємність сумки',
    'attr-str-format':      '+X до сили',

    'attr-dex-title':       'Спритність',
    'attr-dex-desc':        'Зменьшує шанс програти бій',
    'attr-dex-format':      '+X до спритності',

    'attr-int-title':       'Інтелект',
    'attr-int-desc':        'Збільшує максимум мани',
    'attr-int-format':      '+X до інтелекту',

    'attr-sta-title':       'Витривалість',
    'attr-sta-desc':        'Збільшує максимум здоров\'я',
    'attr-sta-format':      '+X до витривалості',

    'attr-maxHp-title':     'Максимум здоров\'я',
    'attr-maxHp-desc':      'Зростає з рівнем та _витривалістю_',

    'attr-curMp-title':     'Мана',
    'attr-curMp-desc':      'Витрачається в бою',

    'attr-maxMp-title':     'Максимум мани',
    'attr-maxMp-desc':      'Зростає з рівнем та _інтелектом_',

    'attr-bagCap-title':    'Ємність сумки',
    'attr-bagCap-desc':     'Зростає з _силою_',

    // races

    'race-human-title': 'Людина',
    'race-human-desc':  'Люди добре почуваються у будь-якій ролі, приживаються до будь яких умов. Утримують баланс, не відстають в жодній дисципліні, але й не хватають зірок.\n\n[i] Пріорітет атрибутів збалансований',

    'race-dwarf-title': 'Дворф',
    'race-dwarf-desc':  'Рідні краї дворфів жорсткі та вимогливі. Природний добір визначив напрямок розвитку їхнього тіла.\n\n[i] _Сила_ та _витривалість_ в пріорітеті',

    'race-elf-title':   'Ельф',
    'race-elf-desc':    'Ельфи одночасно розвивають тіло та розум.\n\n[i] _Інтелект_ і _спритність_ в пріорітеті',

    // classes

    'class-warrior-title':  'Воїн',
    'class-warrior-desc':   '"Сила наше всьо!", скаже воїн і вдарить іржавим дрином себе по голові. Він завжди вмів залякувати своїх ворогів.\n\n[i] _Сила_ в пріорітеті',

    'class-rogue-title':    'Пройдисвіт',
    'class-rogue-desc':     'Життя ворогів пройдисвіта яскраве й швидкоплинне. Вони часто помічають його тоді коли вже запізно.\n\n[i] _Спритність_ в пріорітеті',

    'class-mage-title':     'Маг',
    'class-mage-desc':      'Поглибленне вивчення всього до чого дістає магічна паличка. Ворогів перемагають словом і ділом одночасно.\n\n[i] _Інтелект_ в пріорітеті',

    // gear slots

    'gear-slot-mainhand-title':     'Права рука',
    'gear-slot-offhand-title':      'Ліва рука',
    'gear-slot-head-title':         'Голова',
    'gear-slot-shoulders-title':    'Плечі',
    'gear-slot-chest-title':        'Груди',
    'gear-slot-back-title':         'Спина',
    'gear-slot-wrist-title':        'Зап\'ястя',
    'gear-slot-hands-title':        'Руки',
    'gear-slot-waist-title':        'Пояс',
    'gear-slot-legs-title':         'Ноги',
    'gear-slot-feet-title':         'Ступні',
    'gear-slot-neck-title':         'Шия',
    'gear-slot-finger-title':       'Палець',
    'gear-slot-trinket-title':      'Дрібничка',

}

export default {
    meta,
    dict
}
