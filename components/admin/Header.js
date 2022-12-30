import { Icon } from "@iconify/react"
import Modal from "components/Modal"
import { useRouter } from "next/router"
import { useState } from "react"

const Header = () => {
    const [ModalLogout, setModalLogout] = useState(false)
    const Router = useRouter()

    const handleLogout = async () => {
        const _logout = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/logout' )
        const logout = await _logout.json()
        if (logout.status) Router.push('/admin/login')
    }

    return (
        <>
            { ModalLogout && <Modal data={{
                text: 'Keluar Admin',
                subtext: 'Apakah kamu yakin ingin keluar dari halaman Admin ?',
                button: [
                    {
                        text: 'Keluar',
                        type: 'primary',
                        act: () => handleLogout()
                    },
                    {
                        text: 'Batal',
                        act: () => setModalLogout(false)
                    },
                ]
            }} close={ () => setModalLogout(false) }/> }
            <header className={`flex justify-between items-center max-w-screen-xl mx-auto p-[30px_20px]`}>
                <h1 className={`flex items-center gap-[5px]`}>
                    <span>Halaman Admin </span>
                    <span className={`text-MO1 font-semibold text-[24px]`}>MOEJI</span>
                </h1>
                <button onClick={ () => setModalLogout(true) } className={`flex items-center gap-[5px] opacity-50 hover:opacity-100 transition-opacity`}>
                    <span>Keluar</span>
                    <Icon icon="ant-design:logout-outlined" />
                </button>
            </header>
        </>
    )
}

export default Header