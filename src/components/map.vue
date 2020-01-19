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
import Bus from '../bus.js'
import AMap from 'AMap'
import { mapGetters } from 'vuex'
export default {
  name: 'MyMap',
  data() {
    return {
      map: null,
      styleObject: [],
      mass: null,
      data_info: [{'lnglat': [118.85, 31.95], 'name': '盛安大道001', 'fid': '2001032121122529', 'co': 0, 'electricity': 0, 'fire': 1, 'smoke': 0, 'video': 0, 'water': 0}],
      marker: null
    };
  },
  computed: {
      ...mapGetters('mapInfo', {'adressInfo': 'returnadressInfo'})
  },
  watch: {
    adressInfo: {
      handler(val) {
        this.getmark(val)
      }
    }
  },
  mounted() {
    this.initMap();
    Bus.$on('initialmap', ({DM, listpoint, leval}) => {
      console.log(DM, listpoint, leval)

      this.initsiteMap(DM, listpoint, leval)
    })

    // this.initMark()
  },
  methods: {
    initMap() {
      this.map = new AMap.Map('map-cont', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/darkblue'
      });

      this.styleObject = [{
        url: require('../assets/image/mark1.png'),  // 图标地址
        anchor: new AMap.Pixel(25, 25), // 图标显示位置偏移量，基准点为图标左上角
        size: new AMap.Size(50, 50)    // 图标大小
      }];
      console.log(this.data_info)
      this.mass = new AMap.MassMarks(this.data_info, {
        zIndex: 111,
        cursor: 'pointer',
        style: this.styleObject
      })

      this.addMarkers()
    },
    addMarkers() {
      this.marker = new AMap.Marker({content: ' ', map: this.map});
      console.log(this.marker)

      // this.mass.on('mouseover', openInfo);
      // this.mass.on('mouseout', closeInfo);
      // this.mass.on('click', getList);
      this.mass.setMap(this.map);
    },
    initsiteMap(DM, listpoint, leval) {
      let x = Number(listpoint[0]) || NaN;
      let y = Number(listpoint[1]) || NaN;
      if (DM != '') {
        this.map.setZoom(leval)
        this.map.setCity(DM);
      } else {
        this.map.setZoom(leval)
        this.map.setCenter(new AMap.LngLat(x, y));// 初始化地图,设置中心点坐标和地图级别
      }
    },
    getmark({province, city, prefecture, areaName, placeName}) {

      // let params = {
      //   userID: this.loginCookie,
      //   prefecture: this.userAddress.prefecture
      // }
      // console.log()
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
