
import React = require("react");
import ReactDom = require("react-dom");
import State from "./state";

/*
class HelloProps {
    public name: string;
}
export default class EditorApp extends React.Component<HelloProps, any> {
    constructor(props: HelloProps) {
        super(props);
    }
    render() {
        return (
            <div>Hello {this.props.name}!</div>
        );
    }
}
//import Api from "./api";
var api = new Api("http://localhost:1337/api");
api.fetch("/scenes/0", function(data: any) {
    render(data);
});
*/

var yellow = "Hello VOID";
var aaa = State();
console.log(aaa);

export default class EditorApp extends React.Component<any, any> {
    constructor() {
        super();
    }
    render() {
        return (
            <div>{yellow}</div>
        );
    }
}
