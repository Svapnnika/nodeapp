import express from "express";
import cors from "cors";
import { MongoClient,ObjectId } from "mongodb";
const app = express();
app.use(cors());
app.use(express.json());
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = client.db("databasedb");
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/Products", async (req, res) => {
  const products = await db.collection("Products").find().toArray();
  res.json(products);
});
app.delete("/Products/:id", async (req, res) => {
  const id = req.params.id
  const products = await db.collection("Products").deleteOne({_id:new ObjectId(id)});
  res.json(products);
});
app.post("/Products", async (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    name: name,
    price: price,
  };
  const products = await db.collection("Products").insertOne(newProduct);
  res.json(products);
});
app.listen(8081, () => {
  console.log("Server started on port 8081");
});