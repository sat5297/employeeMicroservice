const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empID : {
    type : String,
    required : true
  },
  empName : {
    type : String,
    required : true
  },
  empCell : {
    type : String,
    required : true
  },
  empAadhar : {
    type : String,
    required : true
  },
  empPan : {
    type : String,
    required : true
  },
  empGender : {
    type : String,
    required : true
  },
  empAddress : {
    type : String,
    required : true
  },
  empLocation : {
    type : String,
    required : true
  },
  empManager : {
    type : String,
    required : true
  },
  empManagerID : {
    type : String,
    required : true
  },
  empDept : {
    type : String,
    required : true
  },
  empDeptID : {
    type : String,
    required : true
  },
  empMail : {
    type : String,
    required : true
  },
  empDOB : {
    type : String,
    required : true
  },
  empImage : {
    type : String,
    required : true
  }
});

module.exports = new mongoose.model('Employee', employeeSchema);