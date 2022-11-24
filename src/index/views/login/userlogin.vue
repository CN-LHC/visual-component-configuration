/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-23 15:03:35 
 * @Last Modified by: liuhanchuan
 * @Last Modified time: 2022-11-23 17:20:37
 * 用户账号登录
 */
<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
      >
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        ></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input
            @keyup.enter.native="handleLogin"
            :maxlength="code.len"
            v-model="loginForm.code"
            auto-complete="off"
          >
        <i slot="prefix" class="icon-yanzhengma"></i>
      </el-input>
      <div class="login-code">
          <span
            class="login-code-img"
            @click="refreshCode"
            v-if="code.type == 'text'"
            >{{ code.value }}
          </span>
          <img
            :src="code.src"
            class="login-code-img"
            @click="refreshCode"
            v-else
          />
      </div>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-submit"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum, setCookie } from "@/utils/utils";
import md5 from "md5"
export default {
  name: "userlogin",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      checked: false,
      code: {
        src: "/code",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      passwordType: "password"
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  props: [],
  methods: {
    async refreshCode() {
      this.loginForm.code = "";
      // this.loginForm.randomStr = randomLenNum(this.code.len, true);
      // this.code.type === "text"
      //   ? (this.code.value = randomLenNum(this.code.len))
      //   : (this.code.src = `http://videoeditor.dengtacj.cn:55561/api/code?randomStr=${this.loginForm.randomStr}`);
      let data = await this.API.pic()
      this.code.src = data.image
      this.code.value = data.uuid
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 1校验验证码，2登录，3通过token获取用户信息
          this.API.verify({
            code: this.loginForm.code,
            uuid: this.code.value,
          }).then(async () => {
            let token = await this.API.login({
              code: md5(this.loginForm.password),
              key: this.loginForm.username,
              loginWay: 1,
              serverName: 'shutu'
            })
            let userInfo = await this.API.token({ token })
            // this.$store.commit('user/setUserInfo', userInfo)
            if (userInfo.serverName === 'shutu') {
              // 设置token信息
              setCookie('token', token, 7)
              // 设置用户信息
              window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
              this.$bus.$emit('login_in')
              this.$router.push({ path: '/' })
            } else {
              this.$message.error('当前用户无访问权限，请联系管理员!')
            }
          })
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-submit {
  width: 100%;
  height: 48px;
  background: linear-gradient(63deg, #198CFF 0%, #44CC7E 100%);
  border-radius: 6px 6px 6px 6px;
  border-width: 0;
  cursor: pointer;
  margin-top: 56px;
  font-family: "neo";
  transition: 0.25s;
}
.login-form {
  width: 100%;
  i {
    color: #333;
  }
  .el-form-item__content {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 32px;
    position: relative;
  }
  /deep/ .el-input {
    input {
      height: 48px;
      background: #FFFFFF;
      border-radius: 6px 6px 6px 6px;
      opacity: 1;
      border: 1px solid #DCDAE3;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
}
.login-code-img {
  width: 100px;
  height: 36px;
  line-height: 38px;
  background: #EEEDF2;
  border-radius: 2px 2px 2px 2px;
  color: #1D1F27;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  text-indent: 5px;
  text-align: center;
}
</style>
