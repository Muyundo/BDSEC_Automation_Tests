const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6gphnc', 
  e2e: {
    pageLoadTimeout: 180000, 
    experimentalStudio: true,
    viewportWidth: 1280,  
    viewportHeight: 720,  
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
    //  config.env.CYPRESS_USERNAME = process.env.CYPRESS_USERNAME;
    //  config.env.CYPRESS_PASSWORD = process.env.CYPRESS_PASSWORD;

    //  return config;
    },
  },
  exit: false, 
});
