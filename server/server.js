/**
 * ************************************
 *
 * @module server.js
 * @description Main server file that handles:
 *                 - servering static & react bundle files
 *                 - parsing incoming JSON, cookies, and other request types
 *                 - CORS errors via cors();
 *                 - Request routing
 *
 * ************************************
 */

const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const localRouter = require('./routes/localRouter');

//Serving CORS for cross-browser server usage
app.use(
  cors({
    origin: 'http://localhost:8080', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json()); //Request Body to json
app.use(express.urlencoded({ extended: false })); //url to readable stream
app.use(cookieParser()); // Cookies to json

//Serving Static Files
app.get('/', (req, res) => {
    res
     .status(200)
     .sendFile(path.join(__dirname, '../index.html'));
})
app.use('/dist', express.static(path.join(__dirname, '../dist')));

//Request Routing (All requests will hit this endpoint)
app.use('/', localRouter);

//Any invalid routes will this endpoint
app.use('*', (err, res) => {
    if(err) res.status(404).send('Route not found');
});

app.listen(3000, () => {
    console.log(`Listening on port : ${PORT}`);
});