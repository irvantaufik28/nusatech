class UseUsecase {
  constructor(userRepo, verificationRepo, walletRepo, bcrypt) {
    this.userRepo = userRepo;
    this.verificationRepo = verificationRepo;
    this.walletRepo = walletRepo;
    this.bcrypt = bcrypt;
  }

  async updateEmail(data, id) {
    let result = {
      isSuccess: false,
      reason: "",
      statusCode: 400,
      data: null,
    };

    const user = await this.userRepo.getById(id);
    if (!this.bcrypt.compareSync(data.password, user.password)) {
      result.reason = "incorect password";
      return result;
    }

    const updateValue = {
      email: data.newEmail,
      status: "PENDING",
    };

    await this.userRepo.update(updateValue, id);
    await this.verificationRepo.generatePIN(data.newEmail);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }

  async getUserById(id) {
    let result = {
      isSuccess: false,
      reason: "",
      statusCode: 404,
      data: null,
    };

    const user = await this.userRepo.getById(id);
    if (user === null) {
      result.reason = "user not found";
      return result;
    }

    const wallet = await this.walletRepo.getAll(id);
    const getAmount = wallet.map((v) => v.amount);
    let totalAmount = 0;
    for (const total of getAmount) {
      totalAmount += total;
    }

    const userValue = {
      id: user.id,
      email: user.email,
      status: user.status,
      totalAmount: totalAmount,
      wallet: wallet,
    };
    result.isSuccess = true;
    result.data = userValue;
    result.statusCode = 200;
    return result;
  }
}

module.exports = UseUsecase;
