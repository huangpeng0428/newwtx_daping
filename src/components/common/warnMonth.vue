<template>
  <div class="warnMonth">
    <div class="warnMonth-cont">
      <div class="warnMonth-cont-title f-between flex">
        <div class="flex vertical">
          <img
            style="width:2rem;"
            src="../../assets/image/warnmonth.png" >
          <p style="margin-left:.3rem;">历史告警记录</p>
        </div>
        <img
          class="warn-close pointer"
          src="../../assets/image/close.png"
          @click="hiddenWarn" >
      </div>
      <div class="warnMonth-list">
        <div
          v-for="(item, index) in taskList"
          :key="index"
          class="warnMonth-item">
          <div class="padb flex f-between">
            <p>告警时间：{{ item.alarmTime }}</p>
            <div
              class="warnMonth-item-btn pointer"
              @click="clickResult(item.Result)">{{ item.Result }}</div>
          </div>
          <div class="padb flex vertical">
            <p>告警设备：</p>
            <div class="warnMonth-item-rqtype flex vertical horizontal">
              <img
                :src="item.imgUrl"
                style="height:1.2rem;width:1.5rem;">
              <div>{{ item.text }}</div>
            </div>
          </div>
          <div class="padb flex">
            <p>告警地址：</p>
            <div
              style="width:20.5rem;text-align: left;"
              class="tex-overflow">{{ item.placeAddress }}{{ item.placeName }}{{ item.facilitySecondPosition }}</div>
          </div>
          <div class="padb flex">
            <p>告警原因：</p>
            <div
              v-if="item.reason"
              style="width:20.5rem;text-align: left;"
              class="tex-overflow"
              v-text="item.reason == '1' ? '烟雾告警': '拆卸告警'"/>
            <div
              v-else
              style="width:20.5rem;text-align: left;"
              class="tex-overflow"
            >无</div>
          </div>
          <div class="padb flex">
            <p>联系人：</p>
            <div
              style="width:20.5rem;text-align: left;"
              class="tex-overflow">{{ item.placePrincipal }}{{ item.placePrincipalPhone }}</div>
          </div>
          <div class="padb flex">
            <p>处理人：</p>
            <div
              style="width:20.5rem;text-align: left;"
              class="tex-overflow"
              v-text="item.fConfirmState == '0'? '(未处理)': item.fOperatorUserName"/>
          </div>
          <div class="padb flex">
            <p >处理电话：</p>
            <div
              style="width:20.5rem;text-align: left;"
              class="tex-overflow"
              v-text="item.fConfirmState == '0'? '(未处理)': item.fOperatorUserPhone"/>
          </div>
          <div class="padb flex">
            <p>处理完成时间：</p>
            <div
              style="width:18.5rem;text-align: left;"
              class="tex-overflow"
              v-text="item.fConfirmState == '0' || item.fConfirmState == '1'? '(未完成)': item.fOperationTime"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        taskList: {
           type: Array,
           default() {
               return []
           }
       }
    },
    data() {
        return {

        //    taskList: []
        }
    },
    watch: {
      taskList: {
        handler(val) {
            val.forEach(e => {
                switch (e.facilityType) {
                    case '0':
                    e['imgUrl'] = require('../../assets/image/type_smoke.png')
                    e['text'] = '烟感告警'
                    break;
                    case '1':
                    e['imgUrl'] = require('../../assets/image/type_gas.png')
                    e['text'] = '气感告警'
                    break;
                    case '2':
                    case '5':
                    case '6':
                    e['imgUrl'] = require('../../assets/image/type_water.png')
                    e['text'] = '液位液压告警'
                    break;
                    case '3':
                    e['imgUrl'] = require('../../assets/image/type_electric.png')
                    e['text'] = '电感告警'
                    break;
                    case '4':
                    e['imgUrl'] = require('../../assets/image/type_smoke.png')
                    e['text'] = '监控告警'
                    break;
                    case '7':
                    e['imgUrl'] = require('../../assets/image/type_FireHydrant.png')
                    e['text'] = '消防栓告警'
                    break;
                    default:
                    e['imgUrl'] = require('../../assets/image/type_smoke.png')
                    e['text'] = '烟感告警'
                }
                if (e.reason == 1) {
                    switch (e.fConfirmState) {
                        case '0':
                            e['Result'] = '未确认'
                            break;
                        case '1':
                            e['Result'] = '已确认'
                            break;
                        case '2':
                            e['Result'] = '已完成'
                            break;
                    }
                    if (e.fFireOverState == '1') {
                        e['Result'] = '已完成'
                    }
                }

                if (e.reason == 10) {
                    switch (e.fFireOverState) {
                        case '0':
                            e['Result'] = '未恢复'
                            break;
                        case '1':
                            e['Result'] = '已恢复'
                            break;
                    }
                }

                if (!e.reason) {
                    e['Result'] = '未确认'
                }
            })
            }
        }
    },
    mounted() {
    },
    methods: {
        hiddenWarn() {
            this.$emit('hiddenWarn')
        },
        clickResult() {
            console.log(11)
        }
    }
}
</script>
<style lang="scss">
.warnMonth-cont{
    width: 28.75rem;
    color: #D5FDFD;
    height: 54.2rem;
    margin-top: 0.69rem;
    padding: 0 1.25rem;
    background: url('../../assets/image/Rectangle.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    z-index:99999;
    .warnMonth-cont-title{
        padding: 1.3rem 0;
    }
    .warnMonth-list{
        height: 49rem;
        overflow-y: scroll;
        overflow-x: hidden;
        .warnMonth-item{
            padding: 1rem 0;
            border-bottom:1px solid #3E72D1;
            .padb{
                padding-bottom:.5rem;
            }
            .warnMonth-item-btn{
                width: 6rem;
                height: 2rem;
                border-radius: 1.5rem;
                background: #b56a08;
                font-size: 1rem;
                margin-right:2rem;
            }
            .warnMonth-item-rqtype{
                width: 15rem;
                height: 2.5rem;
                border-radius: 2rem;
                border: solid 1px #a0ecff;
                text-align: center;
                // display: inline-block;
                // line-height: 2.5rem;
            }
        }
    }
    img{
        width:1.25rem;
        height:1.25rem;
    }
}
</style>
