class UseUsecase {
    constructor(userRepo, verificationRepo, bcrypt) {
        this.userRepo = userRepo;
        this.verificationRepo = verificationRepo;
        this.bcrypt = bcrypt;
    }
    
    async updateEmail(data, id) {
        let result = {
            isSuccess: false,
            reason: "",
            statusCode: 400,
            data: null,
          };

          const user = await this.userRepo.getById(id)
          if (!this.bcrypt.compareSync(data.password, user.password)) {
            result.reason = "incorect password";
            return result;
        }

        const updateValue = {
            email: data.newEmail,
            status: "PENDING"
        }

        await this.userRepo.update(updateValue, id)
        await this.verificationRepo.generatePIN(newEmail)

        result.isSuccess = true;
        result.statusCode = 200;
        return result;

    }
}

module.exports = UseUsecase;