
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
    fu = () => { this.forceUpdate(); };
    
    constructor() {
        super();
        this.state = { html: "chaval" };
    }
    
    componentDidMount() {
        State.on("update", this.fu);
        State.trigger("scene:fetch", 0);
    }
    
    componentWillUnmount() {
        State.off("update", this.fu);
    }
    
    handleChange(evt: any) {
        this.setState({ html: evt.target.value });
    }
    
    render() {
        var state = State.get();
        return (
            <div>
                <h1>S C E N E is {state.status}</h1>
                <ContentEditable 
                    html = {this.state.html} 
                    disabled = {false} 
                    onChange = {this.handleChange.bind(this)} />
            </div>
        );
    }
}
