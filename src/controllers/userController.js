const dbConfig = require('../config/dbConfig')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const { data, error } = await dbConfig
            .from('users')
            .insert([
                {
                    username,
                    email,
                    password: hashedPassword
                }
            ])
            .select('id, username, email')

        if (error) {
            return res.status(400).json({
                message: error.message
            })
        }

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                username: data[0].username,
                email: data[0].email
            }
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const { data, error } = await dbConfig
            .from('users')
            .select('id, username, email, created_at')
            .eq('id', id)
            .single()

        if (error || !data) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json({
            status: 'success',
            data
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { createUser, getUserById }