const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeesController');

router.route('/all')
        .get(employeeController.getAllEmployees)
        .post(employeeController.getAllEmployees)

router.route('/')
        .get(employeeController.employeeFunction)

router.route('/id')
        .get(employeeController.getEmployeeById)
        .post(employeeController.getEmployeeById)

router.route('/update')
        .post(employeeController.updateEmployee)

router.route('/add')
        .post(employeeController.addEmployee)

router.route('/delete')
        .post(employeeController.deleteEmployee)

module.exports = router;