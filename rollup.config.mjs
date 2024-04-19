import terser from "@rollup/plugin-terser";
export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      exports: "named",
    },
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      exports: "named",
    },
  ],
  plugins: [terser()],
  external: [
    "@kinde-oss/kinde-typescript-sdk",
    "@cloudflare/workers-types",
    "typescript",
    "@remix-run/cloudflare",
    "universal-cookie",
  ],
};
