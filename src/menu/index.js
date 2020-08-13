import basicManage from "./basicManage.js";
import salary from "./salary.js";
import formula from "./formula.js"

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
let home = {
  name: "首页",
  path: "/",
  permissionsKey: "",
  icon: "fa fa-tachometer"
};

export default {
  home,
  basicManage,
  salary,
  formula
  //helpCenter
};