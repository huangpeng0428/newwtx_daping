<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  created() {
    if (this.$cookies.get('loginCookie')) {
      this.setloginCookie(this.$cookies.get('loginCookie'))
    }
  },
  methods: {
    ...mapActions('userInfo', {'setloginCookie': 'actionsloginCookie'})
  }
}
</script>

<style lang="scss">
@import '@/assets/css/base.scss';
@import '@/assets/css/flex.scss';
@import '@/assets/css/layout.scss';
@import '@/assets/css/font.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: url('./assets/image/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 25px;
}
</style>
