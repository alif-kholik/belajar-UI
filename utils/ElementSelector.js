const ElSelect = ({
    type = 'p',
    classname = '',
    onclick = () => {},
    children
}) => {

    const Data = {
        h1: <h1 className={ classname } onClick={ onclick }>{ children }</h1>,
        h2: <h2 className={ classname } onClick={ onclick }>{ children }</h2>,
        h3: <h3 className={ classname } onClick={ onclick }>{ children }</h3>,
        p: <p className={ classname } onClick={ onclick }>{ children }</p>
    }

    return Data[type || p]
}

export default ElSelect