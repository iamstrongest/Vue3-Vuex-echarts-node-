<script>
import * as echarts from "echarts";
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const data = {
      obj1: JSON.parse(localStorage.getItem("asyncgetSex")),
      obj2: JSON.parse(localStorage.getItem("asyncgetsalaryRate")),
      arr: JSON.parse(localStorage.getItem("asyncTotalSalary")),
    };
    onMounted(() => {
      console.log(store.state.sex_totals.man_totals);
      // 绘制图表
      var myChart1 = echarts.init(document.querySelector("#left-main"));
      myChart1.setOption({
        title: {
          text: "公司男女性别比",
          subtext: "加油一起干,都是好伙伴",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "男女性别比例",
            type: "pie",
            radius: "50%",
            data: [
              {
                value: `${store.state.sex_totals.man_totals}`,
                name: "男",
              },
              {
                value: `${store.state.sex_totals.male_totals}`,
                name: "女",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      const arrSalaryRate = [];
      const axisX = [
        ">=3k&&<4k",
        ">=4k&&<5k",
        ">=5k&&<6k",
        ">=6k&&<8k",
        ">=8k&&<10k",
        ">=10k&&<15k",
        ">=15k",
      ];
      // 遍历store.state.salaryRate值，储存到arrSalaryRate数组中
      Object.values(store.state.salaryRate).forEach((value, index) => {
        arrSalaryRate[index] = value;
      });
      var myChart2 = echarts.init(document.querySelector("#center-main"));
      myChart2.setOption({
        title: {
          text: "员工工资占比",
          subtext: "努力工作,加油升资",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: axisX,
        },
        series: [
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 140],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: [
              {
                value: arrSalaryRate[0],

                name: ">=3k&&<4k",
              },
              {
                value: arrSalaryRate[1],

                name: ">=4k&&<5k",
              },
              {
                value: arrSalaryRate[2],

                name: ">=5k&&<6k",
              },
              {
                value: arrSalaryRate[3],
                name: ">=6k&&<8k",
              },
              {
                value: arrSalaryRate[4],
                name: ">=8k&&<10k",
              },
              {
                value: arrSalaryRate[5],
                name: ">=10k&&<15k",
              },
              {
                value: arrSalaryRate[6],
                name: ">=15k",
              },
            ],
          },
        ],
      });
      var months = [];
      // 存储每个月的工资
      data.arr.forEach((item, index) => {
        months[index] = [
          `${item.Jan}`,
          `${item.Feb}`,
          `${item.Mar}`,
          `${item.Apr}`,
          `${item.May}`,
          `${item.Jun}`,
          `${item.Jul}`,
          `${item.Aug}`,
          `${item.Sep}`,
          `${item.Oct}`,
          `${item.Nov}`,
          `${item.Dec}`,
        ];
      });
      var myChart3 = echarts.init(document.querySelector("#right-main"));
      myChart3.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            `${data.arr[0].employeeName}`,
            `${data.arr[1].employeeName}`,
            `${data.arr[2].employeeName}`,
            `${data.arr[3].employeeName}`,
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: `${data.arr[0].employeeName}`,
            type: "line",
            data: months[0],
          },
          {
            name: `${data.arr[1].employeeName}`,
            type: "line",
            data: months[1],
          },
          {
            name: `${data.arr[2].employeeName}`,
            type: "line",
            data: months[2],
          },
          {
            name: `${data.arr[3].employeeName}`,
            type: "line",
            data: months[3],
          },
        ],
      });
    });
  },
};
</script>
<template>
  <div class="rolesList-container">
    <div class="left-main" id="left-main"></div>
    <div class="center-main" id="center-main"></div>
    <div class="right-main" id="right-main"></div>
  </div>
</template>
<style lang="less" scoped>
.rolesList-container {
  height: 100%;
  width: 100%;
  display: flex;
  .left-main {
    flex: 2;
  }
  .center-main {
    flex: 3;
  }
  .right-main {
    flex: 6;
  }
}
</style>
