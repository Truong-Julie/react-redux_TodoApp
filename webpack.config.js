module.exports = {
  entry: './client/main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  watch: true,
  devServer: {
    contentBase: './client',
    inline: true,
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};