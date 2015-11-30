
import React = require("react");
import Suggester from "./suggester";
import State = require( "../state");
import { IProps, IState, IScene } from "../i-state";


export default class Scene extends React.Component<IProps, any> {
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
                <h1>S C E N E IS { app.status }</h1>
                <Suggester 
                    html = { app.scene.heading || "" } 
                    disabled = { false } 
                    onChange = { this.handleChange } />
            </div>
        );
    }
}
