import { Icon } from "@iconify/react"
import Link from "next/link"

const MobileSearchModal = ({ close, result, searchvalue, searchkey }) => {
    return (
        <>
            <div className={`flex flex-col gap-[20px] fixed z-[115] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[90%] bg-MO3 p-[20px] rounded-md`}>
                <div className={`relative flex gap-[10px] items-center bg-white p-[10px_20px] rounded-full border border-MO5`}>
                    <Icon icon="carbon:search" className={`text-[20px] animate-pulse`}/>
                    <input type="text" placeholder="Cari Nama Kain" className={`w-full text-[14px]`} autoFocus onChange={ (e) => searchkey(e.target.value) } defaultValue={ searchvalue }/>
                </div>
                { result.length > 0 && (
                    <div className={`flex flex-col gap-[10px]`}>
                        {
                            result.map((e, index) => index < 4 && (
                                <Link href={`/product/${e.id}`} key={ index }>
                                    <a onClick={ close } className={`p-[15px] hover:bg-MO5/40 border border-MO5 rounded-sm flex justify-between items-center`}>
                                        <p>{ e.data }</p>
                                        <p className={`text-[12px] text-MO6 capitalize`}>{ e.texture }</p>
                                    </a>
                                </Link>
                            ))
                        }
                    </div>
                )}
            </div>
            <div onClick={ close } className={`fixed z-[110] bg-black/30 w-full h-full backdrop-blur-sm`}/>
        </>
    )
}

export default MobileSearchModal