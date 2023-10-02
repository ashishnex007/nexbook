const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashishnex007:kaavya12@cluster0.an7mzge.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function addNotes(){
    await client.db("admin").command({ ping: 1 });
    const myDB = client.db("nexnotes");
    const myColl = myDB.collection("notes");
    const doc = { id:3,name:"Kukka" };
    const result = await myColl.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`,
)
}
module.exports = addNotes