const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './main.jsx',

  // 결과물(번들)을 반환하는 설정
  output: {
    clean: true,
    publicPath: 'auto'
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './components/Header.jsx',
        './Nav': './components/Nav.jsx',
        './Main': './components/Main.jsx',
      }
    })
  ],
  
  // 개발 서버 옵션
  devServer: {
    port: 3001
  }
}
