const CopyWebpackPlugin = require("copy-webpack-plugin");
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin")
const path = require("path");

// Generate pages object
const pagesObj = {};

const pages = ["index"];

pages.forEach((name) => {
  pagesObj[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`,
  };
});

console.log("pagesObj", pagesObj);

let plugins = [
  new CopyWebpackPlugin([
    {
      from: path.resolve("src/assets"),
      to: `${path.resolve("dist")}/assets`,
    },
  ]),
  new MonacoEditorWebpackPlugin()
];

const publicPath = process.env.NODE_ENV === "production" ? "/h5" : "/";

module.exports = {
  pages: pagesObj, //多入口
  lintOnSave: false,
  publicPath: publicPath,
  configureWebpack: {
    plugins: plugins,
  },
  devServer: {
    port: 8899, // 端口号
    disableHostCheck: true,
    // proxy: {
      // "/company/api/project/chitchatfileupload": {
      //   target: "https://tanzhiw.com/",
      //   changeOrigin: true,
      // },
      // https://tanzhiw.com/api/voiceparamsdetails/
      // "/api/voiceparamsdetails/": {
      //   target: "https://tanzhiw.com/",
      //   changeOrigin: true,
      // },
    // },
  },
};
