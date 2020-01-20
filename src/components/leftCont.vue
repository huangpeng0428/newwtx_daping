<template>
  <div class="leftCont">
    <div class="left-cont-top">
      <div class="weath-cont flex f-between vertical">
        <img src="../assets/image/weather.png">
        <div>
          <p>多云转晴</p>
          <p style="color:#0DC1FF;font-size:1.41rem;">28℃-33℃</p>
        </div>
        <div class="day">
          <p style="font-size:1.75rem;">周五12:35</p>
          <p>2020年01月03日</p>
        </div>
      </div>
      <div class="number-cont flex f-evenly vertical">
        <div>
          <p>质量</p>
          <p>80%</p>
        </div>
        <div>
          <p>PM2.5</p>
          <p>90</p>
        </div>
        <div>
          <p>湿度</p>
          <p>80%</p>
        </div>
      </div>
    </div>
    <div class="left-cont-bottom">
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
          <img src="../assets/image/checkall.png" >
          <img src="../assets/image/close.png" >
        </div>
      </div>
      <div class="tex-left flex vertical f-between">
        <div class="flex vertical">
          <span class="fs-87">设备数量总和</span>
          <span class="c-06f pdd-lr-10 fs-175">{{ allAount }}</span>
        </div>
        <div class="left-adress tex-overflow ">{{ params.province }}</div>
      </div>
      <div v-if="!isShowList">
        <div class="list">
          <div
            v-for="(item,index) in facilityList"
            :key="index"
            class="item pointer flex f-between vertical "
            @mouseenter="mouseEvent(true)"
            @mouseleave="mouseEvent(false)"
            @click="showInfo('isShowList', true, item)">
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
            @click="showInfo('isShowInfo', true)">
        </div>
      </div>
      <div class="tex-left">
        <span class="fs-87">设备次数统计(前30天)</span>
        <div class="left-echarts">
          <div class="statiStical">
            <line-chart
              v-if="chartData.length"
              :chart-data="chartData"/>
          </div>
          <img src="../assets/image/zuobiao.png">
        </div>
      </div>
      <div class="tex-left fs-87 mrg-tb-15">设备状态统计</div>
      <item-data
        v-if="stateData.length"
        :state-data="stateData"/>
      <div
        v-if="isShowInfo"
        class="abl-info">
        <info-data @hiddenInfo="hiddenInfo"/>
      </div>
    </div>
  </div>
</template>
<script>
import lineChart from './common/lineChart'
import itemData from './common/itemData'
import infoData from './common/infoData'
import { mapState, mapGetters } from 'vuex'
import util from '../lib/util'
export default {
    name: 'LeftCont',
    components: {
      lineChart,
      itemData,
      infoData
    },
    data() {
      return {
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
          {title: '低电压', type: 'low', count: '', accountNum: '', color: '#408EFE'},
          {title: '故障', type: 'fault', count: '', accountNum: '', color: '#05DBB0'},
          {title: '告警', type: 'warn', count: '', accountNum: '', color: '#BE4596'}
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
        }
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

          // 左上角设备数量
          this.getcountFacility()

          // 30天报警数量
          this.getcountMonth()

          // 设备运行状态
          this.getFacilityState()
        }
      }
    },
    methods: {
      async getcountFacility() {
        this.allAount = 0
        try {
          let res = await this.$http.post('/facilityInfo/countFacility.do', this.params)
          this.facilityList.forEach((e, i) => {
            res.forEach(item => {
              if (e.ftype == item.ftype) e.count = item.countFid
            })
            this.allAount += e.count
          });
        } catch (error) {
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
                element.accountNum = `${Math.floor((res[e] / allAount) * 100)}%`
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
      async showInfo(res, flat, data) {
        if (flat) {
          let params = JSON.parse(JSON.stringify(this.params))
          let sum = 0
          if (data.ftype == 0) params['sum'] = sum
          params['type'] = data.ftype
          try {
            let res = await this.$http.post('/facilityInfo/queryFacilityListByType.do', params)
            console.log(res)
            this.listByType = res
          } catch (error) {
          }
        }
        this[res] = flat

        // this.showMask = false
      },
      hiddenInfo() {

        this.isShowInfo = false
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
      height: 46.25rem;
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
        margin-bottom: 1rem;
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
      }
    }
}
</style>
