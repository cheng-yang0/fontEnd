const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const {DefinePlugin} = require('webpack')
module.exports = {
    mode:'development',
    devtool: "inline-source-map",
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:resolve(__dirname,'dist'),
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:['vue-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.css/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            // {
            //     test:/\.less/,
            //     use:[
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'less-loader',
            //     ],
            //     exclude:/node_modules/
            // }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin()
        // new DefinePlugin({
        //     XIXI:JSON.stringify('haha')
        // })
    ],
    resolve:{
        modules:[
            resolve('./node_modules/'),
        ],
    },
    devServer: {
        //使得ip可以访问webpack
        host:'0.0.0.0',
        
        compress:true,
        port:2000,
        open:true,
        // proxy:{
        //     '*':{
        //         target:'http://172.20.0.141',
        //         secure:false,
        //         bypass:(req)=>{
 
        //         }
        //     }
        // }
    },
}