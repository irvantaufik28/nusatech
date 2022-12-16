class verificationUseCase {
    constructor(verificationRepo, userRepo) {
        this.verificationRepo = verificationRepo;
        this.userRepo = userRepo;
    }
    
    async accountVerification(VerificationData) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: '',
        }

        const verification = await this.verificationRepo.getVerificationByEmail(VerificationData.email);
        if (verification === null) {
            result.reason = 'verification not found';
            return result;
        }

        if (verification.pin !== VerificationData.pin) {
            result.reason = 'invalid pin';
            result.statusCode = 400;
            return result;
        }
        let user = await this.userRepo.getByEmail(verificationData.email);
       
        const newStatus = {
            status: 'VERIFIED'
        }

        await this.verificationRepo.updateVerification(newStatus, verification.id)
        await this.userRepo.update(newStatus, user.id)

        result.isSuccess = true;
        result.statusCode = 200;
        return result;
    }
}


module.exports = verificationUseCase;