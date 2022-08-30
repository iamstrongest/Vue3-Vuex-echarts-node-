<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header">
          <div class="header_left">
            <div class="img">
              <img src="../../public/cartoon67.jpg" alt="" />
            </div>
            <div class="title">
              <div>
                <h1>最强节点人力资源管理系统</h1>
              </div>
            </div>
          </div>
          <div class="header_right">
            <el-row>
              <el-button type="primary" round @click="logOut">退出</el-button>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="none"
            text-color="#fff"
            router
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Avatar /></el-icon>
                <span>员工管理</span>
              </template>
              <el-menu-item index="/layout/usersList">员工列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Collection /></el-icon>
                <span>表格展示</span>
              </template>
              <el-menu-item index="/layout/map">echarts</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    // 此处 直接请求Map中的数据，不然第一次直接点击Map组件，将得不到数据展示。·
    // 因此就再点击map路由前，先获取到Vuex中的数据所以，Vuex本来就是用于跨组件使用数据，然后我们就可以在Map组件中可以使用
    const store = useStore();
    store.dispatch("asyncGetSex");
    store.dispatch("asyncgetsalaryRate");
    store.dispatch("asyncgetpersonalSalarytotals");
    const router = useRouter();
    function logOut() {
      // 清除本地储存的token
      localStorage.removeItem("token");
      alert("退出成功");
      // 跳转到登录页面
      router.push("/login");
    }
    return {
      logOut,
    };
  },
};
</script>

<style lang="less" scoped>
.el-header {
  height: 6rem;
  background-color: #242a31;
}
.el-aside {
  height: 100vh;
  background-color: #2d363f;
}
.el-header,
.el-aside {
  color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_left {
    display: flex;
    .img {
      width: 20%;
      height: 30%;
      margin-right: 5rem;
      img {
        display: block;
        width: 30%;
        height: 30%;
      }
    }
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
a {
  color: #fff;
  text-decoration: none;
}
.header_right {
  display: flex;
  .img {
    width: 20%;
    height: 30%;
    margin-right: 5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
