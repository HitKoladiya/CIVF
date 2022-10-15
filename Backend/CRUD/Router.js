const News=require("../Schema/newsSchema")
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//create object in database(Checked)
router.post("/create", async (req, res) => {
    try{
        var obj=new News(req.body);
    obj.save((err,data)=>{
        if(err===null){
            res.send("Succesfully Created")
        }
        else{
            res.send("Somthing went wrong")
        }
    })
    }catch(err){
        res.send(err)
    }
})


//find object from database(Checked)
router.post("/read", async (req, res) => {
    // console.log(req.body)
    try{
        id=req.body['_id'];
        users=await News.findOne({_id:id}, function (err, docs) {
            if (err){
                res.send(err);
            }
        })
        // console.log(users)
        if(users){
            res.send(users)
        }
        else{
            res.send("not found")
        }
       
    }catch(err){
        res.send(err)
    }
})


//update object
router.post("/update", async (req, res) => {
    // console.log(req.body)
    try{
        id=req.body['_id'];
        users=await News.findOne({_id:id}, function (err, docs) {
            if (err){
                res.send(err);
            }
        })
        // console.log(users)
        if(users){
            News.updateOne({_id:id}, 
                {
                    "link": req.body['link'],
                    "title": req.body['title'],
                    "image": req.body['image'],
                    "description": req.body['description']}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    res.send("Document was Updated");
                }
            });
        }
        else{
            res.send("not found")
        }
       
    }catch(err){
        res.send(err)
    }
})

//for delete object(Checked)
router.post("/delete", async (req, res) => {
    // console.log(req.body)
    try{
        id=req.body['_id'];
    
        News.deleteOne({_id:id}).then(function(){
            res.send("Data deleted");
        }).catch(function(error){
            res.send(error);
        });
    }catch(err){
        res.send(err)
    }
})

module.exports = router;
