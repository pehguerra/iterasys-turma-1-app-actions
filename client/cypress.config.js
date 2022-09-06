const { defineConfig } = require("cypress");
const mongoose = require('mongoose')

module.exports = defineConfig({
  e2e: {

    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      
      on('task', {

        dbCleanUp() {

          try {
            mongoose.connect(config.env.DB_URL, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false
            }, function() {
              mongoose.connection.db.dropDatabase()
            })
          } catch(err) {
            console.log(err)
          }

          return null
        }
      })
    },
  },
});
