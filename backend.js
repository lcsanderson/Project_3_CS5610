import express from "express";

import listingsRouter from "./routes/Listings.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("FRONTEND/dist"));
app.use("/api", listingsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
