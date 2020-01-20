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
      <div class="right-img flex vertical ">
        <img
          class="nomalIcon"
          src="../assets/image/logo.png"
          alt="">
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
      </div>
    </div>
  </div>
</template>
<script>
import MyMap from '../components/map';
import LeftCont from '../components/leftCont';
import RightCont from '../components/rightCont';
import bottomCont from '../components/bottomCont';
import { mapState, mapGetters } from 'vuex'
import util from '../lib/util'
export default {
  components: {
    MyMap,
    LeftCont,
    RightCont,
    bottomCont
  },
  data() {
    return {
      title: '智慧消防可视化监控中心',
      params: null,
      communicationNum: 0,
      allAountMonth: 0,
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
