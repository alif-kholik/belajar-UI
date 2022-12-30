import jwt from 'jsonwebtoken'

const handler = async (req, res) => {

    //RESPONSE FUNCTION
    // const sendRES = (code, status, message, data = {}) => {
    //     res.send({
    //         status: status,
    //         message: message,
    //         data: data
    //     })
    // }
    //#####END

    //ERROR CHECKING
    //if (req.method !== 'POST') sendRES(405, 'Wrong Method', 'Send allowed method!')
    //if (!req.body.token) sendRES(200, 'INCOMPLETE', 'Masukan token')
    //#####END

    //DECODING JWT
    jwt.verify(req.query.token, req.query.key, (err, decoded) => {
        res.send(decoded)
    })
    //#####END

}

export default handler