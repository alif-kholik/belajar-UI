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
.get( async (req, res) => {

  if (Object.keys(req.query).length > 0) {
    
    const getData = await excuteQuery({
      query: `
        SELECT
          product.id AS id,
          product.name AS name,
          product.image AS image,
          product.description AS description,
          product.spec AS spec,
          product.type AS type,
          product.bestseller AS bestseller,
          product.color AS color,
          product.created_at AS date,
          product.stock AS stock,
          product.texture AS texture,
          GROUP_CONCAT(suitable.name) AS suitable
        FROM ((pro_sui
          INNER JOIN product ON pro_sui.product_id = product.id)
          INNER JOIN suitable ON pro_sui.suitable_id = suitable.id)
        WHERE product.id = ${req.query.id}
        GROUP BY product.id`
    })

    console.log(getData)

    const DATA = {
      id: getData[0].id,
      image: JSON.parse(getData[0].image),
      name: getData[0].name,
      date: getData[0].date,
      description: getData[0].description,
      spec: JSON.parse(getData[0].spec),
      type: JSON.parse(getData[0].type),
      bestseller: getData[0].bestseller == 1,
      stock: getData[0].stock,
      texture: getData[0].texture,
      suitable: getData[0].suitable.split(','),
      color: JSON.parse(getData[0].color).map((e) => e && {name: e.name, value: e.hex.split('#')[1]}),
      other: [
        {
            image: '/product/dummy2.jpg',
            hover: '/product/dummy2.jpg',
            name: 'Roberto Cavali',
            redirect: '/product/1',
        },
      ]
    }

    res.send(DATA)

  } else {

    const getList = await excuteQuery({
      query: `
        SELECT
          product.id,
          product.name,
          product.image,
          product.created_at AS date,
          product.type,
          product.bestseller,
          product.stock,
          product.texture,
          GROUP_CONCAT(suitable.name) AS suitable
        FROM ((pro_sui
          INNER JOIN product ON pro_sui.product_id = product.id)
          INNER JOIN suitable ON pro_sui.suitable_id = suitable.id)
        GROUP BY product.id
        ORDER BY product.name ASC
        `
    })

    var DATA = getList.map((e) => e && {
      id: e.id,
      image: JSON.parse(e.image)[0] || '',
      hover: JSON.parse(e.image)[JSON.parse(e.image).length > 1 ? 1 : 0] || '',
      name: e.name,
      redirect: `/product/${e.id}`,
      date: e.date,
      suitable: e.suitable.toLowerCase(),
      type: JSON.parse(e.type),
      bestseller: e.bestseller == 1,
      stock: e.stock,
      texture: e.texture
    })

    res.send(DATA)

  }

})
.post(async (req, res) => {

  const DATA = req.body

  const suitableInsert = DATA.suitable.map((e, i, a) => `(${DATA.id}, ${e})${i < a.length - 1 ? ',' : ''} `).join('')

  const insertData = await excuteQuery({
    query: `INSERT INTO product
    (id, name, description, spec, color, image, type, bestseller, stock, texture)
    VALUES (
      ${DATA.id},
      '${DATA.name}',
      '${DATA.desc}',
      '${JSON.stringify(DATA.spec)}',
      '${JSON.stringify(DATA.color)}',
      '${JSON.stringify(DATA.image)}',
      '${JSON.stringify(DATA.type)}',
      '${DATA.bestseller}',
      '${DATA.stock}',
      '${DATA.texture}'
    );`
  })

  const insertSuitable = await excuteQuery({
    query: `INSERT INTO pro_sui (product_id, suitable_id) VALUE ${suitableInsert}`
  })

  res.json({ status: true })

})
.put(async (req, res) => {

  const DATA = req.body

  const updateData = await excuteQuery({
    query: 
    `
    UPDATE product
    SET
      name = '${DATA.name}',
      description = '${DATA.desc}',
      spec = '${JSON.stringify(DATA.spec)}',
      color = '${JSON.stringify(DATA.color)}',
      image = '${JSON.stringify(DATA.image)}',
      type = '${JSON.stringify(DATA.type)}',
      bestseller = ${DATA.bestseller},
      stock = '${DATA.stock}',
      texture = '${DATA.texture}'
    WHERE id = ${DATA.id}
    `
  })

  const resetSuitable = await excuteQuery({
    query: `DELETE FROM pro_sui WHERE product_id = ${DATA.id}`
  })

  const suitableInsert = DATA.suitable.map((e, i, a) => `(${DATA.id}, ${e})${i < a.length - 1 ? ',' : ''} `).join('')

  const insertSuitable = await excuteQuery({
    query: `INSERT INTO pro_sui (product_id, suitable_id) VALUE ${suitableInsert}`
  })

  res.send({ status: true })
  
})
.delete(async (req, res) => {

    const DATA = req.body

    const deleteSuitable = await excuteQuery({
        query: `DELETE FROM product WHERE id = ${DATA.id};`
    })

    const deleteSuitable_prosui = await excuteQuery({
        query: `DELETE FROM pro_sui WHERE product_id = ${DATA.id};`
    })

    res.json({ status : true })
  
})
.patch(async (req, res) => {

  throw new Error("Throws me around! Error can be caught and handled.")

})
  
export default handler;