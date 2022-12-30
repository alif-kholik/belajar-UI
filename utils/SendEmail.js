// import nodemailer from 'nodemailer'

// const SendEmail = (option) => {

//     const _option = {
//         to: option.to || null,
//         subject: option.subject || null,
//         text: option.text || null,
//         html: option.html || null
//     }

//     var transporter = nodemailer.createTransport({
//         host: 'mail.kainmoeji.com',
//         port: 465,
//         auth: {
//             user: 'admin@kainmoeji.com',
//             pass: 'dulatip4232629'
//         }
//     })

//     var mailOptions = {
//         from: 'admin@kainmoeji.com',
//         to: _option.to,
//         subject: _option.subject,
//         text: _option.text,
//         html: _option.html
//     }

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response)
//         }
//     })

// }

// export default SendEmail