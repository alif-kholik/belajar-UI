import { Icon } from "@iconify/react"
import Portal from "./Portal"

const Loading = ({ text }) => {
    return (
        <>
            <Portal>
                <div className={`fixed w-full h-full text-MO3 flex-col gap-[30px] bg-black/30 z-[300] top-0 left-0 backdrop-blur-sm flex justify-center items-center`}>
                    <Icon className={`text-[48px]`} icon="eos-icons:bubble-loading"/>
                    { text && <p>{ text }</p>}
                </div>
            </Portal>
        </>
    )
}

export default Loading