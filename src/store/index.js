import { createStore } from "vuex";
import {
  getEmployees,
  addEmployees,
  deleteEmployees,
  updateEmployees,
} from "@/util/api/employee.js";
import { seemURL } from "@/util/api/echarts";
export default createStore({
  state: {
    sex_totals: {
      male_totals: "",
      man_totals: "",
    },
    salaryRate: {
      threeK: "",
      fourK: "",
      fiveK: "",
      sixK: "",
      eightK: "",
      tenK: "",
      firthK: "",
    },
    getPersonalSalaryTotal: {
      arr: [],
    },
  },
  getters: {},
  mutations: {
    getUserlist(state, values) {
      state.userlist = values;
    },
    addEmployee(state, values) {
      state.userlist.push(values);
    },
    deleteEmployee(state, values) {
      state.userlist = state.userlist.filter((item) => item.empID != values);
    },
    getSex(state, value) {
      localStorage.setItem("asyncgetSex", JSON.stringify(value));
      state.sex_totals.male_totals = value.male_total;
      state.sex_totals.man_totals = value.man_total;
    },
    getsalaryRate(state, value) {
      localStorage.setItem("asyncgetsalaryRate", JSON.stringify(value));
      state.salaryRate.threeK = value.threeK;
      state.salaryRate.fourK = value.fourK;
      state.salaryRate.fiveK = value.fiveK;
      state.salaryRate.sixK = value.sixK;
      state.salaryRate.eightK = value.eightK;
      state.salaryRate.tenK = value.tenK;
      state.salaryRate.firthK = value.firthK;
    },
    getpersonalSalarytotals(state, value) {
      localStorage.setItem("asyncTotalSalary", JSON.stringify(value));
      state.getPersonalSalaryTotal.arr = value;
    },
  },
  actions: {
    asyncUserlist(context) {
      const res = getEmployees("employee");
      res.then((res) => {
        context.commit("getUserlist", res.data);
      });
    },
    addperson(context, values) {
      console.log(values);
      const res = addEmployees("add", values);
      res.then((res) => {
        context.commit("addEmployee", res.data.person);
      });
    },
    deleteperson(context, values) {
      const res = deleteEmployees("delete", values);
      res.then((res) => {
        if (res.status == 200) {
          context.commit("deleteEmployee", values);
          // const res = getEmployees("employee");
          // res.then((res) => {
          //   context.commit("getUserlist", res.data);
          // });
        }
      });
    },
    updateEmployee(context, values) {
      const res = updateEmployees(
        "update",
        values.empID,
        values.employeePhone,
        values.employeeSalary,
        values.employeePosition
      );
      res.then((res) => {
        if (res.status == 200) {
          const res = getEmployees("employee");
          res.then((res) => {
            context.commit("getUserlist", res.data);
          });
        }
      });
    },
    asyncGetSex(context) {
      const res = seemURL("/map_image/1");
      res.then((res) => {
        context.commit("getSex", res.data);
      });
    },
    asyncgetsalaryRate(context) {
      const res = seemURL("/map_image/2");
      res.then((res) => {
        context.commit("getsalaryRate", res.data);
      });
    },
    asyncgetpersonalSalarytotals(context) {
      const res = seemURL("/map_image/3");
      res.then((res) => {
        context.commit("getpersonalSalarytotals", res.data);
      });
    },
  },

  modules: {},
});
