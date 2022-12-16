const { User } = require("../models");

class UserRepo {
  constructor() {
    this.UserModel = User;
  }

  async getById(id) {
    const user = await this.UserModel.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async getByEmail(email) {
    const user = await this.UserModel.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async getAll() {
    const user = await this.UserModel.findAll();
    return user;
  }

  async getPendingUser() {
    const user = await this.UserModel.findAll({
      where: {
        status: "PENDING",
      },
    });
    return user;
  }

  async getRegistredUser() {
    const user = await this.UserModel.findAll({
      where: {
        status: "REGISTERED",
      },
    });
    return user;
  }

  async update(data, id) {
    const user = await this.UserModel.update(data, {
      where: {
        id,
      },
    });
    return user;
  }
}

module.exports = UserRepo;
