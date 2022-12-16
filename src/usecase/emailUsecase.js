class EmailUsecase {
  constructor(emailRepo, userRepo, verificationRepo) {
    this.emailRepo = emailRepo;
    this.userRepo = userRepo;
    this.verificationRepo = verificationRepo;
  }

  async verifyPinExpired () {
    let users = await this.userRepo.getRegistredUser();


    if (users !== null) {
      for (const user of users) {
        let verification = await this.verificationRepo.getVerificationByEmail(
          user.email
        );
        let createdDate = new Date (verification.createdAt)
        let minutesToAdd = 60
        let expiredAt = new Date(createdDate.getTime() + minutesToAdd * 60000)

        if (new Date().getTime() > expiredAt.getTime()) {
            await this.verificationRepo.updateVerification({status:"EXPIRED"}, verification.id);
            await this.userRepo.update({status: "PENDING"}, user.id)
        }
      }
    }
    return;
  }

  async sendEmail() {
    let users = await this.userRepo.getPendingUser();

    if (users !== null) {
      for (const user of users) {
        let pendingVerification =
          await this.verificationRepo.getVerificationPendingByEmail(user.email);
          if (pendingVerification === null) {
            return
          } else {
        await this.emailRepo.sendVerification(
          user.email,
          pendingVerification.pin
        );

        let newStatus = {
          status: "REGISTERED",
        };

        await this.verificationRepo.updateVerification(
          newStatus,
          pendingVerification.id
        );
        await this.userRepo.update(newStatus, user.id);
      }
    }
    }
    return;
  }
}

module.exports = EmailUsecase;
