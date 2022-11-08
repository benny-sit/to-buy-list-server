require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const List = require("./modules/List");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
}));

const listManager = require("./routes/listManager.js");
app.use("/lists", listManager);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}

const db = mongoose.connection;

app.get("/", (req, res) => {
  res.send("hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Buy List Server -> listening on port ${process.env.PORT}`);
});
