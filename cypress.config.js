const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6gphnc',  // Removed duplicate projectId
  e2e: {
    pageLoadTimeout: 180000, 
    experimentalStudio: true,
    viewportWidth: 1280,  
    viewportHeight: 720,  
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      // Use process.env for GitHub Actions and provide fallbacks
      config.env.CYPRESS_USERNAME = process.env.CYPRESS_USERNAME || "defaultUser";
      config.env.CYPRESS_PASSWORD = process.env.CYPRESS_PASSWORD || "defaultPass";

      return config;
    },
  },
  exit: false,  // This is not needed, Cypress exits by default
});
