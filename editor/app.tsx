/// <reference path="typings/tsd.d.ts" />

import React = require("react");
import ReactDom = require("react-dom");
import EditorApp from "./app/editor";

declare function require(name: string): any;
require("./css/app.less");


ReactDom.render(
    <EditorApp />,
    document.getElementById("id-wrapper")
);
