import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {loader: "ts-loader"},
        ],
      },
    ],
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};

export default config;

