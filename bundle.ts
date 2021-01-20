console.log('Generating bundle...')

const { files } = await Deno.emit('./src/game.ts', { bundle: 'esm' })
const source = files['deno:///bundle.js'].replace(
    /(\[BUILDSTAMP\])/g,
    new Date().toISOString().split('-').reduce((a, c) => a + (c.length == 4 ? c.substring(2) : c.length > 4 ? c.substring(0, 2) : c), '')
)

console.log('Writing bundle...')
Deno.writeTextFileSync('./docs/game.js', source)

console.log('All done.')
