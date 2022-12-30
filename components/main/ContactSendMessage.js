import Button from "./Button"
import { useState } from "react"
import { useRouter } from "next/router"
import Modal from "components/Modal"
import TranslateLocal from "utils/TranslateLocal"

const ContactSendMessage = () => {
    const [MName, setMName] = useState('')
    const [MEmail, setMEmail] = useState('')
    const [MMessage, setMMessage] = useState('')
    const [MModal, setMModal] = useState(false)
    const Router = useRouter()

    const handleSendMessage = async () => {

        if (MName == '' || MEmail == '' || MMessage == '') {
            setMModal({
                text: TranslateLocal('Isi Form Pesan Terlebih Dahulu!', 'Fill the Form!', Router),
                button: [
                    {
                        type: 'secondary',
                        text: 'Tutup',
                        act: () => setMModal(false)
                    }
                ]
            })
            return
        }

        const _sendMessage = await fetch( process.env.NEXT_PUBLIC_DOMAIN + '/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: MName,
                email: MEmail,
                message: MMessage
            })
        })

        const sendMessage = await _sendMessage.json()

        console.log(sendMessage)

        if (sendMessage.status) {
            setMModal({
                text: TranslateLocal('Pesan berhasil dikirim', 'Message sent successfully', Router),
                button: [
                    {
                        type: 'secondary',
                        text: 'Tutup',
                        act: () => setMModal(false)
                    }
                ]
            })
            setMName('')
            setMEmail('')
            setMMessage('')
        }

    }

    return (
        <>
            { MModal && <Modal data={ MModal } close={ () => setMModal(false )} />}
            <div className={`flex flex-col gap-[10px] md:gap-[30px] [&>*]:w-full bg-white p-[30px] md:p-[50px] [&_input]:p-[10px_15px] [&_textarea]:p-[10px_20px] [&_textarea]:border [&_input]:border`}>
                <h2 className={`text-[24px] md:text-[36px] text-MO1`}>{ TranslateLocal('Kirim Pesan', 'Send Message', Router) }</h2>
                <div className={`flex flex-col gap-[10px]`}>
                    <label>{ TranslateLocal('Nama', 'Name', Router) }</label>
                    <input type='text' value={ MName } onChange={ e => setMName(e.target.value) } required/>
                </div>
                <div className={`flex flex-col gap-[10px]`}>
                    <label>{ TranslateLocal('Email', 'Email', Router) }</label>
                    <input type='email' value={ MEmail } onChange={ e => setMEmail(e.target.value) } required/>
                </div>
                <div className={`flex flex-col gap-[10px]`}>
                    <label>{ TranslateLocal('Pesan', 'Message', Router) }</label>
                    <textarea rows={ 5 } value={ MMessage } onChange={ e => setMMessage(e.target.value) } required></textarea>
                </div>
                <Button
                    text={ TranslateLocal('Kirim Pesan', 'Send Message', Router) }
                    addon={`font-light uppercase`}
                    act={ handleSendMessage }
                    fullwidth
                    sharp
                />
            </div>
        </>
    )
}

export default ContactSendMessage