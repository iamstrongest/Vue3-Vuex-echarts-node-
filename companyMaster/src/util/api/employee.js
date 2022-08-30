import service from "../index";
// 登录
export function login(url, userNumber, password) {
  return service({
    method: "post",
    url: url,
    data: {
      userNumber,
      password,
    },
  });
}
// 获取员工表
export function getEmployees(url) {
  return service({
    method: "get",
    url: url,
  });
}

// 添加员工
export function addEmployees(url, values) {
  console.log(url, values);
  return service({
    method: "post",
    url: url,
    data: {
      empID: values.I,
      employeeName: values.N,
      employeePhone: values.P,
      employeeSex: values.S,
      employeeSalary: values.Sa,
      employeePosition: values.Po,
    },
  });
}
// 更新员工信息
export function updateEmployees(
  url,
  empID,
  employeePhone,
  employeeSalary,
  employeePosition
) {
  return service({
    method: "post",
    url: url,
    data: {
      empID,
      employeePhone,
      employeeSalary,
      employeePosition,
    },
  });
}
// 删除员工信息
export function deleteEmployees(url, empID) {
  return service({
    method: "delete",
    url: url,
    params: {
      empID,
    },
  });
}
// 员工个人信息
export function searchEmpInfo(url) {
  return service({
    method: "get",
    url: url,
  });
}
