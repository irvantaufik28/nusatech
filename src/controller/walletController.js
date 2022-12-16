const resData = require("../helper/response");

module.exports = {
  getWalletById: async (req, res, next) => {
    try {
      const id = req.param.id;
      const id_user = req.user.id;
      let result = await req.walletUC.getWalletById(id_user, id);
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

  getAllWalletByUserId: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      let result = await req.walletUC.getAllWalletByUserId(id_user);
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

  createWallet: async (req, res, next) => {
    try {
      let dataWallet = {
        id_currency: req.body.id_currency,
        id_user: req.user.id,
        amount: req.body.amount
      }
      let result = await req.walletUC.createWallet(dataWallet);
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
