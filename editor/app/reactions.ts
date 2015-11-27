
import State = require("./state");
import Utils = require("./utils");
import Api from "./api";


var api = new Api("http://localhost:1337/api");

State.on("scene:fetch", function(id: number) {
    State.get().set({status: "L O A D I N G"});
    
    api.fetch(`/scenes/${id}`, function(data: any) {
        
        if (data.error) {
            State.get().set({status: `[${data.error}]`});
            return;
        }
        
        State.get().set({status: "L O A D E D"});
    });
});
