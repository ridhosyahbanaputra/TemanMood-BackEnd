const jwt = require('jsonwebtoken')

const generateAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1h'
    })

const generateRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_KEY)

const verifyRefreshToken = (token) =>
    jwt.verify(token, process.env.REFRESH_TOKEN_KEY)

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken }