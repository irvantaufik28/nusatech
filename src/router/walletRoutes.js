const express = require('express')
const router = express.Router()
const walletController = require('../controller/walletController')
const { authorized } = require('../middleware/jwt')

router.get('/wallet', authorized, walletController.getAllWalletByUserId)
router.get('/wallet/:id', authorized, walletController.getWalletById)
router.post('/wallet',authorized, walletController.createWallet)

module.exports = router;