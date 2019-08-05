const jwt = require('jsonwebtoken');
const secret = require('./secretToken');

module.exports = (req, res, next) => {
  if(!req.headers.authorization){
    console.error("1OR");
    return res.status(401).send('error');
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);
    next();
  } catch (err) {
    console.error(err,"2OR");
    res.status(401).end();
  }
}