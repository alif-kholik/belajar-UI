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

    const sendMessage = await excuteQuery({
        query: `INSERT INTO message (name, email, message)
            VALUE ('${req.body.name}','${req.body.email}', '${req.body.message}')`
    })

    res.send({ status: true })

})
.put(async (req, res) => {

    res.end("async/await is also supported!")
  
})
.patch(async (req, res) => {

    throw new Error("Throws me around! Error can be caught and handled.")

})
  
export default handler