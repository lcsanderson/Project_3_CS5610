import express from "express";
import { queryCooperHewitt, reshapeObject } from "../utils/cooperHewitt.js";

const router = express.Router();

const OBJECT_FIELDS = `
id
summary
multimedia
maker {
summary
}
geography
date
`;

// GET api/objects - Retrieve all objects
router.get("/objects", async (req, res) => {
  const query = `
        {
            object(hasImages: true, size: 20) {
                ${OBJECT_FIELDS}
            }
        }
    `;

  try {
    const rawObjects = await queryCooperHewitt(query);
    res.json(rawObjects.map(reshapeObject));
  } catch (err) {
    console.error("Failed to fetch from Cooper Hewitt:", err);
    res.status(502).json({ error: "Could not reach Cooper Hewitt API" });
  }
});

// GET api/search?q=..., filter by Cooper Hewitt's "general" full-text search argument
router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm || !searchTerm.trim()) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }
  const query = `
  query SearchObjects($searchTerm: String, $size: Int) {
      object(general: $searchTerm, hasImages: true, size: $size) {
        ${OBJECT_FIELDS}
      }
    }
  `;

  try {
    const rawObjects = await queryCooperHewitt(query, {
      searchTerm: searchTerm.trim(),
      size: 20,
    });
    res.json(rawObjects.map(reshapeObject));
  } catch (err) {
    console.error("Failed to search Cooper Hewitt:", err);
    res.status(502).json({ error: "Could not reach Cooper Hewitt API" });
  }
});

export default router;
