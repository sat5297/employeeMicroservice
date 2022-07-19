if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}
const mongoose = require('mongoose');
const EmployeeModel = require('../models/employee');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { resolve, reject } = require('promise');

const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true 
});

const getAllEmployees = async (query) => {
        let searchOptions = {};
        console.log(query, searchOptions);
        if(query.empName != null && query.empName !== ''){
            searchOptions.empName = new RegExp(query.empName, 'i');
        }
        if(query.empID != null && query.empID !== ''){
            searchOptions.empID = new RegExp(query.empID, 'i');
        }
        if(query.empManager != null && query.empManager !== ''){
            searchOptions.empManager = new RegExp(query.empManager, 'i');
        }
        if(query.empManagerID != null && query.empManagerID !== ''){
            searchOptions.empManagerID = new RegExp(query.empManagerID, 'i');
        }
        if(query.empDept != null && query.empDept !== ''){
            searchOptions.empDept = new RegExp(query.empDept, 'i');
        }
        if(query.empLocation != null && query.empLocation !== ''){
            searchOptions.empLocation = new RegExp(query.empLocation, 'i');
        }
        console.log(query, searchOptions)
        return new Promise((resolve,reject) => {
            client.connect(async err => {
                const employeeCollection = client.db("corpinfoemp").collection("corpinfoemp");
                try{
                    const employee = await employeeCollection.find(searchOptions).toArray();
                    console.log(employee);
                    resolve(employee);
                }catch{
                    reject("Error in promise")
                }
            });
        });
};

const getEmployeeById = async (query) => {
    let searchOptions = {};
    let showOptions = {};
    if(query.empID != null && query.empID !== ''){
        searchOptions.empID = query.empID;
    }
    console.log(query, searchOptions,"repo");
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const employeeCollection = client.db("allinfoemp").collection("allinfoemp");
            try{
                const employee = await employeeCollection.find(searchOptions).toArray();
                console.log(employee, "repo");
                resolve(employee);
            }catch{
                reject("Error in promise")
            }
        });
    });
}

const updateEmployee = async (body) => {
    const employee = new EmployeeModel(body);
    let searchOptions = {};
    if(body.empID != null && body.empID !== ''){
        searchOptions.empID = body.empID;
    }
    if(body.empName != null && body.empName !== ''){
        searchOptions.empName = body.empName;
    }
    if(body.empManager != null && body.empManager !== ''){
        searchOptions.empManager = body.empManager;
    }
    if(body.empManagerID != null && body.empManagerID !== ''){
        searchOptions.empManagerID = body.empManagerID;
    }
    if(body.empDept != null && body.empDept !== ''){
        searchOptions.empDept = body.empDept;
    }
    if(body.empDeptID != null && body.empDeptID !== ''){
        searchOptions.empDeptID = body.empDeptID;
    }
    if(body.empLocation != null && body.empLocation !== ''){
        searchOptions.empLocation = body.empLocation;
    }
    console.log(body,employee,searchOptions);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const employeeCollection = client.db("allinfoemp").collection("allinfoemp");
            try{
                await employeeCollection.findOneAndUpdate(searchOptions, {$set : {"empAadhar" : employee.empAadhar, 
                "empPan" : employee.empPan, "empCell" : employee.empCell, "empAddress" : employee.empAddress,
                "empMail" : employee.empMail, "empGender" : employee.empGender, "empDOB" : employee.empDOB}}).then((res) => {
                    console.log("repo", res);
                    resolve("Updated Successfully.");
                });
            }catch{
                reject("Error in promise")
            }
        });
    });
};

const addEmployee = async (body) => {
    const employee = new EmployeeModel(body);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const employeeCollection = client.db("allinfoemp").collection("allinfoemp");
            try{
                await employeeCollection.insertOne(employee).then((res) => {
                    console.log(res);
                    if(res.acknowledged){
                        resolve("Employee added successfully in All Info Employee Database.");
                    }else{
                        resolve("Unable to add employee");
                    }
                });
            }catch{
                reject("Error in Adding Employee");
            }
        });
    });
};

const deleteEmployee = async (body) => {
    let searchOptions = {};
    if(body.empID != null && body.empID !== ""){
        searchOptions.empID = body.empID;
    }
    const emp = new EmployeeModel(body);
    console.log(body,searchOptions);
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const employeeCollection = client.db("allinfoemp").collection("allinfoemp");
            try{
                await updateManager(emp);
                await employeeCollection.deleteOne(searchOptions).then((res) => {
                    if(res.acknowledged){
                        resolve("Employee Deleted Successfully from All Info Employee Database.");
                    }else{
                        resolve("Unable to delete Employee from All Info Employee Database.");
                    }
                });
            }
            catch{
                reject("Error in Deleting Employee");
            }
        })
    })
};

const updateManager = async (payroll) => {
    let searchOptions = {};
    if(payroll.empID != null && payroll.empID !== ""){
        searchOptions.empManagerID = payroll.empID;
    }
    return new Promise((resolve,reject) => {
        client.connect(async err => {
            const payrollCollection = client.db("allinfoemp").collection("allinfoemp");
            try{
                await payrollCollection.updateMany(searchOptions, 
                    {$set : {empManagerID : payroll.empManagerID, empManager : payroll.empManager }}).then((res) => {
                        console.log(res);
                        resolve("Updated the Manager in All Info Employee Database");
                })
            }
            catch{
                reject("Error in Promise");
            }
        });
    });
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    addEmployee,
    deleteEmployee
};
