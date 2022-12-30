import nc from "next-connect"
import excuteQuery from "utils/DataBaseConnection"
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

const handler = nc({
onError: (err, req, res, next) => {
    
    console.error(err.stack);
    res.status(500).end("Something broke!")

},
onNoMatch: (req, res) => {

    res.status(404).end("Page is not found")

},
})
.get((req, res) => {

    res.send('')

})
.post((req, res) => {

    const REQ = req.body
    var Logged = false

    const data = {
        username: 'moejiadmin1',
        password: 'dulatip4232629'
    }

    if (data.username == REQ.username && data.password == REQ.password) {
        Logged = true
    }

    if (Logged) {
        const cookie = new Cookies(req, res)
    
        jwt.verify(cookie.get('kainmoejiCookies'), process.env.JWT_KEY, (err, decoded) => {
    
            decoded.status = 'LoggedIN'
    
            const newToken = jwt.sign({
                userid: 1,
                status: decoded.status,
                key: process.env.API_KEY
            }, process.env.JWT_KEY)

            cookie.set('kainmoejiCookies')
            cookie.set('kainmoejiCookies', newToken)
        })
    }

    res.json(Logged)

})
.put(async (req, res) => {

    res.end("async/await is also supported!")
  
})
.patch(async (req, res) => {

    throw new Error("Throws me around! Error can be caught and handled.")

})
  
export default handler