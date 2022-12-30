import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {

    //RESPONSE FUNCTION
    const sendRES = (code, status, message, data = {}) => {
        res.status(code).json({
            status: status,
            message: message,
            data: data
        })
    }
    //#####END

    //ERROR CHECKING
    if (req.method !== 'POST') sendRES(405, false, 'Send allowed method!')
    //if (req.body.username === '') sendRES(204, false, 'Lengkapi Informasi Akun')
    //#####END

    //GET DATA FOR VALIDATION
    const accountData = await excuteQuery({
        query: `SELECT id, username, email, password FROM admin WHERE username = '${req.body.username}' OR email = '${req.body.username}'`
    })
    //#####END

    //VALIDATION DATA
    const { username, password } = req.body
    var LoginValidation = false

    if (accountData.length > 0) {
        if ( username === accountData[0].username || username === accountData[0].email) {
            if ( md5(password) === accountData[0].password ) {
                LoginValidation = true
            }
        }
    }
    //#####END

    //SET COOKIE LOGGEDIN
    if (LoginValidation) {
        const cookie = new Cookies(req, res)
    
        jwt.verify(cookie.get('kainmoejiCookies'), process.env.JWT_KEY, (err, decoded) => {
    
            decoded.status = 'LoggedIN'
    
            const newToken = jwt.sign({
                userid: accountData[0].id,
                status: decoded.status,
                key: process.env.API_KEY
            }, process.env.JWT_KEY)

            cookie.set('kainmoejiCookies')
            cookie.set('kainmoejiCookies', newToken)
        })
    }
    //#####END
    
    if ( !LoginValidation ) sendRES(200, false, 'Data Akun Salah')
    if ( LoginValidation ) sendRES(200, true, 'Login Berhasil')

}

export default handler