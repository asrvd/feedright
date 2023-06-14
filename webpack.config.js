const path = require("path");

module.exports = {
  entry: "./src/components/Widget.tsx",
  output: {
    filename: "widget.js",
    path: path.resolve(__dirname, "dist"),
    library: "FeedbackWidget",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};
