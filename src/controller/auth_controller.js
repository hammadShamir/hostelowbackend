const AuthModel = require("../models/auth_model");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ms = require("ms")

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
        }).then((user) => {
          return res
            .status(200)
            .send({ message: "Account Created Successfully" });
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
          const payload = {
            user: {
              id: user.id,
              admin: user.admin,
            },
          };
          const token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
          const refresh = jwt.sign(payload, process.env.JWT_REFRESH, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

          const response = {
            access: {
              token: token,
              expires: new Date(Date.now() + ms(process.env.JWT_ACCESS_EXPIRE)).toLocaleString()
            },
            refresh: {
              token: refresh,
              expires: new Date(Date.now() + ms(process.env.JWT_REFRESH_EXPIRE)).toLocaleString()
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

};

module.exports = authController;
