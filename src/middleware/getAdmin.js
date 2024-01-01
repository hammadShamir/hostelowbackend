const jwt = require("jsonwebtoken");
const JWT_ACCESS = process.env.JWT_ACCESS;

const getAdmin = (req, res, next) => {
  try {
    jwt.verify(req.header("access_token"), JWT_ACCESS, (err, data) => {
      if (err) {
        res.status(401).json({ error: "Access Denied" });
      } else {
        if (data.user.admin) {
          req.user = data.user;
          next();
        } else {
          res.status(401).json({ error: "Access Denied" });
        }
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getAdmin;
