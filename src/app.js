require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const tokenManager = require("./helper/tokenManager");
const cron = require("node-cron");
const swaggerUi = require('swagger-ui-express');
const serverError = require("./middleware/serverError");

const userRepo = require("./repository/userRepo");
const authRepo = require("./repository/authRepo");
const walletRepo = require("./repository/walletRepo");
const currencyRepo = require("./repository/currrencyRepo");
const verificationRepo = require("./repository/verificationRepo");
const emailRepo = require("./repository/emailRepo");

const userUsecase = require("./usecase/userUsecase");
const authUsecase = require("./usecase/authuseCase");
const walletUsecase = require("./usecase/walletUsecase");
const emailUsecase = require("./usecase/emailUsecase");
const verificationUsecase = require("./usecase/verificationRepo");

const authRouter = require("./router/authRoutes");
const walletRouter = require("./router/walletRoutes");
const verificationRouter = require("./router/verificationRoutes");
const userRouter = require("./router/userRoutes")


const userUC = new userUsecase(new userRepo(), new verificationRepo(), new walletRepo(), bcrypt)
const authUC = new authUsecase(
  new authRepo(),
  new userRepo(),
  new verificationRepo(),
  bcrypt,
  tokenManager
);
const walletUC = new walletUsecase(new walletRepo(), new currencyRepo());
const emailUC = new emailUsecase(
  new emailRepo(),
  new userRepo(),
  new verificationRepo()
);
const verificationUC = new verificationUsecase(
  new verificationRepo(),
  new userRepo()
);


app.use((req, res, next) => {
  req.userUC = userUC;
  req.authUC = authUC;
  req.walletUC = walletUC;
  req.verificationUC = verificationUC;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/", walletRouter);
app.use("/", verificationRouter);
app.use("/", userRouter);

cron.schedule("*/" + "10 * * * * *", () => {
  emailUC.verifyPinExpired();
  emailUC.sendEmail();
  console.log("checking pending user...");
});

app.use(serverError);


const swaggerDocument = require('./docs/docs.json');

app.use(
  '/docs',
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);

module.exports = app;
