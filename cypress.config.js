const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
        pageLoadTimeout: 120000, // Increase timeout to 2 minutes
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
