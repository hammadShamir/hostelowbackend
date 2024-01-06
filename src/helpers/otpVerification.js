
const nodemailer = require("nodemailer")
const otpGenerator = require("otp-generator");
const OTPModel = require("../models/otp_model");
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
    },
    verifyUser: (userId) => {
        return new Promise((resolve, reject) => {
            const oldOTP = OTPModel.findOne({ userId: userId });
            const otp = this.generateOTP();
            if (oldOTP) {
                
                const newOTP = OTPModel.create({
                    userId: userId,
                    otp: otp
                })
                if (newOTP) {
                    resolve({ success: true, message: "Email Sent Successfully" });
                }
            }
        })
    }
}