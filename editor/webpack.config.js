
var webpack = require("webpack");

console.log("Packaging for [" + process.env.NODE_ENV + "]");
console.log("----------------------------------");


var options = {
    cache: true,
    entry: {
        app: ["./app"],
        vendors: ["react", "react-dom"]
    },
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" },
            { test: /\.tsx$/, loader: "ts-loader" },
            { test: /\.less$/, loader: "style!css!less" }
        ]
    }
};


switch (process.env.NODE_ENV) {
    case "dev":
        break;
    case "prod":
        options.output.path = "./dist";
        options.devtool = undefined;
        options.plugins.push( new webpack.optimize.UglifyJsPlugin() );
        break;
    case "watch":
        break;
    case "hot":
        options.output.publicPath = "/build";
        options.entry.app = ["webpack/hot/dev-server", "./app"];
        break;
}


module.exports = options;
