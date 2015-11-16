"use strict";
import * as express from "express";
var router = express.Router();
var bodyParser = require("body-parser");
import * as db from "./db";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req: express.Request, res: express.Response, next: Function) {
    console.log("%s %s", req.method, req.url);
    next();
});


router.get("/", function(req: express.Request, res: express.Response) {
    var root = req.protocol + "://" + req.get("host") + req.baseUrl;
    res.json({
        "chapters_url": root + "/chapters"
    });
});

router.get("/chapters", function(req: express.Request, res: express.Response) {
    db.getChapters(function (chapters) {
        res.json(chapters);
    });
});

router.get("/chapter/:id", function(req: express.Request, res: express.Response) {
    db.getChapter(req.params.id, function (chapter) {
        res.json(chapter);
    });
});


module.exports = router;
