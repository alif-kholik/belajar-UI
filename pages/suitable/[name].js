import Image from 'next/future/image'
import CatalogItem from 'components/main/CatalogItem'
import Layout from 'components/Layout'

const DATA = {
  name: 'Sweater',
  image: '/suitable/dummy.jpg',
  list: [
    {
        image: '/product/dummy2.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Roberto Cavali',
        redirect: '/product/1',
        date: '2022-08-16'
    },
    {
        image: '/product/dummy.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Brokat Magnolia',
        redirect: '/product/1',
        date: '2022-08-16'
    },
    {
        image: '/product/dummy2.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Roberto Cavali',
        redirect: '/product/1',
        date: '2022-08-16'
    },
  ]
}

const Page = ({ data = DATA }) => {

  return (
    <Layout title={`Bahan Untuk ${data.name}`}>
      <section className={`p-[30px_20px] md:p-[20px]`}>
        <div className={`max-w-screen-2xl mx-auto flex flex-col md:flex-row text-center md:text-start gap-[20px] md:gap-[50px] bg-white items-center justify-center p-[30px]`}>
          <div className={`relative w-[128px]`}>
            <Image className={`block`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + data.image } layout="raw" width={ 298 } height={ 386 } alt={`${data.name} - Moeji Testimoni`}/>
          </div>
          <div className={``}>
            <h2 className={`capitalize text-[20px] md:text-[36px] leading-[100%] mb-[10px] md:mb-0`}>Bahan Kain Untuk</h2>
            <h1 className={`capitalize text-[36px] md:text-[64px] leading-[100%] font-semibold text-MO1`}>{ data.name }</h1>
          </div>
        </div>
      </section>
      <section className={`p-[20px] md:p-[20px]`}>
        <div className={`max-w-screen-2xl mx-auto flex flex-col gap-[30px]`}>
          <div className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] md:gap-[40px_30px]`}>
            {
                data.list.map((e, i) => (
                    <CatalogItem data={ e } key={ i }/>
                ))
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  const getData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable?id=' + ctx.query.name )
  const _getData = await getData.json()

  return {
    props: {
      data: _getData || []
    }
  }

}

export default Page