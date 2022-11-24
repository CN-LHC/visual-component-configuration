<!-- 外层 -->
<template>
  <div class="home-layout-wrapper">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @select="selectMenu"
      background-color="#19283F"
      text-color="#fff"
      active-text-color="#3BD5B3">
      <el-menu-item index="api">
        <i class="el-icon-coin"></i>
        <span slot="title">数据管理</span>
      </el-menu-item>
      <el-menu-item index="list">
        <i class="el-icon-data-line"></i>
        <span slot="title">组件管理</span>
      </el-menu-item>
    </el-menu>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      defaultActive: 'list'
    }
  },
  created() {
    switch (this.$route.path) {
      case '/api':
        this.defaultActive = 'api'
        break;
      case '/list':
        this.defaultActive = 'list'
        break;
      default:
        break;
    }
  },
  methods: {
    selectMenu(key) {
      this.$router.push({ path: key })
    },
  },
};
</script>

<style lang="less" scoped>
.home-layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .right {
    padding: 0 32px;
    width: calc(100% - 126px);
    background-color: #EDF0F5;
  }
}
</style>
