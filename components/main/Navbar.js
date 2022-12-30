import Link from "next/link"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import Find from "utils/Find"
import MobileNavbar from "./MobileNavbar"
import MobileSearchModal from "./MobileSearchModal"
import { useRouter } from "next/router"
import TranslateLocal from "utils/TranslateLocal"

const NavbarComponent = ({ p, navdata, socmeddata }) => {

    const DATA = {
        nav: [
            {
                text: TranslateLocal('Beranda', 'Home'),
                redirect: '/'
            },
            {
                text: TranslateLocal('Tentang Kami', 'About Us'),
                redirect: '/about'
            },
            {
                text: TranslateLocal('Produk', 'Product'),
                redirect: '/product'
            },
            {
                text: TranslateLocal('Hubungi Kami', 'Contact Us'),
                redirect: '/contact'
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

    const [SearchValue, setSearchValue] = useState('')
    const [SearchResult, setSearchResult] = useState([])
    const [ProductList, setProductList] = useState([])
    const [MNavbar, setMNavbar] = useState(false)
    const [MSearch, setMSearch] = useState(false)

    const Router = useRouter()

    useEffect(() => {
        fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/product' )
        .then((res) => res.json())
        .then((data) => {
            setProductList(data.map((e, i) => { return { id: e.id, data: e.name, texture: e.texture } }))
        })
    }, [])

    useEffect( () => setSearchResult(Find(ProductList, SearchValue)), [SearchValue])

    return (
        <>
            <MobileNavbar DATA={ DATA } status={ MNavbar } close={ () => setMNavbar(false) } opensearch={ () => setMSearch(true) } searchvalue={ SearchValue }/>
            { MSearch && <MobileSearchModal close={ () => setMSearch(false) } result={ SearchResult } searchkey={ setSearchValue } searchvalue={ SearchValue } /> }
            <div className={`flex justify-between items-center ${p ? p : 'p-[20px]'} max-w-screen-2xl mx-auto`}>
                <div className={`flex items-center gap-[10px]`} onClick={ () => Router.push('/') } title="Kain Moeji Website">
                    <div className={`relative w-[32px] h-[32px]`}>
                        <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + '/logo-symbol.png' } layout="fill" objectFit='contain' alt="Moeji Logo - Brown"/>
                    </div>
                    <p className={`uppercase text-[24px] font-semibold text-MO1`}>Moeji</p>
                </div>
                <nav className={`gap-[40px] hidden md:flex overflow-hidden whitespace-nowrap mx-[20px]`}>
                    {
                        DATA.nav.map((data, index) => (
                            <Link href={ data.redirect } key={ index }>
                                <a className={`relative hover:opacity-50 transition-opacity ${Router.pathname == data.redirect ? 'text-MO6' : ''}`} title={ data.text }>
                                    <p>{ data.text }</p>
                                    <span/>
                                </a>
                            </Link>
                        ))
                    }
                </nav>
                <div className={`flex gap-[20px] items-center`}>
                    <div className={`relative hidden md:flex gap-[10px] items-center bg-white p-[10px_20px] rounded-full border border-MO5 [&>div]:hover:flex`}>
                        <Icon icon="carbon:search" className={`text-[20px]`}/>
                        <input type="text" placeholder={ TranslateLocal('Cari Nama Kain', 'Search Fabric') } className={`[&+div]:focus:flex`} onChange={ (e) => setSearchValue(e.target.value) } defaultValue={ SearchValue } onBlur={ (e) => e.target.value = ''}/>
                        <div className={`shadow-lg rounded-lg overflow-hidden hidden absolute z-30 bg-white flex-col w-full right-0 top-[calc(100%_+_20px)]`}>
                            {
                                SearchResult.map((e, index) => index < 5 && (
                                    <Link href={`/product/${e.id}`} key={ index }>
                                        <a className={`p-[20px] hover:bg-MO5/40`}>
                                            <p>{ e.data } <span className={`text-sm opacity-50 capitalize`}>{ e.texture }</span></p>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`flex gap-[10px]`}>
                        {
                            Router.domainLocales.map((data, index) => (
                                <button key={ index } onClick={ () => location.href = data.domain } className={`${data.defaultLocale == Router.locale ? 'pointer-events-none underline' : 'hover:opacity-50'} text-MO1 hidden md:block text-[20px] uppercase font-light`}>
                                    { data.defaultLocale }
                                </button>
                            ))
                        }
                    </div>
                    <button className={`md:hidden`} onClick={ () => setMSearch(true) }>
                        <Icon className={`text-MO1 text-[32px]`} icon="carbon:search"/>
                    </button>
                    <button className={`md:hidden`} onClick={ () => setMNavbar(true) }>
                        <Icon className={`text-MO1 text-[32px]`} icon="carbon:menu"/>
                    </button>
                </div>
            </div>
        </>
    )
}

const Navbar = () => {

    const [ERender, setERender] = useState(false)
    const [Scroll, setScroll] = useState()

    useEffect(() => setERender(true), [])

    if (ERender) window.addEventListener("scroll", () => setScroll(window.scrollY))

    return (
        <>
            <header className={`w-full`}>
                <NavbarComponent/>
            </header>
            { ERender && (
                <div className={`fixed top-0 left-0 z-[100] bg-white w-full transition-transform duration-500 border-b border-MO5 ${Scroll > 80 ? '' : 'translate-y-[-100%]'}`}>
                    <NavbarComponent p="p-[10px_20px]"/>
                </div>
            )}
        </>
    )

}

export default Navbar