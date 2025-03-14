const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

const SRC_DIR = "./src/";

const include = [
    path.resolve(__dirname, SRC_DIR + 'server'),
];

const exclude = [
    path.resolve(__dirname, SRC_DIR + 'client')
]

module.exports = {
    entry: "./src/server/index.ts",
    target: "node", // support native modules
    devtool: "eval-source-map",
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include,
                exclude
            },
        ],
    },
    plugins: [new NodemonPlugin()],
    experiments: {
        topLevelAwait: true
    }
};
