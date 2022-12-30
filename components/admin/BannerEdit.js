import { Icon } from "@iconify/react"
import Button from "components/main/Button"
import { useEffect, useState } from "react"
import Image from "next/image"
import Modal from "components/Modal"
import Loading from "components/Loading"
import moment from "moment"
import random from "random"

const BannerEdit = ({ data, index, open, status, edited = () => {}, added, deleted }) => {

    const [LetModal, setLetModal] = useState(false)
    const [LetLoading, setLetLoading] = useState(false)

    const [Desktop, setDesktop] = useState(data ? data.desktop : '')
    const [Mobile, setMobile] = useState(data ? data.mobile : '')
    const [MiniText, setMiniText] = useState(data ? data.minitext : '')
    const [MainText, setMainText] = useState(data ? data.text : '')
    const [Paragraph, setParagraph] = useState(data ? data.paragraph : '')
    const [Link, setLink] = useState(data ? data.link : '')

    const [ERender, setERender] = useState(false)

    useEffect(() => setERender(true), [])

    const fHandle = {
        save: async () => {

            setLetLoading('Menyimpan Data Banner')

            if (Desktop == '' || Mobile == '') return

            if (!data) {


                //UPLOAD IMAGE, GET URL
                const _filename = `banner${moment().format('YYMMDD')}${random.int(200000,900000)}.jpg`
                const _filedirectory = 'banner/'

                let ImageDesktop = new FormData()
                let ImageMobile = new FormData()

                ImageDesktop.append('file', Desktop)
                ImageMobile.append('file', Mobile)

                const sendImageDesktop = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=${_filename}&dir=${_filedirectory}` , {
                    mode: 'no-cors',
                    method: 'POST',
                    body: ImageDesktop
                })

                const sendImageMobile = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=mb${_filename}&dir=${_filedirectory}` , {
                    mode: 'no-cors',
                    method: 'POST',
                    body: ImageMobile
                })

                const _insertData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/banner', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        minitext: MiniText,
                        text: MainText,
                        desktop: '/' + _filedirectory + _filename,
                        mobile: '/' + _filedirectory + 'mb' + _filename,
                        paragraph: Paragraph,
                        link: Link
                    })
                })

                const insertData = await _insertData.json()

                if (insertData.status) {

                    added({
                        minitext: MiniText,
                        text: MainText,
                        desktop: '/' + _filedirectory + _filename,
                        mobile: '/' + _filedirectory + 'mb' + _filename,
                        paragraph: Paragraph,
                        link: Link
                    })

                    setLetLoading(false)

                }


            } else {

                edited({
                    minitext: MiniText,
                    text: MainText.split('\n'),
                    desktop: Desktop,
                    mobile: Mobile,
                    paragraph: Paragraph,
                    link: Link
                })

            }

            fHandle.reset()

        },
        reset: () => {
            setDesktop(data ? data.desktop : '')
            setMobile(data ? data.mobile : '')
            setMiniText(data ? data.minitext : '')
            setMainText(data ? data.text : '')
            setParagraph(data ? data.paragraph : '')
            setLink(data ? data.link : '')
            edited({
                id: index,
                data: {
                    id: data ? data.id : null,
                    minitext: MiniText,
                    text: MainText,
                    desktop: Desktop,
                    mobile: Mobile,
                    paragraph: Paragraph,
                    link: Link
                }
            })
        },
        delete: async () => {

            setLetLoading('Menghapus Banner')

            const _deleteData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/banner', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: data.id
                })
            })

            const deleteData = await _deleteData.json()

            const deleteImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/delete.php?dir=${data.desktop.substring(1)}`)
            const deleteImage2 = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/delete.php?dir=${data.mobile.substring(1)}`)

            if (deleteData.status) {

                deleted(index)
                setLetModal(false)
                setLetLoading(false)

            }
        }
    }

    return (
        <>
            { LetLoading && <Loading text={LetLoading} /> }
            { LetModal && <Modal data={ LetModal } close={ () => setLetModal(false) }/> }
            <div className={`p-[15px] flex flex-col gap-[15px] ${data ? 'bg-white' : 'border'}`}>
                <div className={`flex gap-[15px] items-center`}>
                    <p className={`text-MO1 font-semibold`}>{ index + 1 }</p>
                    <p className={`uppercase w-full`}>{!data ? 'Tambah Banner Baru' : `${MiniText} ${MainText}`}</p>
                    <button onClick={ open }>
                        <Icon icon="ep:arrow-down"  className={`text-xl relative transition-transform ${status ? 'rotate-180' : ''}`}/>
                    </button>
                </div>
                <div className={`${ status ? '' : 'hidden' } flex flex-col gap-[15px]`}>
                    <div className={`flex w-full gap-[20px]`}>
                        <label htmlFor={`input-data-banner-desktop-${index}`} className={`w-full`}>
                            <p className={`text-MO6 text-sm mt-[10px]`}>*Ukuran 1280px X 677px</p>
                            {
                                Desktop ? (
                                    <div className={`[&>p]:hover:opacity-100 relative cursor-pointer w-[320px] h-[170px] rounded-[5px] border p-[10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                                        <Image src={ typeof(Desktop) == 'string' ? process.env.NEXT_PUBLIC_MEDIA_DOMAIN + Desktop : URL.createObjectURL(Desktop) } layout="fill" objectFit="contain" className={`object-cover w-full h-[100%]`}/>
                                        <p className={`absolute z-20 w-full h-full bg-black/30 backdrop-blur-sm flex opacity-0 transition-opacity text-MO3 justify-center items-center`}>
                                            <span>Ganti Gambar</span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className={`cursor-pointer hover:shadow-md shadow-none transition-shadow rounded-[5px] w-full border p-[10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                                        <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
                                        <p className={`text-[12px]`}>Tambah Gambar Desktop</p>
                                    </div>
                                )
                            }
                        </label>
                        <input onChange={ e => setDesktop(e.target.files[0]) } id={`input-data-banner-desktop-${index}`} type='file' className={`hidden`}/>
                        <label htmlFor={`input-data-banner-mobile-${index}`} className={`w-full`}>
                            <p className={`text-MO6 text-sm mt-[10px]`}>*Ukuran 543px X 850px</p>
                            {
                                Mobile ? (
                                    <div className={`[&>p]:hover:opacity-100 relative cursor-pointer w-[136px] h-[213px] rounded-[5px] border p-[10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                                        <Image src={ typeof(Mobile) == 'string' ? process.env.NEXT_PUBLIC_MEDIA_DOMAIN + Mobile : URL.createObjectURL(Mobile) } layout="fill" objectFit="contain" className={`object-cover w-full h-[100%]`}/>
                                        <p className={`absolute p-[10px] text-center z-20 w-full h-full bg-black/30 backdrop-blur-sm flex opacity-0 transition-opacity text-MO3 justify-center items-center`}>
                                            <span>Ganti Gambar</span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className={`cursor-pointer hover:shadow-md shadow-none transition-shadow rounded-[5px] w-full border p-[10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                                        <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
                                        <p className={`text-[12px]`}>Tambah Gambar Mobile</p>
                                    </div>
                                )
                            }
                        </label>
                        <input onChange={ e => setMobile(e.target.files[0]) } id={`input-data-banner-mobile-${index}`} type='file' className={`hidden`}/>
                    </div>
                    <div className={`flex gap-[15px] [&>div]:w-full`}>
                        <div className={`flex flex-col gap-[5px]`}>
                            <label className={`text-sm opacity-50`}>Mini Text</label>
                            <input onChange={ (e) => setMiniText(e.target.value) } value={ MiniText } type='text' placeholder='Teks Kecil' className={`border border-MO6/50 rounded-md p-[8px_16px] capitalize bg-transparent`}/>
                        </div>
                        <div className={`flex flex-col gap-[5px]`}>
                            <label className={`text-sm opacity-50`}>Text Utama*</label>
                            <textarea rows={ 1 } onChange={ (e) => setMainText(e.target.value) } value={ MainText } type='text' placeholder='Teks Utama' className={`border border-MO6/50 rounded-md p-[8px_16px] capitalize bg-transparent`}/>
                        </div>
                    </div>
                    <div>
                        <div className={`flex flex-col gap-[5px]`}>
                            <label className={`text-sm opacity-50`}>Paragraph</label>
                            <textarea rows={ 2 } onChange={ (e) => setParagraph(e.target.value) } value={ Paragraph } type='text' placeholder='Paragraf' className={`border border-MO6/50 rounded-md p-[8px_16px] capitalize bg-transparent`}/>
                        </div>
                    </div>
                    <div>
                        <div className={`flex flex-col gap-[5px]`}>
                            <label className={`text-sm opacity-50`}>Link</label>
                            <input onChange={ (e) => setLink(e.target.value) } value={ Link } type='text' placeholder='https://.... atau (/page)' className={`border border-MO6/50 rounded-md p-[8px_16px]`}/>
                        </div>
                    </div>
                    <div className={`w-full flex gap-[15px]`}>
                        { ((data && data.id) || (!data)) && (
                                <Button
                                    text={ data ? 'Simpan' : 'Tambah' }
                                    sharp
                                    fullwidth
                                    act={ fHandle.save }
                                    addon={`uppercase font-light`}
                                />
                            )
                        }
                        <Button
                            text="Reset"
                            type="secondary"
                            sharp
                            fullwidth
                            act={ fHandle.reset }
                            addon={`uppercase font-light`}
                        />
                        {
                            data && data.id && (
                                <Button
                                    text="Hapus"
                                    type="secondary"
                                    sharp
                                    fullwidth
                                    act={ () => setLetModal({
                                        width: 500,
                                        text: 'Hapus Banner',
                                        subtext: `Apakah kamu yakin ingin menghapus Banner (${MiniText} ${MainText})`,
                                        button: [
                                            {
                                                text: 'Batal',
                                                type: 'secondary',
                                                act: () => setLetModal(false),
                                            },
                                            {
                                                text: 'Hapus',
                                                type: 'primary',
                                                act: () => fHandle.delete(),
                                            },
                                        ]
                                    }) }
                                    addon={`uppercase font-light text-red-500`}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerEdit