import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import TranslateLocal from "utils/TranslateLocal"
import { useRouter } from "next/router"


const Footer = () => {

    const Router = useRouter()

    const DATA = {
        nav: [
            {
                text: TranslateLocal('Hubungi Kami', 'Contact Us', Router),
                redirect: '/contact'
            },
            {
                text: 'FAQ',
                redirect: '/faq'
            },
            {
                text: TranslateLocal('Artikel', 'Article', Router),
                redirect: '/article'
            },
        ],
        socmed: [
            {
                title: 'Instagram',
                icon: 'carbon:logo-instagram',
                redirect: 'https://instagram.com/kainmoeji'
            },
            {
                title: 'Whatsapp Admin',
                icon: 'la:whatsapp',
                redirect: 'https://wa.me/6282120208315'
            }
        ],
    }

    return (
        <>
            <footer className={`relative overflow-hidden`}>
                <div className={`relative z-10`}>
                    <div className={`max-w-screen-2xl mx-auto gap-[30px] md:gap-0 p-[30px_20px] flex flex-col md:flex-row justify-between [&>div]:w-full [&>div]:flex`}>
                        <div className={`flex items-center gap-[10px] justify-center md:justify-start`} title="CV. Moeji Sandang Indonesia">
                            <div className={`relative w-[22px] h-[22px]`}>
                                <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/logo-symbol-white.png' } layout="fill" alt="Moeji Logo - White"/>
                            </div>
                            <p className={`font-light text-[14px] md:text-[20px] text-MO3 whitespace-nowrap`}>CV Moeji Sandang Indonesia</p>
                        </div>
                        <div className={`flex gap-[30px] items-center justify-center`}>
                            {
                                DATA.nav.map((e, i) => (
                                    <Link href={ e.redirect } key={ i }>
                                        <a className={`hover:opacity-50 transition-opacity`} title={ e.text }>
                                            <p className={`text-MO3 font-light`}>{ e.text }</p>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                        <div className={`flex gap-[20px] md:justify-end justify-center hover:[&>*]:opacity-50 [&>*]:transition-opacity`}>
                            <Link href="https://shopee.co.id/kainmoeji">
                                <a title="Shopee Kain Moeji" target="_blank">
                                    <div className="relative top-[-2px] w-[32px] h-[32px]">
                                        <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + "/shopee-logo-1.png" } layout="fill" alt="Moeji Shopee - Logo"/>
                                    </div>
                                </a>
                            </Link>
                            {
                                DATA.socmed.map((data, index) => (
                                    <Link href={ data.redirect } key={ index }>
                                        <a className={`text-[32px]`} title={ data.title } target="_blank">
                                            <Icon icon={ data.icon } className={`text-MO3`}/>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`w-full max-w-screen-2xl mx-auto h-px bg-MO3/20`}/>
                    <div className={`text-center p-[30px] text-MO3/30 md:text-[16px] text-[12px] font-light`}>
                        <p>&copy; 2022 Moeji - Copyright All Rights Reserved</p>
                    </div>
                </div>
                <div className={`absolute top-0 left-0 w-full h-full bg-MO1`}>
                    <div className={`relative min-w-full min-h-full object-cover`}>
                        <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + "/footer-background.jpg" } layout="fill" alt="Moeji Footer - Background" className={`object-cover w-[100%] h-[100vh] opacity-50`}/>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer