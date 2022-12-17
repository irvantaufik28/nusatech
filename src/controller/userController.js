const resData = require("../helper/response");

module.exports = {
  updateEmail: async (req, res, next) => {
    try {
      let id = req.user.id;
      let data = {
        password: req.body.password,
        newEmail: req.body.newEmail,
      };
      let result = await req.userUC.updateEmail(data, id);
      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }
      res.status(result.statusCode).json(resData.success(result.data));
    } catch (e) {
      next(e);
    }
  },
};
