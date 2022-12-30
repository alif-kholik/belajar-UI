import { Icon } from "@iconify/react"
import TestimoniItem from "./TestimoniItem"
import { useState, useEffect, useRef } from "react"

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const DATA = [
    {
        name: 'Lorem Ipsum 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/testimoni-dummy.jpg'
    },
    {
        name: 'Lorem Ipsum 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/testimoni-dummy.jpg'
    },
    {
        name: 'Lorem Ipsum 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/testimoni-dummy.jpg'
    },
    {
        name: 'Lorem Ipsum 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/testimoni-dummy.jpg'
    },
    {
        name: 'Lorem Ipsum 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: '/testimoni-dummy.jpg'
    },
]

const TestimoniLayout = ({ data = DATA }) => {
    const [ERender, setERender] = useState(false)

    useEffect(() => setERender(true), [])

    const ArrowClass = `!bg-transparent !md:relative !border !border-MO1 !top-2/4 !-translate-y-[calc(50%_+_10px)]`
    const ArrowClassRight = `!right-[-15px]`
    const ArrowClassLeft = `!left-[-15px]`

    return (
        <>
            <section className={`p-[60px_20px] max-w-screen-2xl mx-auto`}>
                <h3 className={`mb-[10px] md:mb-[20px] text-MO1 text-[24px] md:text-[30px] leading-[100%] text-center`}>Testimoni <span className={`uppercase font-semibold`}>Kawan Moeji</span></h3>
                <div className={`mb-[30px]`}>
                    <Splide aria-label="Moeji Testimoni" hasTrack={ false } options={{
                        perPage     : !ERender ? 4 : window.innerWidth > 600 ? 3 : 1,
                        perMove     : 1,
                        gap         : !ERender ? '30px' : window.innerWidth > 600 ? '30px' : '10px',
                        pagination  : false,
                        arrows      : data.length > 1,
                        width       : '100%',
                        type        : 'loop'
                    }}>

                        <div className={`flex flex-col items-center md:flex-row gap-[20px] p-[20px]`}>
                            <button className={`splide__arrow splide__arrow--prev ${ArrowClass} ${ArrowClassLeft}`}>
                                <Icon className={`text-[2rem] md:text-[2rem] text-MO1`} icon="ep:arrow-right"/>
                            </button>

                            <div className={`w-full md:w-[100%]`}>
                                <SplideTrack>
                                    {
                                        data.map((e, i) => (
                                            <SplideSlide key={ i }>
                                                <TestimoniItem data={ e }/>
                                            </SplideSlide>
                                        ))
                                    }
                                </SplideTrack>
                            </div>

                            <button className={`splide__arrow splide__arrow--next ${ArrowClass} ${ArrowClassRight}`}>
                                <Icon className={`text-[2rem] md:text-[2rem] text-MO1`} icon="ep:arrow-right"/>
                            </button>

                            <div className="splide__arrows shrink-0 md:w-fit md:static absolute bottom-[-15px] right-[20px] flex justify-center items-center flex-row md:flex-col-reverse h-full mt-[20px] gap-[10px] md:gap-[20px]">
                            </div>

                        </div>

                    </Splide>
                </div>
            </section>
        </>
    )
}

export default TestimoniLayout