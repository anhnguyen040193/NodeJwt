const { MongoClient, ServerApiVersion } = require("mongodb");

const dbURL =
  "mongodb+srv://anhnguyen040193:ngocanh123@cluster0.iw470wr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(dbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
module.exports = connectDB;
