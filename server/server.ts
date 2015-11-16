/// <reference path="typings/tsd.d.ts" />

import * as express from "express";
var cors = require("cors");
var api = require("./api");

var port = process.env.port || 1337;
var app = express();

app.use(cors());
app.use(express.static("../public"));
app.use("/editor", express.static("../editor"));
app.use("/api", api);

app.listen(port, function() {
    console.log("Express server listening on port " + port);
});
