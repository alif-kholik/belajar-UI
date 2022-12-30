import BannerPreview from 'components/admin/BannerPreview'
import Layout from 'components/Layout'
import { useState } from 'react'
import BannerEdit from 'components/admin/BannerEdit'

const DATA = [
]

const Page = ({ data = DATA }) => {

  const [BannerData, setBannerData] = useState(data)
  const [Opened, setOpened] = useState(BannerData.length + 1)

  const fHandle = {
    add: e => setBannerData([...BannerData, e]),
    edited: e => setBannerData(BannerData.map( (z, x) => x == e.id ? e.data : z )),
    delete: e => setBannerData(BannerData.filter( (z, x) => x != e )),
  }

  return (
    <Layout>
      <section className={`flex flex-col gap-[30px]`}>
        <BannerPreview data={ BannerData }/>
        <div className={`flex flex-col gap-[15px] max-w-[700px] w-full mx-auto`}>
          {
            BannerData.map((e, i) => <BannerEdit edited={ fHandle.edited } deleted={ fHandle.delete } data={ e } index={ i }key={ i } status={ Opened == i } open={ () => Opened == i ? setOpened(BannerData.length + 1) : setOpened(i) }/> )
          }
          <BannerEdit index={ BannerData.length } added={ fHandle.add } status={ Opened == BannerData.length } open={ () => Opened == BannerData.length ? setOpened(BannerData.length + 1) : setOpened(BannerData.length) }/>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = async ( ctx ) => {

  const _getData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/banner' )
  const getData = await _getData.json()

  return {
      props: {
          data: getData
      }
  }

}

export default Page