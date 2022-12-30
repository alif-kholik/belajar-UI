import nc from "next-connect"
import excuteQuery from "utils/DataBaseConnection";

const handler = nc({
onError: (err, req, res, next) => {

    console.error(err.stack);
    res.status(500).end("Something broke!")

},
onNoMatch: (req, res) => {

    res.status(404).end("Page is not found")

},
})
.get(async (req, res) => {

    if (req.query.id) {

        const getSuitableData = await excuteQuery({
            query: `
            SELECT
                suitable.name AS sname,
                suitable.image AS simage,
                suitable.id AS sid,
                product.id AS id,
                product.image AS image,
                product.name AS name
            FROM ((pro_sui
                INNER JOIN suitable ON pro_sui.suitable_id = suitable.id)
                INNER JOIN product ON pro_sui.product_id = product.id)
            WHERE suitable.id = ${req.query.id}
            `
        })

        console.log(getSuitableData)

        const DATA = {
            name: getSuitableData[0].sname,
            image: getSuitableData[0].simage,
            list: getSuitableData.map(e => e && {
                image: JSON.parse(e.image)[0],
                hover: JSON.parse(e.image).length > 1 ? JSON.parse(e.image)[0] : JSON.parse(e.image)[1],
                name: e.name,
                redirect: '/product/' + e.id
            })
        }

        console.log(DATA)

        res.send(DATA)

    } else {

        const suitableList = await excuteQuery({
            query: !req.query.filter ? `SELECT * FROM suitable` : `SELECT
                suitable.id,
                suitable.name,
                suitable.image
            FROM pro_sui
                INNER JOIN suitable
                ON pro_sui.suitable_id = suitable.id
            GROUP BY suitable.name
            `
        })

        res.send(suitableList)

    }

})
.post(async (req, res) => {

    const DATA = JSON.parse(req.body)

    const insertSuitable = await excuteQuery({
        query: `INSERT INTO suitable (name, image) VALUE ('${DATA.name}', '${DATA.image}')`
    })

    res.json({ status : true })

})
.put(async (req, res) => {

    const DATA = req.body

    const updateSuitable = await excuteQuery({
        query: `UPDATE suitable SET name = '${DATA.name}', image = '${DATA.image}' WHERE id = ${DATA.id}`
    })

    res.json({ status : true })
  
})
.delete(async (req, res) => {

    const DATA = JSON.parse(req.body)

    const deleteSuitable_prosui = await excuteQuery({
        query: `DELETE FROM pro_sui WHERE suitable_id = ${DATA.suitableid};`
    })

    const deleteSuitable = await excuteQuery({
        query: `DELETE FROM suitable WHERE id = ${DATA.suitableid};`
    })


    res.json({ status : deleteSuitable ? true : false })
  
})
.patch(async (req, res) => {

    throw new Error("Throws me around! Error can be caught and handled.")

})
  
export default handler