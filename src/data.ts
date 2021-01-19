import {
    Attribute,
    Class,
    GearSlot,
    GearSlotMeta,
    GearSource,
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
        title: 'class-rogue-title',
        desc: 'class-rogue-desc',
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
        title: 'class-mage-title',
        desc: 'class-mage-desc',
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
        name: 'ambusher',
        level: 10,
        trait: Trait.Human | Trait.Forest | Trait.Desert | Trait.Swamp,
        masculine: 'підступний/нічний/кригоокий/темноволосий_душитель',
        feminine: 'підступна/нічна/кригоока/темноволоса_душителька',
        junk: 'пов\'язка на око/розірваний чобіт/тупий ніж/запальничка_душителя',
        gcm: { n: 'душителі', r: 'душителів' }
    },
    {
        name: 'ape',
        level: 18,
        trait: Trait.Beast | Trait.Flesh | Trait.Forest,
        feminine: 'скажена/криклива/червономорда/довгоп\'ята/мокроноса_мавпа',
        junk: 'облізле вухо/великий палець/зуб мудрості/слина_мавпи',
        gcm: { n: 'мавпи', r: 'мавп' }
    },
    {
        name: 'assassin',
        level: 16,
        trait: Trait.Human | Trait.Desert,
        masculine: 'хитрий/непомітний/бородатий/зухвалий_душогуб',
        feminine: 'хитра/непомітна/зеленоока/зухвала_душогубка',
        junk: 'відрізане вухо/потертий пасок/вставне око_душогуба',
        gcm: { n: 'душогуби', r: 'душогубів' }
    },
    {
        name: 'bandit',
        level: 4,
        trait: Trait.Human | Trait.Forest | Trait.Swamp,
        masculine: 'безстрашний/сірозубий/однорукий/рудоволосий_бандит',
        feminine: 'безстрашна/сірозуба/однорука/рудоволоса_бандитка',
        junk: 'вицвілий гаманець/відсічений палець/вибита щелепа_бандита',
        gcm: { n: 'бандити', r: 'бандитів' }
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
        name: 'cannibal',
        level: 28,
        trait: Trait.Human | Trait.Tundra | Trait.Swamp,
        masculine: 'білозубий/оскаженілий/широкощелепий/бруднопикий_людожер',
        feminine: 'білозуба/оскаженіла/широкощелепа/бруднопика_людожерка',
        junk: 'брудний ніготь/зрізаний скальп/кремезна дубина_людожера',
        gcm: { n: 'людожери', r: 'людожерів' }
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
        name: 'cultist',
        level: 22,
        trait: Trait.Human | Trait.Desert | Trait.Tundra,
        masculine: 'очманілий/відданий/печерний/довгорясий_культист',
        feminine: 'очманіла/віддана/печерна/довгоряса_культистка',
        junk: 'шматок мантії/сторінка книги/тріснувший посох_культиста',
        gcm: { n: 'культисти', r: 'культистів' }
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
        name: 'pirate',
        level: 22,
        trait: Trait.Human | Trait.Water,
        masculine: 'маячний/одноокий/одноногий/золотозубий/мулобородий_пірат',
        junk: 'іржавий крюк/карта скарбів/пов\'язка на око/зламана рапіра_пірата',
        gcm: { n: 'пірати', r: 'піратів' }
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
        name: 'renegade',
        level: 32,
        trait: Trait.Human | Trait.Swamp,
        masculine: 'зловісний/безжалісний/криваворукий/мовчазний_відступник',
        feminine: 'зловісна/безжалісна/криваворука/мовчазна_відступниця',
        junk: 'зірваний кулон/пробитий шолом/гральна карта/сторінка контракту_відступника',
        gcm: { n: 'відступники', r: 'відступників' }
    },
    {
        name: 'robber',
        level: 6,
        trait: Trait.Human | Trait.Forest | Trait.Tundra,
        masculine: 'гнівний/окривавлений/бритоголовий/косоокий_грабіжник',
        feminine: 'гнівна/окривавлена/бритоголова/косоока_грабіжниця',
        junk: 'затуплена сокира/жувальний табак/смердючий жупан/балаклава_грабіжника',
        gcm: { n: 'грабіжники', r: 'грабіжників' }
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
        name: 'thief',
        level: 14,
        trait: Trait.Human | Trait.Tundra | Trait.Swamp,
        masculine: 'підлий/довговусий/чорноокий/блискозубий_злодій',
        feminine: 'підла/хмуроброва/чорноока/блискозуба_злодійка',
        junk: 'іржавий палаш/погнуте кулко/розірвана пальчатка/пошматовані замітки_злодія',
        gcm: { n: 'злодії', r: 'злодіїв' }
    },
    {
        name: 'thug',
        level: 10,
        trait: Trait.Human | Trait.Forest | Trait.Desert | Trait.Swamp,
        masculine: 'незграбний/густобородий/грубопикий/темнобровий/товстопузий_головоріз',
        junk: 'сталевий різак/заплічний мішок/тріснувша попільничка/намисто з зубів жертв_головоріза',
        gcm: { n: 'головорізи', r: 'головорізів' }
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
        name: 'warlock',
        level: 26,
        trait: Trait.Human | Trait.Swamp,
        masculine: 'темноклятий/шепочучий/кривоносий/шкутильгаючий_чорнокнижник',
        feminine: 'темноклята/шепочуча/кривоноса/шкутильгаюча_чорнокнижниця',
        junk: 'пустий флакон мани/дирява накидка/згаслий кристал_чорнокнижника',
        gcm: { n: 'чорнокнижники', r: 'чорнокнижників' }
    },
    {
        name: 'wizard',
        level: 20,
        trait: Trait.Human | Trait.Forest | Trait.Tundra,
        masculine: 'сліпий/завиваючий/таврований/палаючоокий_чародій',
        feminine: 'сліпа/завиваюча/таврована/палаючоока_чародійка',
        junk: 'обгорілий свиток/фіолетовий каптур/руна знань_чародія',
        gcm: { n: 'чародії', r: 'чародіїв' }
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
            m: 'кепський/жахливий/зламаний/жебрацький/розірваний/розтрощений/поганий/неладний/ніякий/казна-який/такий-сякий/неважний/неякісний/миршавий/стертий/порепаний/дірявий/драний/жалюгідний/убогий/мізерний/нікчемний',
            f: 'кепська/жахлива/зламана/жебрацька/розірвана/розтрощена/погана/неладна/ніяка/казна-яка/така-сяка/неважна/неякісна/миршава/стерта/порепана/дірява/драна/жалюгідна/убога/мізерна/нікчемна',
            n: 'кепське/жахливе/зламане/жебрацьке/розірване/розтрощене/погане/неладне/ніяке/казна-яке/таке-сяке/неважне/неякісне/миршаве/стерте/порепане/діряве/дране/жалюгідне/убоге/мізерне/нікчемне',
            x: 'кепські/жахливі/зламані/жебрацькі/розірвані/розтрощені/погані/неладні/ніякі/казна-які/такі-сякі/неважні/неякісні/миршаві/стерті/порепані/діряві/драні/жалюгідні/убогі/мізерні/нікчемні'
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
            m: 'епічний/фантастичний/казковий/міфічний/феєричний/аномальний/неможливий/парадоксальний/пречудовий/чудесний/екзотичний/чудернацький',
            f: 'епічна/фантастична/казкова/міфічна/феєрична/аномальна/неможлива/парадоксальна/пречудова/чудесна/екзотична/чудернацька',
            n: 'епічне/фантастичне/казкове/міфічне/феєричне/аномальне/неможливе/парадоксальне/пречудове/чудесне/екзотичне/чудернацьке',
            x: 'епічні/фантастичні/казкові/міфічні/феєричні/аномальні/неможливі/парадоксальні/пречудові/чудесні/екзотичні/чудернацькі'
        },
        templates: [
            '{quality-title} {item-title} {epic-suffix}',
            '{rare-prefix} {item-title} {epic-suffix}',
            '{rare-prefix} {quality-title} {item-title} {epic-suffix}'
        ],
        suffix: 'ангела/архангела/зірок/космосу/неба/полум\'я/серця'
            + '/бійця/воїна/мага/мисливця/паладіна/монаха/друїда/чорнокнижника/шамана/гладіатора/поборника/мародера/вбивці'
            + '/монстра/чудовиська/страховиська/примари/потвори/демона/елементаля/велетня/хижака/злості/лютощі'
            + '/природи/життя/дикості/тиранії/руйнування/знищення/стихій/вихорів/торнадо/хвиль/водовороту/виру'
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
        title: 'gear-slot-mainhand-title',
        level: 1,
        priceMult: 3.5,
        items: [
            { title: 'дубина', ggf: true },
            { title: 'бита', ggf: true },
            { title: 'молоток', ggm: true },
            { title: 'сокира', ggf: true },
            { title: 'серп', ggm: true },
            { title: 'тесак', ggm: true },
            { title: 'кастет', ggm: true },
            { title: 'кортик', ggm: true },
            { title: 'сікач', ggm: true },
            { title: 'молот', ggm: true },
            { title: 'меч', ggm: true },
            { title: 'копеш', ggm: true },
            { title: 'клинок', ggm: true },
            { title: 'булава', ggf: true },
            { title: 'джамбія', ggf: true },
            { title: 'фальшіон', ggm: true },
            { title: 'томагавк', ggm: true },
            { title: 'мачете', ggn: true },
            { title: 'дирк', ggm: true },
            { title: 'крис', ggm: true },
            { title: 'копіс', ggm: true },
            { title: 'катана', ggf: true },
            { title: 'шпага', ggf: true },
            { title: 'рапіра', ggf: true },
            { title: 'ксифос', ggm: true },
            { title: 'келеп', ggm: true },
            { title: 'пірнач', ggm: true },
            { title: 'клевець', ggm: true },
            { title: 'кинджал', ggm: true },
            { title: 'палаш', ggm: true },
            { title: 'пугіо', ggm: true },
            { title: 'сай', ggm: true },
            { title: 'спатіон', ggm: true },
            { title: 'гладіус', ggm: true },
            { title: 'буздиган', ggm: true },
            { title: 'фальката', ggf: true },
            { title: 'гіршфанґер', ggm: true },
            { title: 'бойовий ціп', ggm: true },
            { title: 'бойова гиря', ggf: true },
            { title: 'моргенштерн', ggm: true },
            { title: 'кацбальгер', ggm: true },
            { title: 'чинкуеда', ggf: true },
            { title: 'сагарис', ggm: true },
            { title: 'лабрис', ggm: true }
        ]
    },
    {
        name: GearSlot.OffHand,
        title: 'gear-slot-offhand-title',
        level: 1,
        priceMult: 3.2,
        items: [
            { title: 'парасолька', ggf: true },
            { title: 'тертиця', ggf: true },
            { title: 'книга', ggf: true },
            { title: 'дошка', ggf: true },
            { title: 'лист', ggm: true },
            { title: 'куля', ggf: true },
            { title: 'фіал', ggm: true },
            { title: 'келих', ggm: true },
            { title: 'кубок', ggm: true },
            { title: 'диск', ggm: true },
            { title: 'фетиш', ggm: true },
            { title: 'ограда', ggf: true },
            { title: 'заслона', ggf: true },
            { title: 'пластина', ggf: true },
            { title: 'кружало', ggn: true },
            { title: 'завіса', ggf: true },
            { title: 'плита', ggf: true },
            { title: 'екран', ggm: true },
            { title: 'сфера', ggf: true },
            { title: 'ідол', ggm: true },
            { title: 'щит', ggm: true },
            { title: 'тарч', ggm: true },
            { title: 'аспіс', ggm: true },
            { title: 'баклер', ggm: true },
            { title: 'гоплон', ggm: true },
            { title: 'кліпеус', ggm: true },
            { title: 'павеза', ggf: true },
            { title: 'кетра', ggf: true },
            { title: 'парма', ggf: true },
            { title: 'пельта', ggf: true },
            { title: 'скутум', ggm: true },
            { title: 'туреос', ggm: true }
        ]
    },
    {
        name: GearSlot.Head,
        title: 'gear-slot-head-title',
        level: 8,
        priceMult: 1.7,
        items: [
            { title: 'пов\'язка', ggf: true },
            { title: 'вінок', ggm: true },
            { title: 'шапка', ggf: true },
            { title: 'бриль', ggm: true },
            { title: 'капюшон', ggm: true },
            { title: 'кепка', ggf: true },
            { title: 'окуляри', ggx: true },
            { title: 'берет', ggm: true },
            { title: 'кучма', ggf: true },
            { title: 'зюйдвестка', ggf: true },
            { title: 'котелок', ggm: true },
            { title: 'циліндр', ggm: true },
            { title: 'сомбреро', ggn: true },
            { title: 'коло', ggn: true },
            { title: 'койф', ggm: true },
            { title: 'ковпак', ggm: true },
            { title: 'лінза', ggf: true },
            { title: 'монокль', ggm: true },
            { title: 'башлик', ggm: true },
            { title: 'стетсон', ggm: true },
            { title: 'штурмак', ggm: true },
            { title: 'шолом', ggm: true },
            { title: 'мисюрка', ggf: true },
            { title: 'топхельм', ggm: true },
            { title: 'митра', ggf: true },
            { title: 'діадема', ggf: true },
            { title: 'тіара', ggf: true }
        ]
    },
    {
        name: GearSlot.Shoulders,
        title: 'gear-slot-shoulders-title',
        level: 10,
        priceMult: 1.9,
        items: [
            { title: 'підкладки', ggx: true },
            { title: 'накладки', ggx: true },
            { title: 'плече', ggn: true },
            { title: 'наплічники', ggx: true },
            { title: 'щитки', ggx: true },
            { title: 'погони', ggx: true },
            { title: 'еполети', ggx: true },
            { title: 'мантія', ggf: true }
        ]
    },
    {
        name: GearSlot.Chest,
        title: 'gear-slot-chest-title',
        level: 1,
        priceMult: 2.0,
        items: [
            { title: 'лейбик', ggm: true },
            { title: 'сардак', ggm: true },
            { title: 'серапе', ggn: true },
            { title: 'жупан', ggm: true },
            { title: 'тегиляй', ggm: true },
            { title: 'кептар', ggm: true },
            { title: 'куртка', ggf: true },
            { title: 'юшман', ggm: true },
            { title: 'кожух', ggm: true },
            { title: 'броня', ggf: true },
            { title: 'бехтер', ggm: true },
            { title: 'дублет', ggm: true },
            { title: 'обладунок', ggm: true },
            { title: 'гауберк', ggm: true },
            { title: 'мундир', ggm: true },
            { title: 'панцир', ggm: true },
            { title: 'кираса', ggf: true },
            { title: 'сполас', ggm: true },
            { title: 'кольчуга', ggf: true },
            { title: 'клібаніон', ggm: true },
            { title: 'ліноторакс', ggm: true },
            { title: 'бригантина', ggf: true }
        ]
    },
    {
        name: GearSlot.Back,
        title: 'gear-slot-back-title',
        level: 4,
        priceMult: 1.2,
        items: [
            { title: 'фіранка', ggf: true },
            { title: 'завіска', ggf: true },
            { title: 'накидка', ggf: true },
            { title: 'макінтош', ggm: true },
            { title: 'пелена', ggf: true },
            { title: 'шторка', ggf: true },
            { title: 'покрив', ggm: true },
            { title: 'мантія', ggf: true },
            { title: 'опанча', ggf: true },
            { title: 'попона', ggf: true },
            { title: 'ковдра', ggf: true },
            { title: 'пончо', ggn: true },
            { title: 'бунда', ggf: true },
            { title: 'рядно', ggn: true },
            { title: 'чуга', ggf: true },
            { title: 'плащ', ggm: true },
            { title: 'шкура', ggf: true },
            { title: 'саван', ggm: true },
            { title: 'крило', ggn: true }
        ]
    },
    {
        name: GearSlot.Wrist,
        title: 'gear-slot-wrist-title',
        level: 1,
        priceMult: 1.3,
        items: [
            { title: 'браслети', ggx: true },
            { title: 'бранзолети', ggx: true },
            { title: 'нарукавники', ggx: true },
            { title: 'наруччя', ggx: true },
            { title: 'поручі', ggx: true },
            { title: 'маніки', ggx: true },
            { title: 'щитки', ggx: true }
        ]
    },
    {
        name: GearSlot.Hands,
        title: 'gear-slot-hands-title',
        level: 1,
        priceMult: 1.6,
        items: [
            { title: 'рукавиці', ggx: true },
            { title: 'рукавички', ggx: true },
            { title: 'піврукавички', ggx: true },
            { title: 'пальчатки', ggx: true }
        ]
    },
    {
        name: GearSlot.Waist,
        title: 'gear-slot-waist-title',
        level: 2,
        priceMult: 1.4,
        items: [
            { title: 'пасок', ggm: true },
            { title: 'пояс', ggm: true },
            { title: 'смуга', ggf: true },
            { title: 'ремінь', ggm: true }
        ]
    },
    {
        name: GearSlot.Legs,
        title: 'gear-slot-legs-title',
        level: 1,
        priceMult: 1.8,
        items: [
            { title: 'штани', ggx: true },
            { title: 'брюки', ggx: true },
            { title: 'рейтузи', ggx: true },
            { title: 'кальсони', ggx: true },
            { title: 'ногавиці', ggx: true },
            { title: 'шаровари', ggx: true },
            { title: 'набедреники', ggx: true },
            { title: 'наголінники', ggx: true },
            { title: 'налядвенники', ggx: true },
            { title: 'бутурлики', ggx: true },
            { title: 'бриджі', ggx: true },
            { title: 'хакама', ggx: true },
            { title: 'кюлоти', ggx: true }
        ]
    },
    {
        name: GearSlot.Feet,
        title: 'gear-slot-feet-title',
        level: 1,
        priceMult: 1.5,
        items: [
            { title: 'бахили', ggx: true },
            { title: 'личаки', ggx: true },
            { title: 'калоші', ggx: true },
            { title: 'босоніжки', ggx: true },
            { title: 'трескури', ggx: true },
            { title: 'повстяники', ggx: true },
            { title: 'мокасини', ggx: true },
            { title: 'сандалі', ggx: true },
            { title: 'ходаки', ggx: true },
            { title: 'царухи', ggx: true },
            { title: 'капці', ggx: true },
            { title: 'опанці', ggx: true },
            { title: 'каліги', ggx: true },
            { title: 'боти', ggx: true },
            { title: 'бурки', ggx: true },
            { title: 'чоботи', ggx: true },
            { title: 'високі чоботи', ggx: true },
            { title: 'чоботи ґоу-ґоу', ggx: true },
            { title: 'ботфорти', ggx: true },
            { title: 'унти', ggx: true },
            { title: 'чув\'яки', ggx: true },
            { title: 'черевики', ggx: true },
            { title: 'котурни', ggx: true },
            { title: 'вібрами', ggx: true },
            { title: 'броги', ggx: true },
        ]
    },
    {
        name: GearSlot.Neck,
        title: 'gear-slot-neck-title',
        level: 15,
        priceMult: 2.4,
        items: [
            { title: 'ланцюжок', ggm: true },
            { title: 'коралі', ggx: true },
            { title: 'намисто', ggn: true },
            { title: 'кольє', ggn: true },
            { title: 'амулет', ggm: true },
            { title: 'кулон', ggm: true },
            { title: 'ґердан', ggm: true },
            { title: 'підвіска', ggf: true },
            { title: 'медальйон', ggm: true },
            { title: 'талісман', ggm: true },
            { title: 'гривна', ggf: true },
            { title: 'торквес', ggm: true },
            { title: 'пектораль', ggf: true }
        ]
    },
    {
        name: GearSlot.Finger,
        title: 'gear-slot-finger-title',
        level: 12,
        priceMult: 2.2,
        items: [
            { title: 'обідок', ggm: true },
            { title: 'кільце', ggn: true },
            { title: 'перстень', ggm: true },
            { title: 'каблучка', ggf: true },
            { title: 'печатка', ggf: true },
            { title: 'сигнет', ggm: true }
        ]
    },
    {
        name: GearSlot.Trinket,
        title: 'gear-slot-trinket-title',
        level: 20,
        priceMult: 2.6,
        items: [
            { title: 'сережка', ggf: true },
            { title: 'шпилька', ggf: true },
            { title: 'брошка', ggf: true },
            { title: 'брелок', ggm: true },
            { title: 'значок', ggm: true },
            { title: 'бляха', ggf: true },
            { title: 'орден', ggm: true },
            { title: 'ґудзик', ggm: true },
            { title: 'фібула', ggf: true },
            { title: 'запонки', ggx: true },
            { title: 'кліпси', ggx: true },
            { title: 'кульчики', ggx: true },
            { title: 'емблема', ggf: true },
            { title: 'знамено', ggf: true },
            { title: 'прикраса', ggf: true },
            { title: 'аксесуар', ggm: true },
            { title: 'атрибут', ggm: true },
            { title: 'відзнака', ggf: true },
            { title: 'символ', ggm: true },
            { title: 'оберег', ggm: true }
        ]
    }
]

const characterNameParts = [
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
]

const characterNameProfanity = [
    [ 'хуй', 'хор' ],
    [ 'пізд', 'под' ],
    [ 'бля', 'блу' ]
]

const itemBuyPriceMult = 10
const itemStackSize = 10

export default {
    afkMessages,
    attributes,
    biomes,
    characterNameParts,
    characterNameProfanity,
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
