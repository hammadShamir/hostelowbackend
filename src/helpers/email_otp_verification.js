
module.exports = {
    generateOTP: () => {
        const otp = Math.floor(1000 + Math.random() * 900);
        return otp
    },
    sendEmail: (userId, email, otp) => {

    }
}