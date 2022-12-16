const resData = require("../helper/response");

module.exports = {
  login: async (req, res, next) => {

    try {
      let userData = {
        email: req.body.email,
        password: req.body.password
      }
      let result = await req.authUC.login(userData);
      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }
      res.status(result.statusCode).json(resData.success(result.data));
    } catch (e) {
      next(e);
    }
  },

  register: async (req, res, next) => {

    try {
      let userData = {
        email: req.body.email,
        status: "PENDING",
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      }
      let result = await req.authUC.register(userData);
      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }
      res.status(result.statusCode).json(resData.success(result.data));
    } catch (e) {
      next(e);
    }
  }
};