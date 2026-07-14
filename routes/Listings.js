import express from "express";

const router = express.Router();

// Sample data for listings
const listings = [
  { id: 1, title: "Object 1", designer: "Designer One" },
  { id: 2, title: "Object 1", designer: "Designer Two" },
  { id: 3, title: "Object 1", designer: "Designer Three" },
];

// GET /listings - Retrieve all listings
router.get("/listings", (req, res) => {
  res.json(listings);
});

export default router;
