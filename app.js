const http = require("http");
const host = "localhost";
const port = "3000";
const server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("Hello World");
    // res.end();
    

    // Xu ly voi mongoDB
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://Phamminhduc:1998@cluster0.76dk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("ExaminationDB").collection("InfoByMe");
        if (err)
            console.log(err);
        //connect to the db
        else
            console.log("Connected correctly to server.");
        var myquery = { name: 1 };
        collection.find().sort(myquery).toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            var kq = JSON.stringify(result);
            res.write(kq);
            res.end();
            client.close();
        });
    });

});
server.listen(port, host);




// const uri = "mongodb+srv://Phamminhduc:1998@cluster0.76dk8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("ExaminationDB");
//         const collection = database.collection("InfoByMe");
//         console.log("Connect database final");

//         // // insert
//         const myObj = { name: "Pham Minh Duc", address: "Nghe An" };
//         const result = await collection.insertOne(myObj);
//         console.log(`Da insert id ${result.insertedId}`);

//         // find
//         // const find = { address: "Hà Nội" };
//         // const result = await collection.find(find).toArray();
//         // console.log(result);

//         //sort
//         // const mySort = { name: 1 };
//         // const result = await collection.find().sort(mySort).toArray();
//         // console.log(result);

//         //update
//         // var myObj = { name: "Bui Thanh Hai", address: "Hà Nội" };
//         // const result = await collection.updateOne(myObj, { $set: { address: "Nghệ An - Hà Nội" } });
//         // console.log(`Da update ${result.matchedCount}`);

//         //delete
//         // const myObj = { name: "Pham Minh Duc"};
//         // const result = await collection.deleteOne(myObj);
//         // console.log(`Da delete ${result.deletedCount}`);


//     } finally {
//         await client.close();
//     }


// }
// run().catch(console.dir);


