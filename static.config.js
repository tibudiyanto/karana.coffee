// Though this file is optional, there are SO MANY COOL THINGS you can do here.
// Read the docs at https://github.com/nozzle/react-static/blob/master/README.md to learn more!
export default {
  getSiteData: () => {
    return {
      title: "Karana Coffee",
      tahik: "kontol",
      formUrl: process.env.FORM_URL || "google.com"
    };
  }
};
