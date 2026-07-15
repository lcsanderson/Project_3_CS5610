import express from "express";

const router = express.Router();

const COOPER_HEWITT_ENDPOINT = "https://api.cooperhewitt.org/";

// GET /listings - Retrieve all listings
router.get("/objects", async (req, res) => {
  const query = `
        {
            object(hasImages: true, size: 20) {
                id
                summary
                multimedia
                maker {
                    summary
                }
                geography
                date
            }
        }
    `;

  try {
    const response = await fetch(COOPER_HEWITT_ENDPOINT, {
      method: "POST", //GraphQL only uses POST to make queries
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const json = await response.json(); //creates a JS object

    if (json.errors || !json.data || !json.data.object) {
      console.error("Cooper Hewitt did not return usable data:", json);
      return res
        .status(502)
        .json({ error: "Cooper Hewitt API returned an error" });
    }

    const rawObjects = json.data.object;

    const objects = rawObjects.map((obj) => {
      return {
        id: obj.id,
        title: obj.summary.title,
        designer: obj.maker?.[0]?.summary?.title ?? "Unknown designer",
        country: obj.geography?.country?.value ?? "Unknown origin",
        year: obj.date?.[0]?.value ?? "Unknown date",
        imageUrl: obj.multimedia?.[0]?.preview?.url ?? null,
      };
    });

    res.json(objects);
  } catch (err) {
    console.error("Failed to fetch from Cooper Hewitt:", err);
    res.status(502).json({ error: "Could not reach Cooper Hewitt API" });
  }
});

export default router;
