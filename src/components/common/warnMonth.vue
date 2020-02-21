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
              ref="confirmState"
              class="warnMonth-item-btn pointer"
              @click="clickResult(item.Result, index)">{{ item.Result }}</div>
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
              class="tex-overflow">{{ item.placePrincipal }}</div>
          </div>
          <div class="padb flex">
            <p>联系人电话：</p>
            <div
              style="width:20.5rem;text-align: left;"
              class="tex-overflow">{{ item.placePrincipalPhone }}</div>
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
              v-text="item.fConfirmState == '0' ? '(未完成)': item.fOperationTime"/>
          </div>
          <div
            v-if="confirmIndex == index && isConfirm"
            class="btn-list">
            <div
              class="confirm-btn btn-style pointer"
              @click="confirmBtn('confirme', item, index)">确认为预警</div>
            <div
              class="fire-btn btn-style pointer"
              @click="confirmBtn('fire', item, index)">确认为火警</div>
            <div
              class="cancel-btn btn-style pointer"
              @click="confirmBtn('cancel', item, index)">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Bus from '../../bus'
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
          isConfirm: false,
          confirmIndex: ''

        //    taskList: []
        }
    },
    computed: {
    ...mapState('userInfo', ['loginCookie'])
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
                if (e.reason == 1 || !e.reason) {
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

                // if (!e.reason) {
                //     e['Result'] = '已完成'
                // }
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
        clickResult(str, i) {
          console.log(i)
            if (str == '未确认') {
                this.confirmIndex = i
                this.isConfirm = true
            }
        },
        async confirmBtn(str, obj, i) {
            if (str == 'cancel') {
              this.isConfirm = false
              return
            }
            let message = str == 'confirme' ? '预警已确认' : '火情已确认'
            let confirmStr = str == 'confirme' ? '设备预警是指由于环境或人为等因素干扰而产生的正常设备告警，确认设备预警后，相应的“告警异常”状态会自动解除，从而恢复正常的安全状态。' : '真实火情是指已经产生明火燃烧发生了真实火灾，请务必谨慎确认。'
            let state = str == 'confirme' ? '2' : '1'
            if (confirm(confirmStr) == true) {
            let params = {
                facilityID: obj.facilityId,
                type: obj.facilityType,
                logID: obj.logId,
                userId: this.loginCookie,
                state: state,
                tableType: obj.tableType,
                timestamp: new Date().getTime(),
                fTime: obj.alarmTime
            }

                // let params = {
                //   facilityID: '321',
                //   type: '0',
                //   logID: '1525704622567',
                //   userId: this.loginCookie,
                //   state: str,
                //   tableType: '',
                //   timestamp: new Date().getTime(),
                //   fTime: '2020-02-13 02:13:32'
                // }

                try {
                let res = await this.$http.post('/realTimeAlarm/confirmAlarm.do', params)
                if (res.state == '0') {
                  alert(message)
                  this.isConfirm = false
                  this.$refs.confirmState[i].innerHTML = '已确认';
                  this.$emit('getTaskList')
                  Bus.$emit('busGetWarningTask')

                  // document.getElementByClassName('confirmState').innerHTML = '已完成';
                } else {
                  alert('未知错误，请稍后再试')
                }
                } catch (error) {
                }
            }
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
            position: relative;
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
                line-height: 2rem;
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
            .btn-list{
                position: absolute;
                top: 7rem;
                right: 0rem;
                width: 10rem;
                height: 11rem;
                background: #0C1738;
                border: 1px solid #205799;
                border-radius: .5rem;
                .btn-style{
                    width: 7rem;
                    height: 2.5rem;
                    line-height: 2.5rem;
                    border-radius: 1rem;
                    margin: 0 auto;
                    margin-top: 1rem;
                    opacity: 0.9;
                }
                .btn-style:hover {
                    opacity: 1;
                }
                .confirm-btn{
                    background: #E8901E;
                }
                .fire-btn{
                    background: #FF1761;
                }
                .cancel-btn{
                    background: #ccc;
                    color: #FF1761;
                }
            }
        }
    }
    img{
        width:1.25rem;
        height:1.25rem;
    }
}
</style>
