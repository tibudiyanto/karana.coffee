const workbox = require("workbox-webpack-plugin");

// Though this file is optional, there are SO MANY COOL THINGS you can do here.
// Read the docs at https://github.com/nozzle/react-static/blob/master/README.md to learn more!
export default {
  getSiteData: () => {
    return {
      title: "Karana Coffee",
      formUrl: process.env.FORM_URL || "google.com"
    };
  },
  webpack: config => {
    config.plugins.push(new workbox.GenerateSW());
    return config;
  }
};
