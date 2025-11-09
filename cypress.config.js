const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 960,
    viewportWidth: 1530,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
