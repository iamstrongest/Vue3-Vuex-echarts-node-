const express = require("express");
const secretKey = "strongest ^0^";
const jwt = require("jsonwebtoken");
// express-jwt 最新版本使用方式，用于解析生成的token
// 解码后的 JWT 有效负载现在可用作 req.auth 而不是 req.user
// 我们只是为了获取token，并不需要解析token，不配置这个中间件也行
var { expressjwt: expressJWT } = require("express-jwt");
express().use(expressJWT({ secret: secretKey, algorithms: ["HS256"] }));

const router = express.Router();

const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  port: "3306",
  // 连接数据库
  database: "hrmsystem",
});
// 员工查询操作
router.get("/employee", function (req, res) {
  db.query("SELECT * FROM employee", function (err, result) {
    console.log(result);
    const employees = result;
    if (err) return console.log(err.message);
    res.send(employees);
  });
});
// 登录操作
router.post("/login", function (req, res) {
  const tokenStr = jwt.sign({}, secretKey, {
    expiresIn: "10d",
  });
  db.query("SELECT * FROM register", function (err, result) {
    if (err) return console.log(err.message);
    if (result.some((item) => item.regID == req.body.userNumber)) {
      if (result.some((item) => item.regPassword == req.body.password)) {
        //发送token
        res.send({ status: 200, msg: "登录成功", token: `Bearer ${tokenStr}` });
      } else {
        res.send({ status: "error", msg: "密码错误" });
      }
    } else {
      res.send({ status: "error", msg: "账号不存在" });
    }
  });
});
// 添加操作
router.post("/add", function (req, res) {
  db.query(`SELECT empID FROM employee `, function (err, result) {
    if (err) return console.log(err.message);
    if (
      result.some((item) => {
        item.empID == req.body.empID;
      })
    ) {
      res.send({ msg: "员工ID已经被注册过了,请更换ID" });
    } else {
      const sql = `insert into employee set ?`;
      const loop = {
        empID: req.body.empID,
        employeeName: req.body.employeeName,
        employeePhone: req.body.employeePhone,
        employeeSex: req.body.employeeSex,
        employeeSalary: req.body.employeeSalary,
        employeePosition: req.body.employeePosition,
      };
      db.query(
        sql,
        [
          loop,
          loop.ID,
          loop.name,
          loop.phone,
          loop.sex,
          loop.salary,
          loop.position,
        ],
        function (err, result) {
          if (err) {
            return console.log(err.message);
          }
          if (result.affectedRows === 1) {
            res.send({
              person: req.body,
              status: 200,
              msg: "添加员工成功",
            });
          }
        }
      );
    }
  });
});
// 更新操作
router.post("/update", function (req, res) {
  db.query(`SELECT empID FROM employee `, function (err, result) {
    // if (err) return console.log(err.message);

    if (result.some((item) => item.empID == req.body.empID)) {
      const sql = "update employee set ? where empID=?";
      // const sql = `update employee set employeePhone=${req.body.employeePhone} and employeeSalary=${req.body.employeeSalary} and  employeePosition=${req.body.employeePosition} where empID=${req.body.empID}`;
      const updateData = {
        employeePhone: req.body.employeePhone,
        employeeSalary: req.body.employeeSalary,
        employeePosition: req.body.employeePosition,
      };
      // db.query(sql, function (err, result) {
      db.query(sql, [updateData, req.body.empID], function (err, result) {
        if (err) return console.log(err.message);
        if (result.affectedRows === 1) {
          res.send({ status: 200, msg: "更改员工成功" });
        }
      });
    } else {
      res.send({ msg: "员工ID不存在" });
    }
  });
});
// 删除员工
router.delete("/delete", function (req, res) {
  db.query(
    `SELECT empID FROM employee where empID= ${req.query.empID}`,
    function (err, result) {
      console.log(result);
      console.log(req.query.empID);
      console.log(result.length > 0);
      if (result.length > 0) {
        const sql = `delete from employee where empID=?`;
        db.query(sql, (empID = req.query.empID), function (err, result) {
          if (err) return console.log(err.message);
          if (result.affectedRows === 1) {
            console.log(1);
            res.send({ status: 200, msg: "删除员工成功" });
          }
        });
      } else {
        res.send({ msg: "员工ID不存在" });
      }
    }
  );
});
router.get("/map_image/1", function (req, res) {
  let arr = [];
  let p = new Promise(function (resolve, reject) {
    db.query(
      ` SELECT * FROM employee where  employeeSex="男"`,
      function (err, result) {
        arr.push(result.length);
        if (err) return console.log(err.message);
        resolve(arr);
      }
    );
  });
  p.then((result) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` SELECT * FROM employee where  employeeSex="女"`,
        function (err, result) {
          if (err) return console.log(err.message);
          arr.push(result.length);
          resolve(arr);
        }
      );
    });
  }).then(function (result) {
    res.send({ man_total: result[0], male_total: result[1] });
  });
});
router.get("/map_image/2", function (req, res) {
  let arr = [];
  let p = new Promise(function (resolve, reject) {
    db.query(
      ` SELECT * FROM employee where  employeeSalary>=3000 and employeeSalary<4000`,
      function (err, result) {
        arr.push(result.length);
        if (err) return console.log(err.message);
        resolve(arr);
      }
    );
  });
  p.then((result) => {
    return new Promise((resolve, reject) => {
      db.query(
        ` SELECT * FROM employee where  employeeSalary>=4000 and employeeSalary<5000`,
        function (err, result) {
          if (err) return console.log(err.message);
          arr.push(result.length);
          resolve(arr);
        }
      );
    });
  })
    .then((result) => {
      return new Promise((resolve, reject) => {
        db.query(
          ` SELECT * FROM employee where  employeeSalary>=5000 and employeeSalary<6000`,
          function (err, result) {
            if (err) return console.log(err.message);
            arr.push(result.length);
            resolve(arr);
          }
        );
      });
    })
    .then((result) => {
      return new Promise((resolve, reject) => {
        db.query(
          ` SELECT * FROM employee where  employeeSalary>=6000 and employeeSalary<8000`,
          function (err, result) {
            if (err) return console.log(err.message);
            arr.push(result.length);
            resolve(arr);
          }
        );
      });
    })
    .then((result) => {
      return new Promise((resolve, reject) => {
        db.query(
          ` SELECT * FROM employee where  employeeSalary>=8000 and employeeSalary<10000`,
          function (err, result) {
            if (err) return console.log(err.message);
            arr.push(result.length);
            resolve(arr);
          }
        );
      });
    })
    .then((result) => {
      return new Promise((resolve, reject) => {
        db.query(
          ` SELECT * FROM employee where  employeeSalary>=10000 and employeeSalary<15000`,
          function (err, result) {
            if (err) return console.log(err.message);
            arr.push(result.length);
            resolve(arr);
          }
        );
      });
    })
    .then((result) => {
      return new Promise((resolve, reject) => {
        db.query(
          ` SELECT * FROM employee where  employeeSalary>=15000`,
          function (err, result) {
            if (err) return console.log(err.message);
            arr.push(result.length);
            resolve(arr);
          }
        );
      });
    })
    .then(function (result) {
      console.log(result);
      res.send({
        threeK: result[0],
        fourK: result[1],
        fiveK: result[2],
        sixK: result[3],
        eightK: result[4],
        tenK: result[5],
        firthK: result[6],
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});
router.get("/map_image/3", function (req, res) {
  db.query(` SELECT * FROM personal_salary`, function (err, result) {
    if (err) return console.log(err.message);
    res.send(result);
  });
});
router.get("/userlist/:id", function (req, res) {
  console.log(req.params);
  db.query(
    ` SELECT * FROM epinfo where epID=${req.params.id}`,
    function (err, result) {
      if (err) return console.log(err.message);
      res.send(result[0]);
    }
  );
});
// db.query("SELECT * FROM employee", function (err, result) {
//   if (err) return console.log(err.message);
//   console.log(result);
// });
// db.query("SELECT * FROM register", function (err, result) {
//   if (err) return console.log(err.message);
//   console.log(result);
// });
module.exports = router;
