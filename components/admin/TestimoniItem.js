import Image from "next/image"

const DATA = {
    name: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/testimoni-dummy.jpg'
}

const TestimoniItem = ({ status = true, data = DATA, opacity = true }) => {
    return (
        <>
            <div className={`pointer-events-none bg-white flex flex-col md:flex-row mb-[20px] w-full border transition-shadow hover:shadow-lg ${!status ? 'blur-sm opacity-60 hidden md:flex' : ''} ${opacity ? '' : 'opacity-0'} transition-all`}>
                <div className={`relative object-cover w-full md:w-[156px] h-[80vw] md:h-[156px] shrink-0`}>
                    <Image className={`object-cover w-full h-[100%]`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + data.image } layout="fill" alt={`${data.name} - Moeji Testimoni`}/>
                </div>
                <div className={`p-[20px] flex flex-col gap-[5px] w-full`}>
                    <h4 className={`text-MO1 uppercase text-[14px`}>{ data.name }</h4>
                    <p className={`flex flex-col gap-[5px]`}>
                        {
                            data.text.split('\n').map((e, i) => (
                                <span key={ i }>{ e }</span>
                            ))
                        }
                    </p>
                </div>
            </div>
        </>
    )
}

export default TestimoniItem