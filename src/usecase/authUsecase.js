class AuhtUsecase {
    constructor(authRepo, userRepo, bcrypt, tokenManager) {
        this.authRepo = authRepo;
        this.userRepo = userRepo;
        this.bcrypt = bcrypt;
        this.tokenManager = tokenManager;
    }

    async login(userData) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: '',
            data: null,
        }
        const user = await this.authRepo.login(userData.email);
        if (user == null) {
            result.reason = 'incorect email or password';
            return result;
        }
        
        if (!this.bcrypt.compareSync(userData.password, user.password)) {
            result.reason = "incorect email or password";
            return result;
        }
        const userValue = {
            id: user.id,
            email: user.email,
            token: null
        }
        let tokenManager = this.tokenManager.generateToken(userValue)
        userValue.token = tokenManager
        result.isSuccess = true;
        result.statusCode= 200;
        result.data = userValue;
        return result;
    }

    async register(userData) {
        let result = {
          isSuccess: false,
          reason: "",
          statusCode: 400,
          data: null,
          token: null,
        };
        
        if (userData.password !== userData.confirmPassword) {
          result.reason = "password and confirm password not match";
          return result;
        }
        let user = await this.userRepo.getByEmail(userData.email)
        if (user !== null) {
          result.reason = "username or email not aviable";
          return result;
        }

        userData.password = this.bcrypt.hashSync(userData.password, 10);
        let userRegister = await this.authRepo.register(userData)

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = userRegister
        return result;
      }
}

module.exports = AuhtUsecase;