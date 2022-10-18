const Exp=require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const upload=require("../Backend/ImageUpload")
const Image=require("../Backend/Schema/imageSchema")
const app=Exp();
const port=3000

const Form = require("./Schema/Accelerator_Program_Application_Form")
const send=require("./send_email");

const storeForm=require("./Acceleration/AccelerationForm")
app.use(require("./CRUD/Router"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send(`hello world`);

})


app.post("/database",(req,res)=>{
    res.send(`hello world`);
    console.log("data:",req.body);
})

app.post("/applyforacceleration",async(req,res)=>{
    // console.log(req.body)
    // res.send(`HELLO WORLD`);
    const data=req.body;
    console.log(req.body);
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
                    res.send(responce);
                }
                else{
                    responce="Something went wrong";
                    res.send(responce);
                }
            });
    }catch(e){
        console.log(e)
        responce="Something went wrong";
        res.send(responce);
    }

    
})

app.get("/allAccelerationForm",(req,res)=>{
    
    res.send(`hello world`);

})

///for getting image and store to databse and In the folder
app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(req.file.filename)
            const newImage=new Image({
                name: req.file.filename,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(()=>res.send('successfully upload')).catch(err=>console.log(err))
        }
    })
});

  
//sending one image from backend
app.post("/image.jpeg", (req, res) => {
    var name="WhatsApp Image 2022-10-08 at 13.21.21.jpeg"
    res.sendFile(path.join(__dirname, `./ImageStore/${name}`));
  });


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})