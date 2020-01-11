<template>
  <div class="bottomCont">
    <div class="cont-list flex vertical pointer">
      <div
        v-for="(item, index) in echartsData"
        :key="index"
        :class="[selected == index? 'action': '']"
        class="cont-item"
        @click="clickItem(index)">
        {{ item }}
      </div>
    </div>
    <div class="abs-cont">
      <div v-if="showEchart">
        <week-chart @closeEcharts="closeEcharts"/>
      </div>
      <div
        v-if="showList"
        class="rel region-list">
        <div class="regionimg">地区分布</div>
        <div class="region-item-cont">
          <div class="region-item flex vertical f-between">
            <div class="flex vertical">
              <div class="color-block"/>
              <div class="region-name">丽水市</div>
            </div>
            <div class="region-right flex vertical">
              <div class="region-block">
                <div class="region-color"/>
              </div>
              <div class="region-number">1</div>
              <div class="region-scale">1%</div>
            </div>
          </div>
        </div>
        <img
          class="week-close pointer"
          src="../assets/image/close.png"
          @click="closeEcharts('list')">
      </div>
    </div>
  </div>
</template>
<script>
import weekChart from './common/weekChart'
export default {
    name: 'BottomCont',
    components: {
        weekChart
    },
    data() {
        return {
            echartsData: ['7日数量', '7日状态', '地区分布'],
            showEchart: false,
            showList: false,
            selected: null
        }
    },
    methods: {
        closeEcharts(str) {
            if (str == 'list') this.showList = false
            else this.showEchart = false
            this.selected = null
        },
        clickItem(i) {
            if (i == 2) {
                this.showList = true
                this.showEchart = false
            } else {
                this.showList = false
                this.showEchart = true
            }
            this.selected = i
        }
    }
}
</script>
<style lang="scss">
.bottomCont{
    position: relative;
  .cont-item{
      width:7.13rem;
      height:2.5rem;
      line-height: 2.5rem;
      background:linear-gradient(270deg,rgba(56,89,255,1) 0%,rgba(80,252,252,1) 100%);
      border-radius:2rem;
      margin: 0 0.75rem;
      color: #FFFFFF;
    }
    .action{
        color: rgba(56,89,255,1);
        background: #fff;
    }
    .abs-cont{
        position: absolute;
        transform: translateY(-100%);
        top: -1rem;
        z-index: 100;
        .region-list{
            height: 25rem;
            width: 21rem;
            background: url('../assets/image/left-bg-top.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            .regionimg{
                width: 8rem;
                line-height: 3rem;
                text-align: center;
                height: 3rem;
                background: url('../assets/image/weekicon.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                z-index: 999;
                color: #fff;
                margin-bottom: 2rem;
            }
            .region-item-cont{
                height: 20rem;
                width: 19rem;
                margin: 0 1rem;
                overflow-y: scroll;
                .region-item{
                    margin-bottom: 1rem;
                    color: #fff;
                    .color-block{
                        height: 1.25rem;
                        width: 1.25rem;
                        background: #06F0B8;
                        margin-right: 1rem;
                    }
                    .region-right{
                        // flex: 1;
                        .region-block{
                            width: 8rem;
                            height: 0.88rem;
                            border-radius: .5rem;
                            background:#0F3270;
                            .region-color{
                                border-radius: .5rem;
                                height: 100%;
                                width: 50%;
                                background: #06F0B8;
                            }
                        }
                    }
                }
            }
            .week-close{
                position: absolute;
                width: 1.25rem;
                line-height: 1.25rem;
                top: -0.5rem;
                right: -0.5rem;
            }
        }
    }
}
</style>
