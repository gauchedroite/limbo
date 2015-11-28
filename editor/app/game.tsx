
import React = require("react");
import State = require( "./state");
import "./reactions";


export class Actor extends React.Component<any, any> {
    render() {
        return (
            <div>A C T O R</div>
        );
    }
}

export class Location extends React.Component<any, any> {
    render() {
        return (
            <div>L O C A T I O N</div>
        );
    }
}

export class Scene extends React.Component<any, any> {
    fu = () => { this.forceUpdate(); };
    componentDidMount() {
        State.on("update", this.fu);
        //State.trigger("scene:fetch", 0);
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
