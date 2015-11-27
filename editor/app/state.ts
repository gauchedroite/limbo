
import Freezer = require("../freezer/Freezer");
import Utils = require("./utils");


var state = Utils.store("appState") || {
    game: {},
    chapter: {},
    scene: {},
    status: "N O T   L O A D E D"
};

var freezer = new Freezer(state);

export = freezer;
