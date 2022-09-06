const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const cookieParser = require('cookie-parser')

const app = express()

// connect database
connectDB()

// init middleware to work with json (body and response)
app.use(express.json({ extended: false }))

// enables to read cookie as js object
app.use(cookieParser())

// disable auto cache
app.disable('etag')

// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ConexãoQA - Express API com Swagger',
            version: '1.0.0',
            description:
                'Documentação das APIs do ConexaoQA. Aplicação desenvolvida para treinar testes E2E e APIs com Cypress.io',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? 'https://conexaoqa.herokuapp.com' : 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/api/auth.js', './routes/api/posts.js', './routes/api/profile.js', './routes/api/users.js']
}

const specs = swaggerJsdoc(options);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })  // enables search bar
)

// serve statics assets in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))