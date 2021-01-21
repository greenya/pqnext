console.log('Generating bundle...')

const { files } = await Deno.emit('./src/game.ts', { bundle: 'esm', compilerOptions: { checkJs: true } })
const source = files['deno:///bundle.js'].replace(
    /(\[BUILDSTAMP\])/g,
    new Date().toISOString().split('-').reduce((a, c) => a + (c.length == 4 ? c.substring(2) : c.length > 4 ? c.substring(0, 2) : c), '')
)

// fix incorrect js generation; last tested in Deno 1.7.0
// issue details: https://github.com/denoland/deno/issues/9055
// TODO: remove when Deno gets a fix
.replace('__int: __int1', 'int: __int1')

console.log('Writing bundle...')
Deno.writeTextFileSync('./docs/game.js', source)

console.log('All done.')
