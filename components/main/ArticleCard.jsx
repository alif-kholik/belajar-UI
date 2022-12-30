import { Icon } from "@iconify/react"
import moment from "moment/moment"
import Image from "next/image"
import Link from "next/link"

const ArticleCard = ({ data, verticalMode }) => {
    return (
        <>
            <Link href={ data.redirect }>

                {/* CONTAINER */}
                <a className={`bg-white shadow-md rounded-lg overflow-hidden [&_button]:hover:bottom-0 flex ${verticalMode ? 'flex-col' : 'flex-row'} [&_img]:hover:scale-110`}>

                    {/* IMAGE */}
                    <div className={`${verticalMode ? 'h-[150px] md:h-[200px]' : 'w-[150px]'} relative shrink-0`}>
                        <Image className={`transition-all duration-300 ease-out`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${data.image}&width=500&height=300`} layout="fill" objectFit="cover"/>
                    </div>

                    <div className={`relative p-[20px] flex flex-col gap-[5px] h-full`}>

                        {/* DATE */}
                        <span className={`text-[14px] opacity-60`}>{ moment(data.created_at).format('DD MMMM YYYY') }</span>

                        {/* TITLE */}
                        <h3 className={`font-bold uppercase`}>{ data.title }</h3>

                        {/* DESCRIPTION */}
                        <p className={`text-[14px] opacity-60 max-h-full text-ellipsis overflow-hidden`}>{ data.description.split('').filter((z, i) => i < 75).join('') + '...' }</p>

                        {/* CALL TO ACTION BUTTON */}
                        <button className={`hover:text-MO6 bottom-[-70px] text-sm whitespace-nowrap ease-in flex items-center gap-[10px] justify-center text-MO1 absolute transition-all bg-gradient-to-t from-white via-white to-[#ffffff00] w-full left-0 p-[20px]`}>
                            <p>Baca Selengkapnya</p>
                            <Icon icon="carbon:text-indent-more"/>
                        </button>

                    </div>

                </a>

            </Link>
        </>
    )
}

export default ArticleCard