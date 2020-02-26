const mongoose = require('mongoose'); // create mongoose class
const Schema = mongoose.Schema; // create a mongoose outline or schema

// create employerlogSchema document object
const employerlogSchema = new Schema({
    name: {
        type: String, // data type is string
        required: true, // cannot be empty
        unique: true // a unique index is created for each name
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true 
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true // current date and time
});

// create Employerlog model object using the employerlogSchema and then export it
const Employerlog = mongoose.model('Employerlog', employerlogSchema);

module.exports = Employerlog;
