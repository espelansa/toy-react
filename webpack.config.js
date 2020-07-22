const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'development',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 把es高阶写法转换成低阶写法
            plugins: [[ // plugins的每一个元素传入一个数组，第一个是plugin的名字，第二个是它的参数
              "@babel/plugin-transform-react-jsx", // 处理jsx语法
              { pragma: "ToyReact.createElement" } // 默认是React.createElement
            ]]
          }
        }
      }
    ]
  }
};