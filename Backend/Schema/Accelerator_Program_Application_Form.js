require("../databaseConnection")
const mongoose = require("mongoose")
const AccelerationFormSchema = new mongoose.Schema({
    Email: String,
    Acknowledgement: Boolean,
    Name_of_Startup: String,
    Company_URL: String,
    Name_of_products: String,
    describe_about_your_products: String,
    Number_of_employees: String,
    link_to_the_CEO: String,
    country: String,
    city: String
});

const Form = mongoose.model("AccelerationForm", AccelerationFormSchema);

module.exports = Form;

// var test={
//     Email: "hitkoladiya",
//     Acknowledgement: true,
//     Name_of_Startup: "comp",
//     Company_URL: "na",
//     Name_of_products: "hi",
//     describe_about_your_products: "must",
//     Number_of_employees: 10,
//     link_to_the_CEO: "na",
//     country: "india",
//     city: "surat"
// }