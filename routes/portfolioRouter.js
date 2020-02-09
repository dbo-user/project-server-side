const express = require('express');
const bodyParser = require('body-parser');

const portfolioRouter = express.Router();

portfolioRouter.use(bodyParser.json());

portfolioRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the portfolio info to you');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /portfolio');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /portfolio');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /portfolio');
});

module.exports = portfolioRouter;