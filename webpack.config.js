const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");// css تقليص حجم ملف 
//  index.js مدخل
module.exports = {
    entry: {
        app: './src/index.js'
    },
    // main.js مخرج
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: '',
        filename: "main.js"
    },
    mode: "development",// تطوير بيئة 

    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 1988,//رقم منفذ يتم اتصال فيه من خلال خادم المحلي
        writeToDisk: true,
        open: true,//automatique  يتم فتح صفحة 
    },

    module: {
        rules: [
            {
                test: /\.html$/,

                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        }
                    },
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',// css معالجة تنسيقات 
                    'sass-loader'//scss معالجة تنسيقات 
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif|jfif)$/,// images(file-loader)
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "images",
                        }
                    }
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,//fonts(file-loader)
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "fonts",
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                }
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",//  dist هذا ملف داخل مجلد 
            template: "./src/index.html",//  الني نريد نبنى عليه src ملف الاصلي داخل مجلد 

        }),
        new HtmlWebpackPlugin({
            filename: "product.html",
            template: "./src/product.html",

        }),
        new HtmlWebpackPlugin({
            filename: "checkout.html",
            template: "./src/checkout.html",

        }),
        new HtmlWebpackPlugin({
            filename: "payment.html",
            template: "./src/payment.html",

        }),

        new HtmlWebpackPlugin({
            filename: "search.html",
            template: "./src/search.html",

        }),

        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./src/contact.html",

        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new OptimizeCSSAssetsPlugin({}),
    ],
};

