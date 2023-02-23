/*
 * @Author: liuhanchuan 
 * @Date: 2023-02-22 18:20:39 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-23 15:29:34
 * 通用布局
 */

<template>
  <div class="layout-wrapper">
    <keep-alive>
      <Header></Header>
    </keep-alive>
    <div class="body">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  created() {}
};
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  .body {
    width: 100%;
    height: calc(100% - 80px);
  }
}
</style>
