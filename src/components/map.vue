<template>
  <div class="map-container">
    <div id="map-cont" />
    <!-- <img
      class="abl-img"
      src="../assets/image/mapbg.png"> -->
    <span class="map-title">数据屏监控</span>
  </div>
</template>
<script>
import AMap from 'AMap'
export default {
  name: 'MyMap',
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new AMap.Map('map-cont', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/darkblue'
      });

    }
  }
};
</script>
<style lang="scss">
.map-container{
  width: 76.13rem;
  height: 55rem;
  position: relative;
  .abl-img{
    position:absolute;
    width: 77.53rem;
    height: 39.5rem;
    left: 0;
    top: 0;
  }
  .map-title{
    position: absolute;
    color: #50FCFC;
    font-size: 1.25rem;
    left: 46.5%;
    top: 15px;
  }
  #map-cont{
    width: 100%;
    height: 54rem;
    margin: 2.5rem auto 0;
  }
}
</style>
