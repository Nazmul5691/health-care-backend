// import nodemailer from 'nodemailer'
// import config from '../../../config';

// const emailSender = async (
//     email: string,
//     html: string
// ) => {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // Use `true` for port 465, `false` for all other ports
//         auth: {
//             user: config.emailSender.email,
//             pass: config.emailSender.app_pass,
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     const info = await transporter.sendMail({
//         from: '"PH Health Care" <shafayat.ph@gmail.com>', // sender address
//         to: email, // list of receivers
//         subject: "Reset Password Link", // Subject line
//         //text: "Hello world?", // plain text body
//         html, // html body
//     });

// }

// export default emailSender;




// import nodemailer from 'nodemailer'
// import config from '../../../config';

// const emailSender = async (
//     email: string,
//     html: string
// ) => {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: config.emailSender.email,
//             pass: config.emailSender.app_pass,
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     try {
//         const info = await transporter.sendMail({
//             from: `"PH Health Care" <${config.emailSender.email}>`, // Use config email
//             to: email,
//             subject: "Reset Password Link",
//             html,
//         });

//         console.log('✅ Email sent successfully:', info.messageId);
//         return info;
//     } catch (error) {
//         console.error('❌ Email sending failed:', error);
//         throw error; // Re-throw to handle in the service layer
//     }
// }

// export default emailSender;




import nodemailer from 'nodemailer'
import config from '../../../config';

const emailSender = async (
    email: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailSender.email,
            pass: config.emailSender.app_pass,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"PH Health Care" <${config.emailSender.email}>`,
            to: email,
            subject: "Reset Password Link",
            html,
        });

        console.log('✅ Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        throw error;
    }
}

export default emailSender;