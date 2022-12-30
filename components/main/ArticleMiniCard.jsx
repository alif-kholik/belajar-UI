import Image from "next/image"
import Link from "next/link"

const ArticleMiniCard = ({ data }) => {
    return (
        <>
            <Link href={ data.redirect }>
                <a className={`p-[20px] flex flex-col gap-[20px] rounded-lg shadow-[0_10px_10px_#00000010] transition-shadow [&_h3]:hover:underline`}>

                    <div className={`relative w-full h-[calc(100vw_*_0.4125)] md:h-[120px]`}>
                        <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${data.image}&width=300&height=120`} layout='fill' objectFit="cover"/>
                    </div>

                    <div className={`flex flex-col gap-[5px]`}>
                        <span className={`text-[14px] text-MO6`}>{ data.date }</span>
                        <h3>{ data.title }</h3>
                    </div>

                </a>
            </Link>
        </>
    )
}

export default ArticleMiniCard