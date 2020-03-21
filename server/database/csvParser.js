const fs = require('fs');
const path = require('path');

const urls = fs.readFileSync(path.join(__dirname, '../csv/imageurls.csv')).toString().split('\r\n');

module.exports = urls;
