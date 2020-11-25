import {
    Attribute,
    Class,
    ItemSlot,
    ItemQuality,
    Map,
    Mob,
    Race,
    Trait,
    ItemSource
} from './type.ts'

const attributes: Attribute[] = [
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

const races: Race[] = [
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

const classes: Class[] = [
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
                    slot: ItemSlot.MainHand,
                    attr: {},
                    level: 1,
                    source: ItemSource.Drop
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
                    slot: ItemSlot.MainHand,
                    attr: {},
                    level: 1,
                    source: ItemSource.Drop
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
                    slot: ItemSlot.MainHand,
                    attr: {},
                    level: 1,
                    source: ItemSource.Drop
                },
                price: 1
            }
        ]
    }
]

const biomes = [
    { level: 1, biome: Trait.Forest },
    { level: 10, biome: Trait.Desert },
    { level: 20, biome: Trait.Tundra },
    { level: 30, biome: Trait.Swamp },
    { level: 40, biome: Trait.Water }
]

const mobs: Mob[] = [
    {
        name: 'ape',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest,
        feminine: 'скажена/криклива/червономорда/довгоп\'ята/мокроноса_мавпа',
        junk: 'облізле вухо/великий палець/зуб мудрості/слина_мавпи'
    },
    {
        name: 'bat',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Swamp,
        masculine: 'бридкий/чорний/нічний/чорнокрилий/сіроокий_кажан',
        junk: 'крило/голова/надщерблений зуб_кажана'
    },
    {
        name: 'bear',
        level: 8,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'розлючений/лісовий/чорний/тундровий/білий_ведмідь',
        feminine: 'розлючена/лісова/чорна/тундрова/біла_ведмедиця',
        junk: 'обдерте вухо/серце/товсте хутро/вищерблене ікло_ведмедя'
    },
    {
        name: 'bee',
        level: 6,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Swamp,
        feminine: 'яра/смугаста/лісова/польова/болотна_бджола',
        junk: 'вусик/жало/око/райдужне крило_бджоли'
    },
    {
        name: 'boar',
        level: 4,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'роздратований/твердорилий/сірокопитий/дрючкохвостий_кнур',
        feminine: 'роздратована/твердорила/сірокопита/дрючкохвоста_свиня',
        junk: 'вухо/шлунок/печінка/щерблене копито/сірий бивень_кнура'
    },
    {
        name: 'crab',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Swamp | Trait.Water,
        masculine: 'розлючений/береговий/червоновусий/білопанцирний/клацаючий клешнями_краб',
        junk: 'біле м\'ясо/око/потрісканий панцир/відірвана клешня_краба'
    },
    {
        name: 'crayfish',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        masculine: 'зловіщий/іловий/плоскохвостий/цокаючий_рак',
        junk: 'міцний вус/зелена луска/пробитий панцир/понівечена клешня_рака'
    },
    {
        name: 'crocodile',
        level: 30,
        trait: Trait.Beast | Trait.Flesh | Trait.Swamp | Trait.Water,
        masculine: 'лихий/ненажерливий/широкощелепий/шипований_крокодил',
        junk: 'темна луска/чиста сльоза/пошкоджена лапа/щільний шлунок_крокодила'
    },
    {
        name: 'deer',
        level: 1,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'навіжений/лісовий/подертий/довгорогий/сірочеревий_олень',
        feminine: 'навіжена/лісова/подерта/довгорога/сірочерева_олениця',
        junk: 'товсте ребро/нирка/стерте копито/роги_оленя'
    },
    {
        name: 'desert-turtle',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        feminine: 'ошаленіла/плямиста/твердопанцирна/пудова_пустельна черепаха',
        junk: 'яйце/слиз/твердий панцир_черепахи'
    },
    {
        name: 'hawk',
        level: 22,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra,
        masculine: 'роз\'ярілий/темнокрилий/срібногрудий/клинодзьобий_яструб',
        junk: 'яйце/довге перо/мутне око/уламки дзьоба_яструба'
    },
    {
        name: 'hyena',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        feminine: 'розлютована/голодна/плямиста/оазисна/кочова_гієна',
        junk: 'окривавлена лапа/облізла шкура/брудний хвіст_гієни'
    },
    {
        name: 'jellyfish',
        level: 30,
        trait: Trait.Beast | Trait.Water,
        feminine: 'люта/велика жовта/прозоро-плямиста/фіолетово-смугаста/мутнотіла/місячна_медуза',
        junk: 'водянисте щупальце/мезоглея_медузи'
    },
    {
        name: 'koyote',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'затятий/спритний/пустельний/смугастий/темнолапий_койот',
        junk: 'видертий кіготь/шлунок/язик_койота'
    },
    {
        name: 'lama',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        feminine: 'біснувата/польова/світловуха/довгошия/кучерява_лама',
        junk: 'сухий язик/вухо/розбите копито_лами'
    },
    {
        name: 'lizard',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        feminine: 'пустельна/довгоязика/темносмугаста/леопардова/драконова_ящірка',
        junk: 'яйце/довгий язик/тонка шкіра/хвіст_ящірки'
    },
    {
        name: 'lynx',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        feminine: 'пекельна/бродяжна/плямиста/гостровуха/гнилошкура_рись',
        junk: 'плямиста шкура/довгі вуса/зламаний кіготь/лапа_рисі'
    },
    {
        name: 'mountain-lion',
        level: 20,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        masculine: 'розлючений/обережний/блукаючий/вогнегривий/морозогривий_гірський лев',
        feminine: 'розлючена/обережна/блукаюча/вогнегрива/морозогрива_гірська левиця',
        junk: 'тяжка лапа/міцна шкура/гостре ікло_льва'
    },
    {
        name: 'mountain-ram',
        level: 20,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra,
        masculine: 'злий/шорсткоязикий/круторогий/вузькомордий_гірський баран',
        feminine: 'зла/шорсткоязика/круторога/вузькоморда_гірська вівця',
        junk: 'печінка/хутро/копито_гірського барана'
    },
    {
        name: 'octopus',
        level: 40,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        masculine: 'глибоководний/чорний древній/іржавоплямистий/дев\'ятиногий_восьминіг',
        junk: 'густий слиз/присоска/рвані зябра/кручене щупальце/отрута_восьминога'
    },
    {
        name: 'owl',
        level: 2,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra | Trait.Swamp,
        feminine: 'лісова/нічна/смугаста/довгопера/ширококрила_сова',
        junk: 'пазуриста лапа/довге пір\'я/чорний дзьоб_сови'
    },
    {
        name: 'raptor',
        level: 24,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra,
        masculine: 'степовий/ненажерливий/червоноокий/короткохвостий/хлястохвостий_раптор',
        junk: 'ціле яйце/шорохувата шкіра/серце/потуплений кіготь/сутужний хвіст_раптора'
    },
    {
        name: 'raven',
        level: 10,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra | Trait.Swamp,
        masculine: 'степовий/чорний/сірий/темночеревий/гостродзьобий_крук',
        junk: 'тріснувше яйце/чорне перо/око/міцний пазур_крука'
    },
    {
        name: 'sand-vortex',
        level: 16,
        trait: Trait.Magic | Trait.Air | Trait.Desert | Trait.Tundra,
        masculine: 'шалений/відлюдний/вітровитий/пекучий_пісчаний вихор',
        junk: 'есенція/камінь/пил_пісчаного вихору'
    },
    {
        name: 'sand-snake',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'прудкий/крапчатий/довжелезний/пилоплямистий/жовтосмугастий_пісчаний змій',
        feminine: 'прудка/крапчата/довжелезна/пилоплямиста/жовтосмугаста_пісчана змія',
        junk: 'видерте ікло/шкіра/хвіст/отрута_змії'
    },
    {
        name: 'scavenger',
        level: 16,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'пустельний/крикливий/приоазисний/довгодзьобий_падальник',
        junk: 'серце/шлунок/чорне перо/тріснувший дзьоб_падальника'
    },
    {
        name: 'scorpion',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert,
        masculine: 'пустельний/в\'язкочорний/королівський/клацаючий клешнями_скорпіон',
        junk: 'відірвана лапа/гострокінечний хвіст/понівечена клешня/отруйна залоза_скорпіона'
    },
    {
        name: 'sea-giant',
        level: 36,
        trait: Trait.Magic | Trait.Water,
        masculine: 'ярий/мандруючий/голодний/донний/глибоководний_морський велетень',
        junk: 'есенція/щільна луска/слина_морського велетня'
    },
    {
        name: 'sea-snake',
        level: 28,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        masculine: 'розшалілий/кручений/напівсмугастий/товстошкірий/глибинний_морський змій',
        feminine: 'розшаліла/кручена/напівсмугаста/товстошкіра/глибинна_морська змія',
        junk: 'видертий зуб/шкіра/хвіст/отрута_змії'
    },
    {
        name: 'sea-turtle',
        level: 26,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra | Trait.Water,
        feminine: 'ошаленіла/зеленоплямиста/твердопанцирна/двоголова_морська черепаха',
        junk: 'яйце/легені/твердий панцир_черепахи'
    },
    {
        name: 'shark',
        level: 38,
        trait: Trait.Beast | Trait.Flesh | Trait.Water,
        feminine: 'заклята/страшна/глибоководна/гострозуба_акула',
        junk: 'велике ікло/зябра/плавник/пожухлий хвіст_акули'
    },
    {
        name: 'spider',
        level: 12,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Desert | Trait.Tundra | Trait.Swamp,
        masculine: 'біснуватий/лісовий/чорний/маскований/велетенський/отруйний_павук',
        feminine: 'біснувата/лісова/чорна/маскована/велетенська/отруйна_павучиха',
        junk: 'зламана лапка/довгий вусик/отруйна залоза_павука'
    },
    {
        name: 'steppe-lion',
        level: 12,
        trait: Trait.Beast | Trait.Flesh | Trait.Desert | Trait.Tundra,
        masculine: 'озвірілий/голодний/полюючий/хижоокий_степний лев',
        feminine: 'озвіріла/голодна/полююча/хижоока_степна левиця',
        junk: 'серце/дебела лапа/міцна шкура/гостре ікло_льва'
    },
    {
        name: 'stone-giant',
        level: 30,
        trait: Trait.Magic | Trait.Desert | Trait.Tundra,
        masculine: 'несамовитий/жорстокий/порослий травою/потрісканий_кам\'яний велетень',
        junk: 'есенція/уламки/пил_кам\'яного велетня'
    },
    {
        name: 'tiger',
        level: 22,
        trait: Trait.Beast | Trait.Flesh | Trait.Tundra | Trait.Swamp,
        masculine: 'розгніваний/укритий/яскраво-смугастий/сталевошкурий_тигр',
        feminine: 'розгнівана/укрита/яскраво-смугаста/сталевошкура_тигриця',
        junk: 'хвіст/цупка шкура/рапате вухо/гострий кіготь/легені_тигра'
    },
    {
        name: 'walking-tree',
        level: 18,
        trait: Trait.Magic | Trait.Forest | Trait.Tundra | Trait.Swamp,
        neuter: 'несамовите/пробуджене/порубане/випалене/тріскуче_блукаюче дерево',
        junk: 'есенція/кора/гілля/листя_блукаючого дерева'
    },
    {
        name: 'wolf',
        level: 1,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Tundra,
        masculine: 'здичавілий/ненаситний/голодний/лісовий/сірий_вовк',
        feminine: 'здичавіла/ненаситна/голодна/лісова/сіра_вовчиця',
        junk: 'понівечена лапа/обдерте хутро/ікло_вовка'
    },
    {
        name: 'wood-lurker',
        level: 14,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest | Trait.Swamp,
        masculine: 'розлючений/темнолапий/приозерний/прихований_лісовий скрадач',
        junk: 'павутина/око/сукровиця_лісового скрадача'
    },
]

const mobReinforcedPrefixes: { gen: string, trait: Trait }[] = [
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

const preciousItems: { gen: string, trait: Trait, value: number }[] = [
    // human
    { gen: 'розірваний чобіт_42-го/44-го/46-го/48-го_розміру', trait: Trait.Human, value: 2 },
    { gen: 'випрана_біла/синя/зелена/червона/чорна/смугаста_шкарпетка', trait: Trait.Human, value: 3 },
    { gen: 'шматок/комір/рукав_брудної/чистої/заляпаної кров\'ю_сорочки', trait: Trait.Human, value: 4 },
    { gen: 'міцна_червона/зелена/блакитна_мотузка', trait: Trait.Human, value: 5 },
    { gen: 'рулон_щільної/тонкої/шовкової/бавовняної_тканини', trait: Trait.Human, value: 8 },
    { gen: 'старий наручний_годинник/браслет', trait: Trait.Human, value: 10 },
    { gen: 'пляшка_білого/червоного_сухого/солодкого/напівсухого/напівсолодкого_вина', trait: Trait.Human, value: 12 },
    { gen: 'коралі/намисто_з золота/із срібла', trait: Trait.Human, value: 20 },
    { gen: 'кулко_з діамантом/з рубіном/зі смарагдом/з сапфіром', trait: Trait.Human, value: 25 },
    // flesh
    { gen: 'свіже_сире/знекровлене_м\'ясо_без запаху/з запахом', trait: Trait.Flesh, value: 4 },
    { gen: 'ідеально/досконало/чудово/прекрасно_оброблена шкіра', trait: Trait.Flesh, value: 8 },
    { gen: 'бездоганно ампутований_знебарвлений/знекровлений/пожухлий_язик', trait: Trait.Flesh, value: 12 },
    { gen: 'блискучий/білий_неушкоджений/міцний_передній/верхній/кутній_зуб', trait: Trait.Flesh, value: 15 },
    { gen: 'досконале/бездоганне/ідеально нагострене/майстерно видалене_ікло', trait: Trait.Flesh, value: 18 },
    // bone
    { gen: 'кістяний пил/кістяна сіль', trait: Trait.Bone, value: 3 },
    { gen: 'біла/зламана/порожниста_кістка', trait: Trait.Bone, value: 6 },
    { gen: 'скалка черепа/гомілки/ребра/тазової кістки_правильної форми', trait: Trait.Bone, value: 8 },
    { gen: 'бездоганний прах', trait: Trait.Bone, value: 15 },
    // magic
    { gen: 'чиста магічна есенція', trait: Trait.Magic, value: 12 },
    { gen: 'прозора магічна субстанція', trait: Trait.Magic, value: 16 },
    { gen: 'крихітний/малий/великий_магічний камінь', trait: Trait.Magic, value: 24 },
    { gen: 'кришталевий фіал з арканічною есенцією', trait: Trait.Magic, value: 36 },
    // water
    { gen: 'міцний_знебарвлений/пожухлий/закам\'янілий_хітин', trait: Trait.Water, value: 5 },
    { gen: 'фіал із_прозорою/мутною/чистою_сумішшю', trait: Trait.Water, value: 10 }
]

const afkMessages: string[] = [
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

const itemQualities: Map<{ level: number, chance: number, attrCount: number, priceMult: number }> = {
    [ItemQuality.Poor]: {
        level: 1,
        chance: -1,
        attrCount: 0,
        priceMult: 1
    },
    [ItemQuality.Common]: {
        level: 1,
        chance: -1,
        attrCount: 0,
        priceMult: 5
    },
    [ItemQuality.Uncommon]: {
        level: 7,
        chance: 100,
        attrCount: 1,
        priceMult: 20
    },
    [ItemQuality.Rare]: {
        level: 18,
        chance: 20,
        attrCount: 2,
        priceMult: 150
    },
    [ItemQuality.Epic]: {
        level: 39,
        chance: 1,
        attrCount: 3,
        priceMult: 1800
    }
}

const itemSlots: Map<{ level: number, priceMult: number }> = {
    [ItemSlot.MainHand]: {
        level: 1,
        priceMult: 3.5
    },
    [ItemSlot.OffHand]: {
        level: 1,
        priceMult: 3.2
    },
    [ItemSlot.Head]: {
        level: 8,
        priceMult: 1.7
    },
    [ItemSlot.Shoulders]: {
        level: 10,
        priceMult: 1.9
    },
    [ItemSlot.Chest]: {
        level: 1,
        priceMult: 2.0
    },
    [ItemSlot.Back]: {
        level: 4,
        priceMult: 1.2
    },
    [ItemSlot.Wrist]: {
        level: 1,
        priceMult: 1.3
    },
    [ItemSlot.Hands]: {
        level: 1,
        priceMult: 1.6
    },
    [ItemSlot.Waist]: {
        level: 2,
        priceMult: 1.4
    },
    [ItemSlot.Legs]: {
        level: 1,
        priceMult: 1.8
    },
    [ItemSlot.Feet]: {
        level: 1,
        priceMult: 1.5
    },
    [ItemSlot.Neck]: {
        level: 15,
        priceMult: 2.4
    },
    [ItemSlot.Finger]: {
        level: 12,
        priceMult: 2.2
    },
    [ItemSlot.Trinket]: {
        level: 20,
        priceMult: 2.6
    }
}

export default {
    afkMessages,
    attributes,
    biomes,
    classes,
    itemQualities,
    itemSlots,
    mobReinforcedPrefixes,
    mobs,
    preciousItems,
    races
}
