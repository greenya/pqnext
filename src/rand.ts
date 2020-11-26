function int(state: { seed: number }, max: number): number {
    const x = Math.sin(state.seed++) * 1e6
    return Math.floor((x - Math.floor(x)) * max)
}

function dice(state: { seed: number }, faceCount: number, targetCap = 1): boolean {
    const i = int(state, faceCount) + 1
    return targetCap >= i
}

function item<T>(state: { seed: number }, arr: readonly T[]): T {
    const i = int(state, arr.length)
    return arr[i]
}

function shuffle<T>(state: { seed: number }, arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = int(state, arr.length)
        if (i != j) {
            const t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    return arr
}

function text(state: { seed: number }, template: string): string {
    return template
        .split('_')
        .map(s => s.includes('/') ? item(state, s.split('/')) : s)
        .join(' ')
}

export default {
    int,
    dice,
    item,
    shuffle,
    text
}
