import { Icon } from "@iconify/react"
import CatalogItem from "./CatalogItem"
import Button from "./Button"
import { useEffect, useState } from "react"
import ProductFilterModal from "./ProductFilterModal"
import moment from "moment"
import { useRouter } from "next/router"
import TranslateLocal from "utils/TranslateLocal"
import FabricType from "utils/FabricType"

const DATA = [
    {
        image: '/product/dummy2.jpg',
        hover: '/product/dummy2.jpg',
        name: 'Roberto Cavali',
        redirect: '/product/1',
        suitable: 'hijab,sweater,jaket',
        date: '2022-08-15'
    },
]

const ProductLayout = ({ data = DATA, count, suitable = [] }) => {

    const Router = useRouter()

    const [SelectedFilter, setSelectedFilter] = useState([])

    const [ProductData, setProductData] = useState(data)
    const [FilterModal, setFilterModal] = useState(false)
    const [SortModal, setSortModal] = useState(false)

    const SuitableFilter = suitable.map( e => e && {
        name: e.name,
        act: _PD => {
            //console.log(e.name)
            return _PD.filter( z => z.suitable.split(',').find( x => x == e.name.toLowerCase() ) )
        }
    })
    const TypeFilter = FabricType.map( e => e && {
        name: e,
        act: _PD => {
            //console.log(e)
            return _PD.filter( z => z.type.find( x => x.toLowerCase() == e.toLowerCase() ) )
        }
    })
    const SortFilter = [
        {
            name: TranslateLocal('Urutkan Berdasarkan', 'Sort By'),
            data: [
                {
                    name: TranslateLocal('Default', 'Default', Router),
                    act: _PD => _PD
                },
                {
                    name: TranslateLocal('Nama A-Z', 'Name A-Z', Router),
                    act: _PD => _PD.sort((a, b) => a.name < b.name ? 1 : -1)
                },
                {
                    name: TranslateLocal('Nama Z-A', 'Name Z-A', Router),
                    act: _PD => _PD.sort((b, a) => a.name < b.name ? 1 : -1)
                },
                {
                    name: TranslateLocal('Produk Terbaru', 'Latest Product', Router),
                    act: _PD => _PD.sort((a, b) => {
                        var dummyA = moment(a.date, 'YYYY-MM-DD').format('X')
                        var dummyB = moment(b.date, 'YYYY-MM-DD').format('X')
                        return dummyA == dummyB ? 0 : dummyA > dummyB ? 1 : -1
                    })
                },
                {
                    name: TranslateLocal('Produk Terlama', 'Earliest Product', Router),
                    act: _PD => _PD.sort((a, b) => {
                        var dummyA = moment(a.date, 'YYYY-MM-DD').format('X')
                        var dummyB = moment(b.date, 'YYYY-MM-DD').format('X')
                        return dummyA == dummyB ? 0 : dummyA < dummyB ? 1 : -1
                    })
                },
            ]
        },
    ]
    const MainFilter = [
        {
            name: TranslateLocal('Semua Produk', 'All Products', Router),
            act: _PD => data
        },
        {
            name: TranslateLocal('Produk Terlaris', 'Best Seller', Router),
            act: _PD => _PD.filter(e => e.bestseller)
        },
    ]
    const TextureFilter = [
        {
            name: TranslateLocal('Bahan Polos', 'Plain Fabric', Router),
            act: _PD => _PD.filter(e => e.texture == 'polos')
        },
        {
            name: TranslateLocal('Bahan Motif', 'Pattern Fabric', Router),
            act: _PD => _PD.filter(e => e.texture == 'motif')
        },
    ]
    const StockFilter = [
        {
            name: TranslateLocal('In Stock', 'In Stock', Router),
            act: _PD => _PD.filter(e => e.stock == 'ready')
        },
        {
            name: TranslateLocal('Fresh Order', 'Fresh Order', Router),
            act: _PD => _PD.filter(e => e.stock == 'fresh')
        },
    ]

    const FILTER = [{
        name: 'Main',
        data: MainFilter
    },{
        name: '',
        data: TextureFilter
    },{
        name: TranslateLocal('Ketersediaan', 'Stock', Router),
        data: StockFilter
    },{
        name: TranslateLocal('Berdasarkan Jenis', 'Based On Type', Router),
        data: TypeFilter
    },{
        name: TranslateLocal('Rekomendasi Produk', 'Suitable For', Router),
        data: SuitableFilter
    }]

    const FULLFILTER = [{
        name: 'Main',
        data: MainFilter
    },{
        name: '',
        data: TextureFilter
    },{
        name: TranslateLocal('Ketersediaan', 'Stock', Router),
        data: StockFilter
    },{
        name: TranslateLocal('Berdasarkan Jenis', 'Based On Type', Router),
        data: TypeFilter
    }, {
        name: TranslateLocal('Rekomendasi Produk', 'Suitable For', Router),
        data: SuitableFilter
    }, SortFilter[0]]

    const fHandle ={
        select: (m, z) => {
            setSelectedFilter(
                SelectedFilter.find(e => e.master == m && e.selected == z)
                    ? SelectedFilter.filter(e => e.master != m)
                    : SelectedFilter.find(e => e.master == m)
                        ? SelectedFilter.map(e => e.master == m
                            ? {...e, selected: z}
                            : e)
                        : [...SelectedFilter, {master: m, selected: z}]
            )
        },
        apply: () => {},
    }

    useEffect(() => {

        var _PD = data
        var exc = true

        if (SelectedFilter.find(e => e.master == 'Main' && e.selected == TranslateLocal('Semua Produk', 'All Products', Router))) {
            exc = false
            setSelectedFilter(SelectedFilter.find(e => e.master == TranslateLocal('Urutkan Berdasarkan', 'Sort By', Router)) ? SelectedFilter.filter(e => e.master == TranslateLocal('Urutkan Berdasarkan', 'Sort By', Router)) : [])
        }

        exc && FULLFILTER.map(a => {
            a.data.map(b => {
                if (SelectedFilter.find(c => c.master == a.name && b.name == c.selected)) _PD = b.act(_PD)
            })
        })

        setProductData(_PD)

    }, [SelectedFilter])

    return (
        <>

            <ProductFilterModal data={ FILTER } f={ fHandle } selected={ SelectedFilter } status={ FilterModal } close={ () => setFilterModal(false) }/>
            <ProductFilterModal title={ TranslateLocal('Urutkan', 'Sort', Router) } data={ SortFilter } f={ fHandle } col selected={ SelectedFilter } status={ SortModal } close={ () => setSortModal(false) }/>

            <section className={`p-[30px_20px] md:p-[60px_20px]`}>
                <div className={`max-w-screen-2xl mx-auto flex flex-col gap-[30px]`}>

                    {/* Title */}
                    <h2 className={`text-MO1 text-[24px] md:text-[36px] leading-[100%] text-center`}>{ count ? TranslateLocal('Produk Terlaris', 'Best Seller') : TranslateLocal('Produk Kami', 'Our Product') }</h2>

                    {/* Mobile Filter Button */}
                    <div className={`flex md:hidden items-center justify-center gap-[10px] [&>*]:w-full`}>
                        <Button
                            text="Filter"
                            type="secondary"
                            addon={`border-2 font-light`}
                            act={ () => setFilterModal(true) }
                            sharp
                        />
                        <Button
                            text={ TranslateLocal('Urutkan', 'Sort', Router) }
                            type="secondary"
                            addon={`border-2 font-light`}
                            act={ () => setSortModal(true) }
                            sharp
                        />
                    </div>

                    {/* Select Sort Element */}
                    <div className={`hidden md:flex justify-end`}>
                        <select className={`p-[5px_10px]`} onChange={ e => fHandle.select(TranslateLocal('Urutkan Berdasarkan', 'Sort By', Router), e.target.value) }>
                            {
                                SortFilter[0].data.map((e, i) => (
                                    <option value={ e.name } key={ i }>{ e.name }</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Main Body */}
                    <div className={`flex gap-[50px] items-stretch`}>

                        {/* Filter Element Desktop */}
                        <div className={`hidden md:block`}>
                            <div className={`hidden sticky top-[100px] md:flex p-[30px] min-w-[200px] bg-white h-fit flex-col gap-[10px] text-start whitespace-nowrap`}>
                                <p className={`uppercase text-MO1 font-semibold mb-[5px]`}>Filter</p>
                                {
                                    FILTER.map((e, i) => (
                                        <div key={ i } className={`flex flex-col gap-[10px]`}>
                                            { e.name != 'Main' && e.name && <p className={`mt-[10px]`}>{ e.name }</p> }
                                            {
                                                e.data.map((z, x) => (
                                                    <button className={`text-start [&>p]:hover:opacity-70`} key={ x } onClick={ () => fHandle.select(e.name, z.name) }>
                                                        <p className={`
                                                            ${
                                                                SelectedFilter.find(y => y.master == e.name) &&
                                                                SelectedFilter.filter(x => x.master.toLowerCase() == e.name.toLowerCase() && e)[0].selected == z.name ? 'text-MO1' : ''
                                                            }
                                                            flex w-full opacity-50 text-sm items-center justify-between
                                                        `}>
                                                            <span>{ z.name }</span>
                                                            {
                                                                SelectedFilter.find(y => y.master == e.name) &&
                                                                SelectedFilter.filter(x => x.master.toLowerCase() == e.name.toLowerCase() && e)[0].selected == z.name && (
                                                                    <span>•</span>
                                                                )
                                                            }
                                                        </p>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Katalog List */}
                        <div className={`w-full grid grid-cols-2 mb-[30px] md:grid-cols-3 lg:grid-cols-4 gap-[15px] md:gap-[40px_30px]`}>
                            {
                                ProductData.map( e => e && {...e, redirect: e.redirect + '-' + e.name.split(' ').join('-').toLowerCase() }).map((e, i) => {
                                    const El = <CatalogItem
                                        data={ e }
                                        key={ i }
                                        subtext={[
                                            { text: e.texture + ' -', },
                                            { text: e.stock == 'ready' ? 'In Stock' : 'Fresh Order', color: e.stock == 'ready' ? 'text-[#37C645]' : false }
                                        ]}
                                    />
                                    return !count ? ( El ) : i < count && ( El ) 
                                })
                            }
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default ProductLayout