import Link from "next/link"
import { useRouter } from "next/router"

const DATA = [
    {
        groupname: 'Produk',
        data: [
            {
                name: 'Tambah Produk',
                redirect: '/admin/product-add'
            },
            {
                name: 'Semua Produk',
                redirect: '/admin/product'
            },
        ]
    },
    {
        groupname: 'Suitable Tag',
        data: [
            {
                name: 'Edit Suitable Tag',
                redirect: '/admin/suitable'
            },
        ]
    },
    {
        groupname: 'Artikel',
        data: [
            {
                name: 'Tulis Artikel',
                redirect: '/admin/article-add'
            },
            {
                name: 'Semua Artikel',
                redirect: '/admin/article'
            },
        ]
    },
    {
        groupname: 'Home Banner',
        data: [
            {
                name: 'Atur Banner',
                redirect: '/admin/banner'
            },
        ]
    },
    {
        groupname: 'Testimoni',
        data: [
            {
                name: 'Tambah / Edit',
                redirect: '/admin/testimoni'
            },
        ]
    },
    {
        groupname: 'Pesan',
        data: [
            {
                name: 'Lihat Pesan',
                redirect: '/admin/message'
            },
        ]
    },
]

const Sidebar = ({ data = DATA }) => {
    const Router = useRouter()

    return (
        <>
            <nav className={`bg-white w-[250px] p-[30px] flex flex-col gap-[25px] h-fit sticky top-[50px]`}>
                <h2 className={`uppercase font-semibold`}>Halaman</h2>
                {
                    data.map((e, i) => (
                        <div className={`flex flex-col gap-[10px]`} key={ i }>
                            <p className={`opacity-50 text-sm`}>{ e.groupname }</p>
                            {
                                e.data.map((z, x) => (
                                    <Link href={ z.redirect } key={ x }>
                                        <a className={`${Router.pathname.split('/')[2] == z.redirect.split('/')[2] ? 'underline' : ''}`}>
                                            <p>{ z.name }</p>
                                        </a>
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </nav>
        </>
    )
}

export default Sidebar