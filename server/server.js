const express = require('express');
const path = require('path');
const app = express();
const localRouter = require('./routes/localRouter');

/*
  cors allows the server to accept request from 
  different origin/browser by utilizing express "options"
*/
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serve index.html w/ bundle.js.
app.get('/', (req, res) => 
  res
    .status(200)
    .type('html')
    .sendFile(path.join(__dirname, '../index.html'))
);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/bundle.js')));

/*
  localRouter listens for the /images request,
  shoots off the request to the middleware,
  then gets the response from the middleware which is saved in res.locals,
  & finally sends off response as json object for the front-end to utilize.
*/

app.use('/', localRouter, (req, res) => {
  res.status(200).json({ imageUrls: res.locals.imageUrls });
});

/*
  Node environment is synchronously but extremely efficently handled.
  Therefore any other endpoints that were not listed will his this last GET request listener. 
*/

app.get('*', (err, res) => err ? res.status(400).send('Route Not Found') : null );

module.exports = app;