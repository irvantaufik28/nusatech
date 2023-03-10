const { Wallet } = require('../models')

class WalletRepo {
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

    async getAll(id_user) {
        const wallet = await this.WalletModel.findAll({
            where: {
                id_user
            }
        })
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

module.exports = WalletRepo;