import Button from "components/main/Button"
import { Icon } from "@iconify/react"
import random from "random"
import Portal from "components/Portal"
import Image from "next/image"
import { useState } from "react"
import Loading from "components/Loading"

const EditSuitableModal = ({ close, data, edited }) => {
    const LabelID = random.int(200000, 5000000)

    const [LetLoading, setLetLoading] = useState(false)
    const [TagName, setTagName] = useState(data.name)
    const [TagImage, setTagImage] = useState(false)

    const fImage = {
        add: (e) => setTagImage(e.target.files[0])
    }

    const SaveTag = async () => {

        if (TagName == '') return

        setLetLoading(true)

        const _filename = `suitable${random.int(200000,900000)}.jpg`
        const _filedirectory = 'suitable/'

        if (TagImage) {

            let datas = new FormData()

            datas.append('file', TagImage)

            const sendImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=${_filename}&dir=${_filedirectory}` , {
                mode: 'no-cors',
                method: 'POST',
                body: datas
            })

            const deleteImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/delete.php?dir=${data.image.substring(1)}`)

        }

        if (TagName != data.name || TagImage) {
            
            const sendData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable' ,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: data.id,
                    name: TagName,
                    image: TagImage ? '/' + _filedirectory + _filename : data.image
                })
            })
    
            const _sendData = await sendData.json()
    
            if (_sendData.status) {
                edited({
                    id: data.id,
                    name: TagName,
                    image: TagImage ? '/' + _filedirectory + _filename : data.image
                })
                setLetLoading(false)
            } else {
                setLetLoading(false)
            }
            
        }
        
        close()

    }

    return (
        <>
            { LetLoading && <Loading text={ LetLoading }/> }
            <Portal>
                <div className={`fixed w-full h-full bg-black/30 z-50 top-0 left-0 backdrop-blur-sm flex justify-center items-center`}>
                    <div className={`bg-white p-[20px] rounded-md w-[400px] flex flex-col gap-[15px]`}>
                        <h3 className={`text-lg`}>Edit Tag Suitable</h3>
                        <input onChange={(e) => setTagName(e.target.value)} value={ TagName } type="text" placeholder="Nama Tag" className={`text-center first-letter:w-full border border-MO6/50 rounded-md p-[8px_16px]`}/>
                        <label htmlFor={ LabelID } className={`relative h-[200px] cursor-pointer hover:shadow-lg shadow-none transition-shadow border border-MO6/50 rounded-md w-full bg-white p-[20px_10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                            <Image src={ TagImage ? URL.createObjectURL(TagImage) : process.env.NEXT_PUBLIC_MEDIA_DOMAIN + data.image } layout='fill' objectFit='contain' alt={`Tag Image - ${data.name}`}/>
                            <p>Ganti Gambar</p>
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

export default EditSuitableModal