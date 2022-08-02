import service from "../index";
export function seemURL(url) {
  return service({
    method: "get",
    url: url,
  });
}
