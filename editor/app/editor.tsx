
import React = require("react");
import ReactDom = require("react-dom");
import State = require( "./state");
import "./reactions";


State.trigger("scene:fetch", 0);

export default class EditorApp extends React.Component<any, any> {
    constructor() {
        super();
    }
    componentDidMount() {
        State.on("update", () => {
            this.forceUpdate();
        });
    }
    render() {
        var state = State.get();
        return (
            <div>De bonne humeur et {state.status}</div>
        );
    }
}
