import Layout from 'components/Layout'
import SuitableLayout from 'components/main/SuitableLayout'

const Page = ({ suitable }) => {
  return (
    <Layout title="Cari Bahan Kain">
      <SuitableLayout data={ suitable }/>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  const Suitable = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable?filter=true' )
  const _Suitable = await Suitable.json()

  return {
    props: {
      suitable: _Suitable.map((e) => e && {...e, redirect: `/suitable/${e.id}`}) || []
    }
  }
}

export default Page