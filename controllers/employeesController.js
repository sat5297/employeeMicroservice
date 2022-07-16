const empService = require('../services/employeeServices.js');

const getAllEmployees = async (req,res) => {
    // console.log(req.body);
    const allEmployees = await empService.getAllEmployees(req.body);
    res.send(allEmployees);
};

const getEmployeeById = async (req,res) => {
    console.log(req.body, req.query, req.params);
    const employee = await empService.getEmployeeById(req.body);
    console.log(employee);
    res.send(employee);
};

const updateEmployee = async (req,res) => {
    const employee = await empService.updateEmployee(req.body);
    res.send(employee);
};

const addEmployee = async (req,res) => {
    const add = await empService.addEmployee(req.body);
    res.send(add);
};

const deleteEmployee = async(req,res) => {
    const del = await empService.deleteEmployee(req.body);
    res.send(del);
}

const employeeFunction = (req,res) => {
    res.send("We have 3 routes here. <ul> <li> /all to list all the employees </li> <li> /:id to list a specific employee </li> <li> /:name to list employee with name </li> </ul>");
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    employeeFunction,
    updateEmployee,
    addEmployee,
    deleteEmployee
};
