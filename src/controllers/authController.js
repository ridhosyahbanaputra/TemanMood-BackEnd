const dbConfig = require('../config/dbConfig')
const bcrypt = require('bcrypt')

const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenGenerator')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const { data: user, error } = await dbConfig
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (error || !user) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid credentials'
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid credentials'
            })
        }

        const payload = {
            email: user.email,
            username: user.username
        }

        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)


        await dbConfig
            .from('authentications')
            .insert([{ token: refreshToken }])

        res.status(200).json({
            status: 'success',
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    username: user.username
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body

        const payload = verifyRefreshToken(refreshToken)

        const accessToken = generateAccessToken({
            id: payload.id
        })

        res.status(200).json({
            status: 'success',
            data: {
                accessToken
            }
        })

    } catch (error) {
        res.status(401).json({
            message: 'Invalid refresh token'
        })
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body

        await dbConfig
            .from('authentications')
            .delete()
            .eq('token', refreshToken)

        res.status(200).json({
            status: 'success'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { login, refresh, logout }