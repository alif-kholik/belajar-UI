import TestimoniAddModal from 'components/admin/TestimoniAddModal'
import Layout from 'components/Layout'
import { useState } from 'react'
import Button from 'components/main/Button'
import TestimoniItem from 'components/admin/TestimoniItem'

const Page = ({ testimoniList = [] }) => {
  const [ModalAdd, setModalAdd] = useState(false)
  const [ListData, setListData] = useState(testimoniList)

  const fHandle = {
    added: e => setListData( [...ListData, e] ),
    update: u => setListData( ListData.map( e => u.id == e.id ? {id: u.id, name: u.name, image: u.image, text: u.text} : e ) ),
    delete: d => setListData( ListData.filter( e => e.id != d && e ) )
  }

  return (
    <Layout>
      { ModalAdd && <TestimoniAddModal data={ ModalAdd != true ? ModalAdd : null } updated={ fHandle.update } added={ fHandle.added } deleted={ fHandle.delete } close={ () => setModalAdd(false) }/> }
      <div>
        <Button
            text="Tambah Testimoni Baru"
            act={ () => setModalAdd(true) }
            addon='uppercase font-light'
            type='secondary'
            sharp
        />
        <div className={`grid grid-cols-2 gap-[20px] mt-[30px]`}>
          {
            ListData.map((e, i) => (
              <div onClick={ e => setModalAdd(ListData[i]) } className={`cursor-pointer`} key={ i }>
                <TestimoniItem data={ e }/>
              </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  const _TestimoniData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/testimoni' )
  const TestimoniData = await _TestimoniData.json()

  return {
    props: {
      testimoniList: TestimoniData
    }
  }

}

export default Page