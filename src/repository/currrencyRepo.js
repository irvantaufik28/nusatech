const { Currency } = require('../models')

class UserRepo {
    constructor() {
        this.CurrencyModel = Currency;
    }

    async getById(id) {
        const currency = await this.CurrencyModel.findOne({
            where: {
                id
            }
        })
        return currency
    }

    async getAll() {
        const currency = await this.CurrencyModel.findAll()
        return currency
    }

    async createCurrency(data) {
        const currency = await this.CurrencyModel.create(data)
        return currency
    }

    async updateCurrency(data, id) {
        const currency = await this.CurrencyModel.update(data, {
            where : {
                id
            }
        })
        return currency;
    }

}

module.exports = UserRepo;