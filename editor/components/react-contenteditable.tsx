import React = require("react");
import ReactDom = require("react-dom");

export default class ContentEditable extends React.Component<any, any> {
    lastHtml: string;
    
    constructor() {
        super();
        this.emitChange = this.emitChange.bind(this);
    }

    render() {
        return <div
                {...this.props}
                onInput = {this.emitChange}
                onBlur = {this.emitChange}
                contentEditable = {!this.props.disabled}
                dangerouslySetInnerHTML = {{ __html: this.props.html }} >
            </div>;
    }

    shouldComponentUpdate(nextProps: any) {
        return nextProps.html !== ReactDom.findDOMNode<HTMLElement>(this).innerHTML;
    }

    componentDidUpdate() {
        if (this.props.html !== ReactDom.findDOMNode<HTMLElement>(this).innerHTML) {
            ReactDom.findDOMNode<HTMLElement>(this).innerHTML = this.props.html;
        }
    }

    emitChange(evt: any) {
        var html = ReactDom.findDOMNode<HTMLElement>(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            evt.target = { value: html };
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    }
}
