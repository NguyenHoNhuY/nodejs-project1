const express = require("express"); //todo import thư viện express
const methodOverride = require("method-override");
const customerRouter = require("./routers/customer");
const indexRouter = require("./routers/index");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const connectFuntion = async () => {
  try {
    await mongoose.connect(process.env.STR_CONNECT); //todo kết nối vs database bai1
    console.log("Connected Successfully");
  } catch (error) {
    console.log(error); //todo in ra lỗi khi gặp lỗi
    console.log("Connected Failed");
  }
};
connectFuntion();

app.use(methodOverride("_method"));
app.set("view engine", "ejs"); //todo khởi tạo thư viện ejs giúp render trả về html
app.use(express.urlencoded({ extended: false })); //todo giúp lấy được dữ liệu khi POST
app.use("/customer", customerRouter);
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000); //todo  set port cho app
