require("dotenv").config();

const path = require("path");

const clc = require("cli-color");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRouter = require("./routes/user.router");
const jobRouter = require("./routes/job.router");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  process.stdout.write(clc.reset);
  console.log(clc.bgGreenBright.white(`Server running on ${PORT}`));
  connectDB();
});
