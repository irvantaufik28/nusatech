require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const tokenManager = require('./helper/tokenManager')

const userRepo = require('./repository/userRepo');
const authRepo = require('./repository/authRepo');

const userUsecase = require('./usecase/userUsecase');
const authUsecase = require('./usecase/authuseCase')

const userUC = new userUsecase(new userRepo())
const atuhUC = new authUsecase(new authRepo(), new userRepo(), bcrypt, tokenManager)

app.use(express.json());

app.use('/', (req, res)=> {
    res.json('hello nusatech');
})

module.exports = app;