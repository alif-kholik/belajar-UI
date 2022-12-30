import Layout from 'components/Layout'
import moment from 'moment'
import excuteQuery from 'utils/DataBaseConnection'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Find from 'utils/Find'

const Page = ({ data }) => {

  const [ProductList, setProductList] = useState(data)

  return (
    <Layout>
      <section className={`mb-[30px] flex items-center gap-[20px]`}>
        <p>Cari Produk</p>
        <input onChange={ e => setProductList( Find(data.map( z => z && { ...z, data: z.name } ), e.target.value) ) } type="text" className={`bg-white w-[400px] p-[10px_20px] rounded-full`} placeholder="Cari Nama Kain"/>
      </section>
      <table className={`table-auto w-full border-collapse [&_td]:border [&_th]:border`}>
        <thead className={`bg-MO2/50 [&_th]:p-[10px]`}>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Gambar</th>
            <th>Dibuat</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            ( ProductList.length == 0 ? data : ProductList ).map((e, i) => (
              <tr key={ i } className={`[&>td]:p-[10px]`}>
                <td className={``}>{ e.id }</td>
                <td className={`${e.stock == 'ready' ? `after:content-['_Stock_Ready'] after:text-[10px] after:opacity-50` : ''} capitalize`}>{`${e.name} ${e.texture}`}{ e.bestseller && <span className={`text-sm p-[5px_14px] rounded-full text-MO1 font-semibold bg-MO2 float-right`}> Best Seller</span> }</td>
                <td>{ !e.image && <div title="Belum Ada Gambar"><Icon className={`mx-auto text-xl text-MO1`} icon="carbon:no-image"/></div> }</td>
                <td>{ moment(e.date).format('DD-MM-YYYY') }</td>
                <td>
                  <Link href={`/admin/product-edit?id=${e.id}`}>
                    <a className={`text-MO3 hover:text-MO2 bg-MO1 p-[5px_13px] text-sm font-light uppercase rounded-full text-center w-fit mx-auto block`}>Edit Produk</a>
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  // const getProductData = await fetch( process.env.NEXT_PUBLIC_API + '/product.php?q=list' )
  // const _getProductData = await getProductData.json()

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
    date: moment(e.date).format('YYYY-MM-DD'),
    suitable: e.suitable.toLowerCase(),
    type: JSON.parse(e.type),
    bestseller: e.bestseller == 1,
    stock: e.stock,
    texture: e.texture
  })

  return {
    props: {
      data: DATA
    }
  }

}

export default Page