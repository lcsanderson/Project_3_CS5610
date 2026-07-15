import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";

function usersCollection() {
  return getDb().collection("users");
}

export async function createUser(user) {
  const result = await usersCollection().insertOne(user);
  return { _id: result.insertedId, ...user };
}

export async function findUserByEmail(email) {
  return await usersCollection().findOne({ email });
}

export async function findUserById(id) {
  return await usersCollection().findOne({ _id: new ObjectId(id) });
}

export async function getAllUsers() {
  return await usersCollection().find({}).toArray();
}
