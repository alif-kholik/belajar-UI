import Button from "components/main/Button"
import moment from "moment"

const MessageItem = ({ data }) => {
    const handleReply = () => {
        location.href = 'mailto:' + data.email
    }

    return (
        <>
            <div className={`bg-white w-full p-[15px] flex flex-col gap-[15px]`}>
                <div className={`flex justify-between`}>
                    <h3 className={`opacity-50`}>{ data.name } - <span>{ data.email }</span></h3>
                    <p className={`opacity-50 text-sm`}>{ moment(data.created_at).format('dddd, DD MMMM YYYY') }</p>
                </div>
                <p className={`flex flex-col gap-[10px]`}>
                    {
                        data.message.split('\n').map((e, i) => (
                            <span key={ i }>{ e }</span>
                        ))
                    }
                </p>
                <div className={`flex justify-end`}>
                    <Button
                        type="secondary"
                        text='Balas Pesan'
                        mini={ true }
                        sharp
                        addon={`font-light`}
                        act={ handleReply }
                    />
                </div>
            </div>
        </>
    )
}

export default MessageItem