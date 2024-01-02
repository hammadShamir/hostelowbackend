const jwt = require("jsonwebtoken");

module.exports = {
    signAccessToken: (user) => {
        return new Promise((resolve, reject) => {
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '4h',
                issuer: "hostelow.com",
                audience: user.id
            }
            jwt.sign({ admin: user.admin }, secret, options, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }
}