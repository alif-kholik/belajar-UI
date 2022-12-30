import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

const handler = (req, res) => {

    //RESPONSE FUNCTION
    const sendRES = (code, status, message, data = {}) => {
        res.status(code).json({
            status: status,
            message: message,
            data: data
        })
    }
    //#####END

    //if (req.method !== 'POST') sendRES(405, 'Wrong Method', 'Send allowed method!')

    //SET COOKIE LOGGEDOUT
    const cookie = new Cookies(req, res)
    
    jwt.verify(cookie.get('kainmoejiCookies'), process.env.JWT_KEY, (err, decoded) => {

        decoded.status = 'LoggedOUT'

        const newToken = jwt.sign({
            userid: decoded.userid,
            status: decoded.status,
            key: null
        }, process.env.JWT_KEY)

        cookie.set('kainmoejiCookies')
        cookie.set('kainmoejiCookies', newToken)

        sendRES(200, true, 'Logout Berhasil')
    })
    //#####END

}

export default handler