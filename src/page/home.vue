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
          2019年10月21日 11:41:50
          <span class="warnColor">王林村新村5栋2单元</span>
          南翔可出租房502室
          <span class="warnColor">智能烟感</span>
          发生
          <span class="warnColor">警告！</span>
        </div>
      </div>
      <div
        v-else
        class="header-data flex vertical f-evenly">
        <div
          class="pointer"
          @click="playAudio">
          <p>火险等级</p>
          <p class="level">一级</p>
        </div>
        <div class="pointer">
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
          alt="">
      </div>
    </div>
    <div class="content flex f-between">
      <div class="left between-cont">
        <left-cont
          :is-websocket="isWebsocket"
          @historyallAountMonth="historyallAountMonth"/>
      </div>
      <div class="centerClass">
        <my-map/>
        <bottom-cont/>
      </div>
      <div class="right between-cont">

        <right-warn
          v-if="isWebsocket"
          :data-config="infoTop"/>
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
      websocketData: {'list': [{'alarmState': '1', 'alarmTime': '2020-01-24 15:55:45', 'areaId': '1908011325111026', 'areaName': '海宁月子中心', 'city': '嘉兴市', 'detailLogId': '418113723295870976', 'fId': '190801151521649061', 'fState': '1', 'facilityAlias': '1楼母婴体验区室内消防栓没有用', 'facilityId': '170176053800', 'facilitySecondPosition': '母婴体验区室内消防栓', 'facilityType': '6', 'homeId': '190801142005407384', 'homeManager': '沈屹东', 'homeManagerPhone': '13957352609', 'houseName': '海宁月子中心1楼', 'houseNumber': '海宁月子中心1楼', 'logId': '418113723077767168', 'managerId': '1808081739400245', 'placeAddress': '硖石街道钱江东路99号', 'placeId': '190801141641248806', 'placeName': '海宁月子中心1楼', 'placePrincipal': '於国庆', 'placePrincipalPhone': '13606730606', 'positionX': '120.701111', 'positionY': '30.502397', 'prefecture': '海宁市', 'province': '浙江省', 'tableType': '', 'town': '请选择乡/镇'}, {'alarmState': '1', 'alarmTime': '2020-01-24 15:55:45', 'areaId': '1908011325111026', 'areaName': '海宁月子中心', 'city': '嘉兴市', 'detailLogId': '418113723295870976', 'fId': '190801151521649061', 'fState': '1', 'facilityAlias': '1楼母婴体验区室内消防栓没有用', 'facilityId': '170176053800', 'facilitySecondPosition': '母婴体验区室内消防栓', 'facilityType': '6', 'homeId': '190801142005407384', 'homeManager': '沈屹东', 'homeManagerPhone': '13957352609', 'houseName': '海宁月子中心1楼', 'houseNumber': '海宁月子中心1楼', 'logId': '418113723077767168', 'managerId': '1908011416291727', 'placeAddress': '硖石街道钱江东路99号', 'placeId': '190801141641248806', 'placeName': '海宁月子中心1楼', 'placePrincipal': '於国庆', 'placePrincipalPhone': '13606730606', 'positionX': '120.701111', 'positionY': '30.502397', 'prefecture': '海宁市', 'province': '浙江省', 'tableType': '', 'town': '请选择乡/镇'}], 'operation': '1'},
      isWebsocket: false,
      isshowWarn: false,
      taskList: [],
      showWarn: false
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
    async getTaskList() {
      let params = this.params
      params['page'] = 1
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
    playAudio() {
      let buttonAudio = document.getElementById('eventAudio');
      buttonAudio.setAttribute('src', this.audioSrc)
      buttonAudio.play()
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
    initWebsocket() {
      if ('WebSocket' in window) {

      // this.websocket = new WebSocket('ws://121.36.247.51:8282/IntelligentFire/websocket'); // 正式
      this.websocket = new WebSocket('ws://120.26.215.34:8080/IntelligentFire/websocket'); // 正式

      } else {
        alert('当前浏览器 Not support websocket');
      };

      this.websocket.onopen = () => {
        console.log('连接成功，当前时间' + new Date());
      };

      this.websocket.onmessage = (event) => {

        // let websocketData = this.websocketData.list[0]
        // websocket接收信息
        this.isWebsocket = true
        this.playAudio()
        let websocketData = JSON.parse(event.data).list[0]
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
                  case 2:
                  case 5:
                    console.log(1111)
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
