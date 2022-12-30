import Portal from "components/Portal"
import Button from "components/main/Button"
import { Icon } from "@iconify/react"
import random from "random"
import { useState } from "react"
import Image from "next/image"
import Loading from "components/Loading"
import moment from "moment"
import Modal from 'components/Modal'

const TestimoniAddModal = ({ data, close, added, updated, deleted }) => {
    const LabelID = random.int(200000, 5000000)
    const [TestimoniImage, setTestimoniImage] = useState(data ? data.image : false)
    const [TestimoniName, setTestimoniName] = useState(data ? data.name : '')
    const [TestimoniText, setTestimoniText] = useState(data ? data.text : '')
    const [LetLoading, setLetLoading] = useState(false)
    const [LetModal, setLetModal] = useState(false)

    const fHandle = {
        save: async () => {
            
            if (!TestimoniImage || !TestimoniName || !TestimoniText) {
                alert('Lengkapi Form Terlebih Dahulu')
                return
            }

            setLetLoading('Menambah Testimoni Baru')

            //UPLOAD IMAGE, GET URL
            const _filename = `testimoni${moment().format('YYMMDD')}${random.int(200000,900000)}.jpg`
            const _filedirectory = 'testimoni/'
            
            if (TestimoniImage) {

                let data = new FormData()

                data.append('file', TestimoniImage)

                const sendImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=${_filename}&dir=${_filedirectory}` , {
                    mode: 'no-cors',
                    method: 'POST',
                    body: data
                })

            }

            //INSERT TO DATABASE
            const _saveTesti = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/testimoni', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: TestimoniName,
                    text: TestimoniText,
                    image: '/' + _filedirectory + _filename
                })
            })

            const saveTest = await _saveTesti.json()

            const _getId = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/testimoni' )
            const getId = await _getId.json()

            if (saveTest.status) {
                added({
                    id: getId.filter(e => e.image == '/' + _filedirectory + _filename && e)[0].id,
                    name: TestimoniName,
                    text: TestimoniText,
                    image: '/' + _filedirectory + _filename
                })
                close()
            } else {
                alert('Gagal Menambah Testimoni Baru')
                setLetLoading(false)
            }

        },
        update: async () => {

            if (!TestimoniImage || !TestimoniName || !TestimoniText) {
                alert('Lengkapi Form Terlebih Dahulu')
                return
            }

            setLetLoading(`Mengubah Data Testimoni ${data.name} : (${data.id})`)

            //UPLOAD IMAGE, GET URL
            const _filename = `testimoni${moment().format('YYMMDD')}${random.int(200000,900000)}.jpg`
            const _filedirectory = 'testimoni/'

            if (typeof(TestimoniImage) != 'string') {

                let datas = new FormData()

                datas.append('file', TestimoniImage)

                const sendImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/upload.php?name=${_filename}&dir=${_filedirectory}` , {
                    mode: 'no-cors',
                    method: 'POST',
                    body: datas
                })

                console.log(sendImage)

                const deleteImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/delete.php?dir=${data.image.substring(1)}`)

            }

            //INSERT TO DATABASE
            const _saveTesti = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/testimoni', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: data.id,
                    name: TestimoniName,
                    text: TestimoniText,
                    image: typeof(TestimoniImage) == 'string' ? data.image : '/' + _filedirectory + _filename
                })
            })

            const saveTest = await _saveTesti.json()

            if (saveTest.status) {
                updated({
                    id: data.id,
                    name: TestimoniName,
                    text: TestimoniText,
                    image: typeof(TestimoniImage) == 'string' ? data.image : '/' + _filedirectory + _filename
                })
                close()
            } else {
                alert('Gagal Menambah Testimoni Baru')
                setLetLoading(false)
            }

        },
        remove: async () => {

            setLetLoading(`Menghapus Testimoni ${data.name} : (${data.id})`)

            //DELETE TO DATABASE
            const _deleteTesti = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/testimoni', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: data.id,
                })
            })

            const deleteTest = await _deleteTesti.json()

            const deleteImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/delete.php?dir=${data.image.substring(1)}`)

            if (deleteTest.status) {
                deleted(data.id)
                close()
            } else {
                alert('Gagal Menghapus Testimoni')
                setLetLoading(false)
            }

        }
    }

    return (
        <>
            { LetModal && <Modal data={ LetModal } /> }
            { LetLoading && <Loading text={ LetLoading }/> }
            <Portal>
                <div className={`fixed w-full h-full bg-black/30 z-50 top-0 left-0 backdrop-blur-sm flex justify-center items-center`}>
                    <div className={`bg-white p-[20px] rounded-md w-[700px] flex flex-col gap-[15px]`}>
                        <h3 className={`text-lg`}>{ data ? `Edit Testimoni ${data.name} : (${data.id})` : 'Tambah Testimoni Baru' }</h3>
                        <div className={`flex gap-[20px]`}>
                            <div className={`shrink-0 relative w-[200px]`}>
                                <label htmlFor={ LabelID } className={`relative overflow-hidden cursor-pointer hover:bg-MO6/20 transition-colors border border-MO6/50 rounded-md w-full bg-white flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                                    {
                                        TestimoniImage ? (
                                            <div className={`w-full [&>span]:hover:opacity-100`}>
                                                <span className={`opacity-0 transition-opacity backdrop-blur-sm flex absolute z-10 h-full bg-MO6/50 w-full justify-center items-center text-MO3`}>Ganti Gambar</span>
                                                <Image className={`object-cover w-full`} src={ typeof(TestimoniImage) == 'string' ? process.env.NEXT_PUBLIC_MEDIA_DOMAIN + TestimoniImage : URL.createObjectURL(TestimoniImage) } layout="responsive" width={ 200 } height={ 200 } objectFit='contain' alt="Kain Moeji Tag Image"/>
                                            </div>
                                        ) : (
                                            <div className={`flex flex-col w-[200px] h-[200px] items-center justify-center gap-[10px]`}>
                                                <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
                                                <p>Tambah Gambar</p>
                                            </div>
                                        )
                                    }
                                </label>
                                <p className={`text-sm mt-[10px] mx-auto w-fit text-MO6`}>Ukuran 720px x 720px</p>
                                <input onChange={ e => setTestimoniImage(e.target.files[0]) } id={ LabelID } type='file' className={`hidden`}/>
                            </div>
                            <div className={`flex flex-col gap-[10px] w-full`}>
                                <div className={`flex flex-col gap-[5px]`}>
                                    <label>Nama</label>
                                    <input onChange={ e => setTestimoniName(e.target.value) } value={ TestimoniName } type="text" placeholder="Nama Testimoni" className={`p-[8px_16px] border`}/>
                                </div>
                                <div className={`flex flex-col gap-[5px]`}>
                                    <label>Pesan</label>
                                    <textarea onChange={ e => setTestimoniText(e.target.value) } value={ TestimoniText } rows={ 3 } type="text" placeholder="Pesan Testimoni" className={`p-[8px_16px] border h-full`}/>
                                </div>
                            </div>
                        </div>
                        <div className={`flex gap-[15px] justify-between`}>
                            {
                                data && (
                                    <Button
                                        text="Hapus"
                                        act={ () => setLetModal({
                                            text: `Hapus Testimoni ${data.name} ?`,
                                            subtext: `Data tidak akan bisa dikembalikan lagi.`,
                                            button: [
                                                {
                                                    type: 'primary',
                                                    text: 'Hapus',
                                                    act: fHandle.remove
                                                },
                                                {
                                                    text: 'Batal',
                                                    act: () => setLetModal(false)
                                                }
                                            ]
                                        }) }
                                        addon='uppercase font-light text-red-400'
                                        type='secondary'
                                        sharp
                                    />
                                )
                            }
                            <div className={`flex gap-[15px] justify-end w-full`}>
                                <Button
                                    text="Simpan Testimoni"
                                    addon='uppercase font-light'
                                    act={ data ? fHandle.update : fHandle.save }
                                    sharp
                                />
                                <Button
                                    text="Batal"
                                    act={ close }
                                    addon='uppercase font-light'
                                    type='secondary'
                                    sharp
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    )
}

export default TestimoniAddModal