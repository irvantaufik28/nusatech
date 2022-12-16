class EmailUsecase {
    constructor(emailRepo, userRepo, verificationRepo) {
        this.emailRepo = emailRepo;
        this.userRepo = userRepo;
        this.verificationRepo = verificationRepo;
    }

   async sendEmail() {
        let users = await this.userRepo.getPendingUser()

        if (users !== null) {
            for (const user of users) {
                
                let pendingVerification = await this.verificationRepo.getVerificationPendingByEmail(user.email)
                await this.emailRepo.sendVerification(user.email, pendingVerification.pin)
               
                let newStatus = {
                status: 'REGISTERED'
               }
               
               await this.verificationRepo.updateVerification(newStatus, pendingVerification.id)
               await this.userRepo.update(newStatus, user.id)
            }
        }
        return
    }
}

module.exports = EmailUsecase;