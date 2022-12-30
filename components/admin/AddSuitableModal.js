import Button from "components/main/Button"
import { Icon } from "@iconify/react"
import random from "random"
import Portal from "components/Portal"
import { useState } from "react"
import Image from "next/image"
import Loading from "components/Loading"
import moment from "moment"

const AddSuitableModal = ({ close, added }) => {
    const LabelID = random.int(200000, 5000000)

    const [LetLoading, setLetLoading] = useState(false)
    const [TagName, setTagName] = useState('')
    const [TagImage, setTagImage] = useState(false)

    const fImage = {
        add: (e) => setTagImage(e.target.files[0])
    }

    const SaveTag = async () => {

        if (TagName == '') return

        setLetLoading(true)

        const _filename = `suitable${moment().format('YYMMDD')}${random.int(200000,900000)}.jpg`
        const _filedirectory = 'suitable/'

        if (TagImage) {

            let data = new FormData()

            data.append('file', TagImage)

            const sendImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=${_filename}&dir=${_filedirectory}` , {
                mode: 'no-cors',
                method: 'POST',
                body: data
            })

        }

        const sendData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable' ,{
            method: 'POST',
            body: JSON.stringify({
                name: TagName,
                image: TagImage ? '/' + _filedirectory + _filename : ''
            })
        })

        const _sendData = await sendData.json()

        const getID = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable' )
        const _getID = await getID.json()

        if (_sendData.status) {
            added({
                id: _getID.filter((e) => e.image == '/' + _filedirectory + _filename && e)[0].id,
                name: TagName,
                image: '/' + _filedirectory + _filename,
                selected: false
            })
            setLetLoading(false)
            close()
        } else {
            setLetLoading(false)
        }

    }

    return (
        <>
            { LetLoading && <Loading text={ LetLoading }/> }
            <Portal>
                <div className={`fixed w-full h-full bg-black/30 z-50 top-0 left-0 backdrop-blur-sm flex justify-center items-center`}>
                    <div className={`bg-white p-[20px] rounded-md w-[400px] flex flex-col gap-[15px]`}>
                        <h3 className={`text-lg`}>Buat Tag Suitable Baru</h3>
                        <input onChange={ (e) => setTagName(e.target.value) } value={ TagName } type="text" placeholder="Nama Tag" className={`text-center first-letter:w-full border border-MO6/50 rounded-md p-[8px_16px]`}/>
                        <label htmlFor={ LabelID } className={`relative cursor-pointer hover:shadow-lg shadow-none transition-shadow border border-MO6/50 rounded-md w-full bg-white p-[20px_10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                            {
                                TagImage ? (
                                    <div className={`w-full`}>
                                        <Image className={`object-cover w-full rounded-[10px]`} src={ URL.createObjectURL(TagImage) } layout="responsive" width={ 150 } height={ 200 } objectFit='contain' alt="Kain Moeji Tag Image"/>
                                    </div>
                                ) : (
                                    <>
                                        <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
                                        <p>Tambah Gambar</p>
                                    </>
                                )
                            }
                        </label>
                        <input onChange={ fImage.add } id={ LabelID } type='file' className={`hidden`}/>
                        <Button
                            text="Simpan Tag"
                            addon='uppercase font-light'
                            act={ SaveTag }
                            fullwidth
                            sharp
                        />
                        <Button
                            text="Batal"
                            act={ close }
                            addon='uppercase font-light'
                            type='secondary'
                            fullwidth
                            sharp
                        />
                    </div>
                </div>
            </Portal>
        </>
    )
}

export default AddSuitableModal