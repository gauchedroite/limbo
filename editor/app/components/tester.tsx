
import React = require("react");
import State = require( "../state");
import { IProps, IState, IScene } from "../i-state";
import Scanner from "../dsl/scanner";
import Parser from "../dsl/parser";
import {script} from "../dsl/test-script";


var scanner = new Scanner(script);
var parser = new Parser(scanner);
var scene = parser.parse();

// Stateless functional component. Has no lifecycle methods.
// Note: This type of component is not yet supported in TS 1.7.
// It works here because the parent (the router in my case) uses this component in an odd way.
// It doesn't work if I try to use it like usual (e.g. return <Tester/>;)
// var Tester = (props: IProps) => {
//     var style = {
//         fontFamily: "Courier New, Courier, monospace"
//     };
//     var key = 0;
//     return <div style={style}>{ lines.map((item: string) => {
//         return <ItemLine key={key++} item={item} />;        
//     }) }</div>;
// };
// class ItemLine extends React.Component<any, any> {
//     render() {
//         return <div>{this.props.item}</div>;
//     }
// }
//
//var lines = script.split("\n");


class When extends React.Component<any, any> {
    render() {
        return <span>{this.props.item}</span>;
    }
}

class Main extends React.Component<any, any> {
    render() {
        console.log(this.props);
        
        var location = this.props.main.location.text;
        var lockey = this.props.main.location.key;
        location = location + (lockey ? "/" + lockey : "");
        
        var key = 0;
        var when = this.props.main.when;
        
        return <div>
            <div className="ed-location">{location}</div>
            <div className="ed-when">when { when.map((item: string) => {
                return <When key={key++} item={item} />;        
            }) }</div>
        </div>;
    }
}

var Tester = (props: IProps) => {
    var style = {
        fontFamily: "Courier New, Courier, monospace"
    };
    return <div style={style}>
        <Main main={scene.main} />
    </div>;
};

export default Tester;
