
import React = require("react");
import State = require( "../state");
import { IProps, IState, IScene } from "../i-state";
import Scanner from "../dsl/scanner";
import Parser from "../dsl/parser";
import {script} from "../dsl/test-script";
import marked = require("marked");


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


var lastError: string = null;

var rawMarkup = (text: string) => {
    var raw = marked(text, {sanitize:true});
    return { __html: raw };
};

class Action extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var doAction = (action: any) => {
            if (action) {
                return <div 
                    className={"ed-text " + action.style}
                     dangerouslySetInnerHTML={rawMarkup(action.text)} >
                </div>;
            }
        };
        var doStyle = (style: any) => {
            if (style)
                return <span className="ed-style">style {style}</span>;
        };
        return <div className="ed-action">
            <When node={node.when} />
            {doAction(node.action)}
            {doStyle(node.action.style)}
        </div>;
    }
}

class Character extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node == undefined)
            return <Error error="Character not found"/>;
            
        var doMood = (mood: any) => {
            if (mood)
                return <span className="ed-mood">{mood}</span>;
        };
        var doParenthetical = (parenthetical: any) => {
            if (parenthetical)
                return <div className="ed-parenthetical">({parenthetical})</div>;
        };
        return <div className="ed-character">
            <div>{node.actor}{doMood(node.mood)}</div>
            {doParenthetical(node.parenthetical)}
        </div>;
    }
}

class DialogLine extends React.Component<any, any> {
    render() {
        var line = this.props.node;
        return <div className="ed-dialog-line">
            {line}
        </div>;
    }
}

class Dialog extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        return <div className="ed-dialog">
            <When node={node.when} />
            <Character node={node.dialog.character} />
            <DialogLine node={node.dialog.line} />
        </div>;
    }
}

class RandomLine extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        
        var doOdds = (odds: any) => {
            if (odds)
                return <div className="ed-odds">odds {odds}</div>;
        };

        return <div className="ed-random-line">
            <div>{node.line}</div>
            {doOdds(node.odds)}
            <Then node={node.then} />
            <Remember node={node.remember} />
        </div>;
    }
}

class Random extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var key = 0;
        return <div className="ed-random">
            <When node={node.when} />
            <Character node={node.random.character} />
            <div className="ed-random-lines">
            {
                node.random.lines.map((item: any) => {
                    return <RandomLine key={key++} node={item} />;
                })
            }
            </div>
        </div>;
    }
}

class ChoiceLine extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        
        var doDef = (def: any) => {
            if (def)
                return <div className="ed-def">default answer</div>;
        };

        return <div className="ed-choice-line">
            <div>{node.line}</div>
            {doDef(node.def)}
            <Then node={node.then} />
            <Remember node={node.remember} />
        </div>;
    }
}

class Ask extends React.Component<any, any> {
    render() {
        var ask = this.props.node;
        return <div className="ed-ask">
            {ask}
        </div>;
    }
}

class Question extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var question = node.question;
        if (question == undefined)
            return <Error error="Question undefined"/>
        if (question.ask == undefined)
            return <Error error="Ask undefined"/>
        if (question.choices == undefined)
            return <Error error="Choices undefined"/>
            
        var key = 0;
        return <div className="ed-question">
            <When node={node.when} />
            <Character node={question.character} />
            <Ask node={question.ask} />
            <div className="ed-choice-lines">
            {
                question.choices.map((item: any) => {
                    return <ChoiceLine key={key++} node={item} />;
                })
            }
            </div>    
        </div>;
    }
}

class Body extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var key = 0;
        return <div className="ed-body">
            {
                node.map((item: any) => {
                    if (item.dialog)
                        return <Dialog key={key++} node={item} />;        
                    if (item.random)
                        return <Random key={key++} node={item} />;        
                    if (item.question)
                        return <Question key={key++} node={item} />;        
                    return <Action key={key++} node={item} />;        
                }) 
            }
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
        return null;
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
        return null;
    }
}

class Timeout extends React.Component<any, any> {
    render() {
        var timeout = this.props.timeout;
        if (timeout)
            return <div className="ed-timeout">timeout&nbsp;
                <span>{timeout}</span>
            </div>;
        return null;
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
        var node = this.props.node;
        if (node == undefined)
            return null;
        
        var key = 0;
        return <div className="ed-when">when { node.map((item: string) => {
            return <span key={key++}>{item}&nbsp;</span>;
        }) }</div>;
    }
}

class Location extends React.Component<any, any> {
    render() {
        var location = this.props.node.text;
        var lockey = this.props.node.key;
        location = location + (lockey ? "/" + lockey : "");
        
        return <div className="ed-location">
            {location}
        </div>;
    }
}

class Main extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        
        var location = node.location;
        if (location == undefined)
            return <Error error="Location not found"/>;

        var when = node.when;
        if (when == undefined)
            return <Error error="When not found"/>;
        
        return <div className="ed-main">
            <Location node={location} />
            <When node={when} />
        </div>;
    }
}

class Error extends React.Component<any, any> {
    render() {
        var error = this.props.error;
        var showError = (error != lastError); 
        lastError = error;
        if (showError)
            return <div className="ed-error">{error}</div>
        return null;
    }
}

var Scene = (props: IProps) => {
    lastError = null;
    
    return <div className="scene-render">
        <Main node={scene.main} />
        <Extra node={scene.extra} />
        <Body node={scene.body} />
    </div>;
};

export default Scene;
