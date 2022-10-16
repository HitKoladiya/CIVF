const express = require("express");
const router = express.Router();
require("../databaseConnection")
const bodyParser = require("body-parser");
const Form = require("../Schema/Accelerator_Program_Application_Form")

function AllForm(){
    var userMap = [];
    Form.find({}, function(err, users) {
       users.forEach(function(user) {
        userMap[user._id] = user;
      });
      console.log(userMap)
    })

}
exports.AllForm=AllForm;
// var hii=AllForm()
// console.log("hii=",hii)

// Form.findOne({Email:"hitkoladiya"})