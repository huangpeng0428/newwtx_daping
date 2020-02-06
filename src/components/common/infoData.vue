<template>
  <div class="infoData">
    <div class="right-top right-img">
      <div class="flex f-between right-top-title">
        <div class="flex vertical">
          <img src="../../assets/image/gaojing.png" >
          <div class="pdd-lr-5">{{ dataConfig.title }}</div>
        </div>
        <div class="flex vertical">
          <img
            v-if="dataConfig.showNext"
            src="../../assets/image/goleft.png" >
          <img
            v-if="dataConfig.showNext"
            class="pdd-lr-10"
            src="../../assets/image/goright.png" >
          <img
            v-if="dataConfig.showClose"
            class="pointer"
            src="../../assets/image/close.png"
            @click="hiddenInfo" >
        </div>
      </div>
      <div
        v-if="!dataConfig.showsolt"
        class="right-top-cont">
        <div v-if="dataConfig.haveInfo">
          <div
            v-for="(item,index) in dataConfig.infoArr"
            :key="index"
            class="right-top-item flex vertical f-between">
            <!-- <div class="adress-right tex-overflow pdd-lr-10">
            {{ dataConfig.fAreaName }}
          </div> -->
            <div class="flex vertical">
              <div v-if="item.showtitle">{{ item.title }}</div>
              <div
                v-if="item.showColor"
                class="adress-right tex-overflow pdd-lr-10">
                {{ item.val }}
              </div>
              <div
                v-if="!item.showColor"
                class="mrg-lr-15">{{ item.val }}
              </div>
            </div>
            <div
              v-if="item.showHead"
              class="item-right">
              负责人
            </div>
          </div>
        </div>
        <div v-else>
          暂无
        </div>
      </div>
      <slot v-if="dataConfig.showsolt">
        <p>如果父组件没用插入内容,我将作为默认出现</p>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
    name: 'InfoData',
    props: {
      dataConfig: {
        type: Object,
        default() {
          return {title: '设备详情', haveInfo: false, showNext: true, showClose: true, showsolt: true}
        }
      }
    },
    data() {
      return {

      }
    },
    computed: {
    },
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
