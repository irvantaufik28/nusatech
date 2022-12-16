class EmailUsecase {
    constructor(emailRepo, userRepo, verificationRepo) {
        this.emailRepo = emailRepo;
        this.userRepo = userRepo;
        this.verificationRepo = verificationRepo;
    }

   static async sendEmail() {
        let users = await this.userRepo.getPendingUser()
        if (users !== null) {
            for (const user of users) {
                let userPin = await this.verificationRepo.generatePIN(user.email)
                await this.emailRepo.sendVerification(users.email, userPin.pin)
               let newStatus = {
                status: 'REGISTERED'
               }
               await this.verificationRepo(newStatus, userPin.id)
               await this.userRepo.update(newStatus, user.id)
            }
        }

        return
    }
}