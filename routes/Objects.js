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

const PAGE_SIZE = 20;

function hasNextPage(pagination) {
  return pagination.current_page + 1 < pagination.number_of_pages;
}

// GET api/objects - Retrieve all objects
router.get("/objects", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const query = `
    query BrowseObjects($page: Int, $size: Int) {
      object(hasImages: true, page: $page, size: $size) {
        ${OBJECT_FIELDS}
      }
    }
  `;

  try {
    const { objects, pagination } = await queryCooperHewitt(query, {
      page,
      size: PAGE_SIZE,
    });
    res.json({
      items: objects.map(reshapeObject),
      hasMore: hasNextPage(pagination),
    });
  } catch (err) {
    console.error("Failed to fetch from Cooper Hewitt:", err);
    res.status(502).json({ error: "Could not reach Cooper Hewitt API" });
  }
});

// GET api/search?q=..., filter by Cooper Hewitt's "general" full-text search argument
router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;
  const page = Number(req.query.page) || 1;
  if (!searchTerm || !searchTerm.trim()) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }
  const query = `
    query SearchObjects($searchTerm: String, $page: Int, $size: Int) {
      object(general: $searchTerm, hasImages: true, page: $page, size: $size) {
        ${OBJECT_FIELDS}
      }
    }
  `;

  try {
    const { objects, pagination } = await queryCooperHewitt(query, {
      searchTerm: searchTerm.trim(),
      page,
      size: PAGE_SIZE,
    });
    res.json({
      items: objects.map(reshapeObject),
      hasMore: hasNextPage(pagination),
    });
  } catch (err) {
    console.error("Failed to search Cooper Hewitt:", err);
    res.status(502).json({ error: "Could not reach Cooper Hewitt API" });
  }
});

export default router;
