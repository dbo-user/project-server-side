const express = require('express');
const bodyParser = require('body-parser');

const homeRouter = express.Router();

homeRouter.use(bodyParser.json());

homeRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the home info to you');
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /home');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /home');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /home');
});

module.exports = homeRouter;