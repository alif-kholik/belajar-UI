import { Icon } from "@iconify/react"

const DATA = [
    {
        icon: 'ion:diamond-outline',
        title: 'Kualitas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        icon: 'carbon:delivery-truck',
        title: 'Pengiriman',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        icon: 'ion:pricetags-outline',
        title: 'Harga Bersahabat',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        icon: 'icon-park-outline:delivery',
        title: 'Pelayanan',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
]

const HomeMoejiPlus = () => {
    return (
        <>
            <section className={`bg-white`}>
                <div className={`max-w-screen-2xl mx-auto p-[30px_20px] md:p-[60px_20px] flex flex-col md:flex-row items-center gap-[30px] md:gap-[50px]`}>
                    <div className={`md:w-[600px] flex flex-col md:gap-[30px] gap-[10px]`}>
                        <h3 className={`text-MO1 text-[30px] md:text-[48px] leading-[130%]`}>Kenapa Belanja <span className={`uppercase font-semibold`}>di Moeji ?</span></h3>
                        { false && <p className={`text-[14px] md:text-[1rem]`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum.</p> }
                    </div>
                    <div className={`grid md:grid-cols-2 w-full border-collapse`}>
                        {
                            DATA.map((e, i) => (
                                <div className={`p-[30px] flex gap-[20px] flex-col md:flex-row items-start md:items-center shadow-MO2`} key={ i }>
                                    <Icon className={`text-[64px] text-MO7 min-w-[64px]`} icon={ e.icon }/>
                                    <div>
                                        <h4 className={`text-[24px] font-semibold`}>{ e.title }</h4>
                                        <p>{ e.description }</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeMoejiPlus