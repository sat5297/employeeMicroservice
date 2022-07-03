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
        if(query.empname != null && query.empname !== ''){
            searchOptions.empName = new RegExp(query.empname, 'i');
        }
        if(query.empid != null && query.empid !== ''){
            searchOptions.empID = new RegExp(query.empid, 'i');
        }
        if(query.empmanager != null && query.empmanager !== ''){
            searchOptions.empManager = new RegExp(query.empmanager, 'i');
        }
        if(query.empmanagerid != null && query.empmanagerid !== ''){
            searchOptions.empManagerID = new RegExp(query.empmanagerid, 'i');
        }
        if(query.empdept != null && query.empdept !== ''){
            searchOptions.empDept = new RegExp(query.empdept, 'i');
        }
        if(query.emplocation != null && query.emplocation !== ''){
            searchOptions.empLocation = new RegExp(query.emplocation, 'i');
        }
        console.log(query, searchOptions)
        return new Promise((resolve,reject) => {
            client.connect(async err => {
                const employeeCollection = client.db("employee").collection("allinfoemp");
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
            const employeeCollection = client.db("employee").collection("allinfoemp");
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
            const employeeCollection = client.db("employee").collection("allinfoemp");
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
            const employeeCollection = client.db("employee").collection("allinfoemp");
            try{
                await employeeCollection.insertOne(employee).then((res) => {
                    console.log(res);
                    if(res.acknowledged){
                        resolve("Added Employee.");
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

module.exports = {
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    addEmployee
}
