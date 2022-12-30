const ElementCond = ({ el, children, className }) => {
    return (
        <>
            { el == 'h1' && <h1 className={ className }>{ children }</h1> }
            { el == 'h2' && <h2 className={ className }>{ children }</h2> }
            { el == 'h3' && <h3 className={ className }>{ children }</h3> }
            { el == 'h4' && <h4 className={ className }>{ children }</h4> }
            { el == 'h5' && <h5 className={ className }>{ children }</h5> }
            { el == 'h6' && <h6 className={ className }>{ children }</h6> }
            { el == 'p' && <p className={ className }>{ children }</p> }
        </>
    )
}

export default ElementCond