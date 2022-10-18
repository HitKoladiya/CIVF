const Exp = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const upload = require("../Backend/ImageUpload")
const Image = require("../Backend/Schema/imageSchema")
const Form = require("./Schema/Accelerator_Program_Application_Form")
const send = require("./send_email");
const storeForm = require("./Acceleration/AccelerationForm")
const bcrypt = require("bcryptjs");
const authenticate = require("./authenticate");
const User = require("./Schema/userSchema")

const app = Exp();
const port = 3000


app.use(require("./CRUD/Router"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(`hello world`);

})


app.post("/database", (req, res) => {
    res.send(`hello world`);
    console.log("data:", req.body);
})

app.post("/applyforacceleration", async (req, res) => {
    // console.log(req.body)
    // res.send(`HELLO WORLD`);
    const data = req.body;
    console.log(req.body);
    var message = "You are Successfully Registered in CIVF"
    var responce = "";
    try {
        var hit = new Form(data);
        hit.save((err, data) => {
            console.log("err:", err);
            // console.log(data);
            if (err == null) {

                send.sendEmail(data['email'], message);
                responce = "Succesfully Stored"
                res.send(data);
            }
            else {
                responce = "Something went wrong";
                res.send(responce);
            }
        });
    } catch (e) {
        console.log(e)
        responce = "Something went wrong";
        res.send(responce);
    }


})

app.get("/allAccelerationForm", (req, res) => {
    var userMap = {};
    Form.find({}, function (err, docs) {
        if (err) {
            res.send(err);
        }
        docs.forEach(function (user) {
            console.log(user)
            userMap[user._id] = user;
        });
        console.log(userMap)
        res.send(userMap)
    })

})


//tracking form
app.post("/trackingform", (req, res) => {
    // var obj; 
    // console.log(obj)
    function update(data) {
        Form.updateOne({ _id: req.body["_id"] }
            , {
                data:req.body[data]
            }
            , function (err, docs) {
                console.log("docs:", docs)
                console.log("err:", err)

                if (err) {
                    res.send(err)
                }
                else if (docs["modifiedCount"] == 0) {
                    if (docs["matchedCount"] == 1) {
                        res.status(403).send("Value already exists.")
                    }
                    else {
                        console.log(docs["modifiedCount"])
                        res.status(404).send("Not found")
                    }
                }
                else {
                    res.send("Document was Updated");
                }
            })
    }

    try {

        id = req.body["_id"];
        if (req.body["finalPitch"] != undefined) {
            console.log(req.body["finalPitch"]);
            update("finalPitch")

        }
        if (req.body["RequirementsIncubationAgreement"] != undefined) {
            console.log(req.body["RequirementsIncubationAgreement"]);
            update("RequirementsIncubationAgreement")
        }
        if (req.body["preliminaryScreening"] != undefined) {
            console.log("c1", req.body["preliminaryScreening"]);
            update("preliminaryScreening")
        }    

    } catch (err) {
        res.send(err)
    }
    // res.send(`hello world`);

})

///for getting image and store to databse and In the folder
app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(req.file.filename)
            const newImage = new Image({
                name: req.file.filename,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            newImage.save()
                .then(() => res.send('successfully upload')).catch(err => console.log(err))
        }
    })
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
})

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
})


//sending one image from backend
app.post("/image.jpeg", (req, res) => {
    var name = "WhatsApp Image 2022-10-08 at 13.21.21.jpeg"
    res.sendFile(path.join(__dirname, `./ImageStore/${name}`));
});


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})