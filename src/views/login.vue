<template>
  <div class="login">
    <div class="template">
      <div class="loginInput">
        <div class="header item">
          <div class="imgLeft"></div>
          <div class="title">用户登录</div>
          <div class="imgRight"></div>
        </div>
        <div class="user item EL_IUPUT">
          <div class="left">
            <div class="icon"></div>
          </div>
          <el-input class="input" v-model.trim="username" ref="username" placeholder="请输入账号" />
        </div>
        <div class="pwd item EL_IUPUT">
          <div class="left">
            <div class="icon"></div>
          </div>
          <el-input
            class="input"
            v-model.trim="password"
            ref="password"
            show-password
            placeholder="请输入密码"
          />
        </div>
        <div class="btn item" @click="submit()" v-clickDown>登录</div>
      </div>
      <div class="loginText">
        <span>版权所有 © 2020北京零点有数数据科技股份有限公司 京ICP备16009115号-1</span>
      </div>
    </div>
  </div>
</template>
<script>
import ax from "../api/api";
// import { setUserName, removeUserName } from "@/utils/login";
export default {
  directives: {
    clickDown: {
      inserted(el) {
        // el.click();
      },
    },
  },
  data() {
    return {
      username: 33074906,
      password: 33074906,
      changeFlag: false,
    };
  },
  methods: {
    onClickEnter() {
      this.submit();
    },
    submit() {
      //清空cookie store
      // this.$store.commit("SET_USERNAME", "");
      // removeUserName();
      let params1 = {
        value: this.username,
        refValue: this.$refs.username,
        messageText: "请输入账号",
      };
      let params2 = {
        value: this.password,
        refValue: this.$refs.password,
        messageText: "请输入密码",
      };
      if (
        this.FunctionBlurAll(params1) == true &&
        this.FunctionBlurAll(params2) == true
      ) {
        let info = {
          username: this.username,
          password: this.password,
        };
        ax.postLogin(info)
          .then((res) => {
            console.log(res, "login");
          })
          .catch((error) => {
            // console.log(error);
          });
        ax.getUserInfo()
          .then((res) => {
            console.log(res, "user");
            JSON.parse;
            this.$message({
              type: "success",
              message: "登录成功!",
            });
            this.changeFlag = true;
            // this.$store.commit("SET_USERNAME", this.username);
            if (res.organization.length != 0) {
              this.$router.push("/index");
            }
          })
          .catch((error) => {
            // console.log(error);
            this.$message({
              type: "error",
              message: "登录失败!请检查呢账号密码是否正确!",
            });
          });
      }
    },
  },
  mounted() {
    this.$keyBoard(this, "onClickEnter", 13); // 13就是回车键的keycode,这样点击回车就能触发onClickEnter这个事件了
  },
};
</script>
<style scoped lang="less">
.login {
  width: 99%;
  height: 99%;
  display: flex;
  align-items: center;
  justify-content: center;
  .template {
    width: 588px;
    height: 534px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .loginInput {
      width: 588px;
      height: 434px;
      background: url("../assets/login/border.png");
      background-size: 100% 100%;
      padding: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .item {
        width: 340px;
        height: 53px;
      }
      .header {
        // display: flex;
        display: flex;
        align-items: center;
        justify-content: center;
        .imgLeft,
        .imgRight {
          width: 100px;
          height: 15px;
          background: url("../assets/login/header.png");
          background-size: 100% 100%;
        }
        .title {
          width: 140px;
          height: 53px;
          // border: 1px solid red;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: #07e6ed;
        }
      }
      .EL_IUPUT {
        background: url("../assets/login/input.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: flex-end;
        .left {
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        /deep/.el-input__inner {
          width: 280px;
          height: 53px;
          background: transparent;
          border: 0px;
          font-size: 20px;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: #07e6ed;
          opacity: 0.5;
        }
      }
      .user {
        .icon {
          width: 28px;
          height: 26px;
          background: url("../assets/login/user.png");
          background-size: 100% 100%;
        }
      }
      .pwd {
        .icon {
          width: 24px;
          height: 26px;
          background: url("../assets/login/pwd.png");
          background-size: 100% 100%;
        }
      }
      .btn {
        background: url("../assets/login/login.png");
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        /deep/.el-input__icon {
          .el-icon-view {
            .el-input__clear {
              margin-left: 5px;
            }
          }
        }
      }
    }
    .loginText {
      width: 588px;
      height: 100px;
      font-size: 16px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #07e6ed;
      opacity: 0.2;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
  }
}
</style>