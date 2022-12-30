const ArticlePagination = ({ length, selected = 0, editHandle = () => {} }) => {

    const pageButton = [...Array(length).keys()]

    console.log(pageButton)

    return (
        <>
            <div className={`flex justify-center items-center gap-[30px] my-[40px]`}>
                {
                    pageButton.filter((e, i) => i > selected - 3 && i < selected + 3 ).map((e, i) => (
                        <button
                            className={`${selected == e ? 'font-bold underline pointer-events-none' : 'text-MO6'}`}
                            onClick={() => editHandle(e)}
                            key={ i }
                        >{ e + 1 }</button>
                    ))
                }
            </div>
        </>
    )
}

export default ArticlePagination