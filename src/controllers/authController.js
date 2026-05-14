const dbConfig = require('../config/dbConfig')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/tokenGenerator')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const { data: user } = await dbConfig
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({
                message: 'Wrong password'
            })
        }

        const token = generateToken({
            id: user.id,
            email: user.email
        })

        res.json({
            message: 'success',
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {login}