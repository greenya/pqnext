console.log('Generating bundle...')
let [ , emit ] = await Deno.bundle('./src/game.ts')

emit = emit.replace(
    /(\[BUILDSTAMP\])/g,
    new Date().toISOString().split('-').reduce((a, c) => a + (c.length == 4 ? c.substring(2) : c.length > 4 ? c.substring(0, 2) : c), '')
)

console.log('Writing bundle...')
Deno.writeTextFileSync('./web/game.js', emit)

console.log('All done.')
