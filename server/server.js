const express = require('express');
const app = express();


app.use('*', (err, res) => {
    if(err) res.status(404).send('Route not found');
});

app.listen(3000, () => {
    console.log(`Listening on port : ${PORT}`);
});