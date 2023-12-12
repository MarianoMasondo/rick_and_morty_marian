const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const server = express();
const PORT = 3001;

server.use(cors({ origin: "https://rick-and-morty-marian.vercel.app" }));
server.use(express.json());

server.use("/rickandmorty", router);

server.listen(PORT, () => {
  console.log("Server raised in port: " + PORT);
});
