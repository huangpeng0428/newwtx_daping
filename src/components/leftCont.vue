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
          <img src="../assets/image/home.png" >
          <img src="../assets/image/checkall.png" >
          <img src="../assets/image/close.png" >
        </div>
      </div>
      <div class="tex-left flex vertical">
        <span class="fs-87">设备数量总和</span>
        <span class="c-06f pdd-lr-10 fs-175">258588</span>
      </div>
      <div class="list">
        <div class="item pointer flex f-between vertical">
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
      </div>
      <div class="tex-left">
        <span class="fs-87">设备次数统计(前30天)</span>
        <div class="left-echarts">
          <div class="statiStical">
            <line-chart/>
          </div>
          <img src="../assets/image/zuobiao.png">
        </div>
        <div class="fs-87 mrg-tb-15">设备状态统计</div>
        <!-- <div class="flex vertical f-between status-list">
          <div class="status-item-left">
            <div class="status-item-bg"/>
          </div>
          <div class="status-item-right flex vertical">
            <div class="cilcle"/>
            <div class="mrg-lr-10">在线: </div>
            <div>25588 (86%)</div>
          </div>
        </div> -->
        <!-- <div class="item-data">
        </div> -->
        <item-data/>
      </div>
    </div>
  </div>
</template>
<script>
import lineChart from './common/lineChart'
import itemData from './common/itemData'
export default {
    name: 'LeftCont',
    components: {
      lineChart,
      itemData
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
      .title{
        padding: 1.56rem 0;
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
      }
      .left-echarts{
        .statiStical{
          width: 26.19rem;
          height: 9.38rem;
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
    }
}
</style>
