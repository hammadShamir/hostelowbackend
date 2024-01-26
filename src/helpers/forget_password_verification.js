
const nodemailer = require("nodemailer")
const { generatePasswordResetEmail } = require("../template/password_template")
module.exports = {
    sendEmailForPassword: (email, newPassword) => {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
                method: 'PLAIN'
            },
        });

        return new Promise((resolve, reject) => {
            var mailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject: "New Password from HostelBazaar",
                text: generatePasswordResetEmail(newPassword),

            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject({ success: false, message: "Internal Server Error" });
                } else {
                    resolve({ success: true, message: "Email Sent Successfully" });
                }
            });
        });
    },
}