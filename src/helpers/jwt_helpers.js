const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const ms = require("ms");

module.exports = {
    signAccessToken: (user) => {
        return new Promise((resolve, reject) => {
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const expireIn = '4h'
            const options = {
                expiresIn: expireIn,
                issuer: "hostelow.com",
                audience: user.id
            }
            jwt.sign({ admin: user.admin }, secret, options, (err, token) => {
                if (err) return reject(err)
                const expireTime = new Date(Date.now() + ms(expireIn)).toLocaleString()
                const result = { token, expireTime }
                resolve(result)
            })
        })
    },
    verifyAdminToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;

        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return next(createError.Unauthorized())
                } else {
                    return next(createError.Unauthorized(err.message))
                }
            } else {
                const admin = payload.admin;
                if (!admin) return next(createError.Unauthorized());
                req.payload = payload;
                next()
            }
        })
    }
}