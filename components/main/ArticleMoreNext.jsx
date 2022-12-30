import { Icon } from "@iconify/react"
import Link from "next/link"

const ArticleMoreNext = ({ data }) => {
    return (
        <>
            <div className={`my-[30px] flex items-center gap-[30px] flex-col md:flex-row`}>
                <Link href={ data.previous.redirect }>
                    <a title={ data.previous.title } className={`max-w-full flex items-center gap-[10px] opacity-50 hover:opacity-100 hover:w-[150%] [&>p]:hover:w-full [&_*]:transition-all`}>
                        <Icon className={`text-[24px]`} icon="grommet-icons:previous"/>
                        <p className={`whitespace-nowrap overflow-hidden text-ellipsis w-3/4`}>{ data.previous.title }</p>
                    </a>
                </Link>
                <Link href={ data.next.redirect }>
                    <a title={ data.next.title } className={`max-w-full flex justify-end items-center gap-[10px] opacity-50 hover:opacity-100 hover:w-[150%] [&>p]:hover:w-full [&_*]:transition-all`}>
                        <p className={`whitespace-nowrap overflow-hidden text-ellipsis w-3/4`}>{ data.next.title }</p>
                        <Icon className={`text-[24px]`} icon="grommet-icons:next"/>
                    </a>
                </Link>
            </div>
        </>
    )
}

export default ArticleMoreNext