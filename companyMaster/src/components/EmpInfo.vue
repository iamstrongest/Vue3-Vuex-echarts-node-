<script setup>
import { onBeforeMount, reactive, onMounted, ref } from 'vue';
import { searchEmpInfo } from '@/util/api/empInfo.js';
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router"
const store = useStore();
const list = reactive({
  epID: '',
  epName: '',
  epBirh: '',
  epIntroduce: ''
});
onBeforeMount(async () => {
  const { data: res } = await searchEmpInfo(`userlist/${store.state.serachID}`)
  console.log(res)
  list.epSex = res.epSex;
  list.epName = res.epName;
  list.epBirth = res.epBirth;
  list.epIntroduce = res.epIntroduce;
})
const router = useRouter();
const route = useRoute();
console.log(route.name);
function back() {
  router.go(-1);
}
</script>
<template>
  <el-button type="primary" size="large" class="ft" @click="back">后退</el-button>
  <div class="emp-contaiter">
    <p>我的名字是:{{ list.epName }}</p>
    <p>我的性别是:{{ list.epSex }}</p>
    <p>我的出生日期是:{{ list.epBirth }}</p>
    <p>我的人生格言是:{{ list.epIntroduce }}</p>
  </div>
</template>

<style scoped lang='less'>
.emp-contaiter {
  color: skyblue;
  font-weight: bold;
  font-style: italic;
  width: 20vw;
  height: auto;
  margin: 0 auto;

  p {
    margin: 1vw;
  }
}

.ft {
  font-size: 1vw;
  font-weight: bold;
  font-style: italic;
}
</style>