function number(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function duration(seconds: number): string {
    if (seconds < 60) {
        const v = seconds
        return Number(v).toFixed(0) + ' s'
    } else if (seconds < 60 * 60) {
        const v = seconds / 60
        return Number(v).toFixed(0) + ' m'
    } else if (seconds < 60 * 60 * 24) {
        const v = seconds / 60 / 60
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' h'
    } else if (seconds < 60 * 60 * 24 * 30) {
        const v = seconds / 60 / 60 / 24
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' d'
    } else if (seconds < 60 * 60 * 24 * 365.25) {
        const v = seconds / 60 / 60 / 24 / 30
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' M'
    } else {
        const v = seconds / 60 / 60 / 24 / 365.25
        return Number(v).toFixed(v < 10 ? 1 : 0) + ' Y'
    }
}

function gold(value: number): string {
    const c = value % 100
    value -= c
    value /= 100
    const s = value % 100
    value -= s
    value /= 100
    const g = value

    const p = []
    if (g > 0) { p.push(number(g) + 'g') }
    if (s > 0) { p.push(s + 's') }
    if (c > 0) { p.push(c + 'c') }

    return p.length > 0 ? p.join(' ') : '0c'
}

function progress(value: { cur: number, max: number }, fractionDigits = 0): string {
    return Number((value.cur * 100) / value.max).toFixed(fractionDigits) + '%'
}

export default {
    duration,
    gold,
    number,
    progress
}
