import Layout from 'components/Layout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TranslateLocal from 'utils/TranslateLocal'

const AboutUsText = `Kain Moeji hadir sebagai penyedia beragam bahan sandang terpercaya sejak tahun 2020 di Bandung, Indonesia. Dalam kesehariannya, kami selalu mengutamakan 3 hal, yaitu : 
Kualitas : Selektif dalam memilih kualitas produk dan harga yang terjangkau berbanding dengan kualitas yang kami tawarkan.
Melayani : Sikap ramah, jujur dan penuh integritas dalam melayani customer dan supplier kami.
Komitmen : Kepuasan customer merupakan komitmen Utama dalam menjalankan keseharian bisnis kami.`

const PaymentMethod = [
  {
    title: 'BCA',
    image: '/logo/bca.png',
  },
  {
    title: 'Mandiri',
    image: '/logo/mandiri.png',
  },
]

const ShippingMethod = [
  {
    title: 'J&T Cargo',
    image: '/logo/jntcargo.png',
  },
  {
    title: 'JNE',
    image: '/logo/jne.png',
  },
  {
    title: 'JTR',
    image: '/logo/jtr.png',
  },
  {
    title: 'ILI EXPRESS',
    image: '/logo/iliexpress.png',
  },
  {
    title: 'Paxel Express',
    image: '/logo/paxel.png',
  },
  {
    title: 'Sajira',
    image: '/logo/sajira.png',
  },
  {
    title: 'Sicepat',
    image: '/logo/sicepat.png',
  },
  {
    title: 'Instant Courier',
    image: '/logo/gosend.png',
  },
  {
    title: 'Indah Cargo',
    image: '/logo/indahcargo.png',
  },
  {
    title: 'Maju Jaya, Jaya Wijaya, BHT',
    image: '/logo/more2.png',
  },
]

const Page = () => {

  const Router = useRouter()

  return (
    <Layout title="Tentang Kami">
      <section className={`max-w-screen-xl mx-auto flex justify-center items-center md:mt-[10vh]`}>
        <div className={`flex flex-col md:flex-row gap-[40px] items-start`}>
          <div className={`relative w-full md:w-[600px] h-fit md:shadow-lg shrink-0`}>
            <Image className={``} src={`/aboutus.jpg`} layout="responsive" width={ 2103 } height={ 1226 } objectFit='contain'/>
          </div>
          <div className={`flex flex-col gap-[20px] p-[0_20px_20px] mb-[30px] md:mb-0`}>
            <p className={`flex flex-col gap-[10px] md:text-[20px]`}>
              {
                // Split Per \n, Array 0 untuk deskripsi, Array selain 0 menjadi dot list, dan awal text bold (split per ' ')
                AboutUsText.split('\n').map((e, i) => i == 0 ? (
                  <span key={ i }>{ e }</span>
                ) : (
                  <span key={ i } className={`flex gap-[15px]`}>
                    <span className={`bg-black/30 mt-[9px] shrink-0 rounded-full h-2 w-2`}/>
                    <span>
                      <span className={`font-bold`}>{ e.split(' ')[0] } </span>
                      <span>{ e.split(' ').filter( (z, x) => x != 0).join(' ') }</span>
                    </span>
                  </span>
                ))
              }
            </p>
            <div className={`flex gap-[10px]`}>
              { ['','',''].map((e, i) => <span className={`w-[5px] h-[5px] rounded-full bg-MO6/70`} key={ i }/>) }
            </div>
          </div>
        </div>
      </section>
      <section className={`max-w-screen-xl mx-auto flex flex-col md:flex-row p-[20px] gap-[30px] md:gap-[50px] justify-center md:mt-[50px] mb-[50px] md:mb-[70px]`}>
        <div>
          <h3 className={`mb-[10px] font-medium`}>{ TranslateLocal('Metode Pembayaran', 'Payment Method', Router) }</h3>
          <div className={`flex gap-[10px]`}>
            {
              PaymentMethod.map((e, i) => (
                <div className={`relative w-[70px] h-[30px] transition-transform hover:translate-y-[-0px] [&>p]:hover:block`} key={ i } title={ e.title }>
                  <Image className={`z-10`} src={ e.image } layout="fill" objectFit='contain'/>
                  <p className={`text-sm z-20 whitespace-nowrap absolute bg-white shadow-md top-[calc(100%_+_10px)] left-2/4 -translate-x-2/4 p-[5px_15px] rounded-full hidden`}>{ e.title }</p>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h3 className={`mb-[10px] font-medium`}>{ TranslateLocal('Jasa Pengiriman', 'Shipment Service', Router) }</h3>
          <div className={`flex gap-[10px] flex-wrap`}>
            {
              ShippingMethod.map((e, i) => (
                <div className={`relative w-[70px] h-[30px] transition-transform hover:translate-y-[-0px] [&>p]:hover:block`} key={ i } title={ e.title }>
                  <Image className={`z-10`} src={ e.image } layout="fill" objectFit='contain'/>
                  <p className={`text-sm z-20 whitespace-nowrap absolute bg-white shadow-md top-[calc(100%_+_10px)] left-2/4 -translate-x-2/4 p-[5px_15px] rounded-full hidden`}>{ e.title }</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Page