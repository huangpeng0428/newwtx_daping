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
          @click="showconfirmBtn('2')">确认为预警</div>
        <div
          class="warn-btn right pointer"
          @click="showconfirmBtn('1')">确认为火情</div>
      </div>
      <div class="item-right-warn flex f-between">
        <div class>负责人</div>
        <div class="home-manage">{{ dataConfig.homeManager }}</div>
      </div>
      <div class="item-right-warn manager-phone flex f-between">
        <div class>负责人电话</div>
        <div class="home-manage">{{ dataConfig.homeManagerPhone }}</div>
      </div>
    </div>
    <div
      v-if="isconfirmBtn"
      class="confirmBtn-mask">
      <div style="margin-top: 2rem;">{{ desc }}</div>
      <div class="btn-cont flex vertical">
        <div
          class="flex_1 cancel-btn pointer"
          @click="isconfirmBtn = false">取消</div>
        <div
          class="flex_1 confirm-btn pointer"
          @click="confirmBtn">确定</div>
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
          isconfirmBtn: false,
          type: '',
          desc: ''
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
      showconfirmBtn(str) {
          this.type = str
          this.desc = str == '1' ? '真实火情是指已经产生明火燃烧发生了真实火灾，请务必谨慎确认。' : '设备预警是指由于环境或人为等因素干扰而产生的正常设备告警，确认设备预警后，相应的“告警异常”状态会自动解除，从而恢复正常的安全状态。'
          this.isconfirmBtn = true

        //   this.$emit('confirmBtn', str)
      },
      confirmBtn() {
        this.$emit('confirmBtn', this.type)
        this.isconfirmBtn = false
      }
    }
}
</script>
<style lang="scss">
.rightWarn{
    color: #D5FDFD;
    margin-top: 2.5rem;
    .right-img{
        height: 33.03rem;
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
                color: #394e8a;
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
        .manager-phone{
            margin-top: 1rem;
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
    .confirmBtn-mask{
        width: 30rem;
        min-height: 14rem;
        background: url('../assets/image/left-bg-top.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        position: absolute;
        top: 11rem;
        right: 29.5rem;
        padding: 1rem;
        .btn-cont{
            height: 4rem;
            margin-top:2.5rem;
        }
        .flex_1{
            flex:1;
            height: 100%;
            line-height: 4rem;
            border-radius: 1rem;
            background: #3A6EFE;
            margin: 1rem;
            opacity: 0.8;
            font-size: 1.4rem;
        }
        .flex_1:hover{
            opacity: 1;
        }
        .cancel-btn{
            background: #eee;
            color: #000;
        }
    }
}
</style>
