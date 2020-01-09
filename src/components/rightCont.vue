<template>
  <div class="rightCont">
    <div class="select-cont">
      <div class="select-item item-adress flex horizontal">
        <select
          id="sheng"
          class="selectop"
          onchange="bsheng() ">
          <option>请选择</option>
        </select>
        <select
          id="sheng"
          class="selectop"
          onchange="bsheng() ">
          <option>请选择</option>
        </select>
        <select
          id="sheng"
          class="selectop"
          onchange="bsheng() ">
          <option>请选择</option>
        </select>
        <select
          id="sheng"
          class="selectop"
          onchange="bsheng() ">
          <option>请选择</option>
        </select>
      </div>
      <div class="select-item item-facility flex f-between">
        <select
          id="sheng"
          class="selectop input-selectop"
          onchange="bsheng() ">
          <option>搜索设备</option>
        </select>
        <input
          class="select-input"
          placeholder="输入您需要搜索的关键词">
      </div>
    </div>
    <div class="right-top right-img">
      <div class="flex f-between right-top-title">
        <div class="flex vertical">
          <img src="../assets/image/gaojing.png" >
          <div class="pdd-lr-5">近期告警任务</div>
        </div>
        <div class="flex vertical">
          <img src="../assets/image/goleft.png" >
          <img
            class="pdd-lr-10"
            src="../assets/image/goright.png" >
          <img src="../assets/image/close.png" >
        </div>
      </div>
      <div class="right-top-cont">
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
            <div class="mrg-lr-15 yangan-class">烟感告警</div>
          </div>
        </div>
        <div class="right-top-item flex vertical f-between">
          <div class="flex vertical">
            <div>告警设备：</div>
            <div class="mrg-lr-15 yangan-class">烟感告警</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'RightCont'
}
</script>
<style lang="scss">
    .rightCont{
        color: #D5FDFD;
        width: 100%;
        .select-cont{
           width: 100%;
           height: 7.75rem;
           position: relative;
           margin-top: 2rem;
           .select-item{
              height: 4.4rem;
              background: url('../assets/image/giant.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              padding-left: 1rem;
              width: 26rem;
              .selectop{
                background: url('../assets/image/select-btn.png');
                background-repeat: no-repeat;
                background-size: 0.75rem 0.5rem;
                background-position: 4.2rem 2.2rem;
                width: 6rem;
                padding-right: 2rem;
              }
           }
            .item-facility{
               position: absolute;
               top: 3.5rem;
               left: 2rem;
               .input-selectop{
                   margin-left: 1rem;
               }
               .select-input{
                  width: 16rem;
                  margin-right: 2rem;
               }
            }
        }
        .right-top{
            height: 24.63rem;
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
                .item-right{
                    width: 5.63rem;
                    height: 1.94rem;
                    border-radius: 2rem;
                    background: #4058FF;
                    line-height: 1.94rem;
                }
                .yangan-class{
                    background: #06F0B8;
                    border-radius: 2rem;
                    width: 11.69rem;
                    height: 1.88rem;
                    line-height: 1.88rem;
                }

            }
            img{
                height: 1.25rem;
                width: 1.25rem;
            }
        }
    }
</style>
