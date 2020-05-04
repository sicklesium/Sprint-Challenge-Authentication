/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ errorMessage: "There was an error with the token!" });
      } else {
        req.decodedJwt = decodedToken;
        console.log(req.decodedJwt);
        next();
      }
    })
  } else {
    res.status(401).json({ errorMessage: "You won't get past this!" });
  }
}
