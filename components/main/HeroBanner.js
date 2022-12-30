import Button from "./Button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import ElementCond from "utils/ElementCond"
import { useRouter } from "next/router"

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const DATA = [
    {
        minitext: '',
        text: ``,
        paragraph: '',
        desktop: '/banner/1.jpg',
        mobile: '/banner/1-mobile.jpg',
        link: '/product',
        gradient: false
    },
    {
        minitext: '',
        text: ``,
        paragraph: '',
        desktop: '/banner/3.jpg',
        mobile: '/banner/3-mobile.jpg',
        link: '/about',
        gradient: false
    },
]

const HeroBanner = ({ data = DATA }) => {

    const Router = useRouter()

    const [SelectedSlider, setSelectedSlider] = useState(0)

    const fSlider = {
        next: () => {
            setSelectedSlider(data.length - 1 == SelectedSlider ? 0 : SelectedSlider + 1)
        },
        previous: () => {
            setSelectedSlider(SelectedSlider == 0 ? data.length - 1 : SelectedSlider - 1)
        }
    }

    return (
        <>
            <section className="relative">
                <div className={`z-20 absolute w-full h-full`}/>
                <div className={`absolute z-20 bottom-[10px] md:bottom-[40px] left-2/4 flex -translate-x-2/4 gap-[10px] [&>*]:text-[1rem] text-[#aa8169]`}>
                    <button onClick={ fSlider.previous }>
                        <Icon icon="dashicons:arrow-left-alt2"/>
                    </button>
                    {
                        data.map((data, index) => (
                            <button className={``} key={ index } onClick={ () => setSelectedSlider( index )}>
                                { SelectedSlider == index ? (
                                    <Icon icon="icon-park-outline:dot"/>
                                ) : (
                                    <Icon icon="octicon:dot-16"/>
                                ) }
                            </button>
                        ))
                    }
                    <button onClick={ fSlider.next }>
                        <Icon icon="dashicons:arrow-right-alt2"/>
                    </button>
                </div>
                <Carousel
                    onChange={ (e) => setSelectedSlider(e) }
                    infiniteLoop={ true }
                    autoPlay={ true }
                    interval={ 5000 }
                    showThumbs={ false }
                    selectedItem={ SelectedSlider }
                    showStatus={ false }
                    showIndicators={ false }
                    showArrows={ false }
                >
                    {
                        data.map((e, i) => {
                            return (
                                <div className={`relative w-full h-[calc(80vh_-_76px)] max-h-[850px] overflow-hidden`} key={ i }>
                                    <div className={`z-50  md:from-white/0 md:to-white/0 absolute max-w-screen-2xl flex flex-col justify-end md:justify-center left-2/4 pb-[75px] pt-[150px] md:py-0 bottom-0 md:bottom-[80px] w-full -translate-x-2/4 md:-translate-y-2/4 px-[20px]`}>
                                        {
                                            e.minitext != '' && (
                                                <p className={`uppercase text-end md:text-center text-[20px] md:text-[36px]`}>{ e.text.mini }</p>
                                            )
                                        }
                                        <ElementCond el={ i == 0 ? 'h1' : i == 1 ? 'h2' : 'h3' } className={`text-[36px] md:justify-center md:text-[64px] uppercase flex flex-col md:flex-row justify-end items-end md:gap-[15px] leading-[100%] ${e.button ? 'mb-[10px] md:mb-[20px]' : ''}`}>
                                            {
                                                e.text.split('\n').map((m, i) => (
                                                    <span key={ i } className={`flex gap-[0.5rem] md:gap-[0rem]`}>
                                                        {
                                                            m.split(' ').map((b, i) => (
                                                                <span className={`font-medium text-MO1`} key={ i }>{ b }</span>
                                                            ))
                                                        }
                                                    </span>
                                                ))
                                            }
                                        </ElementCond>
                                        {
                                            e.button && (
                                                <Button
                                                    text={ e.button.text }
                                                    href={ e.button.redirect }
                                                    sharp
                                                />
                                            )
                                        }
                                    </div>
                                    <div className={``}>
                                        <div className={`absolute ${e.gradient ? 'bg-gradient-to-b from-white/10 to-MO3' : ''} z-20 w-full h-full`}/>
                                        <Image className={`object-cover w-full h-[100%] -z-30`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + e.desktop } layout='fill' alt={`Kain Moeji Home Banner ${ i }`}/>
                                    </div>
                                    <div className={`md:hidden`}>
                                        <Image className={`object-cover w-full h-[100%] -z-20`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + e.mobile } layout='fill' alt={`Kain Moeji Home Banner ${ i }`}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </section>
        </>
    )
}

export default HeroBanner