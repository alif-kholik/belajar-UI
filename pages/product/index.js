import Layout from 'components/Layout'
import ProductLayout from 'components/main/ProductLayout'
import excuteQuery from 'utils/DataBaseConnection'
import moment from 'moment'
import SuitableLayout from 'components/main/SuitableLayout'
import toCapitalize from 'utils/Capitalize'

const Page = ({ data, suitableData }) => {
  return (
    <Layout title="Pilihan Kain">
      {/* <SuitableLayout data={ suitableData } count={ 8 }/> */}
      <ProductLayout data={ data } suitable={ suitableData }/>
    </Layout>
  )
}

export const getServerSideProps = async () => {

  // const reqProduct = await fetch( process.env.NEXT_PUBLIC_API + '/product.php?q=list' )
  // const resProduct = await reqProduct.json()

  // PRODUCT
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
  // END PRODUCT

  // const Suitable = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable?filter=true' )
  // const _Suitable = await Suitable.json()
  
  const suitable = [... new Set(DATA
  .map(e => e.suitable.split(','))
  .reduce((p, n) => true && [...p, ...n])
  .sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
  )].map(e => e && {name: toCapitalize(e)})

  return {
    props: {
      data: DATA.sort(a => a.bestseller ? 1 : -1).sort(a => a.image ? -1 : 1 ) || [],
      suitableData: suitable,
    }
  }
}

export default Page