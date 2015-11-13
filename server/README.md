# limbo-server
Plain Express server for the static content in [public](../public).

Later on I'll use this server only for a database backed game API. I then might remove serving static content from here.

Requirements
---
You will need these tools installed globally
```
npm install -g gulp
npm install -g tsd
```

Installation
---
```
npm install
tsd reinstall -so
```

`tsd` will install all the required TypeScript definition files for the libraries in `typings`. 
It will also create `typings\tsd.d.ts` that can be included in TypeScript files.

