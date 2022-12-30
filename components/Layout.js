import { Icon } from "@iconify/react"
import Head from "next/head"
import Navbar from "./main/Navbar"
import Footer from "./main/Footer"
import Header from "./admin/Header"
import Sidebar from "./admin/Sidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Layout = ({ children, title, description, keywords, rawtitle, emptylayout }) => {
    const Router = useRouter()
    const [ERender, setERender] = useState(false)

    useEffect( () => setERender(true), [])

    if (emptylayout) return (
        <main>
            { children }
        </main>
    )

    if (Router.pathname.split('/')[1] == 'admin') {
        
        if ( ERender && window.innerWidth < 800 ) return <div className={`flex gap-[10px] text-[#a8a8a8] [&>p]:w-[240px] flex-col items-center justify-center min-h-[100vh] text-center text-[0.8rem] p-[30px]`}><Icon className={`text-[10rem]`} icon="ic:round-browser-not-supported"/><p>Ukuran layar belum mendukung untuk menggunakan halaman Admin.</p></div>

        return (
            <>
                <div className={`bg-[#FAFAFA] min-h-[100vh] pb-[50px]`}>
                    <Header />
                    <main className={`flex gap-[30px] max-w-screen-xl mx-auto`}>
                        <Sidebar />
                        <div className={`w-full`}>
                            { children }
                        </div>
                    </main>
                </div>
            </>
        )

    }

    return (
        <>
            <Head>
                <title>{ (title ? title + ( !rawtitle ? ' - ' : '' ) : '') + ( !rawtitle ? 'Kain Moeji' : '') }</title>
                <meta name="description" content={ description }/>
                <meta name="keywords" content={ keywords }/>
            </Head>
            {
                emptylayout ? (
                    <main>
                        { children }
                    </main>
                ) : (
                    <div className={`flex flex-col items-center justify-between min-h-[100vh] bg-[#FAFAFA] overflow-x-hidden`}>
                        <div className={`w-full`}>
                            <Navbar />
                            <main>
                                { children }
                            </main>
                        </div>
                        <div className="flex-[0] w-full">
                            <Footer />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Layout