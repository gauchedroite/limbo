
import React = require("react");
import ContentEditable from "../components/react-contenteditable";
import State = require( "./state");
import "./reactions";

export class Actor extends React.Component<any, any> {
    render() {
        return (
            <h1>A C T O R</h1>
        );
    }
}

export class Location extends React.Component<any, any> {
    render() {
        return (
            <h1>L O C A T I O N</h1>
        );
    }
}

export class Scene extends React.Component<any, any> {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(evt: any) {
        State.trigger("scene:set.heading", evt.target.value);
    }
    
    shouldComponentUpdate(nextProps: any) {
        var heading = this.props.appState.scene;
        var heading2 = nextProps.appState.scene;
        return (heading != heading2);
    }
    
    render() {
        var app = this.props.appState;
        return (
            <div>
                <h1>S C E N E is { app.status }</h1>
                <ContentEditable 
                    html = { app.scene.heading || "" } 
                    disabled = { false } 
                    onChange = { this.handleChange } />
            </div>
        );
    }
}
