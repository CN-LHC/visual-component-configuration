/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:06:13 
 * @Last Modified by:   liuhanchuan 
 * @Last Modified time: 2022-11-23 15:06:13 
 * 网站头部组件
 */

<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/logo.svg" alt="logo">
      <img src="../../assets/logo_title.svg" alt="logo_title">
    </div>
    <div class="account">
      <span>{{ userInfo.userName || '未命名' }}</span>
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <div class="head-photo">
          <img src="../../assets/user.svg" alt="user">
        </div>
        <el-dropdown-menu slot="dropdown" class="head_login_menu">
          <el-dropdown-item command="accountInfo">
            帐号信息
          </el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { delCookie } from "@/utils/utils";
export default {
  name: "HeaderComponent",
  data: function() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.setUserInfo()
  },
  mounted() {
    this.$bus.$on('login_in', this.setUserInfo)
  },
  methods: {
    setUserInfo() {
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    },
    //菜单命令
    handleCommand(command) {
      if (command == "accountInfo") {
        this.$message({
          type: "info",
          message: "敬请期待"
        });
      } else {
        // 清空token信息和用户信息
        delCookie('token')
        localStorage.clear();
        this.$message({
          type: "success",
          message: "您已退出登录，即将回到登录页！"
        });
        setTimeout(() => {
          this.$router.push({ path: "/login" });
          // this.$store.commit('user/setUserInfo', {});
          this.userInfo = {}
        }, 1000);
      }
    },
  },
  // computed: {
  //   ...mapGetters("user", {
  //     userInfo: "userInfo",
  //   }),
  // },
};
</script>
<style lang="less" scoped>
.header {
  position: relative;
  height: 60px;
  width: 100%;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  box-shadow: 0px 12px 12px 1px rgba(141,141,167,0.24);
  .logo {
    display: flex;
    align-items: center;
    > img {
      margin-left: 18px;
    }
  }
  .account {
    display: flex;
    align-items: center;
    > span {
      margin-right: 12px;
    }
  }
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #3BD5B3;
  color: #fff;
  border-color: #20C6A1;
}
</style>
