import * as path from "path"
import * as webpack from "webpack"
import * as MiniCssExtract from "mini-css-extract-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV === "prod" ? "production" : "development",
  entry: path.resolve(__dirname, "src/index.ts"),
  output: {
    path: path.resolve("dist"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtract(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtract.loader, "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
  },
}

export default config
