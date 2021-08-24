const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    publicPath: "dist",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    hot: true
  }
}
