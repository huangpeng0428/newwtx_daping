<template>
  <div class="rightWarn">
    <div class="right-top right-img">
      <div class="flex f-between right-top-title">
        <div class="flex vertical">
          <img src="../assets/image/warnIcon.png" >
          <div class="pdd-lr-5">{{ dataConfig.title }}</div>
        </div>
        <div class="flex vertical">
          <!-- <img
            v-if="dataConfig.showNext"
            src="../assets/image/goleft.png" >
          <img
            v-if="dataConfig.showNext"
            class="pdd-lr-10"
            src="../assets/image/goright.png" > -->
          <!-- <img
            class="pointer"
            src="../../assets/image/close.png"
            @click="hiddenInfo" > -->
        </div>
      </div>
      <div class="right-top-cont">
        <div class="right-top-item">
          <div class="adress-right-warn tex-overflow pdd-lr-10">
            {{ dataConfig.warnAdress }}
          </div>
        </div>

        <div
          v-for="(item, index) in dataConfig.infoArr"
          :key="index"
          class="right-top-item">
          <div class="flex vertical">
            <div>{{ item.title }}</div>
            <div
              :class="index == '1' ? 'warn-facility' : ''"
              class="tex-overflow pdd-lr-10">
              {{ item.val }}
            </div>
          </div>
        </div>

        <!-- <div class="right-top-item">
          <div class="flex vertical">
            <div>告警设备：</div>
            <div class="warn-facility tex-overflow pdd-lr-10">
              烟感告警
            </div>
          </div>
        </div>

        <div class="right-top-item">
          <div class="flex vertical">
            <div>设备位置：</div>
            <div
              class="tex-overflow warn-location pdd-lr-10">
              烟感告警烟感告警烟感告警烟感告警烟感告警烟感告警烟感告警烟感告警
            </div>
          </div>
        </div> -->
      </div>
      <div class="flex vertical">
        <div
          class="warn-btn pointer"
          @click="confirmBtn('1')">确认为预警</div>
        <div
          class="warn-btn right pointer"
          @click="confirmBtn('2')">确认为火警</div>
      </div>
      <div class="item-right-warn flex f-between">
        <div class>负责人</div>
        <div class="home-manage">{{ dataConfig.homeManager }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'RightWarn',
    props: {
      dataConfig: {
        type: Object,
        default() {
          return {title: '近期告警任务', haveInfo: false, showNext: true}
        }
      }
    },
    data() {
      return {

      }
    },
    computed: {
    },
    mounted() {
        console.log(this.dataConfig)
    },
    methods: {
      hiddenInfo() {
        this.$emit('hiddenInfo')
      },
      confirmBtn(str) {
          this.$emit('confirmBtn', str)
      }
    }
}
</script>
<style lang="scss">
.rightWarn{
    color: #D5FDFD;
    margin-top: 2.5rem;
    .right-img{
        height: 30.03rem;
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
            .adress-right-warn{
                background: #FF1761;
                width: 11.69rem;
                height: 1.88rem;
                line-height: 1.88rem;
                border-radius:2rem;
            }
            .warn-facility{
                background: #08F0B8;
                width: 11.69rem;
                height: 1.88rem;
                line-height: 1.88rem;
                border-radius:2rem;
            }
            .warn-location{
                width:18rem;
            }
            .item-right{
                width: 5.63rem;
                height: 1.94rem;
                border-radius: 2rem;
                background: #4058FF;
                line-height: 1.94rem;
            }
            .yangan-class{
                background: #06F0B8;
            }
            .border-style{
                border-radius: 2rem;
                width: 11.69rem;
                height: 1.88rem;
                line-height: 1.88rem;
            }

        }
        .warn-btn{
            width: 10.16rem;
            height: 3.44rem;
            line-height:3.44rem;
            border-radius: 1rem;
            background: #E78E1D;
            margin:2.5rem;
            opacity:0.8;
            &.right{
                background:linear-gradient(90deg,#E78E1D 0%,#BE4D9E 100%);
            }
        }
        .warn-btn:hover{
            opacity:1;
        }
        .item-right-warn{
            width: 18.13rem;
            height: 1.88rem;
            border-radius: 2rem;
            background:linear-gradient(90deg,#3858FF 0%,#9B4FFA 100%);
            line-height: 1.88rem;
            margin:0 2.5rem;
            padding:0 2.5rem;
            .home-manage{
                color: #fff;
                font-size:1.55rem;
            }
        }
        .adress-right{
            width: 11.69rem;
            height: 1.88rem;
            line-height: 1.88rem;
            border-radius: 2rem;
            background:linear-gradient(270deg,rgba(56,89,255,1) 0%,rgba(80,252,252,1) 100%);
            margin: 0 1.3rem;
        }
        img{
            height: 1.25rem;
            width: 1.25rem;
        }
    }
}
</style>
