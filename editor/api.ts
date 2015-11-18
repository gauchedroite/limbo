"use strict";

export default class Api {
    
    constructor(private root: string) {}
    
    fetch(command: string, callback: (message: string) => void) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var text = xhr.responseText;
                callback(text);
            }
        };
        xhr.open("GET", this.root + command, true)
        xhr.send();
    }
}
