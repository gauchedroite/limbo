
import React = require("react");
import ContentEditable from "../components/react-contenteditable";
import State = require( "./state");
import { IProps, IState, IScene } from "./i-state";
import "./reactions";


export class Actor extends React.Component<IProps, any> {
    render() {
        return (
            <h1>A C T O R</h1>
        );
    }
}

export class Location extends React.Component<IProps, any> {
    render() {
        return (
            <h1>L O C A T I O N</h1>
        );
    }
}

export class Scene extends React.Component<IProps, any> {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(evt: any) {
        State.trigger("scene:set.heading", evt.target.value);
    }
    
    shouldComponentUpdate(nextProps: IProps) {
        return (this.props.appState.scene != nextProps.appState.scene);
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
