const empRepository = require('../repository/employeeRepository');

const getAllEmployees = (body) => {
    let allEmployee = empRepository.getAllEmployees(body);
    return allEmployee;
};

const getEmployeeById = (body) => {
    const employee = empRepository.getEmployeeById(body);
    return employee;
};

const updateEmployee = (body) => {
    const employee = empRepository.updateEmployee(body);
    return employee;
};

const addEmployee = (body) => {
    const add = empRepository.addEmployee(body);
    return add;
};

const deleteEmployee = (body) => {
    const del = empRepository.deleteEmployee(body);
    return del;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    addEmployee,
    deleteEmployee
};