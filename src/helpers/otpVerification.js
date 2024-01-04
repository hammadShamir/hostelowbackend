
const nodemailer = require("nodemailer")
const otpGenerator = require("otp-generator");

module.exports = {
    generateOTP: () => {
        const OTP = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        return OTP;
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
                    reject({ success: false, message: "Email sending Error" });
                } else {
                    resolve({ success: true, message: "Email Sent Successfully" });
                }
            });
        });
    }
}