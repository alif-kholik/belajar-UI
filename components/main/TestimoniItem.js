import Image from "next/image"
import { Icon } from "@iconify/react"

const DATA = {
    name: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/testimoni-dummy.jpg'
}

const TestimoniItem = ({ status = true, data = DATA, opacity = true }) => {
    return (
        <>
            <div className={`p-[20px] pointer-events-none bg-white flex h-[calc(100%_-_20px)] mb-[20px] gap-[20px] w-full shadow-lg ${!status ? 'blur-sm opacity-60 hidden md:flex' : ''} ${opacity ? '' : 'opacity-0'} transition-all`}>
                <div className={`flex flex-col gap-[10px]`}>
                    <div className={`flex gap-[20px]`}>
                        <div className={`relative object-cover bg-MO6 w-[48px] h-[48px] shrink-0 rounded-full overflow-hidden`}>
                            <Image className={`object-cover w-full h-[100%]`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + data.image } layout="fill" alt={`${data.name} - Moeji Testimoni`}/>
                        </div>
                        <div className={`flex flex-col gap-[5px] w-full`}>
                            <h4 className={`text-MO1 uppercase text-[14px]`}>{ data.name }</h4>
                            <div className={`flex gap-[5px] mb-[5px] text-yellow-500`}>
                                {
                                    [0,0,0,0,0].map((e, i) => (
                                        <Icon key={ i } icon="ant-design:star-filled"/>
                                    ))
                                }
                            </div>
                            <p className={`hidden md:block text-[14px] md:text-[16px]`}>{ data.text }</p>
                        </div>
                    </div>
                    <p className={`md:hidden block text-[14px] md:text-[16px]`}>{ data.text }</p>
                </div>
            </div>
        </>
    )
}

export default TestimoniItem