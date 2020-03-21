/**
 * ************************************
 *
 * @module userController.js
 * @description User / auth middleware to handle saving and verify a user.
 *              Also responsible for hashing passwords.
 *
 * ************************************
 */

const pool = require('../database/db');
const bcrypt = require('bcrypt');

const userController = {};


//Registration Middleware
userController.saveUser = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    //Hash user password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const query = {
      name: 'Register',
      text: 'INSERT INTO users (firstname, lastname, username, password) VALUES ($1,$2,$3,$4)',
      values: [firstName, lastName, username, hashedPassword]
    }

    //Saved User into database;
    await pool.query(query);

    res.locals.username = username;

    return next();

  } catch (error) {
    error ? console.error(error) : null;

    return res
            .status(400)
            .json({ errorMessage: 'Server Error 400: Unable to register user' })
  }
}

//Login Middleware
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {

    const query = {
      name: 'password',
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username]
    }

    const res = await pool.query(query);
    //Compare incoming password & hash inside out database
    const match = await bcrypt.compare(password, res.rows[0].password);

    //If there's a match move on, if not send error
    if(match) return next();
    else {
      res
        .status(401)
        .json({ errorMessage: "Passwords DO NOT match" });
    }
    
  } catch (error) {
    error ? console.error(error) : null;

    return res
            .status(400)
            .json({ errorMessage: 'Server Error 400: Unable to log in user'})
  }
}

module.exports = userController;