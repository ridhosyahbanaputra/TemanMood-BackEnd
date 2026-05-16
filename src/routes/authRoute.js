const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/authentications', authController.login)
router.put('/authentications', authController.refresh)
router.delete('/authentications', authController.logout)

module.exports = router