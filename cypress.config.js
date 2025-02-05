const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6gphnc',
  e2e: {
        pageLoadTimeout: 180000, 
        experimentalStudio: true,
        projectId: '6gphnc',
          
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  exit: false,

});
