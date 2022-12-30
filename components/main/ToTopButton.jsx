import { Icon } from "@iconify/react"
import Portal from "components/Portal"
import { useEffect, useState } from "react"

const ToTopButton = () => {

    const [Scroll, setScroll] = useState(0)

    useEffect(() => window.addEventListener('scroll', () => setScroll(window.scrollY)), [])

    const fHandle = {
        scrollToTop: () => window.scrollTo(0, 0)
    }

    return (
        <>
            <Portal>

                <button
                    title="Scroll To Top"
                    onClick={ () => fHandle.scrollToTop() }
                    className={`fixed ${Scroll > 80 ? 'bottom-[20px]' : 'bottom-[-60px]'} transition-all duration-300 right-[20px] z-50 text-[2.5rem] text-MO1 bg-MO5/50 backdrop-blur-sm border border-MO1 p-[5px] active:bg-MO5`}
                    >
                    <Icon icon="bx:arrow-to-top"/>
                </button>

            </Portal>
        </>
    )
}

export default ToTopButton