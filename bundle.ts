console.log('Generating bundle...')

const { diagnostics, files } = await Deno.emit('./src/game.ts', { bundle: 'esm' })

if (diagnostics.length == 0) {
    const buildstamp = new Date()
        .toISOString()
        .split('-')
        .reduce((a, c) => a + (c.length == 4 ? c.substring(2) : c.length > 4 ? c.substring(0, 2) : c), '')

    console.log(`Replacing buildstamp with "${buildstamp}"...`)
    const source = files['deno:///bundle.js'].replace(/(\[BUILDSTAMP\])/g, buildstamp)

    console.log('Writing bundle...')
    Deno.writeTextFileSync('./docs/game.js', source)

    console.log('All done.')
} else {
    console.log('Issues', diagnostics)
}
