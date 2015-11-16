/// <reference path="typings/tsd.d.ts" />

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var tsb = require("gulp-tsb");


var tsConfigSrc = tsb.create("tsconfig.json");

// TypeScript build for /, pipes in .d.ts files from typings folder 
gulp.task("buildServer", function () {
    return gulp.src(["typings/**/*.ts", "*.ts"])
        .pipe(tsConfigSrc())
        .pipe(gulp.dest("./"));
});

// TypeScript build for /src folder 
gulp.task("buildSrc", function () {
    return gulp.src(["src/**/*.ts"])
        .pipe(tsConfigSrc())
        .pipe(gulp.dest("./src"));
});

// TypeScript build for /tests folder, pipes in .d.ts files from typings folder
// as well as the src/tsd.d.ts which is referenced by tests/tsd.d.ts 
gulp.task("buildTests", function () {
    // pipe in all necessary files
    return gulp.src(["typings/**/*.ts", "tests/**/*.ts", "tsd.d.ts"])
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest("./tests"));
});

// Run mocha tests in the ./tests folder
gulp.task("test", function () {
    return gulp.src("./tests/*.js", { read: false })
        .pipe(mocha());
    // gulp-mocha needs filepaths so you can't have any plugins before it 
});

// Watch for any TypeScript file changes
// if a file change is detected, run the TypeScript compile gulp tasks
gulp.task("watch", function () {
    gulp.watch("*.ts", ["buildServer"]);
    gulp.watch("src/**/*.ts", ["buildSrc"]);
    gulp.watch("tests/**/*.ts", ["buildTests"]);
});


// Doesn't work as expected.
// The output files get created multiple times in multiple folders...
//gulp.task("buildAll", ["buildServer", "buildSrc", "buildTests"]);

