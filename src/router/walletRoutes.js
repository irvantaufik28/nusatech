const express = require('express')
const router = express.Router()
const authController = require('../controller/walletController')

router.get('/wallet', authController.getAllWalletByUserId)
router.get('/wallet/:id', authController.getWalletById)
router.post('/wallet', authController.createWallet)

module.exports = router;