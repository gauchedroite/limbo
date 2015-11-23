/// <reference path="typings/tsd.d.ts" />

"use strict";
import * as mongodb from "mongodb";
import {Chapter, Actor, Location, Scene} from "./models";
import { uri } from "./private";

var db: mongodb.Db;

mongodb.MongoClient.connect(uri, function(err: Error, mdb: mongodb.Db) {
    if (err) {
        console.log(err.message);
        throw err;
    }
    db = mdb;
}.bind(this));

function abort(err: Error, callback: (err: Error, obj: any) => void) {
    console.log(err);
    callback(err, null);
}

export function getChapters(callback: (err: Error, chapters: Chapter[]) => void) {
    db.collection("chapter", function (err: Error, chaps: mongodb.Collection) {
        if (err) return abort(err, callback);
        chaps.find().toArray(function(err: Error, objs: any) {
            if (err) return abort(err, callback);
            callback(null, objs);
        });
    });
}

export function getChapter(id: string, callback: (err: Error, chapter: Chapter) => void) {
    db.collection("chapter", function (err: Error, chaps: mongodb.Collection) {
        if (err) return abort(err, callback);
        chaps.findOne({ _id: Number(id) }, function(err: Error, obj: any) {
            if (err) return abort(err, callback);
            callback(null, obj);
        });
    });
}

export function getActors(callback: (err: Error, actors: Actor[]) => void) {
    db.collection("actor", function (err: Error, acts: mongodb.Collection) {
        if (err) return abort(err, callback);
        acts.find().toArray(function(err: Error, objs: any) {
            if (err) return abort(err, callback);
            callback(null, objs);
        });
    });
}

export function getActor(id: string, callback: (err: Error, actor: Actor) => void) {
    db.collection("actor", function (err: Error, acts: mongodb.Collection) {
        if (err) return abort(err, callback);
        acts.findOne({ _id: Number(id) }, function(err: Error, obj: any) {
            if (err) return abort(err, callback);
            callback(null, obj);
        });
    });
}

export function getLocations(callback: (err: Error, locations: Location[]) => void) {
    db.collection("location", function (err: Error, acts: mongodb.Collection) {
        if (err) return abort(err, callback);
        acts.find().toArray(function(err: Error, objs: any) {
            if (err) return abort(err, callback);
            callback(null, objs);
        });
    });
}

export function getLocation(id: string, callback: (err: Error, location: Location) => void) {
    db.collection("location", function (err: Error, acts: mongodb.Collection) {
        if (err) return abort(err, callback);
        acts.findOne({ _id: Number(id) }, function(err: Error, obj: any) {
            if (err) return abort(err, callback);
            callback(null, obj);
        });
    });
}

export function getScenes(callback: (err: Error, scenes: Scene[]) => void) {
    db.collection("scene", function (err: Error, acts: mongodb.Collection) {
        if (err) return abort(err, callback);
        acts.find().toArray(function(err: Error, objs: any) {
            if (err) return abort(err, callback);
            callback(null, objs);
        });
    });
}

export function getScene(id: string, callback: (err: Error, scene: Scene) => void) {
    db.collection("scene", function (err: Error, acts: mongodb.Collection) {
        if (err) return abort(err, callback);
        acts.findOne({ _id: Number(id) }, function(err: Error, obj: any) {
            if (err) return abort(err, callback);
            callback(null, obj);
        });
    });
}
