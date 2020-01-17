<template>
  <div>
    <p class="login-title tex-center">##############</p>
    <div class="login-input-cont">
      <div
        v-for="(item, index) in inputList"
        :key="index"
        class="rel input-list">
        <input
          :placeholder="item.placeholder"
          :type="item.type"
          v-model="item.value"
          :maxlength="item.maxlength"
          class="account">
        <img
          :src="item.src"
          class="login-img">
        <img
          v-if="index == 2"
          :src="codeSrc"
          class="code-img"
        >
      </div>
    </div>
    <div
      class="login-btn pointer"
      @click="loginFunc"
    >登录</div>
  </div>
</template>
<script>
import config from '../lib/config'
import { mapActions } from 'vuex'
export default {
    data() {

        // 13588757323  Wtx168168
        return {
            inputList: [
                {'placeholder': '输入账号', 'key': 'userName', 'maxlength': 11, 'value': '13587783003', 'type': 'text', 'src': require('../assets/image/lgzh.png')},
                {'placeholder': '输入密码', 'key': 'pwd', 'maxlength': 11, 'value': '123456', 'type': 'password', 'src': require('../assets/image/lgmm.png')},
                {'placeholder': '输入验证码', 'key': 'code', 'maxlength': 4, 'value': '', 'type': 'text', 'src': require('../assets/image/lgyzm.png')}
            ],
            codeSrc: ''
        }
    },
    mounted() {
      this.getCodeSrc()
    },
    methods: {
        getCodeSrc() {
          this.codeSrc = `${config.HTTPURL}/user/getPatternCode.do?time=${new Date().getTime()}`
        },
        async loginFunc() {
          let param = this.inputList.reduce((c, item) => {
              c[item.key] = item.value
              return c
          }, {})
          if (!param.userName) {
            alert('请输入用户名!');
            return false;
          }

          if (!param.pwd) {
            alert('请输入密码!');
            return false;
          }

          if (!param.code) {
            alert('验证码不能为空!');
            return false;
          }
          try {
            let res = await this.$http.post('/user/login.do', param)
            if (res.state == 0 && res.userID) {
              this.$cookies.set('loginCookie', res.userID, '7d', '/');  // 7天后过期
              this.setloginCookie(res.userID)
              this.$router.push({path: '/'})
            }
          } catch (error) {
            alert(error.message)
            this.getCodeSrc()
            this.inputList[2].value = ''
          }

          // this.$http.post('user/login.do', param).then((res, err) => {
          //   if (res.state == 0 && res.userID) {
          //     this.$cookies.set('loginId_cookie', res.userID, '7d', '/');  // 7天后过期
          //     this.$router.push({path: '/'})
          //   } else {
          //     console.log(err)
          //     alert(err.message);
          //     this.inputList[2].value = ''
          //   }
          // })
        },
        ...mapActions('userInfo', {'setloginCookie': 'actionsloginCookie'})
    }
}
</script>
<style lang="scss">
.login-title{
    color: #fff;
    font-size: 4rem;
    padding-top: 3rem;
    font-weight: 600;
}
.login-input-cont{
    width: 21rem;
    margin: 10rem auto 0;
    .account{
        color: #fff;
        border: .01rem solid #47c8fe;
        height: 3.6rem;
        line-height: 3.6rem;
        width: 18rem;
        padding-left: 3rem;
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
    .login-img{
        height: 1.5rem;
        width: 1.5rem;
        position: absolute;
        left: .75rem;
        top: 1.1rem;
    }
    .code-img{
        height: 3.5rem;
        width: 10rem;
        position: absolute;
        right: 0;
        top: 0;
    }
}
.login-btn{
    height: 3.6rem;
    line-height: 3.6rem;
    width: 21rem;
    background-color: #00b153;
    opacity: 0.6;
    color: #fff;
    font-size: 1.3rem;
    border-radius: 2rem;
    border: none;
    font-weight: bold;
    margin: 2rem auto 0;
}
.login-btn:hover {
    //
    opacity: 1;
}

</style>
