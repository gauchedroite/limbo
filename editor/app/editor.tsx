
import React = require("react");
import { Router, Route, Link, IndexRoute } from "react-router";
import Scene from "./components/scene";
import Actor from "./components/actor";
import Location from "./components/location";
import Tester from "./components/tester";
import State = require( "./state");
//import "./reactions";


export default class EditorApp extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <Route path="/" component={Root}>
                    <IndexRoute component={Actor} />
                    <Route path="tests" component={Tester} />
                    <Route path="actors" component={Actor} />
                    <Route path="locations" component={Location} />
                    <Route path="scenes" component={Scene} />
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
                        <li><Link to="/tests">Tester</Link></li>
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
