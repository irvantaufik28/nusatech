const express = require('express')
const router = express.Router()
const authController = require('../controller/walletController')
const { authorized } = require('../middleware/jwt')

router.get('/wallet', authorized, authController.getAllWalletByUserId)
router.get('/wallet/:id', authorized, authController.getWalletById)
router.post('/wallet',authorized, authController.createWallet)

module.exports = router;