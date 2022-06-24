if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv').config({path : `${__dirname}/../.env`});
}
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

module.exports = {
    getAllEmployees,
    getEmployeeById
}
