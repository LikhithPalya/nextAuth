import nodemailer from 'nodemailer'

export const sendEmail = async ({email, emailType, userId}:any)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
          const mailOptions = {
            from: 'likhithpalya@gmail.com',
            to: email, // list of receivers
            subject: emailType == 'VERIFY' ? "Verify your email":"Reset your password", // Subject line
            text: "", // plain text body
            html: "<b>Hello world?</b>", // html body
          }
          const mailResponse = await transported.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}


