<template>
  <div class="rightCont">
    <div class="select-cont">
      <div class="select-item item-adress flex horizontal">
        <select
          v-for="(value, key) in userAddress"
          :key="key"
          class="selectop tex-overflow"
          onchange="bsheng()">
          <option v-if="value">{{ value }}</option>
          <option v-else>请选择</option>
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
import { mapState } from 'vuex'
export default {
    name: 'RightCont',
    components: {
      infoData
    },
    data() {
      return {
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
      ...mapState('userInfo', ['loginCookie'])
    },
    mounted() {
      this.getAdress()
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
            if (this.userAddress) {

            }
          } catch (error) {
          }
      }
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
