const path = require("path")
const inputPath = path.resolve(__dirname, "./src/index.js")
const outputPathUmd = path.resolve(__dirname, "./dist/screendatavmin.js")
const outputPathejs = path.resolve(__dirname, "./dist/screendatavesmin.js")
const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const babel = require("@rollup/plugin-babel");
const json = require("@rollup/plugin-json");
const terser = require("@rollup/plugin-terser")
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

        }),
        json(),
        postcss({
            plugins: []
        }),
        terser(),
    ],
    external: [
        "vue",
        "echarts"
    ]
}