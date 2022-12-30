import Portal from 'components/Portal'
import TranslateLocal from 'utils/TranslateLocal'
import Button from './Button'
import { useRouter } from 'next/router'

const ProductFilterModal = ({ title = 'Filter', data, status = true, close, col, f, selected : SELECTED }) => {

    const Router = useRouter()

    return (
        <>
            <Portal>
                <div className={`p-[30px_20px] fixed bottom-0 left-0 w-full bg-white z-[130] flex flex-col items-center gap-[30px] rounded-[15px_15px_0_0] ${status ? '' : 'translate-y-[100%]'} transition-transform`}>
                    <p className={`uppercase text-MO1 font-semibold`}>{ title }</p>
                    <div className={`flex flex-col gap-[20px] w-full max-h-[300px] overflow-y-scroll`}>
                        {
                            data.map((e, i) => (
                                <div className={`w-full`} key={ i }>
                                    { e.name != 'Main' && e.name && <p className={`text-[12px] opacity-50 mb-[10px] ${col ? 'text-center' : ''}`}>{ e.name }</p> }
                                    <div className={`flex ${col ? 'flex-col' : 'flex-wrap'} gap-[10px]`} >
                                        {
                                            e.data.map((z, x) => (
                                                <button
                                                    className={`
                                                        border ${col ? 'w-full' : ''} p-[8px_16px] text-sm
                                                        ${
                                                            SELECTED.find(y => y.master == e.name) &&
                                                            SELECTED.filter(x => x.master.toLowerCase() == e.name.toLowerCase() && e)[0].selected == z.name ? 'bg-MO2 text-MO1 border-MO2' : 'border-MO5'
                                                        }
                                                    `}
                                                    onClick={ () => {
                                                        f.select(e.name, z.name)
                                                        if (z.name == TranslateLocal('Semua Produk', 'All Products', Router)) close()
                                                        if (data.length == 1 && col) close()
                                                    }} key={ x }
                                                >{ z.name }</button>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`absolute top-[10px] w-[50px] bg-MO6/60 h-[2px]`}/>
                    <div className={`flex flex-col gap-[10px] w-full`}>
                        <Button
                            text={ TranslateLocal('Terapkan', 'Apply') }
                            addon={`border-0 font-light`}
                            act={ () => {
                                f.apply()
                                close()
                            } }
                            sharp
                            fullwidth
                        />
                        {/* <Button
                            text="Reset"
                            type="secondary"
                            addon={`font-light`}
                            act={ () => {
                                reset()
                                close()
                            } }
                            sharp
                            fullwidth
                        /> */}
                    </div>
                </div>
                { status && <div onClick={ close } className={`fixed z-[120] bg-black/30 w-full h-full backdrop-blur-sm top-0`}/> }
            </Portal>
        </>
    )
}

export default ProductFilterModal