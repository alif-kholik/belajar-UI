import nc from "next-connect"
import excuteQuery from "utils/DataBaseConnection"

const handler = nc({
onError: (err, req, res, next) => {
    
    console.error(err.stack);
    res.status(500).end("Something broke!")

},
onNoMatch: (req, res) => {

    res.status(404).end("Page is not found")

},
})
.get( async (req, res) => {

    var DATA

    if (req.query.id) {

        const getDATA = await excuteQuery({
            query: `SELECT * FROM message WHERE id = ${req.query.id}`
        })

        DATA = getDATA

    } else {

        const getDATA = await excuteQuery({
            query: `SELECT * FROM message ORDER BY created_at DESC`
        })

        DATA = getDATA

    }

    res.send(DATA)

})
.post( async (req, res) => {

    let status = false
    let error
    const Body = JSON.parse(req.body)

    try {
        const sendMessage = await excuteQuery({
            query: `INSERT INTO comment (name, email, comment, image, article_id)
                VALUE ('${Body.name}','${Body.email}', '${Body.text}', '${Body.image}', ${Body.article_id})`
        })
        if (sendMessage.affectedRows > 0) status = true
    } catch (err) {
        status = false
        error = err
        console.log(err)
    }

    res.send({ status: status, error: error })

})
.put(async (req, res) => {

    res.end("async/await is also supported!")
  
})
.patch(async (req, res) => {

    throw new Error("Throws me around! Error can be caught and handled.")

})
  
export default handler