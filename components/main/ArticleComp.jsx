import Image from "next/image"
import toCapitalize from "utils/Capitalize"
import ElSelect from "utils/ElementSelector"
import ArticleAddComment from "./ArticleAddComment"
import ArticleComment from "./ArticleComment"
import ArticleMiniCard from "./ArticleMiniCard"
import ArticleMoreNext from "./ArticleMoreNext"
import ArticleShareButton from "./ArticleShareButton"
import { useState } from "react"

const ArticleComp = ({ data, handle }) => {
    
    const [ViewMoreComment, setViewMoreComment] = useState(false)

    return (
        <>

            <section className={`max-w-screen-xl mx-auto mb-[60px]`}>

                {/* IMAGE HEADING */}
                <div className="relative h-[180px] md:h-[364px] md:mb-[30px]">
                    <Image alt={ data.title } className={`z-20`} src={ process.env.NEXT_PUBLIC_MEDIA_DOMAIN + `/load.php?dir=${data.image}&width=1080&height=364&quality=100` } layout="fill" objectFit="cover"/>
                    <div className={`absolute w-full h-full top-0 left-0 bg-MO5 z-10 animate-pulse`}/>
                </div>

                <div className={`lg:flex gap-[20px]`}>

                    <div className={`p-[20px] xl:p-[20px_0] w-full`}>

                        {/* ARTICLE SECTION */}
                        <article>

                            {/* HEADING BODY */}
                            <div className={`flex flex-col gap-[15px] mb-[30px]`}>

                                <span className={`leading-[100%] text-MO1 text-[14px] md:text-[16px]`}>{ data.date }</span>
                                <h1 className={`font-semibold uppercase text-[20px] md:text-[36px] text-MO1 leading-[130%]`}>{ data.title }</h1>
                                <div className={`flex gap-[10px] items-center`}>
                                    <div className={`bg-gray-300 w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full block shrink-0`}/>
                                    <div className={`bg-gray-300 w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full block shrink-0`}/>
                                    <div className={`bg-gray-300 w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full block shrink-0`}/>
                                </div>

                                {/* SHARE BUTTON */}
                                <div className={`flex flex-col md:flex-row gap-[5px] md:gap-[10px] md:items-center mb-[10px]`}>
                                    {/* <span className={`block text-MO1 font-bold`}>Bagikan Artikel</span> */}
                                    <ArticleShareButton/>
                                </div>

                                <h2 className={`text-[14px] md:text-[16px]`}>{ data.description }</h2>

                            </div>

                            {/* BODY SECTION */}
                            <div className={`[&>*]:mb-[20px]`}>
                                {
                                    data.body.map((e, i) => (
                                        <ElSelect
                                            type={ e.type }
                                            key={ i }
                                            classname={`${e.type == 'h2' ? 'text-[16px] md:text-[20px] font-bold' : ''} ${e.type == 'h3' ? 'text-[16px] md:text-[20px] font-bold' : ''} ${e.type == 'p' ? 'text-[14px] md:text-[16px]' : ''}`}
                                        >{ e.text }</ElSelect>
                                    ))
                                }
                            </div>

                        </article>

                        {/* TAG LIST */}
                        <hr className={`my-[30px] md:my-[40px]`}/>
                        <div className={`mb-[30px] flex flex-wrap gap-[10px]`}>
                            {
                                data.tag.map((e, i) => (
                                    <span key={ i } className={`text-sm inline-block p-[8px_16px] bg-white border border-MO5 text-MO6`}>{ toCapitalize(e) }</span>
                                ))
                            }
                        </div>

                        {/* SHARE BUTTON AND NEXT */}
                        <div className={`flex flex-col md:flex-row gap-[5px] md:gap-[10px] md:items-center`}>

                            <span className={`block text-MO1 font-bold`}>Bagikan Artikel</span>
                            <ArticleShareButton/>

                        </div>

                        {/* ARTICLE NEXT AND PREVIOUS */}
                        { data.more && <ArticleMoreNext data={ data.more }/> }

                        {/* COMMENT SECTION */}
                        <hr className={`my-[30px] md:my-[40px]`}/>
                        <div className={`bg-white max-w-[700px] p-[20px] border border-MO5 rounded-lg`}>

                            <span className={`block text-MO1 font-bold mb-[20px]`}>Komentar</span>

                            {/* COMMENT LIST */}
                            <div className={`flex flex-col gap-[30px] mb-[40px] mt-[30px]`}>

                                { data.comment.length == 0 && <ArticleComment nocomment/> }

                                { data.comment.filter((e, i) => ViewMoreComment || i < 5).map((e, i) => <ArticleComment data={ e } key={ i }/> )}

                                { data.comment.length >= 5 && (
                                    <button
                                        onClick={() => setViewMoreComment(!ViewMoreComment)}
                                        className={`w-fit opacity-40 mx-auto hover:opacity-100 text-MO6`}
                                    >{ ViewMoreComment ? 'Lihat Lebih Sedikit' : 'Lihat Lebih Banyak' }</button>
                                )}

                            </div>

                            {/* ADD COMMENT */}
                            <ArticleAddComment _setComment={ handle.addComment } id={ data.id }/>

                        </div>

                    </div>


                    {/* RECOMENDATION SECTION */}
                    <div className={`md:w-[340px] md:shrink-0 p-[20px] sticky top-[100px] ${data.recommended.length == 0 ? 'hidden' : ''}`}>

                        <h3 className={`leading-[100%] text-MO1 text-[14px] md:text-[16px] mb-[20px]`}>Baca Artikel Lainnya</h3>

                        <div className={`flex flex-col gap-[20px]`}>
                            {
                                data.recommended.map((e, i) => (
                                    <ArticleMiniCard data={ e } key={ i }/>
                                ))
                            }
                        </div>

                    </div>

                </div>

            </section>

        </>
    )
}

export default ArticleComp