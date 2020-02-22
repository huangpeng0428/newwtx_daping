<template>
  <div class="bottomCont flex f-between ">
    <div class="cont-list flex vertical pointer">
      <div
        v-for="(item, index) in echartsData"
        :key="index"
        :class="[selected == index? 'action': '']"
        class="cont-item"
        @click="clickItem(index)">
        {{ item }}
      </div>
    </div>
    <div class="loginout flex vertical horizontal">
      <img
        class="pointer"
        src="../assets/image/refresh.png"
        @click="bottomClick('refresh')">
      <img
        class="pointer"
        src="../assets/image/loginout.png"
        @click="bottomClick('loginout')">
    </div>
    <div class="abs-cont">
      <div v-if="showEchart">
        <week-chart
          :date-arr="dateArr"
          :online-arr="onlineArr"
          :offline-arr="offlineArr"
          :low-arr="lowArr"
          :fault-arr="faultArr"
          :warn-arr="warnArr"
          :title-arr="titleArr"
          @closeEcharts="closeEcharts"
          @exportData="exportData"/>
      </div>
      <div
        v-if="showList"
        class="rel region-list">
        <div
          v-if="!showCount"
          class="regionimg">地区分布</div>
        <div
          v-if="!showCount"
          class="region-item-cont">
          <div
            v-for="(item, index) in adressList"
            :key="index"
            class="region-item flex vertical">
            <div class="flex vertical">
              <div
                :style="{backgroundColor:item.bg_color}"
                class="color-block"/>
              <div class="region-name tex-overflow">{{ item.fCity }}</div>
            </div>
            <div class="region-right flex vertical">
              <div class="region-block">
                <div
                  :style="{backgroundColor:item.bg_color,width:item.percent}"
                  class="region-color"/>
              </div>
              <div class="region-number tex-overflow">{{ item.countFid }}</div>
              <div class="region-scale">{{ item.percent }}</div>
            </div>
          </div>
        </div>
        <item-data
          v-if="showCount"
          :state-data="stateData"
          :item-style="itemStyle"
          style="color:#fff"/>
        <img
          v-if="!showCount"
          class="week-export pointer"
          src="../assets/image/echarts1111.png"
          @click="exportData">
        <img
          class="week-close pointer"
          src="../assets/image/close.png"
          @click="closeEcharts('list')">
      </div>
    </div>
  </div>
</template>
<script>
import weekChart from './common/weekChart'
import { mapState, mapGetters, mapActions } from 'vuex'
import util from '../lib/util'
import config from '../lib/config'
import itemData from './common/itemData'
export default {
    name: 'BottomCont',
    components: {
        weekChart,
        itemData
    },
    data() {
        return {
            echartsData: ['7日数量', '7日状态', '地区分布', '智能烟感', '智慧用电', '视频监控', '智慧消防', '智能气感', '液位液压'],
            exporturl: '',
            showEchart: false,
            showList: false,
            selected: null,
            params: {},
            dateArr: [],
            onlineArr: [],
            offlineArr: [],
            lowArr: [],
            faultArr: [],
            warnArr: [],
            titleArr: [],
            adressList: [],
            stateData: [
              {title: '在线', type: 'online', count: '', accountNum: '', color: '#8252FD'},
              {title: '离线', type: 'offline', count: '', accountNum: '', color: '#E5901D'},
              {title: '低电压', type: 'low', count: '', accountNum: '', color: '#408EFE'},
              {title: '故障', type: 'fault', count: '', accountNum: '', color: '#05DBB0'},
              {title: '告警', type: 'warn', count: '', accountNum: '', color: '#BE4596'}
            ],
            itemStyle: {width: '6rem', height: '0.88rem'},
            type: 0,
            showCount: false
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
        }
      }
    },
    mounted() {

      // console.log(111)
    },
    methods: {
        bottomClick(str) {
          if (str == 'loginout') {
            this.$router.push({path: '/login'})
            this.$cookies.remove('loginCookie')
            this.setloginCookie('')
          } else {
            history.go(0)
          }

        },
        closeEcharts(str) {
            if (str == 'list') this.showList = false
            else this.showEchart = false
            this.selected = null
        },
        exportData() {
          let url = config.HTTPURL + this.exporturl + '?userId=' + this.params.userId + '&province=' + this.params.province + '&sign=' + this.params.sign
          window.location.href = url
        },
        clickItem(i) {
          if (i > 2) {
            switch (i) {
              case 3:
                this.type = '0'
                break;
              case 4:
                this.type = '3'
                break;
              case 5:
                this.type = '4'
                break;
              case 6:
                this.type = '1'
                break;
              case 7:
                this.type = '7'
                break;
              case 8:
                this.type = '2'
                break;
              default:
                this.type = '0'
                break;
            }
            this.showList = true
            this.showEchart = false
            this.getcountFacility()
          } else if (i == 2) {
              this.showList = true
              this.showEchart = false
              this.exporturl = '/excel/exportFacilityDistributionInfo.do'
              this.getAdressData()
          } else {
              this.showList = false
              this.showEchart = true
              let posturl = i == '0' ? '/facilityInfo/countFacilityTo7DaysByType.do' : '/facilityInfo/countFacilityTo7DaysByStateGZ.do'
              this.exporturl = i == '0' ? '/excel/export7DaysFacilityCountInfo.do' : '/excel/export7DaysFacilityStateInfo.do'
              this.getChartData(posturl, i)
          }
          this.selected = i
        },
        async getAdressData() {
          try {
            let res = await this.$http.post('/facilityInfo/countAreaFacility.do', this.params)
            this.showCount = false
            this.adressList = res['facility']
            let countAll = 0
            let color = ['#28a80a', '#3f51c0', '#ac9126', '#c11e1e']
            this.adressList.forEach(element => {
              countAll += element.countFid
            });
            this.adressList.forEach(item => {
              let num = util.random(0, 4);
              let str = item.countFid / countAll + ''
              item['percent'] = str.indexOf('.') == -1 ? `${((item.countFid / countAll * 100))}%` : `${((item.countFid / countAll * 100).toFixed(2))}%`
              item['bg_color'] = color[num] || '#3f51c0'
            });
          } catch (error) {
            alert(error.message)
          }
        },
        async getcountFacility() {
          let params = this.params
          params['type'] = this.type
          try {
            let res = await this.$http.post('/facilityInfo/countFacilityState.do', params)
            let allAount = res.online + res.offline + res.low + res.fault + res.warn
            Object.keys(res).reduce((c, e, i) => {
              c.forEach(element => {
                if (element.type == e) {
                  element.count = res[e]
                  let str = res[e] / allAount + ''
                  if (allAount) {
                    element.accountNum = str.indexOf('.') == -1 ? `${((res[e] / allAount * 100))}%` : `${((res[e] / allAount * 100).toFixed(2))}%`
                  } else {
                    element.accountNum = '0%'
                  }
                }
              });
              return c
            }, this.stateData)
            this.showCount = true
          } catch (error) {
            alert(error.message)
          }
        },
        async getChartData(posturl, i) {

          // this.dateArr = []
          this.onlineArr = []
          this.offlineArr = []
          this.lowArr = []
          this.faultArr = []
          this.warnArr = []
          try {
            let res = await this.$http.post(posturl, this.params)
            this.titleArr = i == '0' ? ['烟', '电', '气', '视频', '水'] : ['在线', '离线', '低电压', '故障', '告警']
            if (i == '0') {

              let beforeday = [util.getBeforeDate(1), util.getBeforeDate(2), util.getBeforeDate(3), util.getBeforeDate(4), util.getBeforeDate(5), util.getBeforeDate(6), util.getBeforeDate(7)]
              this.onlineArr = [0, 0, 0, 0, 0, 0, 0]
              this.offlineArr = [0, 0, 0, 0, 0, 0, 0]
              this.lowArr = [0, 0, 0, 0, 0, 0, 0]
              this.faultArr = [0, 0, 0, 0, 0, 0, 0]
              this.warnArr = [0, 0, 0, 0, 0, 0, 0]
              for (let i = 0; i < res.length; i++) {
                if (res[i].type == 0) {
                  for (let j = 0; j < beforeday.length; j++) {
                    if (beforeday[j] == res[i].createTime) {
                      this.onlineArr[j] = res[i].countFid;
                    }
                  }
                }
                if (res[i].type == 3) {
                  for (let j = 0; j < beforeday.length; j++) {
                    if (beforeday[j] == res[i].createTime) {
                      this.offlineArr[j] = res[i].countFid;
                    }
                  }
                }
                if (res[i].type == 1) {
                  for (let j = 0; j < beforeday.length; j++) {
                    if (beforeday[j] == res[i].createTime) {
                      this.lowArr[j] = res[i].countFid;
                    }
                  }
                }
                if (res[i].type == 4) {
                  for (let j = 0; j < beforeday.length; j++) {
                    if (beforeday[j] == res[i].createTime) {
                      this.faultArr[j] = res[i].countFid;
                    }
                  }
                }
                if (res[i].type == 5) {
                  for (let j = 0; j < beforeday.length; j++) {
                    if (beforeday[j] == res[i].createTime) {
                      this.warnArr[j] += res[i].countFid;
                    }
                  }
                }
                if (res[i].type == 6) {
                  for (let j = 0; j < beforeday.length; j++) {
                    if (beforeday[j] == res[i].createTime) {
                      this.warnArr[j] += res[i].countFid;
                    }
                  }
                }
              }
            } else {
              this.dateArr = [res[0].date.substr(5)]
              this.onlineArr = [res[0].online]
              this.offlineArr = [res[0].offline]
              this.lowArr = [res[0].low]
              this.faultArr = [res[0].fault]
              this.warnArr = [res[0].warn]
              res[1].forEach(element => {
                this.dateArr.push(element.date.substr(5))
                this.onlineArr.push(element.online)
                this.offlineArr.push(element.offline)
                this.lowArr.push(element.low)
                this.faultArr.push(element.fault)
                this.warnArr.push(element.warn)
              });
            }
          } catch (error) {
            alert(error.message)
          }
        },
        ...mapActions('userInfo', {'setloginCookie': 'actionsloginCookie'})
    }
}
</script>
<style lang="scss">
.bottomCont{
    position: relative;
  .cont-item{
      width:7.13rem;
      height:2.5rem;
      line-height: 2.5rem;
      background:linear-gradient(270deg,rgba(56,89,255,1) 0%,rgba(80,252,252,1) 100%);
      border-radius:2rem;
      margin: 0 0.25rem;
      color: #FFFFFF;
    }
    .loginout{
      flex: 1;
      img{
        width: 2rem;
        height: 2rem;
        margin: 0 1rem;
      }
    }
    .action{
        color: rgba(56,89,255,1);
        background: #fff;
    }
    .abs-cont{
        position: absolute;
        transform: translateY(-100%);
        top: -1rem;
        z-index: 100;
        .region-list{
            max-height: 25rem;
            width: 23rem;
            background: url('../assets/image/left-bg-top.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            .regionimg{
                width: 8rem;
                line-height: 3rem;
                text-align: center;
                height: 3rem;
                background: url('../assets/image/weekicon.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                z-index: 999;
                color: #fff;
                margin-bottom: 2rem;
            }
            .region-item-cont{
                height: 20rem;
                width: 21rem;
                margin: 0 1rem;
                overflow-y: scroll;
                .region-item{
                    margin-bottom: 1rem;
                    color: #fff;
                    .region-name{
                      width: 4rem
                    }
                    .color-block{
                        height: 1.25rem;
                        width: 1.25rem;
                        background: #06F0B8;
                        // margin-right: 1rem;
                    }
                    .region-right{
                        // flex: 1;
                        .region-block{
                            width: 6rem;
                            height: 0.88rem;
                            border-radius: .5rem;
                            background:#0F3270;
                            margin: 0 1rem;
                            .region-color{
                                border-radius: .5rem;
                                height: 100%;
                                background: #06F0B8;
                            }
                        }
                        .region-number{
                          width: 3rem;
                        }
                    }
                }
            }
            .week-close{
                position: absolute;
                width: 1.25rem;
                line-height: 1.25rem;
                top: -0.5rem;
                right: -0.5rem;
            }
            .week-export{
                position: absolute;
                width: 1.8rem;
                line-height: 1.25rem;
                top: 0.5rem;
                right: 1.5rem;
            }
        }
    }
}
</style>
