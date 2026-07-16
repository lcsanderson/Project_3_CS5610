// saved collection of Cooper Hewitt tile items
import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";

// return MongoDB Collection that stores tile collections
function collectionsCollection() {
  return getDb().collection("collections");
}

export async function createCollection(userId, name) {
  const newCollection = {
    userId: new ObjectId(userId),
    name,
    items: [],
    createdAt: new Date(),
  };
  const result = await collectionsCollection().insertOne(newCollection);
  return { _id: result.insertedId, ...newCollection };
}

// loads all collections from user
export async function getCollectionsForUser(userId) {
  return await collectionsCollection()
    .find({ userId: new ObjectId(userId) })
    .toArray();
}

// get individual collection for details when clicked on
export async function getCollectionById(id, userId) {
  return await collectionsCollection().findOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId),
  });
}

export async function renameCollection(id, userId, newName) {
  const result = await collectionsCollection().updateOne(
    { _id: new ObjectId(id), userId: new ObjectId(userId) },
    { $set: { name: newName } }, // touches just the name data of the colleciton
  );
  // .matchedCount tells route handler whether anythign was actually/changed or not
  // responds with a 404 if not
  return result.matchedCount > 0;
}

export async function addItemToCollection(id, userId, item) {
  const itemWithTimestamp = {
    ...item,
    savedAt: new Date(),
  };
  const result = await collectionsCollection().updateOne(
    { _id: new ObjectId(id), userId: new ObjectId(userId) },
    { $push: { items: itemWithTimestamp } },
  );
  return result.matchedCount > 0;
}

export async function removeItemFromCollection(id, userId, objectId) {
  const result = await collectionsCollection().updateOne(
    { _id: new ObjectId(id), userId: new ObjectId(userId) },
    { $pull: { items: { objectId } } },
  );
  return result.matchedCount > 0;
}

export async function deleteCollection(id, userId) {
  const result = await collectionsCollection().deleteOne({
    _id: new ObjectId(id),
    userId: new ObjectId(userId),
  });
  // delete count is either 0 or 1 bc only one document
  // is being deleted (0 means no success)
  return result.deletedCount > 0;
}
