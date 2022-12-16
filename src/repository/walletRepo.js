const { Wallet } = require('../models')

class UserRepo {
    constructor() {
        this.WalletModel = Wallet;
    }

    async getById(id) {
        const wallet = await this.WalletModel.findOne({
            where: {
                id
            }
        })
        return wallet
    }

    async getAll() {
        const wallet = await this.WalletModel.findAll()
        return wallet
    }

    async createWallet(data) {
        const wallet = await this.WalletModel.create(data)
        return wallet
    }

    async updateWallet(data, id) {
        const wallet = await this.WalletModel.update(data, {
            where : {
                id
            }
        })
        return wallet;
    }

}

module.exports = UserRepo;