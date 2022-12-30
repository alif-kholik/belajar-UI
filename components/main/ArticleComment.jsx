import { Icon } from "@iconify/react"
import Image from "next/future/image"
import toCapitalize from "utils/Capitalize"

const ArticleComment = ({ data, nocomment }) => {
    return !nocomment ? (
        <>
            <div className={`max-w-[700px] w-full cursor-default border-t border-MO5 pt-[30px]`}>

                <div className={`flex gap-[10px] items-center`}>

                    <Image src={ data.image || '/user.png' } width='128' height='128' className={`w-[42px] rounded-full overflow-hidden`}/>

                    <div className={``}>

                        <p className={`font-semibold relative [&>span]:hover:visible`}>{ toCapitalize(data.name) }
                            { data.email && <span className={`whitespace-nowrap !font-light top-2/4 -translate-y-2/4 border border-MO5 translate-x-[10px] invisible opacity-50 absolute bg-white p-[5px_15px] shadow-lg z-50 rounded-full`}>{ data.email }</span> }
                        </p>
                        <span className={`opacity-50 text-[14px] block`}>{ data.date }</span>
                        
                    </div>

                </div>

                <p className={`mt-[10px] text-[14px]`}>{ data.text }</p>

            </div>
        </>
    ) : (
        <>
            <div className={`flex text-MO6 items-center justify-center w-full p-[20px] gap-[10px] max-w-[700px] bg-white border border-MO5 rounded-lg`}>
                <Icon className={`text-[24px]`} icon="mdi:comment-off-outline"/>
                <span>Belum Ada Komentar</span>
            </div>
        </>
    )
}

export default ArticleComment