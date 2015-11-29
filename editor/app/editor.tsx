
import React = require("react");
import { Router, Route, Link } from "react-router";
import { Actor, Location, Scene } from "./game";
import State = require( "./state");


export default class EditorApp extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <Route path="/" component={Root}>
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
