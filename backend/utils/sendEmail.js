import dotenv from 'dotenv'

dotenv.config()

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false,

    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD
    }
});
// console.log('SMTP HOST:', process.env.BREVO_SMTP_HOST);
// console.log('SMTP PORT:', process.env.BREVO_SMTP_PORT);

const sendEmail = async (to ,subject, html) => {
    const info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        to,
        subject,
        html
    })
    //   console.log('Email sent:', info.messageId);
}

export default sendEmail;
