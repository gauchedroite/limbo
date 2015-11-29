
import State = require("./state");
import Utils = require("./utils");
import Api from "./api";


var api = new Api("http://localhost:1337/api");

State.on("scene:fetch", function(id: number) {
    State.get().set({status: "L O A D I N G"});
    
    api.fetch(`/scenes/${id}`, function(payload: any) {
        
        if (payload.error) {
            State.get().set({status: `[${payload.error}]`});
            return;
        }
        
        State.get()
            .set("scene", payload.data)
            .set("status", "L O A D E D");
    });
});

State.on("scene:set.heading", (text: string) =>{
    State.get().scene.set("heading", text);
});
