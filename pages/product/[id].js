import CatalogItem from 'components/main/CatalogItem'
import Layout from 'components/Layout'
import Image from 'next/image'
import { useState } from 'react'
import Button from 'components/main/Button'
import { useRouter } from 'next/router'
import TranslateLocal from 'utils/TranslateLocal'
import excuteQuery from 'utils/DataBaseConnection'
import moment from 'moment'
import toCapitalize from 'utils/Capitalize'

const DATA = {
  name: 'Roberto Cavali',
  date: '2022-09-01',
  description: 'Mauris sit amet massa vitae tortor condimentum lacinia. Lobortis elementum nibh tellus molestie. Lobortis feugiat vivamus at augue eget arcu dictum. Nulla facilisi morbi tempus iaculis urna.',
  image: [
    '/product/dummy3.jpg',
    '/product/dummy2.jpg',
    '/product/dummy.jpg',
  ],
  spec: [
    {
      title: 'lebar',
      value: '150 cm'
    },
    {
      title: 'pack',
      value: '+/- 50 Yard/Roll'
    },
    {
      title: 'min order',
      value: '1 seri'
    },
  ],
  suitable: ['kemeja', 'celana', 'sweater'],
  color: [
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
    {
      name: 'Maroon Red',
      value: 'A13842',
    },
  ],
  other: [
    {
        image: '/product/dummy2.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Roberto Cavali',
        redirect: '/product/1',
    },
    {
        image: '/product/dummy.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Brokat Magnolia',
        redirect: '/product/1',
    },
    {
        image: '/product/dummy2.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Roberto Cavali',
        redirect: '/product/1',
    },
    {
        image: '/product/dummy.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Roberto Cavali',
        redirect: '/product/1',
    },
  ]
}

const Page = ({ data = DATA }) => {

  const Router = useRouter()
  
  const [ImageSelected, setImageSelected] = useState(0)

  return (
    <Layout title={`${data.name}`} description={ data.description } keywords={toCapitalize(`Kain, Bahan, Supplier, ${data.name.split(' ').join(', ')}, ${data.suitable.join(', ')}`)}>
      <section className={`mb-[60px]`}>
        <div>
          <div className={`relative h-[200px] w-full items-center justify-center overflow-hidden bg-MO6  hidden md:flex`}>
            { data.image.length > 0 && <Image className={'object-cover w-full opacity-50'} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${data.image[0]}&width=1280&height=400` } layout="fill" alt={ data.name + ' - Kain Moeji'}/> }
          </div>
          <div className={`relative z-20 mt-[10px] md:mt-[-60px] max-w-screen-xl mx-auto flex flex-col md:flex-row gap-[30px_50px] [&>div]:w-full px-[20px]`}>
            <div>
              <div className={`relative w-full mb-[8px] md:mb-[15px] h-[120vw] md:h-[700px] bg-MO6 `}>
                <Image className={'object-cover w-full'} src={ data.image.length > 0 ? process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${data.image[ImageSelected]}&width=750&height=1050` : process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/notfound.jpg' } layout="fill" alt={ data.name + ' - Kain Moeji'}/>
              </div>
              <div className={`grid grid-cols-3 gap-[8px] md:gap-[15px]`}> {/* style={{ gridTemplateColumns: `repeat(${data.image.length}, minmax(0, 1fr))`}} */} 
                {
                  data.image.map((e, i) => (
                    <div onClick={ () => setImageSelected( i )} key={ i } className={`${ImageSelected == i ? 'opacity-60' : 'hover:opacity-80'} cursor-pointer relative overflow-hidden w-[100%] after:block after:contents-[''] after:pb-[100%] bg-MO6 `}>
                      <Image className={`object-cover w-full`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${e}&width=750&height=1050` } layout="fill" alt={ data.name + ' - Kain Moeji'}/>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={`flex flex-col gap-[20px] md:gap-[30px]`}>
                <h1 className={`uppercase text-[24px] md:text-[48px] leading-[100%] md:text-MO3 font-semibold md:font-normal`}>{ data.name }</h1>
                <div className={`flex gap-[5px] mb-[-15px]`}>
                  <p className={`capitalize text-MO6`}>{ data.texture } -</p>
                  <p className={`capitalize ${data.stock == 'ready' ? 'text-[#37C645]' : 'text-MO6' }`}>{ data.stock == 'ready' ? 'In Stock' : 'Fresh Order' }</p>
                </div>
                <p className={`text-[0.9rem]`}>{ data.description }</p>
                {
                  data.spec.length > 0 && (
                    <div className={`grid grid-cols-2 gap-[20px_80px] p-[20px] md:p-[30px] bg-white shadow-xl`}>
                      {
                        data.spec.map((e, i) => (
                          <div key={ i }>
                            <h3 className={`uppercase text-[12px] text-MO6`}>{ e.title }</h3>
                            <p className={`capitalize text-[20px]`}>{ e.value }</p>
                          </div>
                        ))
                      }
                    </div>
                  )
                }
                <div>
                  <h4 className={`mb-[10px]`}>{ TranslateLocal('Cocok Untuk Dijadikan', 'Suitable For', Router) }</h4>
                  <div className={`flex gap-[10px] flex-wrap`}>
                    {
                      data.suitable.map((e, i) => (
                        <p key={ i } className={`bg-white uppercase p-[8px_16px] border border-MO6/30`}>{ e }</p>
                      ))
                    }
                  </div>
                </div>
                {
                  data.color.length > 0 && (
                    <div>
                      <h4 className={`mb-[10px]`}>{ TranslateLocal('Pilihan Warna', 'Color', Router) }</h4>
                      <div className={`flex gap-[15px] flex-wrap`}>
                        {
                          data.color.map((e, i) => (
                            <div key={ i } className={`relative w-12 h-12 rounded-full [&>p]:hover:block border`} style={{ background: `#${e.value}`}}>
                              <p className={`absolute bg-white whitespace-nowrap text-[14px] p-[5px_10px] bottom-[-100%] hidden left-2/4 z-20 shadow-lg`}>{ e.name }</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
                <div className={`md:w-fit`}>
                  <Button
                    text="Pesan Sekarang"
                    href={`https://api.whatsapp.com/send?phone=6282120208315&text=Halo Kain Moeji, saya ingin pesan ${ data.name } ${ data.texture.split('')[0].toUpperCase() + data.texture.substring(1) }`}
                    addon='uppercase font-light p-[15px_30px]'
                    blank
                    sharp
                    fullwidth
                  />
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`p-[20px] md:p-[20px] mb-[50px]`}>
        <div className={`max-w-screen-xl mx-auto flex flex-col gap-[30px] xl:p-[20px]`}>
        <h3 className={`text-MO1 text-[20px] md:text-[24px] leading-[100%] text-center md:mb-[10px]`}>Lihat Produk Lainnya</h3>
          <div className={`w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] md:gap-[40px_30px]`}>
            {
                data.other.map((e, i) => (
                    <CatalogItem
                      data={ e }
                      key={ i }
                      subtext={[
                        { text: e.texture + ' -', },
                        { text: e.stock == 'ready' ? 'In Stock' : 'Fresh Order', color: e.stock == 'ready' ? 'text-[#37C645]' : false }
                      ]}
                    />
                ))
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

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
      WHERE product.id = ${ctx.query.id.split('-')[0]}
      GROUP BY product.id`
  })

  const DATA = {
    id: getData[0].id,
    image: JSON.parse(getData[0].image),
    name: getData[0].name,
    date: moment(getData[0].date).format('YYYY-MM-DD'),
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


  // GET RECOMMENDED
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

  var DATARec = getList.map((e) => e && {
    id: e.id,
    image: JSON.parse(e.image)[0] || '',
    hover: JSON.parse(e.image)[JSON.parse(e.image).length > 1 ? 1 : 0] || '',
    name: e.name,
    redirect: `/product/${e.id}-${e.name.toLowerCase().split(' ').join('-')}`,
    date: moment(e.date).format('YYYY-MM-DD'),
    suitable: e.suitable.split(','),
    type: JSON.parse(e.type),
    bestseller: e.bestseller == 1,
    stock: e.stock,
    texture: e.texture
  })

  return {
    props: {
      data: {
        ...DATA,
        other: DATARec.sort(() => (Math.random() > .5) ? 1 : -1).filter( e => {
          let parse = false
          DATA.suitable.map( z => {
            if (e.suitable.includes(z) && e.id != DATA.id ) parse = true
          })
          return parse
        }).filter((e, i) => i < 4)
      }
    }
  }

}

export default Page