/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:06:13 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2023-02-23 15:33:58
 * 网站头部组件
 */

<template>
  <div class="header">
    <div class="logo" @click="jump">
      <img src="../../assets/logo.svg" alt="logo">
      <div>
        <img src="../../assets/logo_title.png" alt="logo_title">
        <span>可视化配置平台</span>
      </div>
    </div>
    <div class="account">
      <span>未命名</span>
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <div class="head-photo">
          <img src="../../assets/user.svg" alt="user">
        </div>
        <el-dropdown-menu slot="dropdown" class="head_login_menu">
          <el-dropdown-item command="accountInfo">
            平台信息
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: "HeaderComponent",
  data: function() {
    return {}
  },
  methods: {
    jump(path = '') {
      this.$router.push({ path: `/${path}` })
    },
    //菜单命令
    handleCommand(command) {
      if (command == "accountInfo") {
        this.$message({
          type: "info",
          message: "敬请期待"
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  position: relative;
  height: 80px;
  width: 100%;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 14px;
  // background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 12px 12px 1px rgba(0,0,0,0.24);
  z-index: 999;
  user-select: none;
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    > div {
      margin-left: 18px;
      display: flex;
      flex-direction: column;
      color: #EFF5FF;
      font-weight: bold;
    }
  }
  .account {
    display: flex;
    align-items: center;
    > span {
      margin-right: 12px;
      font-weight: bold;
    }
  }
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: var(--main-color);
  color: #fff;
  border-color: var(--main-color-hover);
}
</style>
