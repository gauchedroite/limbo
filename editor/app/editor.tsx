
import React = require("react");
import { Router, Route, Link, IndexRoute } from "react-router";
import SceneList from "./components/scene-list";
import ActorList from "./components/actor-list";
import LocationList from "./components/location-list";
import Scene from "./components/scene";
import State = require( "./state");
//import "./reactions";


export default class EditorApp extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <Route path="/" component={Root}>
                    <IndexRoute component={ActorList} />
                    <Route path="edit-scene" component={Scene} />
                    <Route path="actors" component={ActorList} />
                    <Route path="locations" component={LocationList} />
                    <Route path="scenes" component={SceneList} />
                </Route>
            </Router>
        );
    }
}

class Root extends React.Component<any, any> {
    constructor() {
        super();
        State.trigger("scene:fetch", 0);
    }
    render() {
        var state = State.get();
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/edit-scene">Scene</Link></li>
                        <li><Link to="/actors">Actors</Link></li>
                        <li><Link to="/locations">Locations</Link></li>
                        <li><Link to="/scenes">Scenes</Link></li>
                    </ul>
                </nav>
                { React.cloneElement(this.props.children, {appState: state}) }
            </div>
        );
    }
    
    componentDidMount() {
        State.on("update", () => {
            this.forceUpdate();
        });
    }
}
