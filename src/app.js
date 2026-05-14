const express = require('express')
const cors = require("cors");

const dbConfig = require('./config/dbConfig')

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')

const app = express()
app.use(cors());

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const { error } = await dbConfig
            .from('users')
            .select('id')
            .limit(1)

        if (error) {
            return res.status(500).json({
                status: 'failed',
                database: 'disconnected',
                error: error.message
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'TemanMood API is running',
            database: 'connected'
        })

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        })
    }
})

app.use('/auth', authRoute)
app.use('/users', userRoute)

module.exports = app