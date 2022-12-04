const Exp = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const upload = require("../Backend/ImageUpload");
const Image = require("../Backend/Schema/imageSchema");
const Form = require("./Schema/Accelerator_Program_Application_Form");
const bcrypt = require("bcryptjs");
const User = require("./Schema/userSchema");
const cors = require("cors");
const nodemailer = require('nodemailer');
const Jimp = require('jimp');

const app = Exp();
const port = 5000;

app.use(require("./CRUD/Router"));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`hello world`);
});

app.post("/applyforacceleration", async (req, res) => {
    // console.log(req.body)
    // res.send(`HELLO WORLD`);
    const data = req.body;
    //console.log(req.body);
    var message = "You are Successfully Registered in CIVF";
    var responce = "";
    const email=req.body.email;
    const d = new Date();
    const app_no = d.getTime();
    data["Application_number"]=app_no;
    try {
        var hit = new Form(data);
        await hit.save(async(err, data) => {
            console.log("err:", err);
            // console.log(data);
            if (err == null) {
                    let mailTransporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: '22ehe009@charusat.edu.in',
                            pass: 'Hit_Lo_123456'
                        }
                    });

                    let mailDetails = {
                        from: '22ehe009@charusat.edu.in',
                        to: email,
                        subject: 'CIVF charusat',
                        text:"Thanks For Registration \n Your Application number is:"+app_no+"\n You can track your Application using your Application number"
                    };

                    await mailTransporter.sendMail(mailDetails,function(err, data) {
                        if(err) {
                            console.log("No recipients defined");
                            res.send("No recipients defined") 
                        } else {
                            console.log('Email sent successfully');
                            res.send({"Application_number":app_no})
                        }
                    });
                    
            } else {
                responce = "Something went wrong";
                res.send(responce);
            }
        });
    } catch (e) {
        console.log(e);
        responce = "Something went wrong";
        res.send(responce);
    }
});

app.get("/allAccelerationForm", (req, res) => {
    var userMap = [];
    Form.find({}, function (err, docs) {
        if (err) {
            res.send(err);
        }
        docs.forEach(function (user) {
            console.log(user);
            userMap.push(user);
        });
        console.log(userMap);
        res.send(userMap);
    });
});

//tracking form
app.post("/updateForm", (req, res) => {
    // var obj;
    // console.log(obj)
    function update(data) {
        Form.updateOne(
            { _id: req.body["_id"] },
            {
                data: req.body[data],
            },
            function (err, docs) {
                console.log("docs:", docs);
                console.log("err:", err);

                if (err) {
                    res.send(err);
                } else if (docs["modifiedCount"] == 0) {
                    if (docs["matchedCount"] == 1) {
                        res.status(403).send("Value already exists.");
                    } else {
                        console.log(docs["modifiedCount"]);
                        res.status(404).send("Not found");
                    }
                } else {
                    res.send("Document was Updated");
                }
            }
        );
    }

    try {
        id = req.body["_id"];
        if (req.body["finalPitch"] != undefined) {
            console.log(req.body["finalPitch"]);
            update("finalPitch");
        }
        if (req.body["RequirementsIncubationAgreement"] != undefined) {
            console.log(req.body["RequirementsIncubationAgreement"]);
            update("RequirementsIncubationAgreement");
        }
        if (req.body["preliminaryScreening"] != undefined) {
            console.log("c1", req.body["preliminaryScreening"]);
            update("preliminaryScreening");
        }
    } catch (err) {
        res.send(err);
    }
    // res.send(`hello world`);
});

app.post("/trackForm", async (req, res) => {
    // var x=0;
    try{
        var x=await Form.findOne({Application_number:req.body.Application_number,email:req.body.email})
        // console.log("x:"+x);
        if(x==undefined || x==null){
            res.send("data not found").status(404);
        }
        else{
            res.send(x).status(200);
        }
    }catch(err){
        res.send(err)
    }
    
}); 

///for getting image and store to databse and In the folder
app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.file.filename);
            const newImage = new Image({
                name: req.file.filename,
                image: {
                    data: req.file.filename,
                    contentType: "image/png",
                },
            });
            newImage
                .save()
                .then(() => res.send("successfully upload"))
                .catch((err) => console.log(err));
        }
    });
});

app.post("/signup", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(422).json({ error: "Please fill all feilds" });
    }

    try {
        const userExits = await User.findOne({ name: name });
        if (userExits) {
            return res.status(422).json({ error: "Email already registered" });
        } else {
            const user = new User({ name, password });
            await user.save();
            res.status(201).json({ message: "user successfully registered" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: "Please fill Data" });
        }

        const userLogin = await User.findOne({ name: name });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, { httpOnly: true });

            if (!isMatch) {
                res.status(400).json({ error: "Inalid details" });
            } else {
                res.json({ message: "user signin successfully" });
            }
        } else {
            res.status(400).json({ error: "Inalid details" });
        }
    } catch (error) {
        console.log(error);
    }
});

//sending one image from backend
app.post("/image.jpeg", (req, res) => {
    var name = "WhatsApp Image 2022-10-08 at 13.21.21.jpeg";
    res.sendFile(path.join(__dirname, `./ImageStore/${name}`));
});

app.post("/generate80G", async(req, res) =>{
    console.log("start")
    console.log(req.body)

    function moneyToString(num) {
        let a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        let b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        // if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]): '';
        return str;
    }
    var amount=moneyToString(req.body.amount)+"Rupees only ";
    console.log(amount);

    try{
        const image = await Jimp.read('D:/My Projects/CIVF Website/CIVF/CIVF/Backend/Testing/receipt80G.png');
    
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    if(req.body.address.length>=42){
        let add1 = req.body.address.substring(0, 42);
        let add2 = req.body.address.substring(42,req.body.address.length);
        await image.print(font, 127, 245, add1);
        await image.print(font, 127, 259, add2);
    }
    else{
        await image.print(font, 127, 245, req.body.address);
    }
    if(req.body.name.length>=42){
        let name1 = req.body.name.substring(0, 42);
        let name2 = req.body.name.substring(42,req.body.address.length);
        await image.print(font, 120, 215, name1);
        await image.print(font, 120, 229, name2);
    }
    else{
        await image.print(font, 120, 215, req.body.name);
    }
   // Defining the text font
    image.print(font, 125, 282, req.body.mobile);
    image.print(font, 120, 314, req.body.email);
    image.print(font, 100, 345, req.body.pan);
    await image.print(font, 600, 249, amount);
    image.print(font, 595, 218, req.body.amount+"/- Rs");

    await console.log("end")

   // Writing image after processing
   await image.writeAsync('D:/My Projects/CIVF Website/CIVF/CIVF/Backend/Testing/generated80G.png');
   await res.sendFile("D:/My Projects/CIVF Website/CIVF/CIVF/Backend/Testing/generated80G.png")
    }catch(err){
        res.send(err);
    }
    
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
