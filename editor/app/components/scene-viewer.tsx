
import React = require("react");
import marked = require("marked");


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
            if (style == undefined) return null;
            if (style.err) return <Error error={style.err} />;
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
        if (node == undefined) return null;
        if (node.err) return <Error error={node.err} />;
            
        var doId = (id: any) => {
            return null;
            if (id)
                return <span className="ed-id">[{id}]</span>;
        };
        var doMood = (mood: any) => {
            if (mood)
                return <span className="ed-mood">{mood}</span>;
        };
        var doParenthetical = (parenthetical: any) => {
            if (parenthetical)
                return <div className="ed-parenthetical">({parenthetical})</div>;
        };
        return <div className="ed-character">
            <div>{doId(node.id)}{node.actor}{doMood(node.mood)}</div>
            {doParenthetical(node.parenthetical)}
        </div>;
    }
}

class DialogLine extends React.Component<any, any> {
    render() {
        var line = this.props.node;
        if (line == undefined) return null;
        if (line.err)  return <Error error={line.err} />;
        return <div className="ed-dialog-line">
            {line}
        </div>;
    }
}

class Dialog extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node.err) return <Error error={node.err} />;
        if (node.dialog.err) return <Error error={node.dialog.err} />;
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
            if (odds == undefined) return null;
            if (odds.err) return <Error error={odds.err} />;
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
        if (node.err) return <Error error={node.err} />;
        if (node.random.err) return <Error error={node.random.err} />;
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
        if (ask.err) return <Error error={ask.err}/>;
        return <div className="ed-ask">
            {ask}
        </div>;
    }
}

class Question extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var question = node.question;
        if (node.err) return <Error error={node.err}/> 
        
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
        if (node == undefined) return null;
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
        if (node == undefined) return null;
        if (node.err) return <Error error={node.err} />;

        return <div className="ed-then">then&nbsp;
            <span>{node.character}</span>&nbsp;
            <span>{node.concept}</span>
        </div>;
    }
}

class Remember extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node == undefined) return null;
        if (node.err) return <Error error={node.err} />;
        
        return <div className="ed-remember">remember&nbsp;
            <span>{node.key}</span>= 
            <span>{node.value}</span>
        </div>;
    }
}

class Timeout extends React.Component<any, any> {
    render() {
        var timeout = this.props.timeout;
        if (timeout == undefined) return null;
        if (timeout.err) return <Error error={timeout.err} />;

        return <div className="ed-timeout">timeout&nbsp;
            <span>{timeout}</span>
        </div>;
    }
}

class Extra extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node == undefined) return null;
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
        if (node == undefined) return null;
        if (node.err) return <Error error={node.err} />;
            
        var key = 0;
        return <div className="ed-when">when { node.map((item: string) => {
            return <span key={key++}>{item}&nbsp;</span>;
        }) }</div>;
    }
}

class Location extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        if (node.err) return <Error error={node.err} />;
            
        var location = node.text;
        var lockey = node.key;
        location = location + (lockey ? "/" + lockey : "");
        
        var doId = (id: any) => {
            return null;
            if (id)
                return <span className="ed-id">[{id}]</span>;
        };
        
        return <div className="ed-location">
            {doId(node.id)}
            {location}
        </div>;
    }
}

class Main extends React.Component<any, any> {
    render() {
        var node = this.props.node;
        var location = node.location;
        var when = node.when;
        
        return <div className="ed-main">
            <Location node={location} />
            <When node={when} />
        </div>;
    }
}

class Error extends React.Component<any, any> {
    render() {
        var error = this.props.error;
        return <div className="ed-error">{error}</div>
    }
}

class SceneViewer extends React.Component<any, any> {
    render() {
        return <div className="scene-viewer">
            <Main node={this.props.scene.main} />
            <Extra node={this.props.scene.extra} />
            <Body node={this.props.scene.body} />
        </div>;
    }
};

export default SceneViewer;
