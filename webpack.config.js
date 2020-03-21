module.exports = {
    entry: __dirname + '/client/index.js',
    output: {
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    devServer: {
        publicPath: '/dist/',
        port: 8080,
        proxy: {
            target: 'http://localhost:3333',
            context: ['/ms', '/mr'],
        },
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                },
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ],
    },
}