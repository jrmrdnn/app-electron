import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import dotenv from "rollup-plugin-dotenv";
import babel from "@rollup/plugin-babel";

const target = process.env.APP_DEV ? "development" : "production";

export default {
  input: "src/index.js",
  output: {
    file: "electron/renderer/app.js",
  },

  plugins: [
    resolve({
      extensions: [".js"],
      browser: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(target),
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    dotenv(),
    target === "production" && terser(),
  ],
};
