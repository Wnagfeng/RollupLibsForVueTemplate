const path = require("path")
const inputPath = path.resolve(__dirname, "./src/index.js")
const outputPathUmd = path.resolve(__dirname, "./dist/screendatav.js")
const outputPathejs = path.resolve(__dirname, "./dist/screendataves.js")
const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const babel = require("@rollup/plugin-babel");
const json = require("@rollup/plugin-json");
const vue = require("rollup-plugin-vue")
const postcss = require("rollup-plugin-postcss")
module.exports = {
    input: inputPath,
    output: [
        {
            file: outputPathUmd,
            format: "umd",
            name: "screenDatav",
            globals: {
                vue: "vue"
            }
        },
        {
            file: outputPathejs,
            format: "es",
            name: "screenDatav",
            globals: {
                vue: "vue"
            }
        },

    ],
    plugins: [
        vue(),
        resolve(),
        commonjs(),
        babel({
            exclude: "node_modules/**",
            // plugins: [
            //     [
            //         "@babel/plugin-transform-runtime",
            //         {
            //             "absoluteRuntime": true,
            //             // "corejs": false,
            //             // "helpers": true,
            //             // "regenerator": true,
            //             // "version": "7.0.0-beta.0"
            //         }
            //     ]
            // ]
        }),
        json(),
        postcss({
            plugins: []
        })

    ],
    external: [
        "vue",
        "echarts"
    ]
}