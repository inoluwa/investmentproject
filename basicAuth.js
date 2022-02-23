const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = (req, res, next) => {

    if( req.user == null) {
        res.status(401)
        return res.send('you need to sign in');
    }
    next()
}

const authRole = (req, res, next) => {
    if(req.user.role) {
        res.status(401);
        return res.send('Not allowed')
    }
    next()
}



const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token,  process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


module.exports = {
    authUser,
    authRole,
    verifyToken
}