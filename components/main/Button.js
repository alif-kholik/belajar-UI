import { Icon } from "@iconify/react"
import Link from "next/link"

const ButtonInside = ({ text, icon }) => {
    return (
        <div className={`flex items-center justify-center gap-[10px]`}>
            { icon && <Icon icon={ icon } className={`text-[20px]`}/> }
            { text && <p className={`text-[14px] md:text-[16px]`}>{ text }</p> }
        </div>
    )
}

const Button = ({ text = false, type = 'primary', href, act, icon = false, addon, mini, medium, sharp, fullwidth, blank }) => {
    const MainClass = `p-[8px_16px] text-[14px] [&_p]:hover:font-medium text-center block`

    const MiniClass = 'p-[5px_10px] text-[12px] md:p-[8px_16px] md:text-[14px]'
    const Rounded = sharp ? '' : 'rounded-md'
    const Fullwidth = fullwidth ? 'w-full' : 'w-fit'

    const typePrimary = `${MainClass} bg-MO1 ${Fullwidth} ${mini ? MiniClass : 'md:p-[10px_20px]'} ${Rounded} font-semibold text-MO2 hover:text-MO1 hover:bg-MO2 transition-colors`
    const typeSecondary = `${MainClass} bg-transparent  ${Fullwidth} ${mini ? MiniClass : 'md:p-[10px_20px]'} ${Rounded} font-semibold text-MO1 border border-MO5 hover:bg-MO2 hover:text-MO1 transition-colors`

    const ButtonClass = type == 'primary' ? typePrimary : typeSecondary

    return act ? (
        <>
            <button onClick={ act } className={`${ButtonClass} ${addon}`}>
                <ButtonInside
                    text={ text }
                    icon={ icon }
                />
            </button>
        </>
    ) : (
        <>
            <Link href={ href || '#' }>
                <a className={`${ButtonClass} ${addon}`} target={ blank ? '_blank' : ''}>
                    <ButtonInside
                        text={ text }
                        icon={ icon }
                    />
                </a>
            </Link>
        </>
    )
}

export default Button