const mongoClient = require('mongodb').mongoClient;
const url='mongodb+srv://hitkoladiya:CIVF@cluster0.wzsvd5c.mongodb.net/test'
const dbName='CIVF'

mongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
collection.insertOne({"name":"hit"});
})
