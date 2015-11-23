/// <reference path="typings/tsd.d.ts" />

import React = require("react");
import ReactDom = require("react-dom");
import Api from "./api";

class HelloProps {
    public name: string;
}

class Hello extends React.Component<HelloProps, any> {
    constructor(props: HelloProps) {
        super(props);
    }
    render() {
        return (
            <div>Hello {this.props.name}!</div>
        );
    }
}

function render() {
    ReactDom.render(
        <Hello name="World" />,
        document.getElementById("id-wrapper")
    );
}

render();
