const { Verification } = require("../models");
const func = require("../libs/function");
const Op = require("sequelize").Op;

class VerificationRepo {
  constructor() {
    this.VerificationModel = Verification;
  }

  async generatePIN(email) {
    let pin_obj = {
      email: email,
      pin: func.generateRandomNumber(6),
      status: "PENDING",
    };
    await this.VerificationModel.create(pin_obj);

    return pin_obj;
  }

  async getVerificationByEmail(email) {
    let result = await this.VerificationModel.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
        status: {
          [Op.eq]: "REGISTERED",
        },
      },
    });
    return result;
  }

  async getVerificationPendingByEmail(email) {
    let result = await this.VerificationModel.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
        status: {
          [Op.eq]: "PENDING",
        },
      },
    });
    return result;
  }

  async updateVerification(data, id) {
    let result = await this.VerificationModel.update(data, {
      where: {
        id,
      },
    });
    return result;
  }
}

module.exports = VerificationRepo;
