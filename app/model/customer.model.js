const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    customerId: String,
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    phone: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);