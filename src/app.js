require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const tokenManager = require('./helper/tokenManager')


const userRepo = require('./repository/userRepo');
const authRepo = require('./repository/authRepo');

const userUsecase = require('./usecase/userUsecase');
const authUsecase = require('./usecase/authuseCase');

const authRouter = require('./router/authRoutes');

const userUC = new userUsecase(new userRepo())
const authUC = new authUsecase(new authRepo(), new userRepo(), bcrypt, tokenManager)

app.use((req, res, next)=> {
    req.userUC = userUC;
    req.authUC =  authUC;
    next()
})
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', authRouter)


module.exports = app;