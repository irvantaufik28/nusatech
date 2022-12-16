class verificationUseCase {
  constructor(verificationRepo, userRepo) {
    this.verificationRepo = verificationRepo;
    this.userRepo = userRepo;
  }

  async accountVerification(verificationData) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: "",
      data: null,
    };

    const verification = await this.verificationRepo.getVerificationByEmail(
      verificationData.email
    );
    if (verification === null) {
      result.reason = "verification not found";
      return result;
    }

    if (verification.pin !== verificationData.pin) {
      result.reason = "invalid pin";
      result.statusCode = 400;
      return result;
    }
    let user = await this.userRepo.getByEmail(verificationData.email);

    const newStatus = {
      status: "VERIFIED",
    };

    await this.verificationRepo.updateVerification(newStatus, verification.id);
    await this.userRepo.update(newStatus, user.id);

    let newUser = await this.userRepo.getByEmail(verificationData.email);
    const userValue = {
      id: newUser.id,
      email: newUser.email,
      statis: newUser.status,
    };
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = userValue;
    return result;
  }

  async resendVerification(email) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: "",
      data: null,
    };

    const account = await this.userRepo.getByEmail(email);
    if (account === null) {
      result.reason = "account not found";
      return result;
    }

    await this.verificationRepo.generatePIN(email);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = verificationUseCase;
