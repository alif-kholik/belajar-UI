import { useRouter } from "next/router"
import TranslateLocal from "utils/TranslateLocal"
import Button from "./Button"
import CatalogItem from "./CatalogItem"

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"

const CarouselCatalog = ({ data }) => {

    const [ERender, setERender] = useState(false)

    const Router = useRouter()

    useEffect(() => setERender(true), [])

    const ArrowClass = `!bg-transparent !relative !right-0 !left-0 !border !border-MO1 !translate-y-0`

    return (
        <>
            <div className={`relative flex flex-col gap-[0px] md:gap-[40px] items-center my-[50px] w-full`}>
                <h3 className={`text-[24px] text-center text-MO1 md:text-[36px]`}>{ TranslateLocal('Produk Terlaris', 'Best Seller', Router) }</h3>
                <div className={`w-full max-w-screen-2xl`}>
                    <Splide aria-label="Moeji Testimoni" hasTrack={ false } options={{
                        perPage     : !ERender ? 4 : window.innerWidth > 600 ? 4 : 2,
                        perMove     : 1,
                        gap         : !ERender ? '30px' : window.innerWidth > 600 ? '30px' : '10px',
                        pagination  : false,
                        arrows      : data.length > 1,
                        width       : '100%',
                        type        : 'loop'
                    }}>

                        <div className={`flex flex-col md:flex-row gap-[20px] p-[20px]`}>

                            <div className={`w-full md:w-[calc(100%_-_3rem)]`}>
                                <SplideTrack>
                                    {
                                        data.map( e => e && {...e, redirect: e.redirect + '-' + e.name.split(' ').join('-').toLowerCase() }).map((e, i) => (
                                            <SplideSlide key={ i }>
                                                <CatalogItem classAdd={`mb-[20px]`} data={ e } subtext={ [
                                                    { text: e.texture + ' -', },
                                                    { text: e.stock == 'ready' ? 'In Stock' : 'Fresh Order', color: e.stock == 'ready' ? 'text-[#37C645]' : false }
                                                ] }/>
                                            </SplideSlide>
                                        ))
                                    }
                                </SplideTrack>
                            </div>

                            <div className="splide__arrows shrink-0 md:w-fit md:static absolute bottom-[-15px] right-[20px] flex justify-center items-center flex-row md:flex-col-reverse h-full mt-[20px] gap-[10px] md:gap-[20px]">
                                <button className={`splide__arrow splide__arrow--prev ${ArrowClass}`}>
                                    <Icon className={`text-[1rem] md:text-[2rem] text-MO1`} icon="ep:arrow-right"/>
                                </button>
                                {/* <div className="md:hidden flex gap-[10px] relative top-[-2px]">
                                    {
                                        data.map((e, i) => (
                                            <span className={`bg-MO6 rounded-full w-[5px] h-[5px] block`} key={ i }/>
                                        ))
                                    }
                                </div> */}
                                <button className={`splide__arrow splide__arrow--next ${ArrowClass}`}>
                                    <Icon className={`text-[1rem] md:text-[2rem] text-MO1`} icon="ep:arrow-right"/>
                                </button>
                            </div>

                        </div>

                    </Splide>
                </div>

                <Button
                    text={ TranslateLocal('Lihat Lainnya', 'See More', Router) }
                    href="/product"
                    addon={`font-light`}
                    sharp
                />

            </div>
        </>
    )
}

export default CarouselCatalog