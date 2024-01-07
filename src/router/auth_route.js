const authRouter = require("express").Router();
const AuthController = require("../controller/auth_controller");
const AuthModel = require("../models/auth_model");
const { check } = require("express-validator");

authRouter.post("/auth/register", [
    // Register User Validation
    check('firstName', "First Name Required")
        .not().isEmpty().trim().escape(),
    check('lastName', "Last Name Required")
        .not().isEmpty().trim().escape(),
    check('phoneNumber', "Valid Phone Number Required")
        .not().isEmpty().trim().escape(),
    check("password", "Password must be Strong")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/),
    check("email", "Email Required").isEmail().custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ 'email': req.body.email }).then((user) => {
                if (user) {
                    reject(new Error("E-mail already in use"));
                } else {
                    resolve(true);
                }
            }).catch((err) => {
                reject(new Error(err));
            });
        });
    }),
], AuthController.registerUser);


authRouter.post("/auth/login", [
    check("email", "Enter a valid email")
        .not().isEmpty().trim().escape().isEmail(),
    check("password", "Password cannot be blank")
        .not().isEmpty().trim().escape(),
], AuthController.loginUser);

authRouter.post("/auth/refreshToken", [
    check("refreshToken", "Bad Request").not().isEmpty().trim().escape()
], AuthController.refreshToken);

authRouter.post("/auth/sendEmail", [
    check("userId").not().isEmpty().trim().escape(),
    check("email").not().isEmpty().trim().escape()
], AuthController.sendEmail)

authRouter.post("/auth/verifyOTP", [
    check("userId").not().isEmpty().trim().escape(),
    check("otp").not().isEmpty().trim().escape(),
], AuthController.verifyOTP);


authRouter.post("/auth/updateAccount/:userId", AuthController.updateAccount);

authRouter
module.exports = authRouter;
