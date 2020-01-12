<template>
  <div class="leftCont">
    <div class="left-cont-top">
      <div class="weath-cont flex f-between vertical">
        <img src="../assets/image/weather.png">
        <div>
          <p>多云转晴</p>
          <p style="color:#0DC1FF;font-size:1.41rem;">28℃-33℃</p>
        </div>
        <div class="day">
          <p style="font-size:1.75rem;">周五12:35</p>
          <p>2020年01月03日</p>
        </div>
      </div>
      <div class="number-cont flex f-evenly vertical">
        <div>
          <p>质量</p>
          <p>80%</p>
        </div>
        <div>
          <p>PM2.5</p>
          <p>90</p>
        </div>
        <div>
          <p>湿度</p>
          <p>80%</p>
        </div>
      </div>
    </div>
    <div class="left-cont-bottom">
      <div class="flex title f-between vertical">
        <div class="flex vertical">
          <img src="../assets/image/tongji.png" >
          <span class="pdd-lr-5">设备数量统计</span>
        </div>
        <div>
          <img
            class="pointer"
            src="../assets/image/home.png"
            @click="showInfo('isShowList', false)" >
          <img src="../assets/image/checkall.png" >
          <img src="../assets/image/close.png" >
        </div>
      </div>
      <div class="tex-left flex vertical f-between">
        <div class="flex vertical">
          <span class="fs-87">设备数量总和</span>
          <span class="c-06f pdd-lr-10 fs-175">258588</span>
        </div>
        <div class="left-adress tex-overflow ">浙江省</div>
      </div>
      <div v-if="!isShowList">
        <div class="list">
          <div
            class="item pointer flex f-between vertical "
            @mouseenter="mouseEvent(true)"
            @mouseleave="mouseEvent(false)"
            @click="showInfo('isShowList', true)">
            <div class="flex">
              <img
                class="pdd-lr-10"
                src="../assets/image/yangan.png" >
              <span>智能烟感</span>
            </div>
            <div class="flex vertical">
              <span class="pdd-lr-10 fs-188 item-num">8635</span>
              <span>个</span>
              <img
                class="pdd-lr-10"
                style="width:0.56rem;height:0.88rem;"
                src="../assets/image/greenright.png">
            </div>
          </div>
          <div
            v-if="showMask"
            class="mask-info">
            <div class="mask-title flex vertical f-between">
              <div class="flex">
                <img
                  class="pdd-lr-10"
                  src="../assets/image/yangan.png" >
                <span>智能烟感</span>
              </div>
              <div class="flex vertical">
                <span>总计：</span>
                <span style="font-size:1.5rem">211</span>
              </div>
            </div>
            <div class="mask-cont">
              <item-data :item-style="itemStyle"/>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isShowList"
        class="adress-list">
        <div class="flex f-between vertical pointer item">
          <div class="flex vertical">
            <div class="cilcle mrg-lr-5"/>
            <span>在线</span>
            <span>告警</span>
            <span>测试时候</span>
          </div>
          <img
            class="pointer pdd-lr-10"
            src="../assets/image/lbIcon.png"
            @click="showInfo('isShowInfo', true)">
        </div>
      </div>
      <div class="tex-left">
        <span class="fs-87">设备次数统计(前30天)</span>
        <div class="left-echarts">
          <div class="statiStical">
            <line-chart/>
          </div>
          <img src="../assets/image/zuobiao.png">
        </div>
      </div>
      <div class="tex-left fs-87 mrg-tb-15">设备状态统计</div>
      <item-data/>
      <div
        v-if="isShowInfo"
        class="abl-info">
        <info-data @hiddenInfo="hiddenInfo"/>
      </div>
    </div>
  </div>
</template>
<script>
import lineChart from './common/lineChart'
import itemData from './common/itemData'
import infoData from './common/infoData'
export default {
    name: 'LeftCont',
    components: {
      lineChart,
      itemData,
      infoData
    },
    data() {
      return {
        showMask: false,
        isShowInfo: false,
        isShowList: false,
        itemStyle: {
          width: '8rem',
          height: '0.5rem'
        }
      }
    },
    methods: {
      mouseEvent(showMask) {
        this.showMask = showMask
      },
      showInfo(res, flat) {
        this[res] = flat
        this.showMask = false
      },
      hiddenInfo() {
        this.isShowInfo = false
      }
    }
}
</script>
<style lang="scss">
.leftCont{
    width: 100%;
    .left-cont-top {
      background: url('../assets/image/left-bg-top.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 13rem;
      color: #fff;
      font-size: 1.17rem;
      .weath-cont{
          width: 80%;
          margin: 0 auto;
          padding: 1.31rem 0 1.44rem 0;
          img{
              height: 4.25rem;
              width: 4.25rem;
          }
          .day{
              color: #D3FBFB;
          }
      }
      .number-cont{
          width: 80%;
          margin: 0 auto;
          height: 4.94rem;
          background: url('../assets/image/giant.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
      }
    }
    .left-cont-bottom{
      color: #D5FDFD;
      height: 46.25rem;
      margin-top: 0.69rem;
      padding: 0 1.25rem;
      background: url('../assets/image/Rectangle.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      .title{
        padding: 1.56rem 0 1rem 0;
      }
      .left-adress{
        max-width:7.13rem;
        height:2rem;
        line-height: 2rem;
        border:0px solid rgba(31,99,163,1);
        background:linear-gradient(270deg,rgba(56,89,255,1) 0%,rgba(80,252,252,1) 100%);
        border-radius:2rem;
        padding: 0 1rem;
      }
      .list{
        margin-bottom: 1rem;
        height: 14rem;
        overflow-y: scroll;
        overflow-x: hidden;
        .item{
          width: 100%;
          height: 2.5rem;
          border: 1px solid #1F63A3;
          border-radius: 1.5rem;
          margin: 1rem 0;
          .item-num{
            font-family:zcoolqingkehuangyouti;
          }
        }
        .item:hover {
          background-color: #0D73C7;
        }
        .mask-info{
          width: 20rem;
          height: 12rem;
          margin: 0 2rem;
          background: url('../assets/image/mask.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: -4rem;
          .mask-title{
            padding:.5rem 0;
            margin: 0 1rem 1rem 1rem;
            border-bottom: 1px solid #1F63A3;
          }
          .mask-cont{
            width: 85%;
            height: 6.5rem;
            overflow-y: scroll;
            overflow-x: hidden;
            margin: 0 auto;
          }
        }
      }
      .adress-list{
        margin: 1rem 0;
        height: 15rem;
        overflow-y: scroll;
        overflow-x: hidden;
        .cilcle{
          width: 0.6rem;
          height: 0.6rem;
          background: #D3FBFB;
          border-radius: 0.3rem;
        }
        .item{
          padding: 0.5rem 0;
        }
        .item:hover {
          background-color: #0D73C7;
        }
        img{
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      .left-echarts{
        .statiStical{
          width: 26.19rem;
          height: 8.38rem;
        }
        img{
          width: 100%;
        }
      }
      // .status-list{
      //   .status-item-left{
      //     width: 10rem;
      //     height: 0.88rem;
      //     background: #0F3270;
      //     margin-bottom: 1rem;
      //     border-radius: 1rem;
      //     .status-item-bg{
      //       background: #8252FD;
      //       width: 86%;
      //       height: 0.88rem;
      //       border-radius: 1rem;
      //     }
      //   }
      //   .status-item-right{
      //     font-size: 0.87rem;
      //     .cilcle{
      //       width: 0.88rem;
      //       height: 0.88rem;
      //       background: #8252FD;
      //       border-radius: 50%;
      //     }
      //   }

      // }
      img{
        width: 1.25rem;
        height: 1.25rem;
      }
      .abl-info{
        position: absolute;
        top: 0;
        transform: translateX(100%);
        z-index: 1000;
      }
    }
}
</style>
