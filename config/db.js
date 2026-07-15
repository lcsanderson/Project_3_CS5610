// shared MongoDB connection that the rest of the backend will import and reuse
// so that not every file needs to open its own seperate connection
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error(
    "MONGO_URI is not set. Create a new .env file with MONGO_URI=<your connection string>",
  );
}

const DB_NAME = process.env.MONGO_DB_NAME || "LCS003";

let db = null;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  const client = new MongoClient(MONGO_URI);
  await client.connect();

  db = client.db(DB_NAME);

  console.log(`Connected to MongoDB database: ${DB_NAME}`);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error(
      "Database not connected yet. Call connectToDatabase() before using getDb().",
    );
  }
  return db;
}
