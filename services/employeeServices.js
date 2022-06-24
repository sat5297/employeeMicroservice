const empRepository = require('../repository/employeeRepository');

const getAllEmployees = (body) => {
    let allEmployee = empRepository.getAllEmployees(body);
    return allEmployee;
};

const getEmployeeById = (body) => {
    const employee = empRepository.getEmployeeById(body);
    return employee;
};

module.exports = {
    getAllEmployees,
    getEmployeeById
};