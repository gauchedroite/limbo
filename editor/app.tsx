/// <reference path="typings/tsd.d.ts" />

import React = require("react");
import ReactDom = require("react-dom");
import EditorApp from "./app/editor";


ReactDom.render(
    <EditorApp />,
    document.getElementById("id-wrapper")
);
