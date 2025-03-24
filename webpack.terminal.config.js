const path = require('path');

module.exports = {
    entry: './src/terminal/index.ts',
    target: 'node',
    mode: "production",
    output: {
        filename: 'indexer.js',
        path: path.resolve(__dirname, 'dist/indexer'),
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
                loader: "ts-loader"
            },
        ],
    },
};