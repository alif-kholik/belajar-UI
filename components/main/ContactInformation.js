import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import TranslateLocal from "utils/TranslateLocal"
import anime from "animejs"


const ContactInformation = () => {

    const Router = useRouter()

    const DATA = [
        {
            redirect: 'https://g.page/kainmoeji?share',
            icon: 'simple-line-icons:location-pin',
            data: [
                {
                    title: TranslateLocal('Lokasi', 'Location', Router),
                    text: 'Jl. Dulatip No.1, Kota Bandung, 40181',
                    subtext: 'Senin - Jum’at (08:00 - 16:30)     Sabtu (08:00 - 15:30)'
                }
            ]
        },
        {
            redirect: 'https://wa.me/6282120208315',
            icon: 'akar-icons:whatsapp-fill',
            data: [
                {
                    title: 'Grosir',
                    text: '0821 2020 8315',
                    subtext: ''
                },
                {
                    title: 'Eceran',
                    text: '0821 1313 3705',
                    subtext: ''
                }
            ]
        },
        {
            redirect: 'https://instagram.com/kainmoeji',
            icon: 'akar-icons:instagram-fill',
            data: [
                {
                    title: 'Instagram',
                    text: 'kainmoeji',
                    subtext: ''
                }
            ]
        },
        {
            redirect: 'mailto:admin@kainmoeji.com',
            icon: 'fontisto:email',
            data: [
                {
                    title: 'Email',
                    text: 'admin@kainmoeji.com',
                    subtext: ''
                }
            ]
        },
    ]

    // const animate = () => anime({
    //     targets: '.boxx',
    //     translateY: ['100%', 0],
    //     direction: 'alternate',
    //     duration: 1000,
    //     delay: (el, i, l) => i * 100
    // })

    return (
        <>
            <div className={`relative p-[20px] md:p-[50px] bg-MO1`}>
                <div className={`z-10 relative`}>
                    <h1 className={`text-MO3 font-light text-[24px] md:text-[36px] mb-[20px]`}>{ TranslateLocal('Hubungi Kami', 'Contact Us', Router) }</h1>
                    <div className={`flex flex-col gap-[10px]`}>
                        {
                            DATA.map((e, i) => (
                                <div key={ i } className={`w-full relative overflow-hidden`}>
                                    <button onClick={ () => Router.push(e.redirect)} className={`boxx transition-opacity p-[20px] w-full bg-MO3/20 hover:bg-MO3/30 flex items-center gap-[30px] text-MO3`} target="_blank">
                                        <Icon icon={ e.icon } className={`text-[36px] shrink-0`}/>
                                        <div className={`flex flex-col md:flex-row gap-[20px] md:whitespace-nowrap`}>
                                            {
                                                e.data.map((z, x) => (
                                                    <div key={ x } className={`flex flex-col items-start`}>
                                                        <h4 className={`text-MO3 font-extralight text-[12px] md:text-[16px]`}>{ z.title }</h4>
                                                        <p className={`text-[14px] text-start md:text-[20px]`}>{ z.text }</p>
                                                        <h5 className={`text-[12px] text-start font-extralight text-MO3`}>{ z.subtext }</h5>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/contact-background2.jpg' } layout="fill" alt="Kain Moeji Contact Background" className={`absolute`}/>
            </div>
        </>
    )
}

export default ContactInformation