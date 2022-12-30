export default (id, title) => {
    return `${id}-${title.toLowerCase().split(' ').join('-')}`
}