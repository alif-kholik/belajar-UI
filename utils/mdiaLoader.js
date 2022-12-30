const mdiaLoader = ({ src, width, quality }) => {
    return `http://localhost/mdia/${src}?w=${width}&q=${quality || 75}`
}

export default mdiaLoader