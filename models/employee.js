const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId : {
    type : String,
    required : true
  },empName : {
    type : String,
    required : true
  },empLocation : {
    type : String,
    required : true
  },empCell : {
    type : String,
    required : true
  },
  empAddress : {
    type : String,
    required : true
  },
  empImage : {
    type : String,
    required : true
  }
});

module.exports = new mongoose.model('Employee', employeeSchema);