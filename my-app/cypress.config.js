import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
// const { defineConfig } = require("cypress");

// // eslint-disable-next-line no-undef
// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "http://localhost:3000",
//   },
// });
