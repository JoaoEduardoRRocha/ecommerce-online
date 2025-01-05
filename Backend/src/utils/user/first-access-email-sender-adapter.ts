// import { FirstAccessEmailSender } from '../../presentation/protocols/user/first-access-email-sender'
// import nodemailer from 'nodemailer'
// import env from '../../main/config/env'

// export class FirstAccessEmailSenderAdapter implements FirstAccessEmailSender {
//   async sendMail (email: string, firstAccessToken: string): Promise<any> {
//     const transporter = nodemailer.createTransport({
//       host: env.mailHost,
//       port: env.mailPort,
//       auth: {
//         user: env.mailUser,
//         pass: env.mailPass
//       }
//     })

//     const response = await transporter.sendMail({
//       from: 'Santo Agency" <joaorochamulti@gmail.com>',
//       to: email,
//       subject: 'Confirmação de criação de conta',
//       html: `
//       <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//           <h1 style="color: #007bff;">Bem vindo ao seu primeiro acesso na Santo!</h1>
//           <p style="font-size: 16px; color: #333;">Acesso o link abaixo!</p>
//           <p style="font-size: 16px;">
//               <a href="http://localhost:5173/auth/verify-account?first-access-token=${firstAccessToken}&email=${email}" style="text-decoration: none; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Verify Your Account</a>
//           </p>
//           <p style="font-size: 16px; color: #333;">Obrigado por cadastrar na Santo!</p>
//       </div>
//   `
//     })

//     return response
//   }
// }