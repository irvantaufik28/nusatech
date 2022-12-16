class WalletUsecase {
    constructor(walletRepo, userRepo) {
        this.walletRepo = walletRepo;
        this.userRepo = userRepo;
    }

    async getAllWalletByUserId(id_user) {
        let result = {
            isSuccess: true,
            statusCode: 200,
            reason: '',
            data: [],
        }

        const wallet = await this.walletRepo.getAll(id_user)
        result.data = wallet;
        return result;
    }

    async getWalletById(id_user, id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: '',
            data: null,
        }

        const wallet = await this.walletRepo.getbyId(id)
        if ( wallet === null ) {
            result.reason = 'wallet not found';
            return result;
        }
        if (wallet.id_user !== id_user ) {
            result.reason = 'wallet not found';
            return result;
        }

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = wallet;
        return result;
    }

    async createWallet(walletData) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: '',
            data: null,
        }
        const wallet = await this.createWallet(walletData)
    }
}

module.exports = WalletUsecase;