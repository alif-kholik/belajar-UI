import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const Portal = ({ children }) => {
    var [DocReady, setDocReady] = useState(false)
    useEffect(() => setDocReady(true), [])
    
    return DocReady && createPortal(children, document.querySelector('#__next'))
        
}

export default Portal