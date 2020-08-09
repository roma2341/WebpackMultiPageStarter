
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import {Routing} from './routing';

const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist' );

const htmlEntries: {[key: string]: string} = {
  index: path.resolve(__dirname, `src/index.ts`)
};
const htmlPlugins: HTMLWebpackPlugin[] = [
    new HTMLWebpackPlugin({
        title: 'Index',
        filename: 'index.html',
        template: path.resolve(__dirname, `src/index.html`),
        chunks: ['index', 'common']
    })
    ];
Routing.pages.forEach((page) => {
    htmlPlugins.push(new HTMLWebpackPlugin({
        title: page.title,
        filename: `pages/${page.name}/${page.name}.html`,
        template: path.resolve(__dirname, `src/pages/${page.name}/${page.name}.html`),
        /*favicon: 'src/favicon.ico',*/
        hash: true,
        chunks: [page.name, 'commons']
    }));
    htmlEntries[page.name] = path.resolve(__dirname, `src/pages/${page.name}/${page.name}.ts`);
});

module.exports = {
    context: ROOT,
    entry: htmlEntries,
    output: {
        filename: '[name].js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    watch: true,
    plugins: [...htmlPlugins,
        new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, `src/assets/`), to: path.resolve(__dirname, `dist/assets/`) },
        ],
      }),],
    module: {
        rules: [
            /****************
            * PRE-LOADERS
            *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },

            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts$/,
                exclude: [ /node_modules/ ],
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader?url=false',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
              },
        ]
    },

    devtool: 'cheap-module-source-map',
    devServer: {}
};

