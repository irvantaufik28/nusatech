const AuthUsecase = require('../../usecase/authUsecase')
const mockUser = require('../mock/user.mock')
const mockAuth = require('../mock/auth.mock')
const bcrypt = require('bcrypt')


let mockAuthReturn ,mockUserReturn = {}
let authUC = null;

describe('User test', ()=> {
    beforeEach(()=> {
        mockAuthReturn = {
            login: jest.fn().mockAuthReturnValue(mockAuth.user),
            register: jest.fn().mockAuthReturnValue(mockUser.user)
        }
        mockUserReturn = {
            getUserById: jest.fn().mockUserReturnValue(mockUser.user)
        }
        authUC = new AuthUsecase(mockAuthReturn, mockUserReturn, bcrypt)
    })

    describe('Login', ()=> {
        test("should isSuccess = true statusCode = 200, and type data is obj", async ()=>{
            
            let res = await authUC.login()

            expect(res.isSuccess).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            expect(res.data).toHaveProperty("id");;
            expect(res.data).toHaveProperty("email");
            expect(res.data).toHaveProperty("status");
        })
    })

})