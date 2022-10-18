// require("mongoose")
const Form = require("../Schema/Accelerator_Program_Application_Form")
const send=require("../send_email");


function storedata(data){
    var message="You are Successfully Registered in CIVF"
    var responce="";
    try{
        var hit=new Form(data);
        hit.save((err,data)=>{
                console.log("err:",err);
                // console.log(data);
                if(err==null){
                
                    send.sendEmail(data['Email'],message);
                    responce="Succesfully Stored"
                    return "Succesfully Stored";
                }
                else{
                    responce="Something went wrong";
                     return "Something went wrong";
                }
            });
    }catch(e){
        console.log(e)
        responce="Something went wrong";
        return "Something went wrong";
    }
   
}


// exports.storedata=storedata

// var hit = new Form({
//     Email: "jaykeraliya0@gmail.com",
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
// console.log(storedata(hit))