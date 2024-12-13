// lib/dbConnect.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://doranoob:rr2002@cluster0.6sbvx.mongodb.net/Book_store?retryWrites=true&w=majority";
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
} else {
  console.log("DB already Connected");
}

export async function connectDB() {
  if (!clientPromise) {
    clientPromise = global._mongoClientPromise;
  }
  const client = await clientPromise;
  return client;
}
