const Find = (data, text, length) => {

    if (!text || text == ' ') return []

    var result = []
    
    let query = text.toLowerCase()
    result = data.filter(item => item.data.toLowerCase().indexOf(query) >= 0)

    if (result.length == 0) {
        var text = text.toLowerCase().split('')
        return data.filter(e => {
            return text.every(el => {
                return e.data.toLowerCase().includes(el)
            })
        }).sort((a) => {
            return a.data.split('')[0].includes(text[0] ? -1 : 1)
        })
    }

    result.length = length ? length : result.length

    return result
}

export default Find

/*
if (!text) return []
var text = text.toLowerCase().split('')
return data.filter(e => {
    return text.every(el => {
        return e.data.toLowerCase().includes(el)
    })
}).sort((a) => {
    return a.data.split('')[0].includes(text[0] ? -1 : 1)
})

if (!text || text == ' ') return []
let query = text.toLowerCase()
return data.filter(item => item.data.toLowerCase().indexOf(query) >= 0)
*/