import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createCollection,
  getCollectionsForUser,
  getCollectionById,
  renameCollection,
  addItemToCollection,
  removeItemFromCollection,
  deleteCollection,
} from "../models/collections.js";

const router = express.Router();

router.use(isAuthenticated);

// POST api/collections, create new empty collection
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Collection name is required" });
    }
    const collection = await createCollection(req.user._id, name.trim());
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET api/collections, list logged-in user's collection
router.get("/", async (req, res) => {
  try {
    const collections = await getCollectionsForUser(req.user._id);
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET api/collections/:id, one collection with its design tiles
router.get("/:id", async (req, res) => {
  try {
    const collection = await getCollectionById(req.params.id, req.user._id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PATCH api/collections/:id, rename collection
router.patch("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Collection name is required" });
    }
    const success = await renameCollection(
      req.params.id,
      req.user._id,
      name.trim(),
    );
    if (!success) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json({ message: "Collection renamed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST api/collections/:id/items, add tile to collection
router.post("/:id/items", async (req, res) => {
  try {
    const { objectId, title, designer, country, year, imageUrl } = req.body;
    if (!objectId) {
      return res.status(400).json({ message: "objectId is required " });
    }
    const success = await addItemToCollection(req.params.id, req.user._id, {
      objectId,
      title,
      designer,
      country,
      year,
      imageUrl,
    });
    if (!success) {
      return res.status(404).json({ message: "Colleciton not found" });
    }
    res.status(201).json({ message: "Item added" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE api/collections/:id/items/:objectId, remove tile from collection
router.delete("/:id/items/:objectId", async (req, res) => {
  try {
    const success = await removeItemFromCollection(
      req.params.id,
      req.user._id,
      req.params.objectId,
    );
    if (!success) {
      return res.status(404).json({ message: "Collection or item not found" });
    }
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE api/colleciton/:id, delete entire collection
router.delete("/:id", async (req, res) => {
  try {
    const success = await deleteCollection(req.params.id, req.user._id);
    if (!success) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json({ message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
