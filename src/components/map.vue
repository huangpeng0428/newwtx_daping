<template>
  <div class="map-container">
    <div id="map-cont" />
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
  width: 58.13rem;
  height: 36.44rem;
  #map-cont{
    width: 100%;
    height: 100%;
  }
}
</style>
