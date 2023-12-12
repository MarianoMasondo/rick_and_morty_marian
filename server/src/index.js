const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const server = express();
require("dotenv").config();
const { PORT } = process.env


server.use(cors({ origin: "https://rick-and-morty-marian.vercel.app" }));
server.use(express.json());

server.use("/rickandmorty", router);

server.listen(process.env.PORT, () => {
  console.log("Server raised in port: " + PORT);
}); 
