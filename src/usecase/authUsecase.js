class AuhtUsecase {
    constructor(authRepo, userRepo, bcrypt) {
        this.authRepo = authRepo;
        this.userRepo = userRepo;
        this.bcrypt = bcrypt;
    }
}

module.exports = AuhtUsecase;