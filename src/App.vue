<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import Layout from "@/components/Layout";
export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
