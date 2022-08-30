import { createStore } from "vuex";
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
    serachID: "",
  },
  getters: {},
  mutations: {
    getSex(state, value) {
      state.sex_totals.male_totals = value.male_total;
      state.sex_totals.man_totals = value.man_total;
    },
    getsalaryRate(state, value) {
      state.salaryRate.threeK = value.threeK;
      state.salaryRate.fourK = value.fourK;
      state.salaryRate.fiveK = value.fiveK;
      state.salaryRate.sixK = value.sixK;
      state.salaryRate.eightK = value.eightK;
      state.salaryRate.tenK = value.tenK;
      state.salaryRate.firthK = value.firthK;
    },
    getpersonalSalarytotals(state, value) {
      state.getPersonalSalaryTotal.arr = value;
    },
  },
  actions: {
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
