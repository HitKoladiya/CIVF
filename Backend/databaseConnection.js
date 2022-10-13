const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://hitkoladiya:CIVF@cluster0.wzsvd5c.mongodb.net/test");
const db=mongoose.connection;
db.on('error',console.error.bind(console,'hii'));
db.once('open',()=>{
      console.log("open")
})

const loginSchema=new mongoose.Schema({
      name:String
});

// var login=mongoose.model('login_db',loginSchema);

// var hit=new login({name:"hit"});
// hit.save((error,data)=>{
//       console.log(error,data)
// });
