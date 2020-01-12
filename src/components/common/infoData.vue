<template>
  <div class="infoData">
    <div class="right-top right-img">
      <div class="flex f-between right-top-title">
        <div class="flex vertical">
          <img src="../../assets/image/gaojing.png" >
          <div class="pdd-lr-5">近期告警任务</div>
        </div>
        <div class="flex vertical">
          <img src="../../assets/image/goleft.png" >
          <img
            class="pdd-lr-10"
            src="../../assets/image/goright.png" >
          <img
            class="pointer"
            src="../../assets/image/close.png"
            @click="hiddenInfo" >
        </div>
      </div>
      <div class="right-top-cont">
        <div class="adress-right tex-overflow pdd-lr-10">
          宁泰家园
        </div>
        <div class="right-top-item flex vertical f-between">
          <div class="flex vertical">
            <div>告警时间：</div>
            <div class="mrg-lr-15">2020.01.03/14:11:00</div>
          </div>
          <div class="item-right">
            负责人
          </div>
        </div>
        <div class="right-top-item flex vertical f-between">
          <div class="flex vertical">
            <div>告警设备：</div>
            <div class="mrg-lr-15 yangan-class border-style">烟感告警</div>
          </div>
        </div>
        <div class="right-top-item flex vertical f-between">
          <div class="flex vertical">
            <div>告警设备：</div>
            <div class="mrg-lr-15 yangan-class border-style">烟感告警</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'InfoData',
    methods: {
        hiddenInfo() {
            this.$emit('hiddenInfo')
        }
    }
}
</script>
<style lang="scss">
.infoData{
    .right-img{
        height: 24.63rem;
        width: 28.75rem;
        background: url('../../assets/image/rightImg.png');
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
            }
            .border-style{
                border-radius: 2rem;
                width: 11.69rem;
                height: 1.88rem;
                line-height: 1.88rem;
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
