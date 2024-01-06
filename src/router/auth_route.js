const authRouter = require("express").Router();
const AuthController = require("../controller/auth_controller");
const AuthModel = require("../models/auth_model");
const { check } = require("express-validator");

authRouter.post("/auth/register", [
    // Register User Validation
    check('firstName', "Please Enter a First Name")
        .not().isEmpty().trim().escape(),
    check('lastName', "Please Enter a Last Name")
        .not().isEmpty().trim().escape(),
    check('phoneNumber', "Please Enter a Valid Phone Number")
        .not().isEmpty().isNumeric().toInt().isLength({ min: 12, max: 12 }).trim().escape(),
    check("password", "Password must be Strong")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/),
    check("email").isEmail().custom((value, { req }) => {
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
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password cannot be blank").exists(),
], AuthController.loginUser);

authRouter.post("/auth/refreshToken", [
    check("refreshToken").not().isEmpty().trim().escape()
], AuthController.refreshToken);

authRouter.post("/auth/sendEmail", [
    check("userId").not().isEmpty().trim().escape(),
    check("email").not().isEmpty().trim().escape()
], AuthController.sendEmail)

authRouter.post("/auth/accountUpdate", [
    check("userId").not().isEmpty().trim().escape(),
    check("email").not().isEmpty().trim().escape()
], AuthController.updateAccount)


module.exports = authRouter;
