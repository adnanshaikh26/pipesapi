import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Server is running sucessfully ", PORT);
    });
  })
  .catch((error) => console.log(error));

//
// Home
//

app.get("/", async (req, res) => {
  res.json({ message: "Pipes And Metals" });
});

//
// Galvansied Pipes
//

const gpSchema = new mongoose.Schema({
  nb: Number,
  series: String,
  "outside-diameter-mm": Number,
  "thickness-mm": Number,
  "thickness-swg": Number,
  "plain-end-kg-m": Number,
  "plain-end-mtrs-tone": Number,
  "screwed-socketed-kg-m": Number,
  "screwed-socketed-mtrs-tone": Number,
  "sockets-od-in-mm": Number,
  "sockets-length-mm": Number,
});

const UserModel = mongoose.model("galvanisedpipes", gpSchema);

app.get("/getItems", async (req, res) => {
  const userData = await UserModel.find(req.query).sort("id");
  res.json(userData);
});

//
//  Black Pipes
//

const bpSchema = new mongoose.Schema({
  nb: Number,
  series: String,
  "outside-diameter-mm-max": Number,
  "outside-diameter-mm-min": Number,
  "thickness-mm": Number,
  "plain-end-kg-m": Number,
  "screwed-socketed-kg-m": Number,
  "ton-approx": Number,
});

const BpModel = mongoose.model("blackpipes", bpSchema);

app.get("/getBlackpipes", async (req, res) => {
  const bpData = await BpModel.find(req.query).sort("nb");
  res.json(bpData);
});

//
//
//
