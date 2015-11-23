"use strict";
import * as express from "express";
var router = express.Router();
var bodyParser = require("body-parser");
import * as db from "./db";
import {Chapter, Actor, Location, Scene} from "./models";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req: express.Request, res: express.Response, next: Function) {
    console.log("%s %s", req.method, req.url);
    next();
});


router.get("/", function(req: express.Request, res: express.Response) {
    var root = req.protocol + "://" + req.get("host") + req.baseUrl;
    res.json({
        "chapters_url": root + "/chapters",
        "chapter_url": root + "/chapters/{id}",
        "actors_url": root + "/actors",
        "actor_url": root + "/actors/{id}",
        "locations_url": root + "/locations",
        "location_url": root + "/locations/{id}",
        "scenes_url": root + "/scenes",
        "scene_url": root + "/scenes/{id}"
    });
});

router.get("/chapters", function(req: express.Request, res: express.Response) {
    var root = req.protocol + "://" + req.get("host") + req.baseUrl;
    db.getChapters(function (err: Error, chapters: Chapter[]) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        chapters.forEach((chapter: Chapter) => {
            (<any>chapter).self_url = root + "/chapters/" + chapter._id;
        });
        res.json({
            data: chapters
        });
    });
});

router.get("/chapters/:id", function(req: express.Request, res: express.Response) {
    db.getChapter(req.params.id, function (err: Error, chapter: Chapter) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        if (chapter == null)
            return res.json(404, { error: "Chapter not found" });
        res.json({
            data: chapter
        });
    });
});

router.get("/actors", function(req: express.Request, res: express.Response) {
    var root = req.protocol + "://" + req.get("host") + req.baseUrl;
    db.getActors(function (err: Error, actors: Actor[]) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        actors.forEach((actor: Actor) => {
            (<any>actor).self_url = root + "/actors/" + actor._id;
        });
        res.json({
            data: actors
        });
    });
});

router.get("/actors/:id", function(req: express.Request, res: express.Response) {
    db.getActor(req.params.id, function (err: Error, actor: Actor) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        if (actor == null)
            return res.json(404, { error: "Actor not found" });
        res.json({
            data: actor
        });
    });
});

router.get("/locations", function(req: express.Request, res: express.Response) {
    var root = req.protocol + "://" + req.get("host") + req.baseUrl;
    db.getLocations(function (err: Error, locations: Location[]) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        locations.forEach((location: Location) => {
            (<any>location).self_url = root + "/locations/" + location._id;
        });
        res.json({
            data: locations
        });
    });
});

router.get("/locations/:id", function(req: express.Request, res: express.Response) {
    db.getLocation(req.params.id, function (err: Error, location: Location) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        if (location == null)
            return res.json(404, { error: "Location not found" });
        /*res.links({
            next: 'http://api.example.com/users?page=2',
            last: 'http://api.example.com/users?page=5'
        });*/
        res.json({
            data: location
        });
    });
});

router.get("/scenes", function(req: express.Request, res: express.Response) {
    var root = req.protocol + "://" + req.get("host") + req.baseUrl;
    db.getScenes(function (err: Error, scenes: Scene[]) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        scenes.forEach((scene: Scene) => {
            (<any>scene).self_url = root + "/scenes/" + scene._id;
        });
        res.json({
            data: scenes
        });
    });
});

router.get("/scenes/:id", function(req: express.Request, res: express.Response) {
    db.getScene(req.params.id, function (err: Error, scene: Scene) {
        if (err) {
            res.json(400, { error: err });
            return;
        }
        if (scene == null)
            return res.json(404, { error: "Scene not found" });
        res.json({
            data: scene
        });
    });
});


module.exports = router;
