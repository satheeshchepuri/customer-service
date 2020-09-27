module.exports = (app) => {
    const customers = require('../controller/customer.controller.js');

    // Create a new Student
    app.post('/customer/create', customers.create);

    // Retrieve all Students
    app.get('/customer/findAll', customers.findAll);

    // Retrieve a single Student with studentId
    app.get('/customer/findById/:customerId', customers.findOne);

    // Update a Student with studentId
    app.put('/customer/update/:customerId', customers.update);

    // Delete a Student with studentId
    app.delete('/customer/delete/:customerId', customers.delete);
   
}