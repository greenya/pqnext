import {
    Attribute,
    Class,
    GearSlot,
    GearSlotMeta,
    GearSource,
    ItemQuality,
    ItemQualityMeta,
    Map,
    Mob,
    Race,
    Trait
} from './type.ts'

const attributes: readonly Attribute[] = [
    {
        name: 'str',
        title: 'Сила',
        desc: 'Збільшує ємність сумки',
        format: '+X до сили',
        primary: true
    },
    {
        name: 'dex',
        title: 'Спритність',
        desc: 'Зменьшує шанс програти бій',
        format: '+X до спритності',
        primary: true
    },
    {
        name: 'int',
        title: 'Інтелект',
        desc: 'Збільшує максимум мани',
        format: '+X до інтелекту',
        primary: true
    },
    {
        name: 'sta',
        title: 'Витривалість',
        desc: 'Збільшує максимум здоров\'я',
        format: '+X до витривалості',
        primary: true
    },
    {
        name: 'maxHp',
        title: 'Максимум здоров\'я',
        desc: 'Зростає з рівнем та _витривалістю_'
    },
    {
        name: 'maxMp',
        title: 'Максимум мани',
        desc: 'Зростає з рівнем та _інтелектом_'
    },
    {
        name: 'bagCap',
        title: 'Ємність сумки',
        desc: 'Зростає з _силою_'
    }
]

const races: readonly Race[] = [
    {
        name: 'human',
        title: 'Людина',
        desc: 'Люди добре почуваються у будь-якій ролі, приживаються до будь яких умов. Утримують баланс, не відстають в жодній дисципліні, але й не хватають зірок.\n\n[i] Пріорітет атрибутів однаковий',
        attrPrio: { str: 4, dex: 4, int: 4, sta: 6 }
    },
    {
        name: 'dwarf',
        title: 'Дворф',
        desc: 'Рідні краї дворфів жорсткі та вимогливі. Природний добір визначив напрямок розвитку їхнього тіла.\n\n[i] _Сила_ та _витривалість_ в пріорітеті',
        attrPrio: { str: 5, dex: 3, int: 3, sta: 7 }
    },
    {
        name: 'elf',
        title: 'Ельф',
        desc: 'Ельфи одночасно розвивають тіло та розум.\n\n[i] _Інтелект_ і _спритність_ в пріорітеті',
        attrPrio: { str: 3, dex: 5, int: 5, sta: 5 }
    }
]

const classes: readonly Class[] = [
    {
        name: 'warrior',
        title: 'Воїн',
        desc: '"Сила наше всьо!", скаже воїн і вдарить іржавим дрином себе по голові. Він завжди вмів залякувати своїх ворогів.\n\n[i] _Сила_ в пріорітеті',
        attrPrio: { str: 3, dex: 1 },
        startItems: [
            {
                title: 'іржавий дрин',
                quality: ItemQuality.Poor,
                gear: {
                    slot: GearSlot.MainHand,
                    attr: {},
                    level: 1,
                    source: GearSource.Drop
                },
                price: 1
            }
        ]
    },
    {
        name: 'rogue',
        title: 'Пройдисвіт',
        desc: 'Життя ворогів пройдисвіта яскраве й швидкоплинне. Вони часто помічають його тоді коли вже запізно.\n\n[i] _Спритність_ в пріорітеті',
        attrPrio: { str: 1, dex: 3 },
        startItems: [
            {
                title: 'кухонний ніж',
                quality: ItemQuality.Poor,
                gear: {
                    slot: GearSlot.MainHand,
                    attr: {},
                    level: 1,
                    source: GearSource.Drop
                },
                price: 1
            }
        ]
    },
    {
        name: 'mage',
        title: 'Маг',
        desc: 'Поглибленне вивчення всього до чого дістає магічна паличка. Ворогів перемагають словом і ділом одночасно.\n\n[i] _Інтелект_ в пріорітеті',
        attrPrio: { dex: 1, int: 3 },
        startItems: [
            {
                title: 'дерев\'яна паличка',
                quality: ItemQuality.Poor,
                gear: {
                    slot: GearSlot.MainHand,
                    attr: {},
                    level: 1,
                    source: GearSource.Drop
                },
                price: 1
            }
        ]
    }
]

const biomes: readonly { level: number, biome: Trait }[] = [
    { level: 1, biome: Trait.Forest },
    { level: 10, biome: Trait.Desert },
    { level: 20, biome: Trait.Tundra },
    { level: 30, biome: Trait.Swamp },
    { level: 40, biome: Trait.Water }
]

const mobs: readonly Mob[] = [
    {
        name: 'ape',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest,
        feminine: 'скажена/криклива/червономорда/довгоп\'ята/мокроноса_мавпа',
        junk: 'облізле вухо/великий палець/зуб мудрості/слина_мавпи',
        gcm: { n: 'мавпи', r: 'мавп' }
    },
    {
        name: 'bat',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Swamp,
        masculine: 'бридкий/чорний/нічний/чорнокрилий/сіроокий_кажан',
        junk: 'крило/голова/надщерблений зуб_кажана',
        gcm: { n: 'кажани', r: 'кажанів' }
    },
    {
        name: 'bear',
        level: 8,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'розлючений/лісовий/чорний/тундровий/білий_ведмідь',
        feminine: 'розлючена/лісова/чорна/тундрова/біла_ведмедиця',
        junk: 'обдерте вухо/серце/товсте хутро/вищерблене ікло_ведмедя',
        gcm: { n: 'ведмеді', r: 'ведмедів' }
    },
    {
        name: 'bee',
        level: 6,
        trait: Trait.Beast | Trait.Insect | Trait.Forest | Trait.Swamp,
        feminine: 'яра/смугаста/лісова/польова/болотна_бджола',
        junk: 'вусик/жало/око/райдужне крило_бджоли',
        gcm: { n: 'бджоли', r: 'бджіл' }
    },
    {
        name: 'boar',
        level: 4,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'роздратований/твердорилий/сірокопитий/дрючкохвостий_кнур',
        feminine: 'роздратована/твердорила/сірокопита/дрючкохвоста_свиня',
        junk: 'вухо/шлунок/печінка/щерблене копито/сірий бивень_кнура',
        gcm: { n: 'кнури', r: 'кнурів' }
    },
    {
        name: 'crab',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Swamp | Trait.Water,
        masculine: 'розлючений/береговий/червоновусий/білопанцирний/клацаючий клешнями_краб',
        junk: 'біле м\'ясо/око/потрісканий панцир/відірвана клешня_краба',
        gcm: { n: 'краби', r: 'крабів' }
    },
    {
        name: 'crayfish',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        masculine: 'зловіщий/іловий/плоскохвостий/цокаючий_рак',
        junk: 'міцний вус/зелена луска/пробитий панцир/понівечена клешня_рака',
        gcm: { n: 'раки', r: 'раків' }
    },
    {
        name: 'crocodile',
        level: 30,
        trait: Trait.Beast | Trait.Flesh | Trait.Swamp | Trait.Water,
        masculine: 'лихий/ненажерливий/широкощелепий/шипований_крокодил',
        junk: 'темна луска/чиста сльоза/пошкоджена лапа/щільний шлунок_крокодила',
        gcm: { n: 'крокодили', r: 'крокодилів' }
    },
    {
        name: 'deer',
        level: 1,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'навіжений/лісовий/подертий/довгорогий/сірочеревий_олень',
        feminine: 'навіжена/лісова/подерта/довгорога/сірочерева_олениця',
        junk: 'товсте ребро/нирка/стерте копито/роги_оленя',
        gcm: { n: 'олені', r: 'оленів' }
    },
    {
        name: 'desert-turtle',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        feminine: 'ошаленіла/плямиста/твердопанцирна/пудова_пустельна черепаха',
        junk: 'яйце/слиз/твердий панцир_черепахи',
        gcm: { n: 'пустельні черепахи', r: 'пустельних черепах' }
    },
    {
        name: 'hawk',
        level: 22,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra,
        masculine: 'роз\'ярілий/темнокрилий/срібногрудий/клинодзьобий_яструб',
        junk: 'яйце/довге перо/мутне око/уламки дзьоба_яструба',
        gcm: { n: 'яструби', r: 'яструбів' }
    },
    {
        name: 'hyena',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        feminine: 'розлютована/голодна/плямиста/оазисна/кочова_гієна',
        junk: 'окривавлена лапа/облізла шкура/брудний хвіст_гієни',
        gcm: { n: 'гієни', r: 'гієн' }
    },
    {
        name: 'jellyfish',
        level: 30,
        trait: Trait.Beast | Trait.Water,
        feminine: 'люта/велика жовта/прозоро-плямиста/фіолетово-смугаста/мутнотіла/місячна_медуза',
        junk: 'водянисте щупальце/мезоглея_медузи',
        gcm: { n: 'медузи', r: 'медуз' }
    },
    {
        name: 'koyote',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'затятий/спритний/пустельний/смугастий/темнолапий_койот',
        junk: 'видертий кіготь/шлунок/язик_койота',
        gcm: { n: 'койоти', r: 'койотів' }
    },
    {
        name: 'lama',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        feminine: 'біснувата/польова/світловуха/довгошия/кучерява_лама',
        junk: 'сухий язик/вухо/розбите копито_лами',
        gcm: { n: 'лами', r: 'лам' }
    },
    {
        name: 'lizard',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        feminine: 'пустельна/довгоязика/темносмугаста/леопардова/драконова_ящірка',
        junk: 'яйце/довгий язик/тонка шкіра/хвіст_ящірки',
        gcm: { n: 'ящірки', r: 'ящірок' }
    },
    {
        name: 'lynx',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        feminine: 'пекельна/бродяжна/плямиста/гостровуха/гнилошкура_рись',
        junk: 'плямиста шкура/довгі вуса/зламаний кіготь/лапа_рисі',
        gcm: { n: 'рисі', r: 'рисей' }
    },
    {
        name: 'mountain-lion',
        level: 20,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        masculine: 'розлючений/обережний/блукаючий/вогнегривий/морозогривий_гірський лев',
        feminine: 'розлючена/обережна/блукаюча/вогнегрива/морозогрива_гірська левиця',
        junk: 'тяжка лапа/міцна шкура/гостре ікло_льва',
        gcm: { n: 'гірські леви', r: 'гірських левів' }
    },
    {
        name: 'mountain-ram',
        level: 20,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        masculine: 'злий/шорсткоязикий/круторогий/вузькомордий_гірський баран',
        feminine: 'зла/шорсткоязика/круторога/вузькоморда_гірська вівця',
        junk: 'печінка/хутро/копито_гірського барана',
        gcm: { n: 'гірські барани', r: 'гірських баранів' }
    },
    {
        name: 'octopus',
        level: 40,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        masculine: 'глибоководний/чорний древній/іржавоплямистий/дев\'ятиногий_восьминіг',
        junk: 'густий слиз/присоска/рвані зябра/кручене щупальце/отрута_восьминога',
        gcm: { n: 'восьминоги', r: 'восьминогів' }
    },
    {
        name: 'owl',
        level: 2,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra | Trait.Swamp,
        feminine: 'лісова/нічна/смугаста/довгопера/ширококрила_сова',
        junk: 'пазуриста лапа/довге пір\'я/чорний дзьоб_сови',
        gcm: { n: 'сови', r: 'сов' }
    },
    {
        name: 'raptor',
        level: 24,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra,
        masculine: 'степовий/ненажерливий/червоноокий/короткохвостий/хлястохвостий_раптор',
        junk: 'ціле яйце/шорохувата шкіра/серце/потуплений кіготь/сутужний хвіст_раптора',
        gcm: { n: 'раптори', r: 'рапторів' }
    },
    {
        name: 'raven',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra | Trait.Swamp,
        masculine: 'степовий/чорний/сірий/темночеревий/гостродзьобий_крук',
        junk: 'тріснувше яйце/чорне перо/око/міцний пазур_крука',
        gcm: { n: 'круки', r: 'круків' }
    },
    {
        name: 'sand-vortex',
        level: 16,
        trait: Trait.Magic | Trait.Air | Trait.Desert | Trait.Tundra,
        masculine: 'шалений/відлюдний/вітровитий/пекучий_пісчаний вихор',
        junk: 'есенція/камінь/пил_пісчаного вихору',
        gcm: { n: 'пісчані вихори', r: 'пісчаних вихорів' }
    },
    {
        name: 'sand-snake',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'прудкий/крапчатий/довжелезний/пилоплямистий/жовтосмугастий_пісчаний змій',
        feminine: 'прудка/крапчата/довжелезна/пилоплямиста/жовтосмугаста_пісчана змія',
        junk: 'видерте ікло/шкіра/хвіст/отрута_змії',
        gcm: { n: 'пісчані змії', r: 'пісчаних змій' }
    },
    {
        name: 'scavenger',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'пустельний/крикливий/приоазисний/довгодзьобий_падальник',
        junk: 'серце/шлунок/чорне перо/тріснувший дзьоб_падальника',
        gcm: { n: 'падальники', r: 'падальників' }
    },
    {
        name: 'scorpion',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'пустельний/в\'язкочорний/королівський/клацаючий клешнями_скорпіон',
        junk: 'відірвана лапа/гострокінечний хвіст/понівечена клешня/отруйна залоза_скорпіона',
        gcm: { n: 'скорпіони', r: 'скорпіонів' }
    },
    {
        name: 'sea-giant',
        level: 36,
        trait: Trait.Magic | Trait.Water,
        masculine: 'ярий/мандруючий/голодний/донний/глибоководний_морський велетень',
        junk: 'есенція/щільна луска/слина_морського велетня',
        gcm: { n: 'морські велетні', r: 'морських велетнів' }
    },
    {
        name: 'sea-snake',
        level: 28,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        masculine: 'розшалілий/кручений/напівсмугастий/товстошкірий/глибинний_морський змій',
        feminine: 'розшаліла/кручена/напівсмугаста/товстошкіра/глибинна_морська змія',
        junk: 'видертий зуб/шкіра/хвіст/отрута_змії',
        gcm: { n: 'морські змії', r: 'морських змій' }
    },
    {
        name: 'sea-turtle',
        level: 26,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra | Trait.Water,
        feminine: 'ошаленіла/зеленоплямиста/твердопанцирна/двоголова_морська черепаха',
        junk: 'яйце/легені/твердий панцир_черепахи',
        gcm: { n: 'морські черепахи', r: 'морських черепах' }
    },
    {
        name: 'shark',
        level: 38,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        feminine: 'заклята/страшна/глибоководна/гострозуба_акула',
        junk: 'велике ікло/зябра/плавник/пожухлий хвіст_акули',
        gcm: { n: 'акули', r: 'акул' }
    },
    {
        name: 'spider',
        level: 12,
        trait: Trait.Beast | Trait.Insect | Trait.Forest | Trait.Desert | Trait.Tundra | Trait.Swamp,
        masculine: 'біснуватий/лісовий/чорний/маскований/велетенський/отруйний_павук',
        feminine: 'біснувата/лісова/чорна/маскована/велетенська/отруйна_павучиха',
        junk: 'зламана лапка/довгий вусик/отруйна залоза_павука',
        gcm: { n: 'павуки', r: 'павуків' }
    },
    {
        name: 'steppe-lion',
        level: 12,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra,
        masculine: 'озвірілий/голодний/полюючий/хижоокий_степний лев',
        feminine: 'озвіріла/голодна/полююча/хижоока_степна левиця',
        junk: 'серце/дебела лапа/міцна шкура/гостре ікло_льва',
        gcm: { n: 'степні леви', r: 'степних левів' }
    },
    {
        name: 'stone-giant',
        level: 30,
        trait: Trait.Magic | Trait.Desert | Trait.Tundra,
        masculine: 'несамовитий/жорстокий/порослий травою/потрісканий_кам\'яний велетень',
        junk: 'есенція/уламки/пил_кам\'яного велетня',
        gcm: { n: 'кам\'яні велетні', r: 'кам\'яних велетнів' }
    },
    {
        name: 'tiger',
        level: 22,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra | Trait.Swamp,
        masculine: 'розгніваний/укритий/яскраво-смугастий/сталевошкурий_тигр',
        feminine: 'розгнівана/укрита/яскраво-смугаста/сталевошкура_тигриця',
        junk: 'хвіст/цупка шкура/рапате вухо/гострий кіготь/легені_тигра',
        gcm: { n: 'тигри', r: 'тигрів' }
    },
    {
        name: 'walking-tree',
        level: 18,
        trait: Trait.Magic | Trait.Forest | Trait.Tundra | Trait.Swamp,
        neuter: 'несамовите/пробуджене/порубане/випалене/тріскуче_блукаюче дерево',
        junk: 'есенція/кора/гілля/листя_блукаючого дерева',
        gcm: { n: 'блукаючі дерева', r: 'блукаючих дерев' }
    },
    {
        name: 'wolf',
        level: 1,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'здичавілий/ненаситний/голодний/лісовий/сірий_вовк',
        feminine: 'здичавіла/ненаситна/голодна/лісова/сіра_вовчиця',
        junk: 'понівечена лапа/обдерте хутро/ікло_вовка',
        gcm: { n: 'вовки', r: 'вовків' }
    },
    {
        name: 'wood-lurker',
        level: 14,
        trait: Trait.Beast | Trait.Insect | Trait.Forest | Trait.Swamp,
        masculine: 'розлючений/темнолапий/приозерний/прихований_лісовий скрадач',
        junk: 'павутина/око/сукровиця_лісового скрадача',
        gcm: { n: 'лісові скрадачі', r: 'лісових скрадачів' }
    },
]

const mobReinforcedPrefixes: readonly { gen: string, trait: Trait }[] = [
    // experienced
    { gen: 'понюхавший пороху/понюхавша пороху/понюхавше пороху', trait: Trait.Human },
    { gen: 'досвідчений/досвідчена/досвідчене', trait: Trait.Human },
    { gen: 'навчений/навчена/навчене', trait: Trait.Human },
    { gen: 'бувалий/бувала/бувале', trait: Trait.Human },
    { gen: 'знаючий/знаюча/знаюче', trait: Trait.Human },
    // aged
    { gen: 'зрілий/зріла/зріле', trait: Trait.Beast },
    { gen: 'дорослий/доросла/доросле', trait: Trait.Beast | Trait.Water },
    { gen: 'посивілий/посивіла/посивіле', trait: Trait.Beast },
    { gen: 'старий/стара/старе', trait: Trait.Beast | Trait.Magic },
    { gen: 'старезний/старезна/старезне', trait: Trait.Beast | Trait.Water },
    { gen: 'прадавній/прадавня/прадавнє', trait: Trait.Magic },
    { gen: 'дряхлий/дряхла/дряхле', trait: Trait.Beast | Trait.Water },
    { gen: 'давній/давня/давнє', trait: Trait.Magic },
    { gen: 'древній/древня/древне', trait: Trait.Magic | Trait.Water },
    { gen: 'доісторичний/доісторична/доісторичне', trait: Trait.Magic | Trait.Water },
    // sick
    { gen: 'чумний/чумна/чумне', trait: Trait.Human | Trait.Beast },
    { gen: 'проклятий/проклята/прокляте', trait: Trait.Human | Trait.Beast },
    { gen: 'покалічений/покалічена/покалічене', trait: Trait.Human | Trait.Beast },
    { gen: 'мутований/мутована/мутоване', trait: Trait.Beast },
    { gen: 'хворий/хвора/хворе', trait: Trait.Beast },
    { gen: 'хворобливий/хвороблива/хворобливе', trait: Trait.Beast },
    { gen: 'страждаючий/страждаюча/страждаюче', trait: Trait.Beast },
    { gen: 'видозмінений/видозмінена/видозмінене', trait: Trait.Beast | Trait.Magic },
    { gen: 'коматозний/коматозна/коматозне', trait: Trait.Beast },
    { gen: 'згасаючий/згасаюча/згасаюче', trait: Trait.Magic },
    // bigger/stronger
    { gen: 'кремезний/кремезна/кремезне', trait: Trait.Human | Trait.Beast | Trait.Magic },
    { gen: 'збільшений/збільшена/збільшене', trait: Trait.Magic },
    { gen: 'крупний/крупна/крупне', trait: Trait.Beast },
    { gen: 'великий/велика/велике', trait: Trait.Beast | Trait.Magic },
    { gen: 'масивний/масивна/масивне', trait: Trait.Magic },
    { gen: 'велетенський/велетенська/велетенське', trait: Trait.Beast | Trait.Magic },
    { gen: 'титанічний/титанічна/титанічне', trait: Trait.Magic }
]

const preciousItems: readonly { gen: string, trait: Trait, value: number, ggm?: boolean, ggf?: boolean, ggn?: boolean }[] = [
    // human
    { gen: 'лівий/правий_чобіт_42-го/44-го/46-го/48-го_розміру', trait: Trait.Human, value: 2, ggm: true },
    { gen: 'випрана_біла/синя/зелена/червона/чорна/смугаста_шкарпетка', trait: Trait.Human, value: 3, ggf: true },
    { gen: 'шматок/комір/рукав_брудної/чистої/заляпаної кров\'ю_сорочки', trait: Trait.Human, value: 4, ggm: true },
    { gen: 'міцна_червона/зелена/блакитна_мотузка', trait: Trait.Human, value: 5, ggf: true },
    { gen: 'рулон_щільної/тонкої/шовкової/бавовняної_тканини', trait: Trait.Human, value: 8, ggm: true },
    { gen: 'старий/подертий/вицвілий_наручний_годинник/браслет', trait: Trait.Human, value: 12, ggm: true },
    { gen: 'пляшка_білого/червоного_сухого/солодкого/напівсухого/напівсолодкого_вина', trait: Trait.Human, value: 18, ggf: true },
    { gen: 'коралі/намисто_з золота/із срібла/із зубів', trait: Trait.Human, value: 26, ggn: true },
    { gen: 'кулко_з діамантом/з рубіном/зі смарагдом/з сапфіром', trait: Trait.Human, value: 38, ggn: true },
    // flesh
    { gen: 'свіже_сире/знекровлене_м\'ясо_без запаху/з запахом', trait: Trait.Flesh, value: 4, ggn: true },
    { gen: 'ідеально/досконало/чудово/прекрасно_оброблена шкіра', trait: Trait.Flesh, value: 8, ggf: true },
    { gen: 'бездоганно_ампутований/вирізаний_знебарвлений/знекровлений/пожухлий_язик', trait: Trait.Flesh, value: 12, ggm: true },
    { gen: 'блискучий/білий_неушкоджений/міцний_передній/верхній/кутній_зуб', trait: Trait.Flesh, value: 15, ggm: true },
    { gen: 'досконале/бездоганне/ідеально нагострене/майстерно видалене_ікло', trait: Trait.Flesh, value: 21, ggn: true },
    // insect
    { gen: 'ідеально відрізана/бездоганно відтята/вціліла/неушкоджена/міцна_чорна/сіра/жовта/темна_лапка', trait: Trait.Insect, value: 3, ggf: true },
    { gen: 'довгий_вцілілий/неушкоджений/міцний/тривкий_чутливий вусик', trait: Trait.Insect, value: 6, ggm: true },
    { gen: 'вціліле/неушкоджене/міцне_чорне/сіре_жало', trait: Trait.Insect, value: 9, ggn: true },
    { gen: 'обережно відібрана_чиста/свіжа/тепла/прозора/густа/слизоподібна_сукровиця', trait: Trait.Insect, value: 14, ggf: true },
    { gen: 'неушкоджена/велетенська_отруйна залоза', trait: Trait.Insect, value: 22, ggf: true },
    // bone
    { gen: 'перетерта/дрібна/груба_кістяна сіль', trait: Trait.Bone, value: 3, ggf: true },
    { gen: 'білий/сірий/темний/чорний_кістяний пил', trait: Trait.Bone, value: 5, ggm: true },
    { gen: 'біла/зламана/порожниста_кістка', trait: Trait.Bone, value: 7, ggf: true },
    { gen: 'скалка/уламок_черепа/гомілки/ребра/тазової кістки_правильної форми', trait: Trait.Bone, value: 9, ggf: true },
    { gen: 'бездоганний/очищений_прах', trait: Trait.Bone, value: 15, ggm: true },
    // magic
    { gen: 'чиста магічна есенція', trait: Trait.Magic, value: 12, ggf: true },
    { gen: 'прозора магічна субстанція', trait: Trait.Magic, value: 16, ggf: true },
    { gen: 'крихітний/малий/великий_магічний камінь', trait: Trait.Magic, value: 24, ggm: true },
    { gen: 'кришталевий фіал з арканічною есенцією', trait: Trait.Magic, value: 36, ggm: true },
    // water
    { gen: 'міцний_знебарвлений/пожухлий/закам\'янілий_хітин', trait: Trait.Water, value: 8, ggm: true },
    { gen: 'міцний/вцілілий/неушкоджений_гострокістковий хребет', trait: Trait.Water, value: 12, ggm: true },
    { gen: 'товста_міцна/блискуча/неушкоджена_луска', trait: Trait.Water, value: 16, ggf: true },
    { gen: 'фіал із_прозорою/мутною/чистою/слизоподібною_сумішшю', trait: Trait.Water, value: 25, ggm: true }
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

const questTitles: readonly string[] = [
    'зменшити/знизити/вбавити_популяцію {mob-gcm-r}',
    '{mob-gcm-n}_занадто розплодилися/загрожують нашому врожаю/несуть небезпеку поселенню/перекрили торговий шлях',
    'принести/зібрати/добути_{number-5-20}_шкур/кликів/ікол/шлунків/нирок/сердець/есенцій_{mob-flesh-gcm-r}',
    'принести/дістати/добути/знайти/відшукати/доставити_{precious-item-ggmn}',
    '{precious-item-ggf} має бути_знайдена/повернута/відновлена/знищена'
]

const itemQualities: readonly ItemQualityMeta[] = [
    {
        name: ItemQuality.Poor,
        title: {
            m: 'кепський/жахливий/зламаний/убитий/розірваний/розтрощений/поганий/неладний/ніякий/казна-який/такий-сякий/неважний/неякісний/миршавий/стертий/порепаний',
            f: 'кепська/жахлива/зламана/убита/розірвана/розтрощена/погана/неладна/ніяка/казна-яка/така-сяка/неважна/неякісна/миршава/стерта/порепана',
            n: 'кепське/жахливе/зламане/убите/розірване/розтрощене/погане/неладне/ніяке/казна-яке/таке-сяке/неважне/неякісне/миршаве/стерте/порепане',
            x: 'кепські/жахливі/зламані/убиті/розірвані/розтрощені/погані/неладні/ніякі/казна-які/такі-сякі/неважні/неякісні/миршаві/стерті/порепані'
        },
        templates: [
            '{quality-title} {item-title}'
        ],
        level: 1,
        chance: -1, // Poor and Common share chance pool on low levels, see getItemQuality()
        priceMult: 1
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
        ],
        level: 1,
        chance: -1, // 87.9% => 1000 (all) - 100 (uncommon) - 20 (rare) - 1 (epic)
        priceMult: 5
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
            '{quality-title} {item-title}',
            '{uncommon-prefix} {quality-title} {item-title}'
        ],
        prefix: {
            m: 'магічний/зачарований/очищений/блискучий/сяйливий/сяючий/променистий/розкішний/ясний/шикарний/ефектний/палкий/палахкий/ярий/інтенсивний/завзятий/рясний',
            f: 'магічна/зачарована/очищена/блискуча/сяйлива/сяюча/промениста/розкішна/ясна/шикарна/ефектна/палка/палахка/яра/інтенсивна/завзята/рясна',
            n: 'магічне/зачароване/очищене/блискуче/сяйливе/сяюче/променисте/розкішне/ясне/шикарне/ефектне/палке/палахке/яре/інтенсивне/завзяте/рясне',
            x: 'магічні/зачаровані/очищені/блискучі/сяйливі/сяючі/променисті/розкішні/ясні/шикарні/ефектні/палкі/палахкі/ярі/інтенсивні/завзяті/рясні'
        },
        level: 7,
        chance: 121, // 10% => 100 (uncommon) + 20 (rare) + 1 (epic)
        priceMult: 20,
        attrCount: 1
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
            m: 'зоряний/сонячний/місячний/сліпучий/вогняний/полум\'яний/вітровий/водяний/іскристий/ангельский/небесний/божественний/досконалий/ідеальний/безкрайній/бездонний',
            f: 'зоряна/сонячна/місячна/сліпуча/вогняна/полум\'яна/вітрова/водяна/іскриста/ангельска/небесна/божественна/досконала/ідеальна/безкрайня/бездонна',
            n: 'зоряне/сонячне/місячне/сліпуче/вогняне/полум\'яне/вітрове/водяне/іскристе/ангельске/небесне/божественне/досконале/ідеальне/безкрайнє/бездонне',
            x: 'зоряні/сонячні/місячні/сліпучі/вогняні/полум\'яні/вітрові/водяні/іскристі/ангельскі/небесні/божественні/досконалі/ідеальні/безкрайні/бездонні'
        },
        level: 18,
        chance: 21, // 2% => 20 (rare) + 1 (epic)
        priceMult: 150,
        attrCount: 2
    },
    {
        name: ItemQuality.Epic,
        title: {
            m: 'епічний/фантастичний/казковий/міфічний/феєричний/аномальний/парадоксальний/пречудовий/чудесний/екзотичний/чудернацький',
            f: 'епічна/фантастична/казкова/міфічна/феєрична/аномальна/парадоксальна/пречудова/чудесна/екзотична/чудернацька',
            n: 'епічне/фантастичне/казкове/міфічне/феєричне/аномальне/парадоксальне/пречудове/чудесне/екзотичне/чудернацьке',
            x: 'епічні/фантастичні/казкові/міфічні/феєричні/аномальні/парадоксальні/пречудові/чудесні/екзотичні/чудернацькі'
        },
        templates: [
            '{quality-title} {item-title} {epic-suffix}',
            '{rare-prefix} {item-title} {epic-suffix}',
            '{rare-prefix} {quality-title} {item-title} {epic-suffix}'
        ],
        suffix: 'ангела/архангела/зірок/космосу/неба/полум\'я'
            + '/бійця/воїна/мага/мисливця/паладіна/монаха/друїда/чорнокнижника/шамана/гладіатора/поборника/мародера/вбивці'
            + '/монстра/чудовиська/страховиська/примари/потвори/демона/елементаля/велетня/хижака'
            + '/природи/життя/дикості/тиранії/руйнування/знищення/стихій/вихрів/торнадо/хвиль/водовороту'
            + '/сповільнення/прискорення/висушення/затоплення/випалювання/елементів/знань/вмінь/свідомості'
            + '/мисливця за скарбами/грабіжника гробниць/внутрішнього вогню/сили дворфів/мудрості ельфів',
        level: 39,
        chance: 1, // 0.1% => 1 (epic)
        priceMult: 1800,
        attrCount: 3
    }
]

const gearSlots: readonly GearSlotMeta[] = [
    {
        name: GearSlot.MainHand,
        title: 'Права рука',
        level: 1,
        priceMult: 3.5,
        items: [
            // todo: add moarrrr!
            { title: 'меч', level: 1, ggm: true }
        ]
    },
    {
        name: GearSlot.OffHand,
        title: 'Ліва рука',
        level: 1,
        priceMult: 3.2,
        items: [
            // todo: add moarrrr!
            { title: 'щит', level: 1, ggm: true }
        ]
    },
    {
        name: GearSlot.Head,
        title: 'Голова',
        level: 8,
        priceMult: 1.7,
        items: [
            { title: 'пов\'язка', level: 1, ggf: true },
            { title: 'вінок', level: 1, ggm: true },
            { title: 'панама', level: 1, ggf: true },
            { title: 'шапка', level: 2, ggf: true },
            { title: 'бриль', level: 2, ggm: true },
            { title: 'капюшон', level: 4, ggm: true },
            { title: 'кепка', level: 4, ggf: true },
            { title: 'окуляри', level: 6, ggx: true },
            { title: 'берет', level: 6, ggm: true },
            { title: 'кучма', level: 8, ggf: true },
            { title: 'зюйдвестка', level: 8, ggf: true },
            { title: 'бейсболка', level: 10, ggf: true },
            { title: 'котелок', level: 12, ggm: true },
            { title: 'циліндр', level: 14, ggm: true },
            { title: 'сомбреро', level: 16, ggn: true },
            { title: 'коло', level: 18, ggn: true },
            { title: 'ковпак', level: 20, ggm: true },
            { title: 'лінза', level: 22, ggf: true },
            { title: 'монокль', level: 24, ggm: true },
            { title: 'башлик', level: 26, ggm: true },
            { title: 'стетсон', level: 28, ggm: true },
            { title: 'шолом', level: 30, ggm: true },
            { title: 'мисюрка', level: 32, ggf: true },
            { title: 'топхельм', level: 34, ggm: true },
            { title: 'митра', level: 36, ggf: true },
            { title: 'діадема', level: 38, ggf: true },
            { title: 'тіара', level: 40, ggf: true }
        ]
    },
    {
        name: GearSlot.Shoulders,
        title: 'Плечі',
        level: 10,
        priceMult: 1.9,
        items: [
            // todo: add moarrrr!
            { title: 'наплічники', level: 1, ggx: true }
        ]
    },
    {
        name: GearSlot.Chest,
        title: 'Груди',
        level: 1,
        priceMult: 2.0,
        items: [
            // todo: add moarrrr!
            { title: 'кираса', level: 1, ggf: true }
        ]
    },
    {
        name: GearSlot.Back,
        title: 'Спина',
        level: 4,
        priceMult: 1.2,
        items: [
            // todo: add moarrrr!
            { title: 'накидка', level: 1, ggf: true }
        ]
    },
    {
        name: GearSlot.Wrist,
        title: 'Зап\'ястя',
        level: 1,
        priceMult: 1.3,
        items: [
            // todo: add moarrrr!
            { title: 'браслет', level: 1, ggm: true }
        ]
    },
    {
        name: GearSlot.Hands,
        title: 'Руки',
        level: 1,
        priceMult: 1.6,
        items: [
            // todo: add moarrrr!
            { title: 'рукавиці', level: 1, ggx: true }
        ]
    },
    {
        name: GearSlot.Waist,
        title: 'Пояс',
        level: 2,
        priceMult: 1.4,
        items: [
            // todo: add moarrrr!
            { title: 'ремінь', level: 1, ggm: true }
        ]
    },
    {
        name: GearSlot.Legs,
        title: 'Ноги',
        level: 1,
        priceMult: 1.8,
        items: [
            // todo: add moarrrr!
            { title: 'штани', level: 1, ggx: true }
        ]
    },
    {
        name: GearSlot.Feet,
        title: 'Ступні',
        level: 1,
        priceMult: 1.5,
        items: [
            // todo: add moarrrr!
            { title: 'чоботи', level: 1, ggx: true }
        ]
    },
    {
        name: GearSlot.Neck,
        title: 'Шия',
        level: 15,
        priceMult: 2.4,
        items: [
            // todo: add moarrrr!
            { title: 'коралі', level: 1, ggx: true }
        ]
    },
    {
        name: GearSlot.Finger,
        title: 'Палець',
        level: 12,
        priceMult: 2.2,
        items: [
            // todo: add moarrrr!
            { title: 'кільце', level: 1, ggn: true }
        ]
    },
    {
        name: GearSlot.Trinket,
        title: 'Дрібничка',
        level: 20,
        priceMult: 2.6,
        items: [
            // todo: add moarrrr!
            { title: 'медальйон', level: 1, ggm: true }
        ]
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
    questTitles,
    mobReinforcedPrefixes,
    mobs,
    preciousItems,
    races
}
