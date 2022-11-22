<!-- 外层 -->
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
  methods: {},
};
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100vw;
  height: 100vh;
  .body {
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
