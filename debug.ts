import game from './src/game.ts'

const hero = game.createHero('Котигорошко', 'human', 'warrior', game.rollAttr())

for (let t = 0; t < (60 * 60 * 24) * 1; t++) { // ~45 lvl
    game.advanceTime(hero)
}

game.dump(hero)
