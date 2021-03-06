const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: "production",
	entry: './src/index.ts',

	output: {
    filename: 'floodgate.min.js',
    path: path.resolve('./dist'),
    library: 'floodgate'
  },
  
	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
      }
		]
  },
  
	devServer: {
		open: true
  },
  
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
