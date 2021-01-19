import EN from './lang/en.ts'
import UA from './lang/ua.ts'

const langs = [ EN, UA ]
let lang = EN

function languages() {
    return langs.map(e => ({ name: e.meta.name, title: e.meta.title }))
}

function setLanguage(name: string) {
    const found = langs.find(e => e.meta.name == name)
    if (found) {
        lang = found
    }
}

function text(key: string) {
    return lang.dict[key] || EN.dict[key] || key
}

export default {
    languages,
    setLanguage,
    text
}
