<template>
  <div class="container">
    <div class="header flex vertical f-between">
      <div class="left-text">{{ title }}</div>
      <!-- warn -->
      <div
        v-if="isWebsocket"
        class="header-data warnCont flex vertical f-evenly">
        <img
          class="warnImg"
          src="../assets/image/warn.png" >
        <div class="warnText">
          {{ websocketData.alarmTime }}
          <span class="warnColor">{{ websocketData.placeName }}</span>
          {{ websocketData.facilitySecondPosition }}
          <span class="warnColor">{{ infoTop.infoArr[1].val }}</span>
          发生
          <span class="warnColor">警告！</span>
        </div>
      </div>
      <div
        v-else
        class="header-data flex vertical f-evenly">
        <div
          class="pointer"
        >
          <p>火险等级</p>
          <p class="level">{{ level }}</p>
        </div>
        <div
          class="pointer"
        >
          <p>设备通讯统计</p>
          <p><span class="number">{{ communicationNum }}</span>次</p>
        </div>
        <div
          class="pointer"
          @mouseenter="mouseEvent(true)"
          @mouseleave="mouseEvent(false)">
          <p>历史告警(前30天)</p>
          <p><span class="number">{{ allAountMonth }}</span>次</p>
        </div>
        <div
          v-if="isshowWarn"
          class="warnalert"
          @mouseenter="mouseEvent(true)"
          @mouseleave="mouseEvent(false)">
          <p @click="getTaskList">历史告警记录</p>
          <p @click="exportTaskList">导出数据</p>
        </div>
      </div>
      <div class="right-img flex vertical ">
        <img
          v-if="isWebsocket"
          class="nomalIcon"
          src="../assets/image/warnlogo.png"
          alt="">
        <img
          v-else
          class="nomalIcon"
          src="../assets/image/logo.png"
          alt=""
          @click="aaanomalIcon">
      </div>
    </div>
    <div class="content flex f-between">
      <div class="left between-cont">
        <left-cont
          :is-websocket="isWebsocket"
          :weather-obj="weatherObj"
          @historyallAountMonth="historyallAountMonth"/>
      </div>
      <div class="centerClass">
        <my-map/>
        <bottom-cont/>
      </div>
      <div class="right between-cont">

        <right-warn
          v-if="isWebsocket"
          :data-config="infoTop"
          @confirmBtn="confirmBtn"/>
        <right-cont v-else/>
      </div>
    </div>
    <audio
      id="eventAudio"
      :src="audioSrc"
      loop="loop"
      hidden/>
    <warn-month
      v-show="showWarn"
      :task-list="taskList"
      class="warn-month"
      @hiddenWarn="hiddenWarn"
    />
  </div>
</template>
<script>
import MyMap from '../components/map';
import LeftCont from '../components/leftCont';
import RightCont from '../components/rightCont';
import bottomCont from '../components/bottomCont';
import rightWarn from '../components/rightWarn';
import warnMonth from '../components/common/warnMonth';
import { mapState, mapGetters } from 'vuex'
import util from '../lib/util'
import config from '../lib/config'

import Bus from '../bus.js'
export default {
  components: {
    MyMap,
    LeftCont,
    RightCont,
    bottomCont,
    rightWarn,
    warnMonth
  },
  data() {
    return {
      title: '智慧消防可视化监控中心',
      params: null,
      communicationNum: 0,
      allAountMonth: 0,
      websocket: null,
      infoTop: {title: '告警信息', haveInfo: true, showNext: true, warnAdress: '', homeManager: '', infoArr: [{title: '告警时间', key: 'alarmTime', val: '无', showColor: false, showHead: true, showtitle: true}, {title: '告警设备类型：', key: 'facilityType', val: '无', showColor: true, showHead: false, showtitle: true}, {title: '所在场所：', key: 'placeName', val: '无', showColor: true, showHead: false, showtitle: true}]},
      imgArr: [''],
      audioSrc: require('../assets/audio/True_and_false.mp3'),
      websocketData: {},
      isWebsocket: false,
      isshowWarn: false,
      taskList: [],
      showWarn: false,
      eventObj: {
        DM: '',
        listpoint: [],
        leval: 6
      },
      weatherObj: {},
      level: '一级'
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
    this.getweather()
  },
  methods: {
    async getweather() {
      let params = {
        useMd5: false
      }
      try {
        let res = await this.$http.get('https://free-api.heweather.net/s6/weather/now?location=萧山区&key=115f613585404c93af86677da09e7ab4', params)
        this.weatherObj = res.HeWeather6[0].now;
        console.log(this.weatherObj)
        if (this.weatherObj.tmp <= -3) {
          this.level = '一级'
        }
        if (this.weatherObj.tmp <= 5 && this.weatherObj.tmp > -3) {
          this.level = '二级'
        }
        if (this.weatherObj.tmp <= 10 && this.weatherObj.tmp > 5) {
          this.level = '三级'
        }
        if (this.weatherObj.tmp <= 25 && this.weatherObj.tmp > 10) {
          this.level = '四级'
        }
        if (this.weatherObj.tmp > 25) {
          this.level = '五级'
        }
      } catch (error) {
      }
    },
    async getTaskList() {
      let params = this.params
      params['page'] = 1
      console.log(params)
      try {
        let res = await this.$http.post('/facilityInfo/countFacilityWarningTaskTo30DaysGZ.do', params)
        this.taskList = res
        this.showWarn = true
      } catch (error) {
      }
    },
    exportTaskList() {
      let url = config.HTTPURL + '/excel/exportHistoryAlarmInfo.do' + '?userId=' + this.params.userId + '&province=' + this.params.province + '&sign=' + this.params.sign
      window.location.href = url
    },
    hiddenWarn() {
      this.showWarn = false
    },
    mouseEvent(flag) {
      this.isshowWarn = flag
    },
    playAudio(action) {
      let buttonAudio = document.getElementById('eventAudio');
      buttonAudio.setAttribute('src', this.audioSrc)
      if (action == 'play') {
        buttonAudio.play()
      } else {
        buttonAudio.pause()
      }

    },
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
    aaanomalIcon() {

      // this.eventObj.DM = ''
      // this.eventObj.listpoint.push('116.83', '40.37')
      // this.eventObj.leval = 16
      // console.log('ssssss', this.eventObj)
      // Bus.$emit('initialmap', this.eventObj)

      // Bus.$emit('changeIcon')
    },
    initWebsocket() {
      if ('WebSocket' in window) {

      // this.websocket = new WebSocket('ws://121.36.247.51:8282/IntelligentFire/websocket'); // 正式
      // this.websocket = new WebSocket('ws://120.26.215.34:8080/IntelligentFire/websocket'); // 正式
      this.websocket = new WebSocket('ws://121.36.15.94:8282/IntelligentFire/websocket');

      } else {
        alert('当前浏览器 Not support websocket');
      };

      this.websocket.onopen = () => {
        console.log('连接成功，当前时间' + new Date());
      };

      this.websocket.onclose = () => {
        console.log('连接断开');

        setTimeout(() => {
          this.initWebsocket();
          console.log('正在重连，当前时间' + new Date());
        }, 5000);
      };

      this.websocket.onmessage = (event) => {

        // let websocketData = this.websocketData.list[0]
        // websocket接收信息
        if (JSON.parse(event.data).operation != '1') return
        this.isWebsocket = true
        this.playAudio('play')
        let websocketData = JSON.parse(event.data).list[0]
        this.websocketData = websocketData
        console.log(this.websocketData)
        this.eventObj.DM = ''
        this.eventObj.listpoint.push(this.websocketData.positionX, this.websocketData.positionY)
        this.eventObj.leval = 16
        Bus.$emit('initialmap', this.eventObj)
        this.infoTop.warnAdress = websocketData.areaName
        this.infoTop.homeManager = websocketData.homeManager
        Object.keys(websocketData).forEach(e => {
          this.infoTop.infoArr.forEach(element => {
            if (element.key == e) {
              if (element.key == 'facilityType') {
                switch (websocketData[e]) {
                  case '0':
                    element.val = '智能烟感'
                    break;
                  case '1':
                    element.val = '智能气感'
                    break;
                  case '2':
                  case '5':
                    element.val = '液压液位检测'
                    break;
                  case '3':
                    element.val = '智慧用电'
                    break;
                  case '4':
                    element.val = '监控'
                    break;
                  case '6':
                    element.val = '液压液位检测'
                    break;
                  case '7':
                    element.val = '智能消防栓'
                    break;
                  default:
                    element.val = '智能消防栓'
                }

              } else {
                element.val = `${websocketData[e]}`
              }

            }
          })
        })
      }
    },
    async confirmBtn(str) {
      let message = str == '1' ? '火情已确认' : '预警已确认'
      let confirmStr = str == '1' ? '真实火情是指已经产生明火燃烧发生了真实火灾，请务必谨慎确认。' : '设备预警是指由于环境或人为等因素干扰而产生的正常设备告警，确认设备预警后，相应的“告警异常”状态会自动解除，从而恢复正常的安全状态。'
      if (confirm(confirmStr) == true) {

      let params = {
        facilityID: this.websocketData.facilityId,
        type: this.websocketData.facilityType,
        logID: this.websocketData.logId,
        userId: this.loginCookie,
        state: str,
        tableType: this.websocketData.tableType,
        timestamp: new Date().getTime(),
        fTime: this.websocketData.alarmTime
      }

        // let params = {
        //   facilityID: '321',
        //   type: '0',
        //   logID: '1525704622567',
        //   userId: this.loginCookie,
        //   state: str,
        //   tableType: '',
        //   timestamp: new Date().getTime(),
        //   fTime: '2020-02-13 02:13:32'
        // }

        try {
          let res = await this.$http.post('/realTimeAlarm/confirmAlarm.do', params)
          console.log(res)
          if (res.state == '0') {
            alert(message)
            this.isWebsocket = false
            this.playAudio('pause')
          } else {
            alert(res.message)
          }
        } catch (error) {
        }
      }
    }
  }
};
</script>
<style lang="scss">
.container{
  width: 100%;
  height: 100%;
  position:relative;
  .warn-month{
    position:absolute;
    top: 10rem;
    right: 29.2rem;
  }
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
      position: relative;
      height: 5rem;
      .level{
        color: #06F0B8;
        font-size: 2.25rem;
      }
      .number{
        color: #D5FDFD;
        font-size: 2.25rem;
      }
      .warnalert{
        width: 10rem;
        height: 5rem;
        background-image: linear-gradient(-55deg,#07265d,#0d3d92),linear-gradient(#2d323b,#2d323b);
        background-blend-mode: normal,normal;
        box-shadow: 0 5px 10px 0 rgba(3,0,0,.4);
        border: 1px solid #f30cf6;
        position: absolute;
        top: 4.5rem;
        right: 8.5rem;
        z-index: 1111;
         p {
            width: 90%;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            letter-spacing: 0;
            color: #000;
            font-family: PINGFANG MEDIUM;
            background-color: #fff;
            box-shadow: 0 2px 5px 0 rgba(3,0,0,.25);
            border-radius: 5px;
            opacity: .9;
            margin-top: .3rem;
            margin-left: .4rem;
            cursor: pointer;
        }
        p:hover{
          background-color: #a0ecff;
        }
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
    .centerClass{
      margin-top:4rem;
    }
  }
}
</style>
