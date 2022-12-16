const resData = require("../helper/response");

module.exports = {
    accountVerification: async (req, res, next) => {

    try {
      let verificationData = {
        email: req.user.email,
        pin: req.body.pin
      }
      let result = await req.verificationUC.accountVerification(verificationData);
      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }
      res.status(result.statusCode).json(resData.success(result.data));
    } catch (e) {
      next(e);
    }
  },

  resendVerification: async (req, res, next) => {

    try {
      
      let email = req.user.email
      
      let result = await req.verificationUC.resendVerification(email);
      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }
      res.status(result.statusCode).json(resData.success(result.data));
    } catch (e) {
      next(e);
    }
  },
};