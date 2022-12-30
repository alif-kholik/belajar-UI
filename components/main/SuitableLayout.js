import CatalogItem from "./CatalogItem"
import Button from "./Button"

const DATA = [
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
    {
        image: '/suitable/dummy.jpg',
        name: 'Sweater',
        redirect: '/suitable/sweater'
    },
]

const ProductLayout = ({ data = DATA, count }) => {

    return (
        <>
            <section className={`p-[30px_20px] md:p-[60px_20px]`}>
                <div className={`max-w-screen-2xl mx-auto flex flex-col gap-[30px]`}>
                    <h3 className={`text-MO1 text-[24px] md:text-[36px] leading-[100%] text-center`}>Cari Bahan Kain Yang Sesuai Untuk</h3>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-[15px] md:gap-[40px_30px]`}>
                        {
                            data.map((e, i) => {
                                return !count ? ( <CatalogItem data={ e } key={ i }/> ) : i < count && ( <CatalogItem data={ e } key={ i }/> )
                            })
                        }
                    </div>
                    {
                        count && (
                            <Button
                                text="Lihat Semua"
                                type="primary"
                                href="/suitable"
                                addon={`mx-auto`}
                            />
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default ProductLayout