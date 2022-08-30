const express = require("express");

const app = express();

// 解析axios发送的josn数据，axios发送的data，默认是josn格式，而node默认是urlencoded格式的
app.use(express.json());
// 配置跨越请求
const cors = require("cors");

app.use(cors());
// 解析表单
app.use(express.urlencoded({ extended: false }));

const router = require("./router.js");

app.use("/", router);

app.listen("80", function () {
  console.log("为您服务");
});
