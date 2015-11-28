
import React = require("react");
import ReactDom = require("react-dom");
import { Router, Route, Link } from "react-router";
import State = require( "./state");
import "./reactions";


export default class EditorApp extends React.Component<any, any> {
    constructor() {
        super();
    }
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
    componentDidMount() {
        State.on("update", () => {
            this.forceUpdate();
        });
    }
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/actors">Actors</Link></li>
                        <li><Link to="/locations">Locations</Link></li>
                        <li><Link to="/scenes">Scenes</Link></li>
                    </ul>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

class Actor extends React.Component<any, any> {
    render() {
        return (
            <div>A C T O R</div>
        );
    }
}

class Location extends React.Component<any, any> {
    render() {
        return (
            <div>L O C A T I O N</div>
        );
    }
}

class Scene extends React.Component<any, any> {
    fu = () => { this.forceUpdate(); };
    componentDidMount() {
        State.on("update", this.fu);
        State.trigger("scene:fetch", 0);
    }
    componentWillUnmount() {
        State.off("update", this.fu);
    }
    render() {
        var state = State.get();
        return (
            <div>
                <span>S C E N E</span>
                <div>De bonne humeur et {state.status}</div>
            </div>
        );
    }
}
