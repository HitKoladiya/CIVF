const mongoose = require("mongoose");
const Form = require("./Schema/Accelerator_Program_Application_Form")
const send=require("./send_otp_email")


function storedata(data){
    var message="You are Successfully Registered in CIVF"
    var hit=new Form(data)
    hit.save((err,data)=>{
            console.log("err:",err);
            // console.log(data);
            if(err===null){
                send.sendEmail(data['Email'],message);
            }
        });
}
exports.storedata=storedata

// var hit = new Form({
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
// })
