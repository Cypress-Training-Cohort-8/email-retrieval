const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    viewportHeight: 960,
    viewportWidth: 1530,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    watchForFileChanges: false,
    retries: {
      openMode: 1,
      runMode: 1,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
