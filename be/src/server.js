import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDb from "./config/connectDb";
var cors = require("cors");
require("dotenv").config();

let app = express();
app.use(cors());

app.options("*", cors());

//config app
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

viewEngine(app);
initWebRoutes(app);

connectDb();

let port = process.env.PORT || 6969; //If dev forget to declare PORT => auto 6969
app.listen(port, () => {
  console.log("Nodejs for Digital Avenues is running on the port: http://localhost:" + port);
});
