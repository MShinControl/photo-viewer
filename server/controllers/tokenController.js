/**
 * ************************************
 *
 * @module tokenController.js
 * @description Tokens to assigning cookies for page persistence,
 *              & user verification.
 *
 * ************************************
 */

require('dotenv').config();

const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const tokenController = {};


//Create Token
tokenController.createToken = async (req, res) => {
  const { username } = res.locals;
  const payload = { user: username };

  try {
    //Assigned Token with payload, Token Secret & expiration of how long that token is good for.
    const token = await jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });

    //Assign Token to user
    res.cookie('Auth', token, { maxAge: 7200000, httpOnly: true });
    
    //User is now verified, send response.
    return res
            .status(200)
            .json({ loggedIn: true });


  //Error Handler
  } catch (error) {
    error ? console.error(error) : null;

    return res
            .status(400) 
            .json({ errorMessage: 'Server Error 400: Unable to register user' });
  }
}

//Verify Token
tokenController.verifyToken = async (req, res) => {
  //Receive Token from user to check.
  const { Auth } = req.cookies;

  try {
    //Verify Token
    await jwt.verify(Auth, ACCESS_TOKEN_SECRET);
    
    //User is now verified, send response.
    return res
            .status(200)
            .json({ loggedIn: true });
    
  //Error Handler
  } catch (err) {
    error ? console.error(err) : null;
    return res
            .status(401)
            .json({ errorMessage: 'Token has Expired' });
  }
}

module.exports = tokenController;