/// <reference path="typings/tsd.d.ts" />

import $ = require("jquery");
import Api from "./api";


$(() => {
    
    var div = document.getElementById("id-wrapper");
    
    var api = new Api("http://localhost:1337/api");
    
    api.fetch("/chapters", function(text) {
        $(div).html(text);
    });

});
