const { User } = require("../models");

class AuthRepo {
  constructor() {
    this.UserModel = User;
  }

  async login(email) {
    const user = await this.UserModel.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async register(userData) {
    const user = await this.UserModel.create(userData);
    return user;
  }
}

module.exports = AuthRepo;
