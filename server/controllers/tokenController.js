require('dotenv').config();

const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const tokenController = {};

tokenController.createToken = async (req, res) => {
  const { username } = res.locals;
  const payload = { user: username };

  try {
    const token = await jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
    console.log(token);

    res.cookie('Auth', token, { maxAge: 7200000, httpOnly: true });
    
    return res
            .status(200)
            .json({ loggedIn: true });

  } catch (error) {
    error ? console.error(error) : null;

    return res
            .status(400) 
            .json({ errorMessage: 'Server Error 400: Unable to register user' });
  }
}

tokenController.verifyToken = async (req, res) => {
  const { Auth } = req.cookies;

  try {

    await jwt.verify(Auth, ACCESS_TOKEN_SECRET);
    
    return res
            .status(200)
            .json({ loggedIn: true });
    
  } catch (err) {
    error ? console.error(err) : null;
    return res
            .status(401)
            .json({ errorMessage: 'Token has Expired' });
  }
}

module.exports = tokenController;