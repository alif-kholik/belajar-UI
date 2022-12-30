import Layout from 'components/Layout'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import AddSuitableModal from 'components/admin/AddSuitableModal'
import Button from 'components/main/Button'
import Loading from 'components/Loading'
import SuitableListModal from 'components/admin/SuitableListModal'
import EditSuitableModal from 'components/admin/EditSuitableModal'
import random from 'random'
import moment from 'moment'
import { useRouter } from 'next/router'
import FabricType from 'utils/FabricType'
import Modal from 'components/Modal'
import excuteQuery from 'utils/DataBaseConnection'

const Page = ({ data }) => {

  const Router = useRouter()

  const [LetModal, setLetModal] = useState(false)
  const [LetLoading, setLetLoading] = useState(false)
  const [GetData, setGetData] = useState(false)

  const [ProductImage, setProductImage] = useState([])
  const [ProductName, setProductName] = useState('')
  const [ProductDesc, setProductDesc] = useState('')
  const [ProductSpec, setProductSpec] = useState([
    {title: 'Bahan', value: ''},
    {title: 'Lebar', value: ''},
    {title: 'GSM', value: ''},
    {title: 'Min Order', value: ''},
    {title: 'Packing', value: ''},
  ])
  const [ProductSuit, setProductSuit] = useState([])
  const [ProductType, setProductType] = useState([])
  const [ProductColor, setProductColor] = useState([])
  const [ProductBestSeller, setProductBestSeller] = useState(false)
  const [ProductStock, setProductStock] = useState('ready')
  const [ProductTexture, setProductTexture] = useState('polos')
  const [TypeTag, setTypeTag] = useState(FabricType.map(e => e && {name: e, selected: false}))
  const [SuitableTag, setSuitableTag] = useState(data.suitablelist.map((e) => e && {...e, selected: false} ))

  const [SuitableModalAdd, setSuitableModalAdd] = useState(false)
  const [SuitableModalEdit, setSuitableModalEdit] = useState(false)
  const [SuitableModalList, setSuitableModalList] = useState(false)

  useEffect(() => setProductSuit(SuitableTag.filter((e) => e.selected && e)), [SuitableTag])
  useEffect(() => setProductType(TypeTag.filter((e) => e.selected && e)), [TypeTag])

  const fImage = {
    add: (e) => setProductImage([...ProductImage, e.target.files[0]]),
    remove: (id) => setProductImage(ProductImage.filter((e, i) => id != i && e))
  }

  const fSpec = {
    add: () => setProductSpec([...ProductSpec, { title: '', value: '' }]),
    edit: (type = 'title' | 'value', value, id) => setProductSpec(ProductSpec.map((e, i) => i != id ? e : {...e, [type]: value})),
    remove: (id) => setProductSpec(ProductSpec.filter((e, i) => id != i && e ))
  }

  const fSuit = {
    add: () => setSuitableModalAdd(true),
    select: (z) => setSuitableTag(SuitableTag.map( (e, i) => z != i ? e : {...e, selected: !e.selected} )),
    edit: (data) => setSuitableTag(SuitableTag.map( (e, i) => e.id != data.id ? e : {...e, name: data.name, image: data.image} )),
    remove: (id) => setSuitableTag(SuitableTag.filter((e) => id != e.id && e )),
  }

  const fType = {
    select: (z) => setTypeTag(TypeTag.map( (e, i) => z != i ? e : {...e, selected: !e.selected} )),
  }

  const fColor = {
    add: () => setProductColor([...ProductColor, { hex: '#000000', name: `${ProductColor.length + 1}. ` }]),
    edit: (type = 'name' | 'hex', value, id) => setProductColor(ProductColor.map((e, i) => i != id ? e : {...e, [type]: value})),
    remove: (index) => setProductColor(ProductColor.filter((e, i) => index != i && e ))
  }

  const fForm = {
    save: async () => {

      if (ProductSuit.length == 0 || !ProductName) {
        setLetModal({
          text: 'Isi Form',
          subtext: 'Isi Nama, Pilih Minimal 1 Tag Suitable untuk menyimpan data produk',
          button: [
            {
              text: 'tutup',
              act: () => setLetModal(false)
            }
          ]
        })
        return
      }

      setLetLoading('Menyimpan Data Produk')

      //Declaring Image Name For Upload
      var ImageUrl = []
      
      const _filedirectory = 'product/'
      
      ProductImage.map(() => {

        const _filename = `product${moment().format('YYMMDD')}${random.int(200000,900000)}.jpg`

        ImageUrl.push( _filename )

      })

      //Upload Image
      ProductImage.every( async (e, i) => {

        let data = new FormData()

        data.append('file', e)

        const sendImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=${ImageUrl[i]}&dir=${_filedirectory}` , {
            mode: 'no-cors',
            method: 'POST',
            body: data
        })

      })

      //Insert Into Database
      const BodyData = {
        id: parseInt(moment().format('YYMMDD') + random.int(0,1000)),
        image: ImageUrl.map((e) => e && '/' + _filedirectory + e),
        name: ProductName,
        desc: ProductDesc,
        spec: ProductSpec,
        suitable: ProductSuit.map((e) => e && e.id),
        type: ProductType.map((e) => e && e.name),
        bestseller: ProductBestSeller ? 1 : 0,
        color: ProductColor,
        stock: ProductStock,
        texture: ProductTexture
      }

      const insertData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(BodyData)
      })

      const _insertData = await insertData.json()

      if (_insertData.status) { 
        setLetLoading(false)
        Router.push('/admin')
      }

    },
    reset: () => {
      setProductImage([])
      setProductName('')
      setProductDesc('')
      setProductSpec([{ title: '', value: '' }])
      setProductSuit([])
      setProductType([])
      setSuitableTag(SuitableTag.map(e => e && {...e, selected: false}))
      setTypeTag(TypeTag.map(e => e && {...e, selected: false}))
      setProductColor([])
    }
  }

  return (
    <Layout>
      { LetModal && <Modal data={ LetModal }/> }
      { LetLoading && <Loading text={ LetLoading || false }/> }
      { SuitableModalAdd && <AddSuitableModal added={ (data) => setSuitableTag([...SuitableTag, data]) } close={() => setSuitableModalAdd(false) } /> }
      { SuitableModalEdit && <EditSuitableModal edited={ (data) => fSuit.edit(data) } close={() => { setSuitableModalEdit(false); setSuitableModalList(true) } } data={ SuitableModalEdit } /> }
      { SuitableModalList && <SuitableListModal openedit={ setSuitableModalEdit } openadd={ () => setSuitableModalAdd(true) } remove={ fSuit.remove } list={ SuitableTag } close={() => setSuitableModalList(false)} /> }
      <form className={`flex flex-col gap-[30px] w-full`} onSubmit={ (e) => e.preventDefault() }>

        {/** Image Input Element */}
        <div className={`flex flex-wrap gap-[20px] min-h-[200px]`}>
          {
            ProductImage.map((e, i) => (
              <div key={ i } className={`hover:shadow-lg shadow-none transition-shadow relative min-w-[150px] w-[150px] p-[10px] shrink-0 overflow-hidden bg-white rounded-[15px] [&>button]:hover:flex`}>
                <div className={`relative w-full h-full`}>
                  <Image className={`object-cover w-full rounded-[10px]`} src={ URL.createObjectURL(e) } layout="responsive" width={ 150 } height={ 200 } objectFit='contain' alt="Kain Moeji Product Image"/>
                </div>
                <button onClick={ () => fImage.remove(i) } title="Hapus Gambar" className={`text-[36px] w-full h-full bg-black/10 transition-colors hidden text-MO3/50 items-center justify-center text-center absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}>
                  <Icon icon="uiw:close" />
                </button>
              </div>
            ))
          }
            <label htmlFor={`input_image_file`} className={`cursor-pointer hover:shadow-lg shadow-none transition-shadow rounded-[15px] w-[150px] bg-white p-[10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
              <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
              <p className={`text-[12px]`}>Tambah Gambar</p>
            </label>
            <input type='file' id={`input_image_file`} className={`hidden`} onChange={ fImage.add }/>
        </div>

        {/** Name Input Element */}
        <div className={`flex flex-col gap-[5px]`}>
          <label className={`uppercase`}>Nama</label>
          <input onChange={ (e) => setProductName(e.target.value) } value={ ProductName } type='text' placeholder='Nama Produk' className={`border border-MO6/50 rounded-md p-[8px_16px] capitalize`}/>
        </div>

        {/** Description Input Element */}
        <div className={`flex flex-col gap-[5px]`}>
          <label className={`uppercase`}>Deskripsi</label>
          <textarea onChange={ (e) => setProductDesc(e.target.value) } value={ ProductDesc } type='text' rows={ 3 } placeholder='Deskripsi Produk' className={`border border-MO6/50 rounded-md p-[8px_16px] resize-y bg-transparent`}/>
        </div>

        {/* MiniForm */}
        <div className={`flex justify-between`}>

          {/** Best Seller Element */}
          <div className={`flex gap-[10px] items-center`}>
            <label htmlFor="bestseller" className={`${ProductBestSeller ? 'bg-MO1 text-MO3 border-MO1' : 'border-MO6'} border cursor-pointer rounded-full p-[8px_16px]`}>Best Seller</label>
            <input id="bestseller" className={`hidden`} onChange={ e => setProductBestSeller(e.target.checked) } checked={ ProductBestSeller } type="checkbox"/>
          </div>

          {/* Product Status */}
          <div className={`flex gap-[10px] items-center`}>
            <label>Ketersediaan:</label>
            <div>
              <label htmlFor='stock1' className={`border ${ ProductStock == "ready" ? 'bg-MO1 text-MO3 border-MO1': 'border-MO6 hover:bg-MO6'} p-[8px_16px] hover:text-MO3 cursor-pointer rounded-full `}>Ready Stock</label>
              <input id="stock1" onChange={ e => setProductStock(e.target.value) } value="ready" type="radio" name="productStock" className={`hidden`}/>
            </div>
            <div>
              <label htmlFor='stock2' className={`border ${ ProductStock == "fresh" ? 'bg-MO1 text-MO3 border-MO1': 'border-MO6 hover:bg-MO6'} p-[8px_16px] hover:text-MO3 cursor-pointer rounded-full `}>Fresh Stock</label>
              <input id="stock2" onChange={ e => setProductStock(e.target.value) } value="fresh" type="radio" name="productStock" className={`hidden`}/>
            </div>
          </div>

          {/* Product Status */}
          <div className={`flex gap-[10px] items-center`}>
            <label>Bahan:</label>
            <div>
              <label htmlFor='texture1' className={`border ${ ProductTexture == "polos" ? 'bg-MO1 text-MO3 border-MO1': 'border-MO6 hover:bg-MO6'} p-[8px_16px] hover:text-MO3 cursor-pointer rounded-full `}>Polos</label>
              <input id="texture1" onChange={ e => setProductTexture(e.target.value) } value="polos" type="radio" name="productStock" className={`hidden`}/>
            </div>
            <div>
              <label htmlFor='texture2' className={`border ${ ProductTexture == "motif" ? 'bg-MO1 text-MO3 border-MO1': 'border-MO6 hover:bg-MO6'} p-[8px_16px] hover:text-MO3 cursor-pointer rounded-full `}>Motif</label>
              <input id="texture2" onChange={ e => setProductTexture(e.target.value) } value="motif" type="radio" name="productStock" className={`hidden`}/>
            </div>
          </div>

        </div>

        {/** Spec Input Element */}
        <div className={`flex flex-col gap-[20px] p-[20px] bg-white`}>
          <label className={`uppercase mb-[-10px]`}>Spesifikasi</label>
          {
            ProductSpec.map((e, i) => (
              <div className={`flex [&>div]:w-full gap-[20px] items-end`} key={ i }>
                <div className={`flex flex-col gap-[5px] [&_label]:text-[12px]`}>
                  <label>Nama Spesifikasi</label>
                  <input onChange={ (e) => fSpec.edit( 'title', e.target.value, i )} value={ e.title } className={`border border-MO6/50 rounded-md p-[8px_16px]`} type='text' placeholder='Lebar, Panjang, Minimal Order dll'/>
                </div>
                <div className={`flex flex-col gap-[5px] [&_label]:text-[12px]`}>
                  <label>Data Spesifikasi</label>
                  <input onChange={ (e) => fSpec.edit( 'value', e.target.value, i )} value={ e.value } className={`border border-MO6/50 rounded-md p-[8px_16px]`} type='text' placeholder='150 cm, dll'/>
                </div>
                <button onClick={ () => fSpec.remove(i) } className={`text-[12px] text-red-400`}>
                  <p>Hapus</p>
                </button>
              </div>
            ))
          }
          <button onClick={ fSpec.add } className={`w-full flex items-center gap-[10px] justify-center border border-MO6/50 text-MO6/50 hover:text-MO4 hover:border-MO4 p-[10px] rounded-full`}>
            <Icon icon="carbon:add-alt" className={`text-[24px]`}/>
            <p>Tambah Data Spesifikasi Baru</p>
          </button>
        </div>

        {/** Type Input Element */}
        <div className={`flex flex-col gap-[20px]`}>
          <label className={`uppercase mb-[-10px]`}>Jenis Kain</label>
          <div className={`flex flex-wrap gap-[10px]`}>
            {
              TypeTag.map((e, i) => (
                <button onClick={ () => fType.select(i) } className={`p-[8px_16px] border rounded-full  ${e.selected ? 'bg-MO1 text-MO2 border-MO1' : 'text-MO6/50 border-MO6/50 hover:text-MO4 hover:border-MO4'}`} key={ i }>
                  <p>{ e.name }</p>
                </button>
              ))
            }
          </div>
        </div>

        {/** Suitable Input Element */}
        <div className={`flex flex-col gap-[20px]`}>
          <label className={`uppercase mb-[-10px]`}>Tag Suitable</label>
          <div className={`flex flex-wrap gap-[10px]`}>
            {
              SuitableTag.map((e, i) => (
                <button onClick={ () => fSuit.select(i) } className={`p-[8px_16px] border rounded-full  ${e.selected ? 'bg-MO1 text-MO2 border-MO1' : 'text-MO6/50 border-MO6/50 hover:text-MO4 hover:border-MO4'}`} key={ i }>
                  <p>{ e.name }</p>
                </button>
              ))
            }
            <button onClick={ fSuit.add } className={`flex items-center gap-[10px] justify-center border border-MO6/50 text-MO6/50 hover:text-MO4 hover:border-MO4 p-[8px_16px] rounded-full`}>
              <Icon icon="carbon:add-alt" className={`text-[24px]`}/>
              <p>Tambah Tag Baru</p>
            </button>
          </div>
          <button onClick={ () => setSuitableModalList(true) } className={`w-fit text-MO6 text-sm`}>
            <p>Semua Tag</p>
          </button>
        </div>
        
        {/** Color Input Element */}
        <div className={`flex flex-col gap-[30px]`}>
          <label className={`uppercase mb-[-10px]`}>Warna</label>
          <div className={`grid grid-cols-5 gap-[20px]`}>
            {
              ProductColor.map((e, i) => (
                <div className={`flex flex-col items-center gap-[0px] shadow-lg h-[230px]`} key={ i }>
                  <label htmlFor={`color_input_element_${i}`} className={`cursor-pointer [&>input]:hover:block overflow-hidden w-full h-full p-[5px]`} style={{ backgroundColor: e.hex }}>
                    <input id={`color_input_element_${i}`} type='color' onChange={(e) => fColor.edit('hex', e.target.value, i)} value={ e.hex } className={`opacity-0 hidden cursor-pointer h-full w-full rounded-full`}/>
                  </label>
                  <div className={`flex flex-col gap-[10px] [&_label]:text-[12px] w-full bg-white p-[10px]`}>
                    <input onChange={ (e) => fColor.edit( 'name', e.target.value, i )} defaultValue={`${i}. `} value={ e.name } className={`text-center first-letter:w-full border border-MO6/50 rounded-md p-[8px_16px]`} type='text' placeholder='Maroon, Navy ...'/>
                    <div onClick={ () => fColor.remove(i) } className={`w-fit text-[12px] text-red-400 mx-auto cursor-pointer hover:opacity-50`}>
                      <p>Hapus</p>
                    </div>
                  </div>
                </div>
              ))
            }
            <button onClick={ fColor.add } htmlFor={`input_image_file`} className={`cursor-pointer shadow-lg transition-shadow w-full h-[230px] bg-white p-[10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
              <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
              <p className={`text-[12px]`}>Tambah Warna</p>
            </button>
          </div>
        </div>

        {/** Submit Input Element */}
        <div className={`flex gap-[30px] sticky bottom-0 bg-MO3 p-[20px] mt-[30px]`}>
          <Button
            text="Simpan Produk"
            act={ fForm.save }
            addon='uppercase font-light'
            fullwidth
            sharp
          />
          <Button
            text="Reset"
            act={ fForm.reset }
            addon='uppercase font-light'
            type='secondary'
            fullwidth
            sharp
          />
        </div>

      </form>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  // const API_suitable = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable' )
  // const dataAPI_suitable = await API_suitable.json()

  const suitableList = await excuteQuery({
    query: !ctx.query.filter ? `SELECT * FROM suitable` : `SELECT
        suitable.id,
        suitable.name,
        suitable.image
    FROM pro_sui
        INNER JOIN suitable
        ON pro_sui.suitable_id = suitable.id
    GROUP BY suitable.name
    `
  })

  return {
    props: {     
      data: {
        suitablelist: suitableList.map((e) => e && {...e, selected: false} )
      }
    }
  }
}

export default Page