
const nodemailer = require("nodemailer")
module.exports = {
    generateOTP: () => {
        const otp = Math.floor( Math.random() * 900);
        return otp
    },
    sendEmail: (userId, email, otp) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        return new Promise((resolve, reject) => {
            var mailOptions = {
                from: process.env.SMTP_MAIL,
                to: email,
                subject: "OTP from Hostelow",
                text: `Your OTP is: ${otp}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject({ success: false, message: error.message });
                } else {
                    resolve({ success: true, message: "Email Sent Successfully" });
                }
            });
        });
    }
}