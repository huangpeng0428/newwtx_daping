<template>
  <div class="leftCont">
    <div class="left-cont-top">
      <div class="weath-cont flex f-between vertical">
        <img src="../assets/image/weather.png">
        <div>
          <p>{{ weatherObj.cond_txt }}</p>
          <p style="color:#0DC1FF;font-size:1.41rem;">{{ weatherObj.tmp }} ℃</p>
        </div>
        <div class="day">
          <p style="font-size:1.75rem;">{{ week }}{{ nowTime }}</p>
          <p>{{ nowYear }}</p>
        </div>
      </div>
      <div class="number-cont flex f-evenly vertical">
        <div>
          <p>空气质量</p>
          <p>良好</p>
        </div>
        <div>
          <p>PM2.5</p>
          <p>90</p>
        </div>
        <div>
          <p>湿度</p>
          <p>{{ weatherObj.hum }}%</p>
        </div>
      </div>
    </div>
    <div
      v-if="!isWebsocket"
      class="left-cont-bottom">
      <div class="flex title f-between vertical">
        <div class="flex vertical">
          <img src="../assets/image/tongji.png" >
          <span class="pdd-lr-5">设备数量统计</span>
        </div>
        <div>
          <img
            class="pointer"
            src="../assets/image/home.png"
            @click="showInfo('isShowList', false)" >
            <!-- <img src="../assets/image/checkall.png" >
          <img src="../assets/image/close.png" > -->
        </div>
      </div>
      <div class="tex-left flex vertical f-between">
        <div class="flex vertical">
          <span class="fs-87">总设备数</span>
          <span class="c-06f pdd-lr-10 fs-175">{{ allAount }}</span>
        </div>
        <div
          v-if="params.province"
          class="left-adress tex-overflow ">{{ params.province }}</div>
      </div>
      <div v-if="!isShowList">
        <div class="list">
          <div
            v-for="(item,index) in facilityList"
            :key="index"
            class="item pointer flex f-between vertical "
            @mouseenter="mouseEvent(true)"
            @mouseleave="mouseEvent(false)"
            @click="showInfo('isShowList', true, item, index)">
            <div class="flex">
              <img
                :src="item.icon"
                class="pdd-lr-10" >
              <span>{{ item.title }}</span>
            </div>
            <div class="flex vertical">
              <span class="pdd-lr-10 fs-188 item-num">{{ item.count }}</span>
              <span>{{ item.unit }}</span>
              <img
                class="pdd-lr-10"
                style="width:0.56rem;height:0.88rem;"
                src="../assets/image/greenright.png">
            </div>
          </div>
          <div
            v-if="showMask"
            class="mask-info">
            <div class="mask-title flex vertical f-between">
              <div class="flex">
                <img
                  class="pdd-lr-10"
                  src="../assets/image/yangan.png" >
                <span>智能烟感</span>
              </div>
              <div class="flex vertical">
                <span>总计：</span>
                <span style="font-size:1.5rem">211</span>
              </div>
            </div>
            <div class="mask-cont">
              <item-data :item-style="itemStyle"/>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isShowList"
        class="adress-list">
        <div
          v-for="(item,index) in listByType"
          :key="index"
          class="flex f-between vertical pointer item">
          <div class="flex vertical">
            <div
              :style="{background:item.isOnline?'#D3FBFB':'blue'}"
              class="cilcle mrg-lr-5"/>
            <span
              class="pdd-r-5"
              v-text="item.isOnline?'在线':'离线'"/>
            <span
              v-if="item.isOnline"
              class="pdd-r-5 warn">告警</span>
            <div class="tex-overflow adress-text">{{ item.placeAddress }}{{ item.facilitySecondPosition }}</div>
          </div>
          <img
            class="pointer pdd-lr-10"
            src="../assets/image/lbIcon.png"
            @click="showInfo('isShowInfo', true, item)">
        </div>
      </div>
      <div class="tex-left">
        <span class="fs-87">设备报警次数统计(前30天)</span>
        <div class="left-echarts">
          <div class="statiStical">
            <line-chart
              v-if="chartData.length"
              :chart-data="chartData"/>
          </div>
          <img src="../assets/image/zuobiao.png">
        </div>
      </div>
      <div class="tex-left fs-87 mrg-tb-15">设备运行状况统计</div>
      <item-data
        v-if="stateData.length"
        :state-data="stateData"/>
      <div
        v-if="isShowInfo"
        class="abl-info">
        <info-data @hiddenInfo="hiddenInfo">
          <div class="info-solt">
            <div class="flex solt-item f-between">
              <div v-text="facilityInfo.state?'在线':'离线'"/>
              <div
                v-if="type != 4"
                v-text="facilityInfo.BatteryLevel ? +'电量：'+facilityInfo.BatteryLevel : '电量：100' + '%'"/>
              <div v-else><img
                class="pointer"
                style="width:2rem;height:2rem;"
                src="../assets/image/playvideo.png"
                @click="playVideo"></div>
            </div>
            <div
              v-for="(item,index) in facilityInfo.info"
              :key="index"
              class="solt-item">{{ item.title }}：{{ item.value }}</div>
            <div v-if="type == 0 || type == 1">
              <div class="solt-item">
                心跳信息: <span v-text="dataInfo.xtTime ? dataInfo.xtTime: '无'"/>
              </div>
              <div class="solt-item">
                利用率: <span v-text="dataInfo.LinkUtilization ? dataInfo.LinkUtilization: '无'"/>
              </div>
              <div class="solt-item">
                物理小区标示: <span v-text="dataInfo.pci ? dataInfo.pci: '无'"/>
              </div>
              <div class="solt-item">
                传感器级别: <span v-text="dataInfo.sinr ? dataInfo.sinr: '无'"/>
              </div>
              <div class="solt-item">
                网络承载: <span v-text="dataInfo.rspr ? dataInfo.rspr: '无'"/>
              </div>
              <div class="solt-item">
                链接质量: <span v-text="dataInfo.ecl ? dataInfo.ecl: '无'"/>
              </div>
            </div>
            <div v-if="type == 3">
              <div class="solt-item">
                漏电流: <span v-text="dataInfo.L ? dataInfo.L: '0' + '(<500mA为正常)'"/>
              </div>
              <div class="solt-item">
                电流A: <span v-text="dataInfo.CA ? dataInfo.CA: '0'"/>
              </div>
              <div class="solt-item">
                电流B: <span v-text="dataInfo.CB ? dataInfo.CB: '0'"/>
              </div>
              <div class="solt-item">
                电流C: <span v-text="dataInfo.CC ? dataInfo.CC: '0'"/>
              </div>
              <div class="solt-item">
                温度A: <span v-text="dataInfo.T1 ? dataInfo.T1: '0'"/>
              </div>
              <div class="solt-item">
                温度B: <span v-text="dataInfo.T2 ? dataInfo.T2: '0'"/>
              </div>
              <div class="solt-item">
                温度C: <span v-text="dataInfo.T3 ? dataInfo.T3: '0'"/>
              </div>
              <div class="solt-item">
                温度D: <span v-text="dataInfo.T4 ? dataInfo.T4: '0'"/>
              </div>
            </div>
            <div v-if="type == 7">
              <div class="solt-item">
                液压: <span v-text="dataInfo.fWaterPressure ? dataInfo.fWaterPressure: '0' + '(>0.07Mpa为正常)'"/>
              </div>
            </div>
            <div v-if="type == 6 || type == 2">
              <div class="solt-item">
                液压: <span v-text="dataInfo.unitvalues ? dataInfo.unitvalues: '0' + '(>0.06Mpa为正常)'"/>
              </div>
            </div>
          </div>
          <div
            v-show="showVideo"
            class="video-cont">
            <video
              id="video"
              controls
              poster
              playsInline
              webkit-playsinline
              autoplay>
              <source
                :src="adress"
                class="AVURL"
                type="application/x-mpegURL">
              <source
                :src="adress1"
                class="AVURL"
                type="">
            </video>
            <img
              style="position: absolute;
              right: -.5rem;
              top: -.5rem;"
              src="../assets/image/close.png" >
          </div>
        </info-data>
      </div>
    </div>
  </div>
</template>
<script>
import lineChart from './common/lineChart'
import itemData from './common/itemData'
import infoData from './common/infoData'
import { mapState, mapGetters } from 'vuex'
import Bus from '../bus.js'
import util from '../lib/util'
export default {
    name: 'LeftCont',
    components: {
      lineChart,
      itemData,
      infoData
    },
    props: {
      isWebsocket: {
        type: Boolean,
        default() {
          return false
        }
      },
      weatherObj: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        adress: '',
        adress1: '',
        showVideo: false,
        showMask: false,
        isShowInfo: false,
        isShowList: false,
        chartData: [],
        allAount: 0,
        listByType: [],
        // eslint-disable-next-line no-dupe-keys
        params: {province: '浙江省'},
        stateData: [
          {title: '在线', type: 'online', count: '', accountNum: '', color: '#8252FD'},
          {title: '离线', type: 'offline', count: '', accountNum: '', color: '#E5901D'},
          {title: '低电', type: 'low', count: '', accountNum: '', color: '#408EFE'},
          {title: '故障', type: 'fault', count: '', accountNum: '', color: '#05DBB0'},
          {title: '报警', type: 'warn', count: '', accountNum: '', color: '#BE4596'}
        ],
        facilityList: [
          {title: '智能烟感', count: '', unit: '个', icon: require('../assets/image/yangan.png'), ftype: 0},
          {title: '智慧用电', count: '', unit: '个', icon: require('../assets/image/diangan.png'), ftype: 3},
          {title: '视频监控', count: '', unit: '个', icon: require('../assets/image/shipin.png'), ftype: 4},
          {title: '物联网关', count: '', unit: '个', icon: require('../assets/image/wangguan.png'), ftype: 8},
          {title: '智能消防栓', count: '', unit: '个', icon: require('../assets/image/xiaofang.png'), ftype: 7},
          {title: '智能气感', count: '', unit: '个', icon: require('../assets/image/qigan.png'), ftype: 1},
          {title: '液压液位检测', count: '', unit: '个', icon: require('../assets/image/yewei.png'), ftype: 2}
        ],
        itemStyle: {
          width: '8rem',
          height: '0.5rem'
        },
        facilityInfo: {info: []},
        dataInfo: {},
        type: 0,
        nowYear: '',
        nowTime: '',
        weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        week: '',
        fType: 0
      }
    },
    computed: {
      ...mapState('userInfo', ['loginCookie']),
      ...mapGetters('mapInfo', {'adressInfo': 'returnadressInfo'})
    },
    watch: {
      adressInfo: {
        handler(val) {
          val['userId'] = this.loginCookie
          this.params = util.getparams(val)

          // 左上角设备数量
          this.getcountFacility()

          // 30天报警数量
          this.getcountMonth()

          // 设备运行状态
          this.getFacilityState()
        }
      }
    },
    mounted() {
      Bus.$on('leftPost', (placeId) => {
        this.params['placeId'] = placeId
        this.getcountFacility()
        this.getFacilityState()
      })
      Bus.$on('clickShowInfo', (data) => {
        this.showInfo('isShowInfo', true, data)
      })
      this.getNowTime()
    },
    methods: {
      getNowTime() {
        let now = new Date()
        let day = now.getDay();
        this.nowYear = util.formatTime(now.getTime(), 'Y年M月D日')
        this.nowTime = util.formatTime(now.getTime(), 'h:m')
        this.week = this.weeks[day]
        setInterval(() => {
          let now = new Date()
          let day = now.getDay();
          this.nowYear = util.formatTime(now.getTime(), 'Y年M月D日')
          this.nowTime = util.formatTime(now.getTime(), 'h:m')
          this.week = this.weeks[day]
        }, 60000);
      },
      async getcountFacility() {
        let allAount = 0
        let isFlag = true
        if (isFlag) {
          try {
            isFlag = false
            let res = await this.$http.post('/facilityInfo/countFacility.do', this.params)
            isFlag = true
            this.facilityList.forEach((e, i) => {
              res.forEach(item => {
                if (e.ftype == item.ftype) {
                  e.count = item.countFid
                }
              })

              allAount += e.count
              this.allAount = allAount
            });
          } catch (error) {
          }
        }

      },
      async getcountMonth() {
        this.chartData = []
        try {
          let {countSmoke, countMingyu, countCO, countWater, countFirehydrant} = await this.$http.post('/facilityInfo/count30Days.do', this.params)
          let allAountMonth = countSmoke + countMingyu + countCO + countWater + countFirehydrant
          this.$emit('historyallAountMonth', allAountMonth)
          this.chartData.push(countSmoke, countMingyu, countCO, countWater, countFirehydrant)
        } catch (error) {
        }
      },
      async getFacilityState() {
        try {
          let res = await this.$http.post('/facilityInfo/countFacilityState.do', this.params)
          let allAount = res.online + res.offline + res.low + res.fault + res.warn
          Object.keys(res).reduce((c, e, i) => {
            c.forEach(element => {
              if (element.type == e) {
                element.count = res[e]
                let str = res[e] / allAount + ''
                element.accountNum = str.indexOf('.') == -1 ? `${((res[e] / allAount * 100))}%` : `${((res[e] / allAount * 100).toFixed(2))}%`
              }
            });
            return c
          }, this.stateData)
        } catch (error) {
        }
      },
      mouseEvent(showMask) {

        // this.showMask = showMask
      },
      async showInfo(res, flat, data, i) {
        if (res == 'isShowList') {
          if (flat) {
            if (data) {
              if (i == 3) return
              let params = JSON.parse(JSON.stringify(this.params))
              let sum = 0
              if (data.ftype == 0) params['sum'] = sum
              params['type'] = data.ftype
              this.type = data.ftype
              console.log(this.type)
              try {
                let res = await this.$http.post('/facilityInfo/queryFacilityListByType.do', params)
                this.listByType = res
              } catch (error) {
              }
            }
          } else {
            delete this.params.placeId;
            console.log(this.params)
            this.getcountFacility()
            this.getFacilityState()
          }
        } else {
            try {
              let params = {
                type: data.fType,
                facilityinfoId: data.facilityinfoId
              }
              let res = await this.$http.post('/facilityInfo/queryFacilityInfo.do', params)
              this.dataInfo = res[0]
              this.facilityInfo = {state: res[0].isOnline,
              info: [
                {'title': '告警时间', 'value': res[0].fTime ? util.formatTime(res[0].fTime, 'Y/M/D h:m:s') : '无'},
                {'title': '备注', 'value': res[0].fAlias || '无'},
                {'title': 'IMEI', 'value': res[0].ModelNumber || '无'},
                {'title': '设备ID', 'value': res[0].facilityinfoId || '无'},
                {'title': '安装时间', 'value': util.formatTime(res[0].CreateTime, 'Y/M/D h:m:s') || '无'},
                {'title': '安装位置', 'value': res[0].facilitySecondPosition || '无'}
                ]
              }
              this.adress = res[0].fLiveAddress
              this.adress1 = res[0].fRtmp
              console.log(this.adress, this.adress1)
            } catch (error) {
            }
        }
        this[res] = flat

        // this.showMask = false
      },
      hiddenInfo() {

        this.isShowInfo = false
      },
      playVideo() {
        // eslint-disable-next-line no-undef
        let yplayz = new EZUIPlayer('video');
        console.log(yplayz)
        this.showVideo = true

        // alert('功能正在加紧完善中...')
      }
    }
}
</script>
<style lang="scss">
.leftCont{
    width: 100%;
    .left-cont-top {
      background: url('../assets/image/left-bg-top.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 13rem;
      color: #fff;
      font-size: 1.17rem;
      .weath-cont{
          width: 80%;
          margin: 0 auto;
          padding: 1.31rem 0 1.44rem 0;
          img{
              height: 4.25rem;
              width: 4.25rem;
          }
          .day{
              color: #D3FBFB;
          }
      }
      .number-cont{
          width: 80%;
          margin: 0 auto;
          height: 4.94rem;
          background: url('../assets/image/giant.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
      }
    }
    .left-cont-bottom{
      color: #D5FDFD;
      height: 48.25rem;
      margin-top: 0.69rem;
      padding: 0 1.25rem;
      background: url('../assets/image/Rectangle.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      .title{
        padding: 1.56rem 0 1rem 0;
      }
      .left-adress{
        max-width:7.13rem;
        height:2rem;
        line-height: 2rem;
        border:0px solid rgba(31,99,163,1);
        background:linear-gradient(270deg,rgba(56,89,255,1) 0%,rgba(80,252,252,1) 100%);
        border-radius:2rem;
        padding: 0 1rem;
      }
      .list{
        margin: 1rem 0;
        height: 14rem;
        overflow-y: scroll;
        overflow-x: hidden;
        .item{
          width: 100%;
          height: 2.5rem;
          border: 1px solid #1F63A3;
          border-radius: 1.5rem;
          margin: 1rem 0;
          .item-num{
            font-family:zcoolqingkehuangyouti;
          }
        }
        .item:hover {
          background-color: #0D73C7;
        }
        .mask-info{
          width: 20rem;
          height: 12rem;
          margin: 0 2rem;
          background: url('../assets/image/mask.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: -4rem;
          .mask-title{
            padding:.5rem 0;
            margin: 0 1rem 1rem 1rem;
            border-bottom: 1px solid #1F63A3;
          }
          .mask-cont{
            width: 85%;
            height: 6.5rem;
            overflow-y: scroll;
            overflow-x: hidden;
            margin: 0 auto;
          }
        }
      }
      .adress-list{
        margin: 1rem 0;
        height: 13rem;
        overflow-y: scroll;
        overflow-x: hidden;
        .cilcle{
          width: 0.6rem;
          height: 0.6rem;
          background: #D3FBFB;
          border-radius: 0.3rem;
        }
        .item{
          padding: 0.5rem 0;
          .warn{
            color:red;
          }
          .adress-text{
            width:15rem;
            text-align:left;
          }
        }
        .item:hover {
          background-color: #0D73C7;
        }
        img{
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .left-echarts{
        .statiStical{
          width: 26.19rem;
          height: 8.38rem;
        }
        img{
          width: 100%;
        }
      }
      // .status-list{
      //   .status-item-left{
      //     width: 10rem;
      //     height: 0.88rem;
      //     background: #0F3270;
      //     margin-bottom: 1rem;
      //     border-radius: 1rem;
      //     .status-item-bg{
      //       background: #8252FD;
      //       width: 86%;
      //       height: 0.88rem;
      //       border-radius: 1rem;
      //     }
      //   }
      //   .status-item-right{
      //     font-size: 0.87rem;
      //     .cilcle{
      //       width: 0.88rem;
      //       height: 0.88rem;
      //       background: #8252FD;
      //       border-radius: 50%;
      //     }
      //   }

      // }
      img{
        width: 1.25rem;
        height: 1.25rem;
      }
      .abl-info{
        position: absolute;
        top: 0;
        transform: translateX(100%);
        z-index: 1000;
        .info-solt{
          text-align: left;
          padding: 0 1.3rem;
          .solt-item{
            margin-bottom:1rem;
          }
        }
      }
      .video-cont{
        width: 35rem;
          height: 25rem;
          position: absolute;
          top: .6rem;
          left: 29rem;
          background: #091651;
        video{
          width:100%;
          height:100%;
        }
      }
    }
}
</style>
