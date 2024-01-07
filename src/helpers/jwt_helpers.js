const jwt = require("jsonwebtoken");
const ms = require("ms");

module.exports = {
    signAccessToken: (user) => {
        return new Promise((resolve, reject) => {
            const expireIn = '4h'
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const payload = {
                admin: user.admin,
                isVerified: user.isVerified
            }
            const options = {
                expiresIn: expireIn,
                issuer: "hostelow.com",
                audience: user.id
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    return reject()
                } else {
                    const expireTime = new Date(Date.now() + ms(expireIn)).toLocaleString()
                    const result = { token, expireTime }
                    resolve(result)
                }
            })
        })
    },
    verifyAdminToken: (req, res, next) => {
        if (!req.headers['authorization']) return res.send({ error: "Unauthorized" })
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;

        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.send({ error: "Unauthorized" })
                } else {
                    return res.send({ error: "JWT Expired" })
                }
            } else {
                const { admin, isVerified } = payload;
                if (!admin && !isVerified) return res.send({ error: "Unauthorized" })
                req.payload = payload;
                next()
            }
        })
    },
    signRefreshToken: (user) => {
        return new Promise((resolve, reject) => {
            const expireIn = '7 days'
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const payload = {
                admin: user.admin,
                isVerified: user.isVerified
            }
            const options = {
                expiresIn: expireIn,
                issuer: "hostelow.com",
                audience: user.id
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    return reject()
                } else {
                    const expireTime = new Date(Date.now() + ms(expireIn)).toLocaleString()
                    const result = { token, expireTime }
                    resolve(result)
                }
            })
        })
    },
    verifyRefreshToken: (refToken) => {
        return new Promise((resolve, reject) => {
            const secret = process.env.REFRESH_TOKEN_SECRET;
            jwt.verify(refToken, secret, (err, payload) => {
                if (err) {
                    return reject()
                }
                const userId = payload.aud
                resolve(userId)
            })
        }
        )
    }
}