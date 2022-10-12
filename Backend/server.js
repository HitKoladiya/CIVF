const Exp=require("express");
const bodyParser = require("body-parser");
const app=Exp();
const port=3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send(`hello world`);

})


app.post("/database",(req,res)=>{
    res.send(`hello world`);
    console.log("data:",req.body);
})




app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})