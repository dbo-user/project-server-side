const express = require('express'); // import the express module into the express variable
const bodyParser = require('body-parser'); // import the body-parser module to extract the body from HTTP requests
const Employerlog = require('../models/employerlog'); // import the employerlog model from the models folder
const authenticate = require('../authenticate');
const cors = require('./cors'); // import cross-origin from routes folder

const employerlogRouter = express.Router(); // create employerlog router object

employerlogRouter.use(bodyParser.json()); // use bodyParser to make data available in req.body

// define router endpoint for HTTP requests
employerlogRouter.route('/')
// GET request to find the employerlog information
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Employerlog.find()
    .then(employerlogs => { // successful find operation so do this
        res.statusCode = 200; // success code
        res.setHeader('Content-Type', 'application/json');
        res.json(employerlogs); // display employerlogs information in json format
    })
    .catch(err => next(err)); // not successful do this default error handler 
})
// POST request to post new employerlog data
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employerlog.create(req.body)
    .then(employerlog => {
        console.log('Employerlog Created ', employerlog);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employerlog);
    })
    .catch(err => next(err));
})
// PUT request to update is not allowed
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /employerlogs');
})
// DELETE request to delete employerlog
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employerlog.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// endpoint for a specific employerlog id
employerlogRouter.route('/:employerlogId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Employerlog.findById(req.params.employerlogId)
    .then(employerlog => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employerlog);
    })
    .catch(err => next(err));
})
// POST to a specific id is not allowed
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /employerlogs/${req.params.employerlogId}`);
})
// PUT request to update a specific id 
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employerlog.findByIdAndUpdate(req.params.employerlogId, {
        $set: req.body
    }, { new: true })
    .then(employerlog => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(employerlog);
    })
    .catch(err => next(err));
})
// DELETE request to a specific id
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Employerlog.findByIdAndDelete(req.params.employerlogId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = employerlogRouter;