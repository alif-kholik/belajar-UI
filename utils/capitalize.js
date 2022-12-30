const toCapitalize = text => {
    if (typeof(text) != 'string') return text
    return text.split(' ').map(e => e && e[0].toUpperCase() + e.substring(1)).join(' ')
}

export default toCapitalize