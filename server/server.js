const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const localRouter = require('./routes/localRouter');

app.use(
  cors({
    origin: 'http://localhost:8080', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res
     .status(200)
     .sendFile(path.join(__dirname, '../index.html'));
})
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/', localRouter);

app.use('*', (err, res) => {
    if(err) res.status(404).send('Route not found');
});

app.listen(3000, () => {
    console.log(`Listening on port : ${PORT}`);
});