import game from './src/game.ts'

const lang = 'en'
const name = game.rollName(lang)
const attr = game.rollAttr()
const hero = game.create(lang, name, 'dwarf', 'warrior', attr)

for (let t = 0; t < (60 * 60 * 24) * 1; t++) {
    game.advanceTime(hero)
}

game.dump(hero)
