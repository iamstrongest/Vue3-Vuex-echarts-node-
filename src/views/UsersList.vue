<template>
  <div class="usersList-container">
    <div class="sticky">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="left-input">
          <el-form-item label="查询员工">
            <el-input
              v-model="formInline.user"
              placeholder="请输入员工号或者员工名"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item label="添加员工">
          <el-button type="primary" @click="dialogTableVisible">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <div class="tanchukuang" v-if="flag">
        <form action="" class="form">
          <div>
            <label for="">工号<input type="text" v-model="I" /> <br /></label>
          </div>
          <div>
            <label for="">姓名<input type="text" v-model="N" /> <br /></label>
          </div>
          <div>
            <label for="">电话<input type="text" v-model="P" /> <br /></label>
          </div>
          <div>
            <label for="">性别<input type="text" v-model="S" /> <br /></label>
          </div>
          <div>
            <label for="">薪资<input type="text" v-model="Sa" /> <br /></label>
          </div>
          <div>
            <label for="">职位<input type="text" v-model="Po" /> <br /></label>
          </div>
          <div class="btn-left">
            <el-button @click="noSee">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </form>
      </div>
      <el-table :data="showData.dataShow" border style="width: 100%">
        <el-table-column fixed prop="empID" label="ID" width="150">
        </el-table-column>
        <el-table-column prop="employeeName" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="employeePhone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="employeeSex" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="employeeSalary" label="薪资" width="120">
        </el-table-column>
        <el-table-column prop="employeePosition" label="职位" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button>查看</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 4, 6, 7, 8]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="showData.showUserList.length"
      >
      </el-pagination>
    </div>
    <div class="update" v-if="up_flag">
      <form action="" class="form">
        <div>
          <label for=""
            >电话<input type="text" v-model="upPhone" /> <br
          /></label>
        </div>
        <div>
          <label for=""
            >薪资<input type="text" v-model="upSalary" /> <br
          /></label>
        </div>
        <div>
          <label for=""
            >职位<input type="text" v-model="upPosition" /> <br
          /></label>
        </div>
        <div class="btn-left">
          <el-button @click="hiddenUpdate">取消</el-button>
          <el-button type="primary" @click="updateEmp">提交</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import {
  getEmployees,
  addEmployees,
  deleteEmployees,
  updateEmployees,
} from "@/util/api/employee.js";
export default {
  setup() {
    const showData = reactive({
      showUserList: [],
      dataShow: [],
    });
    // let showUserList = ref([]);
    // let dataShow = ref();
    let data = getEmployees("employee");
    data.then((res) => {
      // dataShow.value = showUserList.value = res.data;
      showData.dataShow = showData.showUserList = res.data;
    });
    let flag = ref(false);
    let person = reactive({
      I: "",
      N: "",
      P: "",
      S: "",
      Sa: "",
      Po: "",
    });
    let formInline = reactive({
      user: "",
      region: "",
    });
    let dialogTableVisible = () => {
      flag.value = true;
    };
    function submit() {
      addEmployees("add", person).then(() => {
        data = getEmployees("employee");
        data.then((res) => {
          // dataShow.value = showUserList.value = res.data;
          showData.dataShow = showData.showUserList = res.data;
          console.log(dataShow.value);
        });
        flag.value = false;
      });
    }
    // 删除员工
    function handleDelete(index, row) {
      deleteEmployees("delete", row.empID).then(() => {
        data = getEmployees("employee");
        data.then((res) => {
          // dataShow.value = showUserList.value = res.data;
          showData.dataShow = showData.showUserList = res.data;
          console.log(dataShow.value);
        });
      });
    }
    // 更新员工信息
    let up_flag = ref(false);
    function hiddenUpdate() {
      up_flag.value = false;
    }
    let getID = ref();
    let upPhone = ref();
    let upSalary = ref();
    let upPosition = ref();
    function updateEmp() {
      updateEmployees(
        "update",
        getID.value,
        upPhone.value,
        upSalary.value,
        upPosition.value
      ).then(() => {
        data = getEmployees("employee");
        data.then((res) => {
          // dataShow.value = showUserList.value = res.data;
          showData.dataShow = showData.showUserList = res.data;
          console.log(dataShow.value);
        });
        up_flag.value = false;
      });
    }
    let page_number = ref();
    const handleEdit = (index, row) => {
      up_flag.value = true;
      getID.value = row.empID;
    };
    function handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      page_number.value = val;
    }
    function handleCurrentChange(val) {
      console.log(`这是第${val}页`);
      // dataShow.value = showUserList.value.slice(
      //   (val - 1) * page_number.value,
      //   val * page_number.value
      // );
      showData.dataShow = showData.showUserList.slice(
        (val - 1) * page_number.value,
        val * page_number.value
      );
    }
    // 配置
    function onSubmit() {
      console.log();
      // dataShow.value = showUserList.value.filter(
      //   (i) => i.empID == formInline.user || i.employeeName == formInline.user
      // );
      showData.dataShow = showData.showUserList.filter(
        (i) => i.empID == formInline.user || i.employeeName == formInline.user
      );
      console.log(dataShow.value);
    }
    function noSee() {
      flag.value = false;
    }
    return {
      // dataShow,
      // showUserList,
      showData,
      flag,
      up_flag,
      person,
      page_number,
      formInline,
      upPhone,
      upSalary,
      upPosition,
      handleEdit,
      handleDelete,
      ...toRefs(person),
      // addEmployee,
      noSee,
      onSubmit,
      submit,
      dialogTableVisible,
      handleSizeChange,
      handleCurrentChange,
      hiddenUpdate,
      updateEmp,
    };
  },
  // 配置
  // let showUserList = computed(() => store.state.userlist);
  // console.log(showUserList);
  // function onSubmit() {}
  // function noSee() {
  //   flag.value = false;
  // }
  // const store = useStore();
  // let person = reactive({
  //   I: "",
  //   N: "",
  //   P: "",
  //   S: "",
  //   Sa: "",
  //   Po: "",
  // });
  // let upPhone = ref();
  // let upSalary = ref();
  // let upPosition = ref();
  // // let changeMeg = {
  // //   upPhone: "",
  // //   uoSalary: "",
  // //   upPosition: "",
  // // };
  // let flag = ref(false);
  // let up_flag = ref(false);
  // let formInline = reactive({
  //   user: "",
  //   region: "",
  // });
  // let getID = ref();
  // // console.log("---------");
  // // let { userlist } = { ...store.state };
  // // let s1 = userlist;
  // // 发送请求，得到userlist数据
  // store.dispatch("asyncUserlist");
  // // 让userlist数据，传递给showUserList
  // // let showUserList = computed({
  // //   get() {
  // //     return store.state.userlist;
  // //   },
  // //   set(val) {
  // //     console.log(11);
  // //     console.log(val);
  // //     store.getters.sliceUserlist(
  // //       (val - 1) * page_number.value,
  // //       val * page_number.value
  // //     );
  // //   },
  // // });

  // // showUserList = showUserList.value.slice(0, 5);
  // let page_number = ref();
  // function addEmployee() {}

  // function dialogTableVisible() {
  //   flag.value = true;
  // }

  // // 异步添加员工
  // function submit() {
  //   store.dispatch("addperson", person);
  //   flag.value = false;
  // }
  // function handleSizeChange(val) {
  //   console.log(`每页 ${val} 条`);
  //   page_number.value = val;
  //   showUserList = page_number.value;
  // }
  // // let t_flag = ref(true);
  // // let showTab = computed(() => {
  // //   if (t_flag) {
  // //     t_flag.value = false;
  // //     return computed(() => store.state.userlist);
  // //   } else {
  // //     return store.getters.sliceUserlist(
  // //       (val - 1) * page_number.value,
  // //       val * page_number.value
  // //     );
  // //   }
  // // });
  // // console.log(showTab);
  // console.log("-------------------下面内容调整");
  // let p_number = ref();
  // function handleCurrentChange(val) {
  //   p_number = val;
  //   showUserList = computed(() => {
  //     store.state.userlist.slice(
  //       (val - 1) * page_number.value,
  //       val * page_number.value
  //     );
  //   });
  //   console.log(showUserList);
  //   console.log(`这是第 ${val} 页`);
  // }
  // const handleEdit = (index, row) => {
  //   console.log(index, row.empID);
  //   up_flag.value = true;
  //   getID.value = row.empID;
  // };
  // const handleDelete = (index, row) => {
  //   console.log(index, row.empID);
  //   store.dispatch("deleteperson", row.empID);
  // };
  // function hiddenUpdate() {
  //   up_flag.value = false;
  // }
  // function updateEmp() {
  //   store.dispatch("updateEmployee", {
  //     empID: getID.value,
  //     employeePhone: upPhone.value,
  //     employeeSalary: upSalary.value,
  //     employeePosition: upPosition.value,
  //   });
  //   up_flag.value = false;
  // }
  //   return {
  //     showUserList,
  //     flag,
  //     up_flag,
  //     person,
  //     page_number,
  //     formInline,
  //     upPhone,
  //     upSalary,
  //     upPosition,
  //     handleEdit,
  //     handleDelete,
  //     ...toRefs(person),
  //     // addEmployee,
  //     noSee,
  //     onSubmit,
  //     submit,
  //     dialogTableVisible,
  //     handleSizeChange,
  //     handleCurrentChange,
  //     hiddenUpdate,
  //     updateEmp,
  //   };
  // },
};
</script>

<style lang="less" scoped>
.usersList-container {
  display: flex;
  justify-content: center;
  position: relative;
  overflow-wrap: wrap;
}

// .sticky {
//   // position: fixed;
//   width: 100vw;
//   top: 20vh;
//   left: 12vw;
//   z-index: 500;
// }
.margin {
  margin-bottom: 5rem;
}
.el-form-item__content {
  margin-right: 5rem;
}

.tanchukuang {
  z-index: 11;
  position: fixed;
  top: 30vh;
  left: 30vh;
  // visibility: hidden;
}

.update {
  z-index: 12;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  background-color: skyblue;
  position: relative;
  div {
    padding: 1rem;
    label {
      color: #fff;
    }
    input {
      color: #000;
      font-size: 1rem;
    }
  }
  .btn-left {
    transform: translateX(30%);
  }
}
</style>
