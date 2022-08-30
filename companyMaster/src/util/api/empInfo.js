import service from "../index";
// 员工个人信息
export function searchEmpInfo(url) {
  return service({
    method: "get",
    url: url,
  });
}
