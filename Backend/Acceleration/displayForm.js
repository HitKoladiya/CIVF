const express = require("express");
const router = express.Router();
require("../databaseConnection")
const Form = require("../Schema/Accelerator_Program_Application_Form")

// async function AllForm(){
//     Form.find({}, function(err, users) {
//       var userMap = [];
  
//        users.forEach(function(user) {
//         userMap[user._id] = user;
//       });
//     //   console.log(userMap)
//        return userMap
//     });
// }
// // exports.AllForm=AllForm;
// var hii=AllForm()
// console.log("hii=",hii)

// Form.findOne({Email:"hitkoladiya"})
