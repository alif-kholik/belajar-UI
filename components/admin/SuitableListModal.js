import Button from "components/main/Button"
import { Icon } from "@iconify/react"
import random from "random"
import Portal from "components/Portal"
import Image from "next/image"
import { useState } from "react"
import Loading from "components/Loading"
import Modal from "components/Modal"

const SuitableListModal = ({ close, edit, remove, list, openadd, openedit }) => {

    const [SuitableList, setSuitableList] = useState(list)
    const [LetLoading, setLetLoading] = useState(false)
    const [DropDown, setDropDown] = useState(false)
    const [LetModal, setLetModal] = useState(false)

    const fSuitable = {
        remove: async (id) => {
            
            setLetLoading(true)

            const deleteData = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/suitable', {
                method: 'DELETE',
                body: JSON.stringify({
                    suitableid: id
                })
            })

            const _deleteData = await deleteData.json()

            //Delete Image
            if (_deleteData.status) {
                SuitableList.map(async e => {
                  if (e.id == id) {
                    const deleteImage = await fetch( process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/delete.php?dir=${e.image.substring(1)}`)
                  }
                })
            
                setSuitableList(SuitableList.filter((e) => id != e.id && e ))
                setDropDown(false)
                remove(id)
                
            }

            if (!_deleteData.status) alert(`Gagal Menghapus, ada produk yang masih menggunakan tag ${SuitableList.filter(e => e.id == id && e)[0].name}`)

            setLetModal(false)
            setLetLoading(false)
        },
        add: () => {
            openadd()
            close()
        },
        edit: (id) => {
            openedit(SuitableList.filter((e, i) => e.id == id && e)[0])
            close()
        }
    }

    return (
        <>
            { LetLoading && <Loading text={ LetLoading }/> }
            { LetModal && <Modal data={ LetModal } close={ () => setLetModal(false) } />}
            <Portal>
                <div className={`fixed w-full h-full bg-black/30 z-50 top-0 left-0 backdrop-blur-sm flex justify-center items-center`}>
                    <div className={`bg-white p-[20px] max-h-[80vh] overflow-auto rounded-md w-[800px] flex flex-col gap-[15px]`}>
                        <h3 className={`text-lg`}>Tag Suitable</h3>
                        <div className={`grid grid-cols-4 gap-[20px] text-center`}>
                            {
                                SuitableList.map((e, i) => (
                                    <div key={ i } className={`relative hover:shadow-md transition-shadow border p-[10px] flex flex-col gap-[10px] rounded-md`}>
                                        <div className={`relative h-[128px]`}>
                                            <Image src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + e.image } layout='fill' objectFit='contain' alt={ `Tag Image - ${e.name}` }/>
                                        </div>
                                        <p>{ e.name }</p>
                                        <div className={`flex gap-[10px] flex-col absolute top-[10px] right-[10px]`}>
                                            <button onClick={ () => setDropDown(i) } className={`opacity-50 hover:opacity-100 transition-opacity text-[1rem]`}>
                                                <Icon icon='charm:menu-meatball'/>
                                            </button>
                                            {
                                                DropDown !== false && DropDown == i && (
                                                    <div className={`z-20 absolute top-[100%] shadow-lg left-[50%] flex flex-col rounded-md overflow-hidden`} onBlur={ () => setDropDown(false) }>
                                                        <button 
                                                            onClick={ () => fSuitable.edit(e.id) }
                                                            className={`p-[8px_16px] text-sm bg-MO3 hover:bg-MO2`}>
                                                                Edit
                                                        </button>
                                                        <button 
                                                            onClick={ () => setLetModal({
                                                                text: `Hapus Tag ${e.name} ?`,
                                                                subtext: `Tag ${e.name} pada semua produk akan terhapus`,
                                                                button: [
                                                                    {
                                                                        type: 'primary',
                                                                        text: 'Hapus',
                                                                        act: () => fSuitable.remove(e.id)
                                                                    },
                                                                    {
                                                                        type: 'secondary',
                                                                        text: 'Batal',
                                                                        act: () => setLetModal(false)
                                                                    },
                                                                ]
                                                            }) }
                                                            className={`p-[8px_16px] text-sm bg-MO3 hover:bg-MO2`}>
                                                                Hapus
                                                        </button>
                                                        <button 
                                                            onClick={ () => setDropDown(false) }
                                                            className={`p-[8px_16px] text-sm bg-MO3 hover:bg-MO2`}>
                                                                Batal
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                openadd && (
                                    <button onClick={ () => fSuitable.add() } className={`cursor-pointer h-full hover:shadow-lg shadow-none transition-shadow border rounded-md w-full bg-white p-[20px_10px] flex flex-col items-center justify-center gap-[10px] text-MO6/50`}>
                                        <Icon icon="carbon:add-alt" className={`text-[64px]`}/>
                                        <p>Buat Tag Baru</p>
                                    </button>
                                )
                            }
                        </div>
                        <div className={`flex justify-end gap-[10px]`}>
                            <Button
                                text="Tutup"
                                act={ close }
                                addon='uppercase font-light'
                                type='secondary'
                                sharp
                            />
                        </div>
                    </div>
                </div>
            </Portal>
        </>
    )
}

export default SuitableListModal