import anime from 'animejs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Page = () => {

    const Router = useRouter()
    const [ERender, setERender] = useState(false)

    const Text = Router.query.text || 'Loading'

    ERender && anime({
        targets: '.textanimate',
        translateY: ['100%', 0],
        direction: 'alternate',
        duration: 1000,
        loop: true,
        delay: (el, i, l) => i * 100,
        easing: 'easeInElastic(1, .6)'
    })

    useEffect(() => setERender(true), [])

    return ERender && (
        <>
            <div className={`bg-black h-[100vh] text-white flex items-center justify-center`}>
                <h1 className={`text-[8rem] uppercase font-bold relative overflow-hidden pt-[20px] mb-[20px]`}>
                    {
                        Text.split('').map((e, i) => (
                            <span className={`textanimate translate-y-full inline-block`} key={ i }>{ e }</span>
                        ))
                    }
                </h1>
            </div>
        </>
    )
}

export default Page