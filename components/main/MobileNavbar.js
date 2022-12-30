import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TranslateLocal from 'utils/TranslateLocal'

const MobileNavbar = ({ DATA, status, close, opensearch, searchvalue }) => {

    const Router = useRouter()

    return (
        <>
            <div className={`${status ? 'translate-x-0' : 'translate-x-[100%]'} ease-out flex flex-col gap-[30px] fixed z-[120] bg-white w-[280px] h-full top-0 right-0 p-[30px_20px] transition-transform duration-300`}>
                <div className={`flex justify-between`}>
                    <div className={`flex gap-[10px] justify-center`}>
                        {
                            Router.domainLocales.map((data, index) => (
                                <button key={ index } onClick={ () => location.href = data.domain } className={`${data.defaultLocale == Router.locale ? 'pointer-events-none underline' : 'hover:opacity-50'} text-black text-[20px] uppercase font-light`}>
                                    { data.defaultLocale }
                                </button>
                            ))
                        }
                    </div>
                    <button onClick={ close }>
                        <Icon icon="bi:x-lg" className={`text-[24px] text-MO6`}/>
                    </button>
                </div>
                <div className={`flex flex-col items-center`}>
                    {
                        DATA.nav.map((e, i) => (
                            <Link href={ e.redirect } key={ i }>
                                <a className={`w-full p-[10px] text-center ${Router.pathname == e.redirect ? 'text-MO6' : ''}`} title={ e.text }>
                                    <p>{ e.text }</p>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                <div className={`relative flex gap-[10px] items-center bg-white p-[10px_20px] rounded-full border border-MO5`}
                    onClick={ () => {
                        opensearch()
                        close()
                    } }
                >
                    <Icon icon="carbon:search" className={`text-[20px] absolute`}/>
                    <input type="text" placeholder="Cari Nama Kain" className={`w-full text-center text-[14px]`} defaultValue={ searchvalue }/>
                </div>
                <div className={`flex justify-center gap-[20px]`}>
                    {
                        DATA.socmed.map((data, index) => (
                            <Link href={ data.redirect } key={ index }>
                                <a className={`text-MO1 block text-[32px]`} title={ data.title } target="_blank">
                                    <Icon icon={ data.icon }/>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                {/* <div className={`flex items-center gap-[10px] justify-center`}>
                    <p className={`opacity-50`}>{ TranslateLocal('Bahasa', 'Language') }</p>
                </div> */}
            </div>
            { status && <div onClick={ close } className={`fixed z-[110] bg-black/30 w-full h-full backdrop-blur-sm`}/> }
        </>
    )
}

export default MobileNavbar