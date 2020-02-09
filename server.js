const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/homeRouter');
const aboutRouter = require('./routes/aboutRouter');
const portfolioRouter = require('./routes/portfolioRouter');
const contactRouter = require('./routes/contactRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/portfoliio', portfolioRouter);
app.use('/contact', contactRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is the very fast Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Hey Look, The Server is running at http://${hostname}:${port}/`);
});