
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


class Action extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var doWhen = (when: any) => {
            var key = 0;
            if (when) {
                return <div className="ed-when">when { when.map((item: string) => {
                    return <When key={key++} when={item} />;        
                }) }</div>
            }
        };
        var doAction = (action: any) => {
            if (action) {
                return <div className="ed-text">
                    {action.text}
                    {action.style ? <span>//{action.style}</span> : null}
                </div>
            }
        };
        return <div>
            {doWhen(node.when)}
            {doAction(node.action)}
        </div>;
    }
}

class Character extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var doMood = (mood: any) => {
            if (mood)
                return <span>//{mood}</span>
        };
        var doParenthetical = (parenthetical: any) => {
            if (parenthetical)
                return <span>({parenthetical})</span>
        };
        return <div>
            <div>{node.actor}{doMood(node.mood)}</div>
            <div>{doParenthetical(node.parenthetical)}</div>
        </div>;
    }
}

class DialogLine extends React.Component<any, any> {
    render() {
        var line = this.props.node;
        return <div>{line}</div>;
    }
}

class Dialog extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        return <div className="ed-dialog">
            <Character node={node.character} />
            <DialogLine node={node.line} />
        </div>;
    }
}

class Body extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var key = 0;
        return <div className="ed-body">
            { node.map((item: any) => {
                if (item.dialog)
                    return <Dialog key={key++} node={item.dialog} />;        
                if (item.random)
                    return <div key={key++}>RANDOM</div>;        
                if (item.question)
                    return <div key={key++}>QUESTION</div>;        
                return <Action key={key++} node={item} />;        
            }) }
        </div>
    }
}

class Then extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node)
            return <div className="ed-then">then&nbsp;
                <span>{node.character}</span>&nbsp;
                <span>{node.concept}</span>
            </div>;
    }
}

class Remember extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node)
            return <div className="ed-remember">remember&nbsp;
                <span>{node.key}</span>= 
                <span>{node.value}</span>
            </div>;
    }
}

class Timeout extends React.Component<any, any> {
    render() {
        var timeout = this.props.timeout; 
        if (timeout)
            return <div className="ed-timeout">timeout&nbsp;
                <span>{timeout}</span>
            </div>;
    }
}

class Extra extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        return <div className="ed-extra">
            <Then node={node.then} />
            <Remember node={node.remember} />
            <Timeout timeout={node.timeout} />
        </div>;
    }
}

class When extends React.Component<any, any> {
    render() {
        return <span><span>{this.props.when}</span>&nbsp;</span>;
    }
}

class Main extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        
        var location = node.location.text;
        var lockey = node.location.key;
        location = location + (lockey ? "/" + lockey : "");
        
        var key = 0;
        var when = node.when;
        
        return <div className="ed-main">
            <div className="ed-location">{location}</div>
            <div className="ed-when">when { when.map((item: string) => {
                return <When key={key++} when={item} />;        
            }) }</div>
        </div>;
    }
}

var Scene = (props: IProps) => {
    return <div className="scene-render">
        <Main node={scene.main} />
        <Extra node={scene.extra} />
        <Body node={scene.body} />
    </div>;
};

export default Scene;
