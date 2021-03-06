const Customer = require('../model/customer.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer data can not be empty"
        });
    }

    // Create a Customer
    const customer = new Customer({
        customerId: req.body.customerId || "Untitled Customer",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        phone: req.body.phone

    });

    // Save Customer in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

// Retrieve and return all customer from the database.
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {		
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customer."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.customerId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Find note and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        customerId: req.body.customerId || "Untitled Customer",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        phone: req.body.phone,
        content: req.body
        }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: " customer found with id " + req.params.customertId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer is not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};
