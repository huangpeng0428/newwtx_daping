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
          class="selectop input-selectop"
          onchange="bsheng() ">
          <option>搜索设备</option>
        </select>
        <input
          class="select-input"
          placeholder="输入您需要搜索的关键词">
      </div>
    </div>
    <info-data/>
    <info-data/>
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
        }
      }
    },
    computed: {
      ...mapState('userInfo', ['loginCookie']),
      newNserAddress() {
        return JSON.parse(JSON.stringify(this.userAddress))
      }
    },
    watch: {
      'newNserAddress': {
        handler(newval, oldval) {
          if (newval.province != '' && newval.province != oldval.province) {
            this.getAllCity()

            this.userAddress.city = ''
            this.userAddress.prefecture = ''
            this.userAddress.areaName = ''
            this.userAddress.placeName = ''
            this.prefectureList = []
            this.placeList = []
            this.areaList = []
            newval.city = ''
          }
          if (newval.city != '' && newval.city != oldval.city) {
            this.userAddress.prefecture = ''
            this.userAddress.areaName = ''
            this.userAddress.placeName = ''
            newval.prefecture = ''
            this.areaList = []
            this.placeList = []
            this.getAllPrefecture()
          }
          if (newval.prefecture != '' && newval.prefecture != oldval.prefecture) {
            this.userAddress.areaName = ''
            this.userAddress.placeName = ''
            newval.areaName = ''
            this.placeList = []

            // this.userAddress.placeName = ''
            this.getAllArea()
          }
          if (newval.areaName != '' && newval.areaName != oldval.areaName) {
            this.userAddress.placeName = ''

            // this.userAddress.placeName = ''
            this.getAllPlace()
          }

          // if (newval.placeName != '' && newval.placeName != oldval.placeName) {
          //   console.log(11)

          //   // this.userAddress.placeName = ''
          //   this.getAllPlace()
          // }
          newval['placeId'] = this.areaId

          // console.log('newval', newval)
          this.setadressInfo(newval)
        },
        deep: true
      }
    },
    async mounted() {
      await this.getAdress()
      this.getAllProvince()

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
            Bus.$emit('initialmap', this.eventObj)
            break
        }
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
                  width: 16rem;
                  margin-right: 2rem;
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
