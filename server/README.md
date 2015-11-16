# limbo - server
Plain Express server for the static content in [public](../public).

Later on I'll use this server only for a database backed game API. I then might remove serving static content from here.

Requirements
---
You need these tools installed globally as prerequisites:
```
npm install -g gulp
npm install -g tsd
```

If I were you I would also install `supervisor` so node automatically reload `server.js` on changes.

```
npm install -g supervisor
```

Installation
---
```
npm install
```

Note that `tsd reinstall -so` will also be run as part of `npm install`.`tsd` will install all the required TypeScript definition files for the libraries in `typings`. 
It will also create `typings\tsd.d.ts` that can be included in TypeScript files.

Running
---
```
npm run serve
```

This uses the aforementioned `supervisor`.
