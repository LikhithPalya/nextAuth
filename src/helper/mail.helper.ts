import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
export const sendEmail = async ({email, emailType, userId}:any)=>{
    try { // configure mail for usage

      // hash used special characters whereas uuid uses only numbers
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType == "VERIFY"){
          await User.findByIdAndUpdate(userId, {verifyToken:hashedToken, verifyTokenExpire : Date.now()+3600000})
        }else if(emailType == "RESET"){
          await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry : Date.now()+3600000})
        }else{
          return null
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
          let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "7c078597cca5de",
              pass: "0440da083259ef"
            }
          });
          const mailOptions = {
            from: 'likhithpalya@gmail.com',
            to: email, // list of receivers
            subject: emailType == 'VERIFY' ? "Verify your email":"Reset your password", // Subject line
            text: "", // plain text body
            html: `<p>Click ,a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType == "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
            
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
} 


