const express = require('express')
const router = express.Router()
const verificationController = require('../controller/verificationController')
const { authorized } = require('../middleware/jwt')

router.post('/verification', authorized, verificationController.accountVerification)
router.post('/verification/resend', authorized, verificationController.resendVerification)
module.exports = router;