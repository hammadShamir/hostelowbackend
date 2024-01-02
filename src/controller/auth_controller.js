const AuthModel = require("../models/auth_model");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

const { signAccessToken } = require("../helpers/jwt_helpers");

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
          const accessToken = await signAccessToken(user);
          const { token, expireTime } = accessToken;
          return res.send({ token, expireTime })
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
          const { token, expireTime } = accessToken;

          const response = {
            access: {
              token: token,
              expires: expireTime
            },
            // refresh: {
            //   token: refresh,
            //   expires: new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRE)).toLocaleString()
            // },
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

};

module.exports = authController;
