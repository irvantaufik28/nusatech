class WalletUsecase {
    constructor(walletRepo, currencyRepo) {
        this.walletRepo = walletRepo;
        this.currencyRepo = currencyRepo;
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
            isSuccess: true,
            statusCode: 200,
            data: null,
        }
        const wallet = await this.walletRepo.createWallet(walletData)

        const currencyValue = {
            id_wallet: wallet.id
        }
        const currency = await this.currencyRepo.createCurrency(currencyValue)

        const oldWallet = await this.walletRepo.getById(wallet.id)

        const walletValue = {
            id_currency: currency.id
        }
        await this.walletRepo.updateWallet(walletValue, oldWallet.id)

        const newWallet = await this.walletRepo.getById(oldWallet.id)

        result.data = newWallet;
        return result
    }
}

module.exports = WalletUsecase;