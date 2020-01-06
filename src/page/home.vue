<template>
  <div class="container">
    <div class="header flex flex-align-center flex-justify-between">
      <div class="left-text">{{ title }}</div>
      <div class="header-data flex flex-align-center flex-justify-evenly">
        <div>
          <p>火险等级</p>
          <p class="level">一级</p>
        </div>
        <div>
          <p>设备通讯统计</p>
          <p><span class="number">15556241</span>次</p>
        </div>
        <div>
          <p>历史告警</p>
          <p><span class="number">300</span>次</p>
        </div>
      </div>
      <div class="right-img flex flex-align-center ">
        <img
          class="nomalIcon"
          src="../assets/image/nomalIcon.png"
          alt="">
        <img
          src="../assets/image/nomal-center.png"
          alt="">
        <img
          src="../assets/image/nomal-right.png"
          alt="">
        <div class="right-text">
          <p>安全守护</p>
          <p>严正以待</p>
        </div>

      </div>
    </div>
    <my-map/>
  </div>
</template>
<script>
import MyMap from '../components/map';
export default {
  components: {
    MyMap
  },
  data() {
    return {
      title: '智慧消防可视化监控中心',
      imgArr: ['']
    }
  }
};
</script>
<style lang="scss">
.container{
  width: 100%;
  height: 100%;
  .header{
    height: 104px;
    .left-text{
      color:rgba(213,253,253,1);
      text-shadow:0px 0px 7px rgba(33,255,255,0.56);
      font-size: 40px;
    }
    .header-data{
      width: 930px;
      color: #AACDDA;
      font-size: 16px;
      .level{
        color: #06F0B8;
        font-size: 36px;
      }
      .number{
        color: #D5FDFD;
        font-size: 36px;
      }
    }
    .right-img{
      margin-top: 27px;
      position: relative;
      .nomalIcon{
        width: 109px;
        height: 91px;
      }
      .right-text{
        color: #06F0B8;
        font-size: 19px;
        position: absolute;
        right: 25px;
      }
    }
  }
}
</style>
