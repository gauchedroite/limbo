"use strict";

export default class Api {
    
    constructor(private root: string) {}
    
    fetch(command: string, callback: (obj: any) => void) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var text = xhr.responseText;
                    var obj = JSON.parse(text);
                    console.log(obj);
                    callback(obj);
                }
                else if (xhr.status == 404) {
                    var text = xhr.responseText;
                    var obj = JSON.parse(text);
                    console.log(obj);
                    callback(obj);
                }
            }
        };
        
        xhr.open("GET", this.root + command, true)
        xhr.send();
    }
}
