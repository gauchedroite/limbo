# limbo - editor
The game editor/manager!

Requirements
---
You will need these tools installed globally
```
npm install -g tsd
npm install -g webpack
```

For some reason under Windows `webpack` needs to be installed twice to get over the errors produced the first time around. 
I'm sure there's a foot long explanation for that but, whatever...

Installation
---
```
npm install
```

Development
---

There are few ways to start a development workflow around webpack - see `package.json`: 

- `npm run dev` creates the packages in `./build`, and that's it. 

- `npm run watch` creates the packages in `./build` and watches for any change in the sources to rebuild the packages.

When you want to target prod:

- `npm run prod` creates the packages in `./dist`, and that's it.

In these cases you will need use some web server to serve up the static content. There's one in the [server](../server) project but any one will do.

Lastly there's also `npm run hot`.
This creates the packages, watches for any change in the sources, rebuild the packages and reload the web page automatically.
Use `http://localhost:8080` for this.
