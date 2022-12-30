import { Icon } from "@iconify/react"
import { useState } from "react"

const DATA = {
    asked: 'Lorem ipsum dolor sit amet',
    answer: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

const FAQItem = ({ data = DATA }) => {
    const [Status, setStatus] = useState(false)

    return (
        <>
            <div className={`w-full`}>
                <div className={`cursor-pointer relative bg-white p-[10px_20px] flex justify-between gap-[20px] z-20`} onClick={ () => setStatus(!Status) }>
                    <h3 className={`font-medium`}>{ data.asked }</h3>
                    <Icon className={`text-[24px] relative ${Status ? 'rotate-180' : ''} transition-transform duration-500 shrink-0`} icon='ep:arrow-down'/>
                </div>
                <div className={`overflow-hidden z-10 ${Status ? 'relative scale-y-100 p-[10px_20px]' : 'h-0 scale-y-0 translate-y-[-100%]'} duration-500 transition-transform`}>
                    { data.answer && <p className={`flex flex-col gap-[10px] opacity-60`}>{ data.answer }</p> }
                    { data.list && (
                        <ul className={`list-disc ml-[20px] mt-[10px] flex flex-col gap-[10px] opacity-60`}>
                            {
                                data.list.map((e, i) => (
                                    <li key={ i }>{ e }</li>
                                ))
                            }
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default FAQItem