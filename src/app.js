require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const tokenManager = require('./helper/tokenManager')
const serverError = require('./middleware/serverError')


const userRepo = require('./repository/userRepo');
const authRepo = require('./repository/authRepo');
const walletRepo = require('./repository/walletRepo');
const currencyRepo = require('./repository/currrencyRepo')

const userUsecase = require('./usecase/userUsecase');
const authUsecase = require('./usecase/authuseCase');
const walletUsecase = require('./usecase/walletUsecase')

const authRouter = require('./router/authRoutes');
const walletRouter = require('./router/walletRoutes');

const userUC = new userUsecase(new userRepo())
const authUC = new authUsecase(new authRepo(), new userRepo(), bcrypt, tokenManager)
const walletUC = new walletUsecase(new walletRepo(), new currencyRepo())

app.use((req, res, next)=> {
    req.userUC = userUC;
    req.authUC =  authUC;
    req.walletUC = walletUC;
    next()
})
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', authRouter)
app.use('/', walletRouter)

app.use(serverError);



module.exports = app;