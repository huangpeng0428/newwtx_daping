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
  </div>
</template>
<script>
export default {
    name: 'LeftCont'
}
</script>
<style lang="scss">
.leftCont{
    width: 100%;
    height: 13rem;
    color: #fff;
    font-size: 1.17rem;
    background: url('../assets/image/left-bg-top.png');
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
    }
}
</style>
