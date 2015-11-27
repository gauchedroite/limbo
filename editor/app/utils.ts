
var Utils = {
    store(namespace: string, data?: any) {
        if (data)
            return localStorage.setItem(namespace, JSON.stringify(data));
        
        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || false;
    }
};

export = Utils;
