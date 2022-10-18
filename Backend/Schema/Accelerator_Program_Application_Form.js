require("../databaseConnection")
const mongoose = require("mongoose")
const AccelerationFormSchema = new mongoose.Schema({
    email: String,
    startup: String,
    URL: String,
    NameOfProducts: String,
    productDescription: String,
    employees: String,
    profile: String,
    country: String,
    city: String,
    preliminaryScreening:{
        type:Boolean,
        default:false,
    },
    finalPitch:{
        type:Boolean,
        default:false,
    },
    RequirementsIncubationAgreement:{
        type:Boolean,
        default:false,
    },

});

const Form = mongoose.model("AccelerationForm", AccelerationFormSchema);

module.exports = Form;

// var test={
//     "email": "21it064@charusat.edu.in",
//     "startup": "hit 1234",
//     "URL": "https://hitlo.mc",
//     "NameOfProducts": "dada no lengho",
//     "employees": "51-100",
//     "profile": "https://hit.ceo.bc",
//     "country": "africa",
//     "city": "jungle",
//     "productDescription": "3 paisa vaalo dada no lengo 🤔🤔"
// }