const News=require("../Schema/newsSchema")
//pass only one object
function create(data){
    var obj=new News(data);
    obj.save((err,data)=>{
        console.log("err:",err);
    })
}

exports.create = create;