<template>
  <div class="rightCont">
    <div class="select-cont">
      <div class="select-item item-adress flex horizontal">
        <select
          v-model="userAddress.province"
          class="selectop tex-overflow"
          @change="selectChange('province')"
        >
          <option value="">请选择</option>
          <template>
            <option
              v-for="(provinceItem, index) in provinceList"
              :value="provinceItem.fProvince"
              :key="index">{{ provinceItem.fProvince }}</option>
          </template>
        </select>
        <select
          v-model="userAddress.city"
          class="selectop tex-overflow"
          @change="selectChange('city')"
        >
          <option value="">请选择</option>
          <template>
            <option
              v-for="(cityItem, index) in cityList"
              :value="cityItem.fCity"
              :key="index"
              placeholder="请选择">{{ cityItem.fCity }}</option>
          </template>
        </select>
        <select
          v-model="userAddress.prefecture"
          class="selectop tex-overflow"
          @change="selectChange('prefecture')"
        >
          <option value="">请选择</option>
          <template>
            <option
              v-for="(prefectureItem, index) in prefectureList"
              :value="prefectureItem.fPrefecture"
              :key="index"
              placeholder="请选择">{{ prefectureItem.fPrefecture }}</option>
          </template>
        </select>
        <select
          v-model="userAddress.areaName"
          class="selectop tex-overflow"
          @change="selectChange('areaName')"
        >
          <option value="">请选择</option>
          <template>
            <option
              v-for="(areaItem, index) in areaList"
              :value="areaItem.fAreaName"
              :key="index"
              placeholder="请选择">{{ areaItem.fAreaName }}</option>
          </template>
        </select>
        <select
          v-model="userAddress.placeName"
          class="selectop tex-overflow"
          @change="selectChange('placeName')"
        >
          <option value="">请选择</option>
          <template>
            <option
              v-for="(placeItem, index) in placeList"
              :value="placeItem.fAreaName"
              :key="index"
              placeholder="请选择">{{ placeItem.fAreaName }}</option>
          </template>
        </select>
      </div>
      <div class="select-item item-facility flex f-between">
        <select
          id="placeName"
          v-model="placeSelected"
          class="selectop input-selectop"
          @change="changePlace">
          <option value="1">搜地点</option>
          <option value="2">搜索所有设备</option>
        </select>
        <input
          v-model="placeValue"
          :placeholder="placeSelected == '1'?'输入您要搜索的地点':'输入您要搜索的设备名称'"
          class="select-input"
          @input="getlikeSearchList">
        <img
          v-if="placeSelected == '1'"
          class="searchImg pointer"
          src="../assets/image/search.png"
          @click="clickPlace">
        <div
          v-if="placeValue && showlikeSearch"
          class="likeSearch">
          <div
            v-for="(item, index) in likeSearchList"
            :key="index"
            class="flex vertical likeSearchItem pointer"
            @click="isShowInfo(item.fType,item.fID)">
            <img
              v-if="item.fType == '0'"
              src="../assets/image/type_smoke.png">
            <img
              v-if="item.fType == '1'"
              src="../assets/image/type_gas.png">
            <img
              v-if="item.fType == '2'"
              src="../assets/image/type_water.png">
            <img
              v-if="item.fType == '3'"
              src="../assets/image/type_electric.png">
            {{ item.fEntityFacilityID }}
          </div>
        </div>
      </div>
    </div>
    <info-data
      :data-config="infoTop"
      @getNext="getNext"/>
    <info-data :data-config="infoBottom"/>
    <!-- <div class="right-bottom right-img">
      <div class="flex f-between right-top-title">
        <div class="flex vertical">
          <img
            class="people-img"
            src="../assets/image/people.png" >
          <div class="pdd-lr-5">相关负责人信息</div>
        </div>
        <div class="flex vertical">
          <img src="../assets/image/close.png" >
        </div>
      </div>
      <div class="item-right tex-overflow pdd-lr-10">
        负责人
      </div>
      <div class="right-top-cont">
        <div class="right-top-item flex vertical f-between">
          <div class="flex vertical">
            <div>告警时间：</div>
            <div class="mrg-lr-15">2020.01.03/14:11:00</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import infoData from './common/infoData'
import { mapState, mapActions } from 'vuex'
import Bus from '../bus.js'
import util from '../lib/util'
export default {
    name: 'RightCont',
    components: {
      infoData
    },
    data() {
      return {
        provinceList: [],
        cityList: [],
        prefectureList: [],
        areaList: [],
        placeList: [],
        areaId: '',
        eventObj: {
          DM: '',
          listpoint: [],
          leval: 6
        },
        userAddress: {
          province: '',
          city: '',
          prefecture: '',
          areaName: '',
          placeName: ''
        },
        infoTopObj: {},
        infoTopIndex: 0,
        homeManageInfo: {},
        infoTop: {title: '近期告警任务', homeManageInfo: this.homeManageInfo, haveInfo: true, showNext: true, showClose: false, showsolt: false, infoArr: [{title: '告警时间', key: 'alarmTime', val: '无', showColor: false, showHead: true, showtitle: true}, {title: '告警设备类型：', key: 'facilityType', val: '无', showColor: true, showHead: false, showtitle: true}, {title: '所在场所：', key: 'placeName', val: '无', showColor: true, showHead: false, showtitle: true}, {title: '设备位置：', key: 'placeAddress', val: '无', showColor: false, showHead: false, showtitle: true}, {title: '任务状态：', key: 'fConfirmState', val: '无', showColor: true, showHead: false, showtitle: true}]},
        infoBottom: {title: '相关负责人信息', haveInfo: false, showNext: false, showClose: false, showsolt: false, infoArr: [{title: '', key: 'fAreaName', val: '无', showColor: true, showHead: false, showtitle: false}, {title: '法人：', key: 'fVillagePrincipal', val: '无', showColor: false, showHead: false, showtitle: true}, {title: '法人电话：', key: 'fVillagePhone', val: '无', showColor: false, showHead: false, showtitle: true}, {title: '紧急联系人：', key: 'fAreaPrincipal', val: '无', showColor: false, showHead: false, showtitle: true}, {title: '紧急联系人电话：', key: 'fAreaPhone', val: '无', showColor: false, showHead: false, showtitle: true}, {title: '地址：', key: 'fAreaAddress', val: '无', showColor: false, showHead: false, showtitle: true}]},
        WarningTaskList: [],
        placeSelected: '1',
        placeValue: '',
        likeSearchList: [],
        showlikeSearch: false
      }
    },
    computed: {
      ...mapState('userInfo', ['loginCookie']),
      ...mapState('mapInfo', ['rightInfoBottom']),

      // ...mapState('mapInfo', ['adressInfo']),
      newNserAddress() {
        return JSON.parse(JSON.stringify(this.userAddress))
      }
    },
    watch: {
      'infoTopObj': {
        handler(val) {
          this.homeManageInfo = {
            homeManager: val.homeManager,
            homeManagerPhone: val.homeManagerPhone
          }
          this.infoTop.homeManageInfo = this.homeManageInfo
          Object.keys(val).forEach(e => {
            this.infoTop.infoArr.forEach(element => {
              if (element.key == e) {
                if (element.key == 'placeAddress') {
                  element.val = `${val[e]}${val['facilitySecondPosition']}`
                } else if (element.key == 'facilityType') {
                  switch (val[e]) {
                    case '0':
                      element.val = '烟感告警'
                      break;
                    case '1':
                      element.val = '气感告警'
                      break;
                    case '3':
                      element.val = '电感告警'
                      break;
                    case '5':
                    case '6':
                      element.val = '液位液压报警'
                      break;
                    case '4':
                      element.val = '视频监控报警'
                      break;
                    case '7':
                      element.val = '消防栓报警'
                      break;
                    default:
                      break;
                  }
                } else if (element.key == 'fConfirmState') {
                  if (val[e] == '0') {
                    element.val = '未确认'
                  }
                  if (val[e] == '1') {
                    element.val = '确认为火警'
                  }
                  if (val[e] == '2') {
                    element.val = '确认为预情'
                  }
                } else {
                  element.val = val[e]

                  // if (element.key == 'fConfirmState') {
              //   if (e.reason == '1' || !e.reason) {
              //     if (val['facilityType'] == '0') {
              //         element.val = '未确认'
              //     }
              //     if (val['facilityType'] == '1') {
              //       element.val = '确认为火情'
              //     }
              //     if (val['facilityType'] == '2') {
              //       element.val = '确认为预警'
              //     }
              //   }
              //   if (e.reason == '10') {
              //     if (val['fFireOverState'] == '0') {
              //         element.val = '未恢复'
              //     }
              //     if (val['fFireOverState'] == '1') {
              //         element.val = '已恢复'
              //     }
              //   }
              // }
                }
              }
            });
          });

          // this.infoBottom = Object.assign({}, this.bootomConfig, val)
        }
      },
      'rightInfoBottom': {
        handler(val) {
          this.infoBottom.haveInfo = true
          this.infoBottom.infoArr.forEach(element => {
            Object.keys(val).forEach(e => {
              if (element.key == e) element.val = val[e]
            });
          });

          // this.infoBottom = Object.assign({}, this.bootomConfig, val)
        }
      },
      'newNserAddress': {
        handler(newval, oldval) {
          if (newval.province != '' && newval.province != oldval.province) {
            console.log(1)
            this.userAddress.city = ''
            this.userAddress.prefecture = ''
            this.userAddress.areaName = ''
            this.userAddress.placeName = ''
            this.prefectureList = []
            this.placeList = []
            this.areaList = []
            newval.city = ''
            newval.prefecture = ''
            newval.areaName = ''
            newval.placeName = ''

            this.getAllCity()
          }
          if (newval.city != '' && newval.city != oldval.city) {
            console.log(2)
            this.userAddress.prefecture = ''
            this.userAddress.areaName = ''
            this.userAddress.placeName = ''
            newval.prefecture = ''
            this.areaList = []
            this.placeList = []
            this.getAllPrefecture()
          }
          if (newval.prefecture != '' && newval.prefecture != oldval.prefecture) {
            console.log(3)
            this.userAddress.areaName = ''
            this.userAddress.placeName = ''
            newval.areaName = ''
            this.placeList = []

            // this.userAddress.placeName = ''
            console.log(newval.prefecture, 222)
            this.getAllArea()
          }
          if (newval.areaName != '' && newval.areaName != oldval.areaName) {
            console.log(4)
            this.userAddress.placeName = ''

            // this.userAddress.placeName = ''
            this.getAllPlace()
          }

          // if (newval.placeName != '' && newval.placeName != oldval.placeName) {
          //   console.log(11)

          //   // this.userAddress.placeName = ''
          //   this.getAllPlace()
          // }

          setTimeout(() => {
            newval['placeId'] = this.areaId

            // console.log('newval', newval)

            this.setadressInfo(newval)
            newval['userId'] = this.loginCookie
            this.params = util.getparams(newval)

            this.getWarningTask()
          }, 600);
        },
        deep: true
      }
    },
    async mounted() {
      await this.getAdress()
      this.getAllProvince()
      Bus.$on('busGetWarningTask', () => {
        this.getWarningTask()
        this.getAdress()
      })

      // this.getAllCity()
    },
    methods: {
      async getAdress() {
        try {
            let res = await this.$http.post('/user/getUserAddress.do', {userId: this.loginCookie})
            this.userAddress = {
              province: res.province,
              city: res.city,
              prefecture: res.prefecture,
              areaName: res.areaName,
              placeName: res.placeName
            }
            this.eventObj.DM = res.province
            Bus.$emit('initialmap', this.eventObj)

            if (this.userAddress) {

            }
          } catch (error) {
          }
      },
      async getWarningTask() {
        let params = JSON.parse(JSON.stringify(this.params))
        params['page'] = 1
        try {
          let res = await this.$http.post('/facilityInfo/countFacilityWarningTaskTo30DaysGZ.do', params)
          this.WarningTaskList = res
          if (res.length) {
            this.infoTopObj = res[this.infoTopIndex]
          }
        } catch (error) {
          alert(error.message)
        }
      },
      getNext(str) {
        if (str == 'right' && this.infoTopIndex < this.WarningTaskList.length) {
          this.infoTopIndex ++
        }
        if (str == 'left' && this.infoTopIndex > 0) {
          this.infoTopIndex --
        }
        this.infoTopObj = this.WarningTaskList[this.infoTopIndex]

      },
      async getAllProvince() {
        try {
          let res = await this.$http.post('/location/getProvinceTreeList.do', {userID: this.loginCookie})
          if (res.state == 0) {
            this.provinceList = res.list
          } else {
            alert(res.message)
          }
        } catch (error) {
          alert(error.message)
        }
      },
      async getAllCity() {
        let params = {
          userID: this.loginCookie,
          province: this.userAddress.province
        }
        try {
          let res = await this.$http.post('/location/getCityTreeList.do', params)
          if (res.state == 0) {
            this.cityList = res.list
          } else {
            alert(res.message)
          }
        } catch (error) {
          alert(error.message)
        }
      },
      async getAllPrefecture() {
        let params = {
          userID: this.loginCookie,
          city: this.userAddress.city
        }
        try {
          let res = await this.$http.post('/location/getPrefectureTreeList.do', params)
          if (res.state == 0) {
            this.prefectureList = res.list
          } else {
            alert(res.message)
          }
        } catch (error) {
          alert(error.message)
        }
      },
      async getAllArea() {
        console.log(this.userAddress.prefecture, 111)
        let params = {
          userID: this.loginCookie,
          prefecture: this.userAddress.prefecture
        }
        try {
          let res = await this.$http.post('/location/getAreaTreeList.do', params)
          if (res.state == 0) {
            this.areaList = res.list
          } else {
            alert(res.message)
          }
        } catch (error) {
          alert(error.message)
        }
      },
      async getAllPlace() {
        let params = {
          userID: this.loginCookie,
          areaId: this.areaId
        }
        try {
          let res = await this.$http.post('/location/getPlaceTreeList.do', params)
          if (res.state == 0) {
            this.placeList = res.list
          } else {
            alert(res.message)
          }
        } catch (error) {
          alert(error.message)
        }
      },
      selectChange(item) {
        this.eventObj = {
          DM: '',
          listpoint: [],
          leval: 6
        }
        switch (item) {
          case 'province':
            this.eventObj.DM = this.userAddress[item]
            Bus.$emit('initialmap', this.eventObj)
            break
          case 'city':
            this.eventObj.DM = this.userAddress[item]
            Bus.$emit('initialmap', this.eventObj)
            break
          case 'prefecture':
            let {fAreaX, fAreaY} = this.prefectureList.find(e => e.fPrefecture == this.userAddress[item])
            this.eventObj.DM = ''
            this.eventObj.leval = 11
            if (fAreaX != null && fAreaY != null) {
              this.eventObj.listpoint.push(fAreaX, fAreaY)
              Bus.$emit('initialmap', this.eventObj)
            }
            break
          case 'areaName':
            let obj = this.areaList.find(e => e.fAreaName == this.userAddress[item])
            this.areaId = obj.fID
            this.eventObj.DM = ''
            this.eventObj.leval = 11
            if (obj.fAreaX != null && obj.fAreaY != null) {
              this.eventObj.listpoint.push(obj.fAreaX, obj.fAreaY)
              Bus.$emit('initialmap', this.eventObj)
            }
            break
          case 'placeName':
            let {fID, fPositionX, fPositionY} = this.placeList.find(e => e.fAreaName == this.userAddress[item])
            this.areaId = fID
            this.eventObj.DM = ''
            this.eventObj.listpoint.push(fPositionX, fPositionY)
            this.eventObj.leval = 16
            console.log('111111', this.eventObj)
            Bus.$emit('initialmap', this.eventObj)
            break
        }
      },
      changePlace() {
        this.placeValue = ''
      },
      clickPlace() {
        this.eventObj.DM = this.placeValue
        console.log(this.eventObj)
        Bus.$emit('initialmap', this.eventObj)
      },
      async getlikeSearchList() {
        if (this.placeValue == '' || this.placeSelected == '1') return
        let params = this.params
        params['param'] = this.placeValue
        params['type'] = ''
        try {
          let res = await this.$http.post('/search/likeSearch.do', params)
          if (res.list.length > 100) {
            res.list = res.list.splice(1, 100)
          }
          this.likeSearchList = res.list
          if (this.likeSearchList.length) {
            this.showlikeSearch = true
          }
        } catch (error) {
          alert(error.message)
        }
      },
      isShowInfo(fType, facilityinfoId) {
        this.showlikeSearch = false
        Bus.$emit('clickShowInfo', {fType: fType, facilityinfoId: facilityinfoId})
      },
      ...mapActions('mapInfo', {'setadressInfo': 'actionsadressInfo'})
    }
}
</script>
<style lang="scss">
    .rightCont{
        color: #D5FDFD;
        width: 100%;
        .select-cont{
           width: 100%;
           height: 7.75rem;
           position: relative;
           margin-top: 2rem;
           .select-item{
              height: 4.4rem;
              background: url('../assets/image/giant.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              padding-left: 1rem;
              width: 26rem;
              .selectop{
                background: url('../assets/image/select-btn.png');
                background-repeat: no-repeat;
                background-size: 0.75rem 0.5rem;
                background-position: 3.2rem 2.1rem;
                width: 5rem;
                padding-right: 2rem;
              }
           }
            .item-facility{
               position: absolute;
               top: 3.5rem;
               left: 2rem;
               .input-selectop{
                   margin-left: 1rem;
               }
               .select-input{
                  width: 17rem;
                  margin-right: 3rem;
               }
               .searchImg{
                 position: absolute;
                 width: 1.5rem;
                 height: 1.5rem;
                 right: 2rem;
                 top: 1.5rem;
               }
               .likeSearch{
                  background: #00195E;
                  width: 20rem;
                  height: 25.5rem;
                  position: absolute;
                  top: 4rem;
                  right: .2rem;
                  overflow-y: scroll;
                  overflow-x: hidden;
               }
               .likeSearchItem{
                 padding: 0 1rem;
                 height:3rem;
               }
               .likeSearchItem:hover {
                 background: #253F7F;
               }
               #placeName{
                //  padding-right: 1rem;
               }
            }
        }
        .right-img{
            height: 24.63rem;
            width: 28.75rem;
            background: url('../assets/image/rightImg.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0.69rem 0;
            .right-top-title{
                padding: 1.3rem;
            }
            .right-top-item{
                margin: 0 1.3rem;
                height: 3.37rem;
                line-height: 3.375rem;
                border-bottom: 1px solid #133C7B;
                .item-right{
                    width: 5.63rem;
                    height: 1.94rem;
                    border-radius: 2rem;
                    background: #4058FF;
                    line-height: 1.94rem;
                }
                .yangan-class{
                    background: #06F0B8;
                    border-radius: 2rem;
                    width: 11.69rem;
                    height: 1.88rem;
                    line-height: 1.88rem;
                }

            }
            img{
                height: 1.25rem;
                width: 1.25rem;
            }
        }
        .right-bottom{
          .people-img{
            width: 1.5rem;
            height: 1.13rem;
          }
          .item-right{
            width: 11.69rem;
            height: 1.88rem;
            line-height: 1.88rem;
            border-radius: 2rem;
            background:linear-gradient(270deg,rgba(56,89,255,1) 0%,rgba(80,252,252,1) 100%);
            margin: 0 1.3rem;
          }
        }
    }
</style>
