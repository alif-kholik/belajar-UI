import jwt from 'jsonwebtoken'

export default function async (req, res) {

    //RESPONSE FUNCTION
    const sendRES = (code, status, message, data = {}) => {
        res.status(code).json({
            status: status,
            message: message,
            data: data
        })
    }
    //#####END

    //SET TOKEN
    var dumpToken = jwt.sign({
        userid: null,
        status: 'LoggedOUT'
    }, process.env.JWT_KEY)
        
    sendRES(200, true, null,{token: dumpToken})
    //#####END

}