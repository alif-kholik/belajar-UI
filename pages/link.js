import Layout from "components/Layout"
import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { useRouter } from "next/router"

const DATA = [
    {
        text: 'Admin Grosir (MOQ 1 roll)',
        icon: 'akar-icons:whatsapp-fill',
        redirect: 'https://wa.me/6282120208315',
        effect: '',
    },
    {
        text: 'Admin Ecer (MOQ 1 yard)',
        icon: 'akar-icons:whatsapp-fill',
        redirect: 'https://wa.me/6281213133705',
        effect: '',
    },
    {
        text: 'Website',
        icon: 'clarity:world-line',
        redirect: '/',
        effect: '',
    },
    {
        text: 'Metaverse',
        icon: 'teenyicons:chrome-outline',
        redirect: 'https://app.spatial.io/rooms/61e6ff522842580001c7e5ca?share=1328671099037328087',
        effect: '',
    },
    {
        text: 'Shopee',
        icon: 'iconoir:small-shop-alt',
        redirect: 'https://shopee.co.id/kainmoeji',
        effect: '',
    },
    {
        text: 'Katalog Kain',
        icon: 'carbon:catalog',
        redirect: 'https://drive.google.com/drive/folders/1TrHrsbmW2uR4lIumiBxO4DwsiOcdUM82?usp=sharing',
        effect: '',
    },
    {
        text: 'Spotify',
        icon: 'simple-line-icons:social-spotify',
        redirect: 'https://open.spotify.com/playlist/5wDRxc4spRHVenuz7qj7ZJ?si=24fb9055c9354579',
        effect: '',
    },
]

const Page = ({ data = DATA }) => {
  
    const Router = useRouter()

    return (
        <>
            <Layout title="Kunjungi Kain Moeji" rawtitle emptylayout>
                <div className={`w-full min-h-[100vh] relative flex flex-col gap-[10px] [&>section]:w-full py-[30px] overflow-x-hidden`}>
                    <section className={`flex flex-col items-center justify-center gap-[5px] mb-[10px]`}>
                        <div className={`relative w-[48px] h-[48px]`}>
                            <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/logo-symbol.png' } layout="fill" objectFit='contain' alt="Moeji Logo - Brown"/>
                        </div>
                        <h1 className={`uppercase text-MO1 font-semibold`}>Moeji</h1>
                    </section>
                    <section className={`flex flex-col items-center justify-center text-center`}>
                        <h2 className={`text-[16px] font-semibold`}>#BahanSandangPilihan</h2>
                        <p className={`text-[2.7vw] sm:text-[10px]`}>Sedia beragam kain woven, knit & lace (dyeing & printing)</p>
                    </section>
                    <section className={`max-w-screen-md mx-auto p-[20px] flex flex-col [&>button]:mb-[20px] last:[&>button]:mb-0`}>
                        {
                            data.map((e, i) => (
                                <button onClick={ () => Router.push(e.redirect) } key={ i } className={`bg-[#FCFCFC] ${e.effect} block relative p-[10px] shadow-lg w-full hover:scale-105 [&>p]:hover:text-MO7 transition-transform`}>
                                    <Icon className={`absolute text-[24px] text-[#8D6C51]`} icon={ e.icon }/>
                                    <p className={`text-center font-medium text-[14px]`}>{ e.text }</p>
                                </button>
                            ))
                        }
                    </section>
                    <section>
                        <p className={`text-center text-[10px] text-MO4/60`}>&copy; 2022 Moeji - Copyright All Right Reserved</p>
                    </section>
                    <div className={`absolute w-[100%] h-full top-0 left-0 z-[-10]`}>
                        <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/link-background.png' } className={`object-cover`} layout="fill" alt="Background"/>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Page