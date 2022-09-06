const mongoose = require('mongoose')
const keys = require('./keys')

const DB = keys.mongoURI

const connectDB = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Database connected')
    } catch(err) {
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB