const News=require("../Schema/newsSchema")
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//create object in database(Checked)
router.post("/news", async (req, res) => {
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
router.get("/news", async (req, res) => {
    // console.log(req.body)
    var userMap={};
    try{
        News.find({}, function (err, docs) {
            if (err){
                res.send(err);
            }
            docs.forEach(function(user) {
                // console.log(docs._id)
                userMap[user._id] = user;
                });
                console.log(userMap)
                res.send(userMap)
            })
        }catch(err){
            res.send(err)
        }
    })


//update object
router.put("/news/:id", async (req, res) => {
    // console.log(req.body)
    try{
        id=req.params.id;
        // users=await News.findOne({link:id}, function (err, docs) {
        //     if (err){
        //         res.send("Docs Not Found");
        //     }
        // })
        // // console.log(users)
        // if(users){
            News.updateOne({link:id} 
                ,{
                    "link": req.body['link'],
                    "title": req.body['title'],
                    "image": req.body['image'],
                    "description": req.body['description']}
                     
                ,function (err, docs) {
                    // console.log("docs:",docs)
                    // console.log("err:",err)

                    if (err){
                        res.send(err)
                    }
                    else if(docs["modifiedCount"]==0){
                        res.send("No Document Found For Update")
                    }
                    else{
                        res.send("Document was Updated");
                    }
            });
        }catch(err){
            res.send(err)
            }
})

//for delete object(Checked)
router.delete("/news/:id", async (req, res) => {
    // console.log(req.body)
    try{
        id=req.params.id;
    
        News.deleteOne({link:id}).then(function(err){
            // console.log(err["deletedCount"])
            if(err["deletedCount"]==0){
                // console.log("err:",err)
                res.send("Please Enter Valid Docs")
            }
            else{
                res.send("Sucessfully Data deleted");
            }
        }).catch(function(error){
            res.send(error);
        });
    }catch(err){
        res.send(err)
    }
})

module.exports = router;
