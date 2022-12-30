import nc from "next-connect"
import excuteQuery from "utils/DataBaseConnection"
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

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

    const getData = await excuteQuery({
        query: `SELECT * FROM testimoni`
    })

    res.send(getData)

})
.post( async (req, res) => {

    const DATA = req.body

    const insertData = await excuteQuery({
        query: `INSERT INTO testimoni (name, text, image) VALUES ('${DATA.name}', '${DATA.text}', '${DATA.image}')`
    })

    res.json({ status: true })

})
.put( async (req, res) => {

    const DATA = req.body

    const getData = await excuteQuery({
        query: `UPDATE testimoni SET name = '${DATA.name}', image = '${DATA.image}', text = '${DATA.text}' WHERE id = ${DATA.id}`
    })

    res.send({ status: getData ? true : false })

})
.delete( async (req, res) => {

    const DATA = req.body

    const deleteData = await excuteQuery({
        query: `DELETE FROM testimoni WHERE id = ${DATA.id}`
    })

    res.send({ status: deleteData ? true : false })

})
  
export default handler