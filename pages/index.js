import Layout from 'components/Layout'
import HomeMoejiPlus from 'components/main/HomeMoejiPlus'
import ProductLayout from 'components/main/ProductLayout'
import TestimoniLayout from 'components/main/TestimoniLayout'
import SuitableLayout from 'components/main/SuitableLayout'
import HeroBanner from 'components/main/HeroBanner'
import CarouselCatalog from 'components/main/CarouselCatalog'
import excuteQuery from 'utils/DataBaseConnection'
import moment from 'moment'

const Page = ({ product = [], testimoni = [], banner = [] }) => {
  return (
    <Layout
      title={`Moeji - Bahan Sandang Pilihan`} rawtitle
      description={`Kami hadir sebagai penyedia beragam bahan sandang terpercaya sejak tahun 2020 di Bandung, Indonesia. `}
      keywords={`Kain, Supplier, Grosir, Hijab, Bandung, Murah, Berkualitas, Hijab, Gamis`}
    >
      <HeroBanner/>
      <CarouselCatalog data={ product }/>
      {/* <HomeMoejiPlus/> */}
      { testimoni.length > 0 &&<TestimoniLayout data={ testimoni }/> }
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  // const Banner = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/banner' )
  // const _Banner = await Banner.json()

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

  const _testimoniData = await excuteQuery({
    query: `SELECT * FROM testimoni`
  })

  const testimoniData = _testimoniData.map(e => e && {...e, created_at: moment(e.created_at).format('YYYY-MM-DD')})

  // const Product = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/product' )
  // const _Product = await Product.json()

  // const Testimoni = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/testimoni' )
  // const _Testimoni = await Testimoni.json()

  return {
    props: {
      // banner: _Banner,
      product: DATA.filter( a => a.bestseller ),
      testimoni: testimoniData,
    }
  }
}

export default Page