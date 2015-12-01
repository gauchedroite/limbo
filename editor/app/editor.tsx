
import React = require("react");
import Scene from "./components/scene";
import Actor from "./components/actor";
import Location from "./components/location";
import State = require( "./state");
import "./reactions";

export default class Root extends React.Component<any, any> {
    route: string;
    
    constructor() {
        super();
        State.trigger("scene:fetch", 0);
    }
    
    render() {
        var state = State.get();
        let Child: any;
        switch (this.route) {
            case "/actors": Child = Actor; break;
            case "/locations": Child = Location; break;
            case "/scenes": Child = Scene; break;
            default: Child = Actor;
        }
        return (
            <div>
                <nav>
                    <ul>
                        <li><a href="#/actors">Actors</a></li>
                        <li><a href="#/locations">Locations</a></li>
                        <li><a href="#/scenes">Scenes</a></li>
                    </ul>
                </nav>
                <Child appState={state} />
            </div>
        );
    }
    
    componentDidMount() {
        State.on("update", () => {
            this.forceUpdate();
        });
        
        window.addEventListener("hashchange", () => {
            this.route = window.location.hash.substr(1);
            this.forceUpdate();
        });
    }
}
