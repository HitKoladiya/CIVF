const multer=require('multer');
const Image=require("../Backend/Schema/imageSchema")

const Storage=multer.diskStorage({
    destination:"ImageStore",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({
    storage:Storage
}).single('testImage')

module.exports=upload;