const AuthModel = require("../models/auth_model");
const OTPModel = require("../models/otp_model");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../helpers/jwt_helpers");
const { generateOTP, sendEmail } = require("../helpers/otpVerification");

const authController = {
  // Register User
  registerUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: errors.array().map((err) => err.msg)[0] });
      } else {
        const { firstName, lastName, email, phoneNumber, password, admin } =
          req.body;
        const salt = await bcrypt.genSalt(10);
        const securePassword = bcrypt.hashSync(password, salt);
        await AuthModel.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: securePassword,
          admin: admin,
        }).then(async (user) => {
          return res.send({ message: "Registration Success" })
        });
      }
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },


  // Login User
  loginUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      } else {
        const { email, password } = req.body;
        const user = await AuthModel.findOne({ email });

        // Check if user exists
        if (!user) {
          return res.status(401).send({ errors: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          const { password, ...userWithoutPassword } = user.toObject();

          const accessToken = await signAccessToken(user);
          const refreshToken = await signRefreshToken(user);

          const response = {
            access: {
              token: accessToken.token,
              expires: accessToken.expireTime
            },
            refresh: {
              token: refreshToken.token,
              expires: refreshToken.expireTime
            },
            user: userWithoutPassword
          }
          res.json(response);
        } else {
          return res.status(401).send({ errors: 'Invalid credentials' });
        }
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },


  // REFRESH TOKEN
  refreshToken: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      } else {
        await verifyRefreshToken(req.body.refreshToken)
          .then(async (userId) => {
            const user = await AuthModel.findOne({ _id: userId })
            const accessToken = await signAccessToken(user);
            const refToken = await signRefreshToken(user);

            const response = {
              access: {
                token: accessToken.token,
                expires: accessToken.expireTime
              },
              refresh: {
                token: refToken.token,
                expires: refToken.expireTime
              },
            }
            res.send(response);
          }).catch(() => {
            res.send({ error: "Unauthorized" })
          })
      }
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" })
    }
  },
  sendEmail: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      } else {
        let emailResult;
        const { userId, email } = req.body;
        const genOtp = generateOTP()
        const doesOTP = await OTPModel.findOne({ userId: userId });
        if (!doesOTP) {
          const newOTP = await OTPModel.create({
            userId: userId,
            otp: genOtp
          })
          emailResult = await sendEmail(userId, email, genOtp)
        } else {
          const deleteOTP = await OTPModel.deleteOne({ userId: userId });
          if (deleteOTP) {
            const newOTP = await OTPModel.create({
              userId: userId,
              otp: genOtp
            })
            emailResult = await sendEmail(userId, email, genOtp)
          }
        }
        if (emailResult.success) {
          res.send({ message: emailResult.message })
        } else {
          res.send({ error: emailResult.message })
        }
      }
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" })
    }
  },
  verifyOTP: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      } else {
        const doesOTP = await OTPModel.findOne({ userId: req.body.userId });
        if (!doesOTP) {
          res.status(404).send({ error: "OTP Expired" });
        } else {
          const { otp } = doesOTP;
          if (otp == req.body.otp) {
            const updateUser = await AuthModel.updateOne({ _id: req.body.userId }, { isVerified: true });
            if (updateUser) {
              res.status(200).send({ message: "Email Verification Success" })
            } else {
              res.status(500).send({ error: "Internal Server Error" })
            }
          } else {
            res.status(400).send({ error: "Bad Request" });
          }
        }
      }
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
  fetchOTP: (req, res) => {
    OTPModel.find()
      .then((otp) => {
        res.send(otp)
      })
  }
};

module.exports = authController;
