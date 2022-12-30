import nc from "next-connect"
import excuteQuery from "utils/DataBaseConnection"
import SendEmail from "utils/SendEmail";

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

    const getBanner = await excuteQuery({
        query: `SELECT * FROM banner`
    })

    res.send( getBanner && getBanner )

})
.post( async (req, res) => {

    const DATA = req.body

    const saveBanner = await excuteQuery({
        query: `INSERT INTO banner
        (desktop, mobile, text, minitext, paragraph, link)
        VALUES ('${DATA.desktop}', '${DATA.mobile}', '${DATA.text}', '${DATA.minitext}', '${DATA.paragraph}' ,'${DATA.link}')`
    })

    res.json({ status: saveBanner ? true : false })

})
.put(async (req, res) => {

    res.send("async/await is also supported!")
  
})
.delete(async (req, res) => {

    const deleteData = await excuteQuery({
        query: `DELETE FROM banner WHERE id = ${req.body.id}`
    })

    res.send({ status: deleteData ? true : false })
  
})
  
export default handler