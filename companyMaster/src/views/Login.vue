<template>
  <div class="login-container">
    <div class="center-form">
      <el-form class="login-form">
        <el-form-item prop="userNumber" label="登录账号">
          <el-input v-model="userNumber" type="text" />
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <el-input v-model="password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button>忘记密码</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { login } from "@/util/api/employee.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    let data = reactive({
      userNumber: "",
      password: "",
    });
    let router = useRouter();
    async function submit() {
      let res = await login("login", data.userNumber, data.password);
      console.log(router);
      console.log(res.data);
      if (res.data.status == 200) {
        alert(res.data.msg);
        localStorage.setItem("token", res.data.token);
        router.push("/");
      } else {
        localStorage.removeItem("token");
      }
    }
    return {
      ...toRefs(data),
      submit,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 50rem;
  background-color: skyblue;
  position: relative;
  .center-form {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 1rem;
    transform: translate(-50%, -50%);
    border-radius: 0.5rem;
    background-color: aliceblue;
    .login-form {
      button {
        display: block;
        margin: 1rem;
      }
    }
  }
}
</style>
