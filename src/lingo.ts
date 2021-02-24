import {
    Hero,
    Lingo,
    LingoRoll
} from './type.ts'

import EN from './lang/en.ts'
import UA from './lang/ua.ts'

const lingos = [ EN, UA ]

function lingo(lang: string): Lingo {
    return lingos.find(e => e.meta.name == lang) || lingos[0]
}

function languages() {
    return lingos.map(e => ({
        name: e.meta.name,
        title: e.meta.title,
        icon: e.meta.icon
    }))
}

function text(lang: string, key: string, args: { [_: string]: string } = {}) {
    let result = lingo(lang).dict[key] || EN.dict[key]
    if (result) {
        for (const arg in args) {
            result = result.replace('{' + arg + '}', args[arg])
        }
        return result
    } else {
        return `[${key}]`
    }
}

const gen: LingoRoll = {
    rollCharName: (lang: string) => lingo(lang).rollCharName(lang),
    rollMobTitle: (hero: Hero, ...args) => lingo(hero.lang).rollMobTitle(hero, ...args),
    rollMobJunkItemTitle: (hero: Hero, ...args) => lingo(hero.lang).rollMobJunkItemTitle(hero, ...args),
    rollMobPreciousItemTitle: (hero: Hero, ...args) => lingo(hero.lang).rollMobPreciousItemTitle(hero, ...args),
    rollGearItemTitle: (hero: Hero, ...args) => lingo(hero.lang).rollGearItemTitle(hero, ...args),
    rollQuestTitle: (hero: Hero) => lingo(hero.lang).rollQuestTitle(hero)
}

export default {
    languages,
    text,
    ...gen
}
