const filename = "template";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

function commonLoader(proportion) {
  return [
    // 提取css
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "px2rem-loader",
      options: {
        remUnit: proportion,
        remPrecision: 5, // px转rem小数点保留的位置
      },
    },
    // 将scss转变为css
    "sass-loader",
    // css兼容性
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          ident: "postcss",
          plugins: [require("postcss-preset-env")()],
        },
      },
    },
  ];
}

module.exports = {
  entry: {
    index: `./src/${filename}/index.js`,
  },

  module: {
    rules: [
      {
        test: /pc.scss$/,
        use: commonLoader(100),
      },
      {
        test: /mob.scss$/,
        use: commonLoader(200),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          //预设: 指示 babel 做怎样的兼容性处理
          presets: [
            //presets 这里是俩 中括号!!!!!!!!!!!!!!!!!!!!!!!!!!!
            [
              "@babel/preset-env",
              {
                // 按需加载
                useBuiltIns: "usage",
                // 指定 core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },

  devServer: {
    static: "./dist",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/${filename}/index.html`,
    }),

    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: `${filename}.built.css`,
    }),

    new CssMinimizerPlugin(),

    new StylelintPlugin({ fixed: true }),

    new ESLintPlugin({ fix: true }),
  ],

  output: {
    filename: `${filename}.built.js`,
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  // mode: "development",
  mode: "production",
};
