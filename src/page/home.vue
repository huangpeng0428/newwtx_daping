<template>
  <div class="container">
    <div class="header flex vertical f-between">
      <div class="left-text">{{ title }}</div>
      <div class="header-data flex vertical f-evenly">
        <div>
          <p>火险等级</p>
          <p class="level">一级</p>
        </div>
        <div>
          <p>设备通讯统计</p>
          <p><span class="number">{{ communicationNum }}</span>次</p>
        </div>
        <div>
          <p>历史告警(前30天)</p>
          <p><span class="number">{{ allAountMonth }}</span>次</p>
        </div>
      </div>
      <!-- warn -->
      <!-- <div class="header-data warnCont flex vertical f-evenly">
        <img
          class="warnImg"
          src="../assets/image/warn.png" >
        <div class="warnText">
          2019年10月21日 11:41:50
          <span class="warnColor">王林村新村5栋2单元</span>
          南翔可出租房502室
          <span class="warnColor">智能烟感</span>
          发生
          <span class="warnColor">警告！</span>
        </div>
      </div> -->
      <div class="right-img flex vertical ">
        <img
          class="nomalIcon"
          src="../assets/image/logo.png"
          alt="">
          <!-- warn -->
          <!-- <img
          class="nomalIcon"
          src="../assets/image/warnlogo.png"
          alt=""> -->
      </div>
    </div>
    <div class="content flex f-between">
      <div class="left between-cont">
        <left-cont @historyallAountMonth="historyallAountMonth"/>
      </div>
      <div>
        <my-map/>
        <bottom-cont/>
      </div>
      <div class="right between-cont">
        <right-cont/>
        <!-- <right-warn :data-config="infoTop"/> -->
      </div>
    </div>
  </div>
</template>
<script>
import MyMap from '../components/map';
import LeftCont from '../components/leftCont';
import RightCont from '../components/rightCont';
import bottomCont from '../components/bottomCont';
import rightWarn from '../components/rightWarn';
import { mapState, mapGetters } from 'vuex'
import util from '../lib/util'
export default {
  components: {
    MyMap,
    LeftCont,
    RightCont,
    bottomCont,
    rightWarn
  },
  data() {
    return {
      title: '智慧消防可视化监控中心',
      params: null,
      communicationNum: 0,
      allAountMonth: 0,
      websocket: null,
      infoTop: {title: '告警信息', haveInfo: true, showNext: true, infoArr: [{title: '告警时间', key: 'alarmTime', val: '无', showColor: false, showHead: true, showtitle: true}, {title: '告警设备类型：', key: 'facilityType', val: '无', showColor: true, showHead: false, showtitle: true}, {title: '所在场所：', key: 'placeName', val: '无', showColor: true, showHead: false, showtitle: true}, {title: '设备位置：', key: 'placeAddress', val: '无', showColor: false, showHead: false, showtitle: true}, {title: '任务状态：', key: 'fConfirmState', val: '无', showColor: true, showHead: false, showtitle: true}]},
      imgArr: ['']
    }
  },
  computed: {
    ...mapState('userInfo', ['loginCookie']),
    ...mapGetters('mapInfo', {'adressInfo': 'returnadressInfo'})
  },
  watch: {
      adressInfo: {
        handler(val) {
          console.log('val', val)
          val['userId'] = this.loginCookie
          this.params = util.getparams(val)
          this.getFacilityCommunication()
        }
      }
    },
  mounted() {
    this.initData()
    this.initWebsocket()
  },
  methods: {
    async getFacilityCommunication() {
      try {
        let res = await this.$http.post('/facilityInfo/countFacilityCommunication.do', this.params)
        this.communicationNum = res[res.length - 1].countFid
      } catch (error) {
      }
    },
    historyallAountMonth(val) {
      console.log('历史告警', val)
      this.allAountMonth = val
    },
    async initData() {

      // console.log(this.$cookies.get('loginCookie'))
      // if (!this.$cookies.get('loginCookie') || this.$cookies.get('loginCookie') == null) {
      //   this.$router.push({path: '/login'})
      //   return
      // }
    },
    initWebsocket() {
      if ('WebSocket' in window) {
			this.websocket = new WebSocket('ws://121.36.247.51:8282/IntelligentFire/websocket'); // 正式

      } else {
        alert('当前浏览器 Not support websocket');
      };

      this.websocket.onopen = () => {
        console.log('连接成功，当前时间' + new Date());
      };
    }
  }
};
</script>
<style lang="scss">
.container{
  width: 100%;
  height: 100%;
  .header{
    height: 6.56rem;
    .left-text{
      width: 28.75rem;
      color:rgba(213,253,253,1);
      text-shadow:0px 0px 7px rgba(33,255,255,0.56);
      font-size: 2.5rem;
    }
    .warnCont{
      background: #0B1836;
      height: 100%;
      .warnImg{
        width: 1.88rem;
        height: 1.75rem;
      }
      .warnText{
        width: 35.06rem;
      }
      .warnColor{
        color: #06F0B8;
        font-size:1.7rem;
      }
    }
    .header-data{
      width: 58.13rem;
      color: #AACDDA;
      font-size: 1rem;
      .level{
        color: #06F0B8;
        font-size: 2.25rem;
      }
      .number{
        color: #D5FDFD;
        font-size: 2.25rem;
      }
    }
    .right-img{
      margin-top: 27px;
      position: relative;
      .nomalIcon{
        width: 24.88rem;
        height: 5.69rem;
      }
      .right-text{
        color: #06F0B8;
        font-size: 1.17rem;
        position: absolute;
        right: 1.50rem;
      }
    }
  }
  .content{
    width: 100%;
    .left{

    }
    .between-cont{
      width: 28.75rem;
    }
  }
}
</style>
