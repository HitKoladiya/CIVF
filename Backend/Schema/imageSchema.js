require("../databaseConnection")
const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    }
});

const Image = mongoose.model("ImageStore", imageSchema);

module.exports = Image;

