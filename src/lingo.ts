import EN from './lang/en.ts'
import UA from './lang/ua.ts'

const langs = [ EN, UA ]
let lang = EN

function languages() {
    return langs.map(e => ({
        name: e.meta.name,
        title: e.meta.title,
        icon: e.meta.icon
    }))
}

function setLanguage(name: string) {
    const found = langs.find(e => e.meta.name == name)
    if (found) {
        lang = found
    }
}

function text(key: string, args: { [_: string]: string } = {}) {
    let result = lang.dict[key] || EN.dict[key]
    if (result) {
        for (const arg in args) {
            result = result.replace('{' + arg + '}', args[arg])
        }
        return result
    } else {
        return key
    }
}

export default {
    languages,
    setLanguage,
    text
}
