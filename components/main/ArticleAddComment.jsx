import { useState } from "react"
import moment from "moment"
import { useRouter } from "next/router"
import { Icon } from "@iconify/react"

const ArticleAddComment = ({ _setComment = () => {} }) => {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Comment, setComment] = useState('')
    const [OnLoading, setOnLoading] = useState(false)
    const [Error, setError] = useState(null)

    const Router = useRouter()

    const fHandle = {
        submit: async e => {

            e.preventDefault()
            setError(null)

            let commentStateName = 'moeji-commentstate'
            let commentStateData = localStorage.getItem(commentStateName)
            let commentStatus = (moment(new Date()).unix() - parseInt(commentStateData)) > (60*5)
            // console.log(moment(new Date()).unix(), parseInt(commentStateData), commentStatus)
            // console.log(commentStateData)

            if (commentStateData && !commentStatus) {
                setError('Kamu hanya dapat memberi komentar setiap 5 menit di artikel yang sama')
                return
            }

            setOnLoading(true)
            
            if (!Name || !Comment) return

            let success = false

            try {
                
                const _postComment = await fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/comment', {
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: Name,
                        email: Email,
                        text: Comment,
                        image: '',
                        article_id: Router.query.id.split('-')[0]
                    })
                })

                const postComment = await _postComment.json()

                if (postComment.status) success = true

            } catch (err) {
                alert('Terjadi Kesalahan: ' + err)
            }

            if (success) {

                _setComment({
                    name: Name,
                    email: Email,
                    text: Comment,
                    date: moment(new Date()).format('DD MMMM YYYY, HH:mm:ss')
                })

                localStorage.setItem(commentStateName, moment(new Date()).unix())

                setName('')
                setEmail('')
                setComment('')

            }

            setOnLoading(false)

        }
    }

    return (
        <>
            <div className={`bg-white mt-[20px] border border-MO5 rounded-lg max-w-[700px] overflow-hidden`}>
                <form onSubmit={ fHandle.submit } className={`flex flex-col gap-[15px] items-end`}>

                    {/* TITLE */}
                    <h3 className={`w-full font-bold text-MO1 bg-MO3 p-[20px] border-b border-MO5`}>Tambah Komentar Baru</h3>

                    {/* FORM */}
                    <div className={`w-full flex flex-col md:flex-row gap-[20px] px-[20px]`}>
                        <div className={`flex flex-col gap-[5px] w-full`}>
                            <input onChange={ e => setName(e.target.value) } value={ Name } name="name" placeholder="Nama *" className={`border-b border-MO5 p-[10px_0]`}/>
                        </div>
                        <div className={`flex flex-col gap-[5px] w-full`}>
                            <input onChange={ e => setEmail(e.target.value) } value={ Email } name="email" placeholder="Email" className={`border-b border-MO5 p-[10px_0]`}/>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-[5px] w-full px-[20px]`}>
                        <textarea onChange={ e => setComment(e.target.value) } value={ Comment } name="comment" placeholder="Komentar *" className={`border-b border-MO5 p-[10px_0]`} rows={ 3 }/>
                    </div>

                    {/* SUBMIT */}
                    <div className={`p-[20px] w-full flex flex-col md:flex-row gap-[10px] md:items-center justify-between`}>
                        <span className={`text-sm opacity-50`}>(*) Tidak Boleh Kosong</span>
                        <button className={`${!Name || !Comment || OnLoading ? '!opacity-50 !pointer-events-none' : ''} relative whitespace-nowrap rounded-full p-[8px_16px] bg-MO1 text-MO3 hover:bg-MO2 hover:text-MO1 transition-colors flex justify-center items-center`} type="submit">
                            <Icon icon='line-md:loading-twotone-loop' className={`${!OnLoading ? 'hidden' : ''} absolute text-[24px] top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4`}/>
                            <p className={`${OnLoading ? 'invisible' : ''}`}>Kirim Komentar</p>
                        </button>
                    </div>

                    { Error && (
                        <p className={`w-full text-red-500 text-sm p-[0_20px_20px] text-center`}>{ '*' + Error }</p>
                    )}

                </form>
            </div>
        </>
    )
}

export default ArticleAddComment