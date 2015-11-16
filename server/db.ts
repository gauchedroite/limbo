/// <reference path="typings/tsd.d.ts" />

"use strict";
import * as mongodb from "mongodb";
import { uri } from "./private";

var db: mongodb.Db;

mongodb.MongoClient.connect(uri, function(err: Error, mdb: mongodb.Db) {
    if (err) {
        console.log(err.message);
        throw err;
    }
    db = mdb;
}.bind(this));


export interface Chapter {
    _id: number;
    title: string;
}


export function getChapters(callback: (chapters: Chapter[]) => void) {
    db.collection("chapter", function (err: Error, chaps: mongodb.Collection) {
        if (err) { console.log(err); return; }
        chaps.find().toArray(function(err: Error, objs: any) {
            if (err) { console.log(err); return; }
            callback(objs);
        });
    });
}

export function getChapter(id: string, callback: (chapter: Chapter) => void) {
    db.collection("chapter", function (err: Error, chaps: mongodb.Collection) {
        if (err) { console.log(err); return; }
        chaps.findOne({ _id: Number(id) }, function(err: Error, obj: any) {
            if (err) { console.log(err); return; }
            callback(obj);
        });
    });
}
