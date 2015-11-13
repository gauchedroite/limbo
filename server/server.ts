
var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
var port = process.env.port || 1337;

app.use(cors());
app.use(express.static("../public"));

app.listen(port);

console.log("listening on port " + port);
