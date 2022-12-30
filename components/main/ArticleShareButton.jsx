import { Icon } from "@iconify/react"
import { useRouter } from "next/router"
import Script from "next/script"

const ArticleShareButton = () => {

    const Router = useRouter()

    const ShareList = [
        {
            title: 'Bagikan ke Twitter',
            icon: 'ant-design:twitter-circle-filled',
            act: () => {
                location.href = `https://twitter.com/intent/tweet?text=${ process.env.NEXT_PUBLIC_DOMAIN + Router.asPath }`
            }
        },
        // {
        //     title: 'Facebook',
        //     icon: 'ic:baseline-facebook',
        //     act: () => {}
        // },
        {
            title: 'Bagikan ke Whatsapp',
            icon: 'ri:whatsapp-fill',
            act: () => {
                location.href = `whatsapp://send?text=${ process.env.NEXT_PUBLIC_DOMAIN + Router.asPath }`
            }
        },
        {
            title: 'Salin Link',
            icon: 'akar-icons:link-on',
            act: () => {
                navigator.clipboard.writeText( process.env.NEXT_PUBLIC_DOMAIN + Router.asPath )
                alert('Berhasil Menyalin Link Artikel')
            }
        },
    ]

    return (
        <>

            <div id="fb-root"></div>

            <Script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v15.0" nonce="kXOoC0Hh"/>

            <div className={`[&_*]:hover:!text-MO1 border border-MO5 hover:border-MO5/0 hover:bg-gradient-to-l hover:from-[#EDEAE8] hover:to-[#FFFFFF] rounded-full p-[10px_20px] w-fit flex items-center gap-[20px] transition-all duration-300 hover:shadow-[0_10px_10px_#00000010]`}>
                
                <iframe className={`rounded-full`} src={`https://www.facebook.com/plugins/share_button.php?href=${ process.env.NEXT_PUBLIC_DOMAIN + Router.asPath }&layout=button&size=large&width=100&height=280&appId`} width="77" height="28" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

                {
                    ShareList.map((e, i) => (
                        <button key={ i } title={ e.title } onClick={ e.act } className={`hover:opacity-50 transition-opacity`}>
                            <Icon className={`text-MO6 text-[30px] transition-all duration-300`} icon={ e.icon }/>
                        </button>
                    ))
                }

            </div>
        </>
    )
}

export default ArticleShareButton