import game from './src/game.ts'

const hero = game.createHero(game.rollName(), 'human', 'warrior', game.rollAttr())

for (let t = 0; t < (60 * 60 * 24) * 10; t++) {
    game.advanceTime(hero)
}

game.dump(hero)
