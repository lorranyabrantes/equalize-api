import express from "express";
import { company } from "./src/Get/Company";

const port = 3000;
const app = express();

app.get("/", async (req, res) => {
  company((response) => {
    const data = response.rows;
    res.json({ data });
  });
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
