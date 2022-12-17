const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { authorized } = require('../middleware/jwt')

router.put('/user/:id', authorized, userController.updateEmail)
router.get('/user/:id', authorized, userController.getUserById)
module.exports = router;