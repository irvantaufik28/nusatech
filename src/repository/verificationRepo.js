const { Verification } = require('../models');
const func = require("../libs/function");
const Op = require('sequelize').Op

class VerificationRepo {
    constructor() {
        this.VerificationModel = Verification;
    }

    async generatePIN(email) {
        let pin_obj = {
            email: email,
            pin: func.generateRandomNumber(6),
            status: 'PENDING'
        }
        let minutesToAdd = 60
        let currentDate = new Date()
        pin_obj.expired_at = new Date(currentDate.getTime() + minutesToAdd * 60000)

        await this.VerificationModel.create(pin_obj)

        return pin_obj
    }

    async getVerificationByEmail(email) {
        let pin = null
        pin = await this.VerificationModel.findOne({
            where: {
                email: {
                    [Op.eq]: email
                },
                expired_at: {
                    [Op.gt]: new Date()
                }
            }
        })
        if (pin === null) {
            return null
        }
        pin = pin.get()
        return pin
    }

    async getVerificationPendingByEmail(email) {
        let pin = null
        pin = await this.VerificationModel.findOne({
            where: {
                email: {
                    [Op.eq]: email
                },
                status: {
                    [Op.eq]: "PENDING"
                }
            }
        })
        if (pin === null) {
            return null
        }
        pin = pin.get()
        return pin
    }

    async updateVerification(data, id) {
        let result = await this.VerificationModel.update(data, {
            where : {
                id,
            }
        })
        return result
    }

}

module.exports = VerificationRepo;
