import Image from "next/image"
import Link from "next/link"
import random from "random"
import { useEffect, useState } from "react"
import ScrollTrigger from "utils/ScrollTrigger"

const DATA = {
    image: '/product/dummy.jpg',
    hover: '/product/dummy2.jpg',
    name: 'Roberto Cavali',
    redirect: '/product/1'
}

const CatalogItem = ({ classAdd, data = DATA, althover, subtext }) => {
    const [ERender, setERender] = useState(false)
    
    useEffect(() => setERender(true), [])
    
    //if (ERender) window.addEventListener("scroll", () => ScrollTrigger(`.scrolltg${ItemID}`))

    return (
        <>
            <Link href={ data.redirect }>
                <a className={`${classAdd} transition-opacity duration-700 bg-white flex flex-col w-full shadow-lg h-fit ${althover ? '' : '[&_.imageHover]:hover:scale-[110%] [&_.imageOpacity]:hover:opacity-100 [&_.imageHide]:hover:opacity-0'}`} title={ data.name }>
                    <div className={`relative overflow-hidden object-cover w-full`}>
                        {
                            data.hover ? (
                                <div className={`md:min-h-[300px] h-[50vw] max-h-[400px] md:h-[25vh] md:max-h-[500px]`}>
                                    <span className={`imageHover absolute w-full h-full transition-transform delay-75 duration-[2s] ease-out z-[21]`}>
                                        <span className={`imageOpacity opacity-0 transition-opacity delay-[250ms] ease-out`}>
                                            <Image className={`object-cover w-full h-[100%] block`} src={ data.image ? `${process.env.NEXT_PUBLIC_MEDIA_DOMAIN}/load.php?dir=${data.hover || data.image}&width=412&height=516&quality=100` : process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/notfound.jpg' } layout="fill" alt={`${data.name} - Kain Moeji Photo`}/>
                                        </span>
                                    </span>
                                    <Image className={`imageHide transition-opacity duration-[250ms] z-20 object-cover w-full h-[100%]`} src={ data.image ? `${process.env.NEXT_PUBLIC_MEDIA_DOMAIN}/load.php?dir=${data.image}&width=412&height=516&quality=100` : process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/notfound.jpg' } layout="fill" alt={`${data.name} - Kain Moeji Photo`}/>
                                    <div className={`absolute w-full h-full bg-MO5 z-10 animate-pulse`}/>
                                </div>
                            ) : (
                                <div className={`imageHover transition-transform duration-500 ease-out md:min-h-[300px] h-[50vw] max-h-[400px] md:h-[25vh] md:max-h-[500px]`}>
                                    <Image className={`object-cover w-full h-[100%] block`} src={ data.image ? `${process.env.NEXT_PUBLIC_MEDIA_DOMAIN}/load.php?dir=${data.image}&width=412&height=516&quality=100` : process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/notfound.jpg' } layout="fill" alt={`${data.name} - Kain Moeji Photo`}/>
                                </div>
                            )
                        }
                    </div>
                    <div className={`p-[20px] flex flex-col items-center md:gap-[px] w-full`}>
                        <h4 className={`uppercase leading-[100%] text-center mb-[10px] text-[14px] md:text-[20px]`}>{ data.name }</h4>
                        {
                            subtext ? (
                            <div className={`capitalize flex gap-[3px] md:gap-[5px] items-center text-[10px] md:text-[14px] mt-[-5px]`}>
                                {
                                    subtext.map((e, i) => (
                                        <p key={ i } className={`${e.color ? e.color : 'text-MO6'}`}>{ e.text }</p>
                                    ))
                                }
                            </div>
                            ) : (
                            <div className={`flex gap-[10px]`}>
                                <div className={`w-[5px] h-[5px] rounded-full bg-MO6/40`}/>
                                <div className={`w-[5px] h-[5px] rounded-full bg-MO6/40`}/>
                                <div className={`w-[5px] h-[5px] rounded-full bg-MO6/40`}/>
                            </div>
                            )
                        }
                    </div>
                </a>
            </Link>
        </>
    )
}

export default CatalogItem