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
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;

        jwt.verify(token, secret, (err, payload) => {
            if (err) return next(createError.Unauthorized());
            req.payload = payload;
            next()
        })
    }
}