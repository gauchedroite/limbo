
import Freezer = require("../freezer/Freezer");
import Utils = require("./utils");
import {IState} from "./i-state";


var state: IState = Utils.store("appState") || <IState>{
    game: {},
    chapter: {},
    scene: {},
    status: "N O T   L O A D E D"
};

export = new Freezer(state);
