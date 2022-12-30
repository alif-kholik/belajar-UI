import Portal from "./Portal"

const Modal = ({ data, close, children }) => {
    return (
        <>
            <Portal>
                <div style={{ width: data.width ? `${data.width}px` : '300px' }} className={`flex flex-col overflow-hidden bg-MO3 w-[300px] fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-[120] rounded-[10px]`}>
                    <div className={`py-[20px] flex flex-col gap-[10px]`}>
                        <h3 className={`text-lg font-light text-MO1 uppercase px-[20px]`}>{ data.text }</h3>
                        { data.subtext && <p className={`px-[20px] text-sm`}>{ data.subtext }</p> }
                        { children && (
                            <div className={`px-[20px]`}>
                                { children }
                            </div>
                        )}
                    </div>
                    {
                        data.button && (
                            <div className={`flex justify-end`}>
                                {
                                    data.button.map((e, i) => (
                                        <button onClick={ e.act } className={`p-[8px_16px] w-full ${e.type == 'primary' ? 'bg-MO1 text-MO2' : 'bg-MO2'} hover:bg-MO4 hover:text-MO3`} key={ i }>
                                            { e.text }
                                        </button>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <div onClick={ close } className={`fixed z-[110] bg-black/30 w-full h-full backdrop-blur-sm top-0 left-0`}/>
            </Portal>
        </>
    )
}

export default Modal