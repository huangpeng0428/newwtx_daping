<template>
  <div class="infoData">
    <div class="right-top right-img">
      <div class="flex f-between right-top-title">
        <div class="flex vertical">
          <img src="../../assets/image/gaojing.png" >
          <div class="pdd-lr-5">{{ dataConfig.title }}</div>
        </div>
        <div class="flex vertical ">
          <img
            v-if="dataConfig.showNext"
            class="pointer"
            src="../../assets/image/goleft.png"
            @click="getNext('left')" >
          <img
            v-if="dataConfig.showNext"
            class="pdd-lr-10 pointer"
            src="../../assets/image/goright.png"
            @click="getNext('right')" >
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
                style="width: 12rem;"
                class="mrg-lr-15 tex-overflow">{{ item.val }}
              </div>
            </div>
            <div
              v-if="item.showHead"
              class="item-right pointer"
              @click="hiddenmanage( showManage = true)">
              负责人
            </div>
          </div>
          <div
            v-if="showManage"
            class="abl manageInfo">
            <div class="manage-common">
              负责人：{{ dataConfig.homeManageInfo.homeManager }}
            </div>
            <div class="manage-common">
              电话：{{ dataConfig.homeManageInfo.homeManagerPhone }}
            </div>
            <img
              class="pointer manage-close"
              src="../../assets/image/close.png"
              @click="hiddenmanage( showManage = false)" >
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
import Bus from '../../bus.js'
export default {
    name: 'InfoData',
    props: {
      dataConfig: {
        type: Object,
        default() {
          return {title: '设备详情', haveInfo: false, showNext: false, showClose: true, showsolt: true}
        }
      }
    },
    data() {
      return {
        showManage: false
      }
    },
    computed: {
    },
    mounted() {
      Bus.$on('showHeander', () => {

      })
    },
    methods: {
      hiddenInfo() {
        this.$emit('hiddenInfo')
      },
      getNext(flag) {
        this.$emit('getNext', flag)
      },
      hiddenmanage() {

      }
    }
}
</script>
<style lang="scss">
.infoData{
    .right-img{
        min-height: 24.63rem;
        width: 28.75rem;
        background: url('../../assets/image/rightImg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0.69rem 0;
        position: relative;
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
        .manageInfo{
          width: 14rem;
          height: 7rem;
          background-image: -webkit-gradient(linear, left top, left bottom, from(#07265d), to(#07265d)),-webkit-gradient(linear, left top, left bottom, from(#2d323b), to(#2d323b));
          background-image: linear-gradient(#07265d, #07265d),linear-gradient(#2d323b, #2d323b);
          z-index: 111;
          text-align: left;
          top: 5rem;
          right: 29.5rem;
        }
        .manage-common{
          padding: 1rem 1rem 0 1rem;
        }
        .manage-close{
          position: absolute;
          top: 0;
          right: 0;
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
