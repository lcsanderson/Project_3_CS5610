import { connectToDatabase } from "./config/db.js";
import express from "express";
import objectsRouter from "./routes/Objects.js";

await connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("FRONTEND/dist"));
app.use("/api", objectsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
