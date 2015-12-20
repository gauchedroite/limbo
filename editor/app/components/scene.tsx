
import React = require("react");
import State = require( "../state");
import { IProps, IState, IScene } from "../i-state";
import Scanner from "../dsl/scanner";
import Parser from "../dsl/parser";
import {script} from "../dsl/test-script";
import SceneViewer from "./scene-viewer";
import SceneEditor from "./scene-editor";


var stripHtml = (html: string) => {
    var text = html
        .replace(/\<div\>/g, "\n")
        .replace(/<.*?>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        + "\n";
    return text;
};

var wrapHtml = (text: string) => {
    var lines = text.split("\n");
    var lines2 = new Array<string>();
    for (var ix = 0;  ix < lines.length; ix++) {
        var line = lines[ix];
        if (line == "") line = "<br>";
        lines2.push(`<div>${line}</div>`);
    }
    return lines2.join("");
};

var parseHtmlScript = (html: string) => {
    var script = stripHtml(html);
    var scanner = new Scanner(script);
    var parser = new Parser(scanner);
    return parser.parse();
};


var scriptHtml = wrapHtml(script);
var scene = parseHtmlScript(script);

class Scene extends React.Component<any, any> {

    onChange = (html: string) => {
        scene = parseHtmlScript(html);
        scriptHtml = html;
        this.forceUpdate();
    };
    
    render() {
        return <div className="scene">
            <div className="scene-editor-wrapper">
                <SceneEditor script={scriptHtml} onChange={this.onChange} />
            </div>
            <div className="scene-viewer-wrapper">
                <SceneViewer scene={scene} />
            </div>
        </div>;
    }
}

export default Scene;
