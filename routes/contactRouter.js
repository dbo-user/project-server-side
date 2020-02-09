const express = require('express');
const bodyParser = require('body-parser');

const contactRouter = express.Router();

contactRouter.use(bodyParser.json());

contactRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /contact');
})
.post((req, res) => {
    res.end('CREATE new contact record');
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /contact');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /contact');
});

module.exports = contactRouter;