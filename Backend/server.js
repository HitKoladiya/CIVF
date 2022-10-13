const Exp=require("express");
const bodyParser = require("body-parser");
const app=Exp();
const port=3000

const storeForm=require("./AccelerationForm")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send(`hello world`);

})


app.post("/database",(req,res)=>{
    res.send(`hello world`);
    console.log("data:",req.body);
})

app.post("/applyforacceleration",(req,res)=>{
    // console.log(req.body)
    res.send(`hello world`);
    storeForm.storedata(req.body);
})




app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})