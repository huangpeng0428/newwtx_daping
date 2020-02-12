<template>
  <div class="map-container">
    <div id="map-cont" />
    <img
      class="abl-img"
      src="../assets/image/map_bg.png">
    <span class="map-title">数据屏监控</span>
  </div>
</template>
<script>
import Bus from '../bus.js'
import AMap from 'AMap'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'MyMap',
  data() {
    return {
      map: {},
      styleObject: [],
      mass: {},
      data_info: [],
      rightInfoBottom: {},
      marker: null,
      icon: require('../assets/image/mark1.png')
    };
  },
  computed: {
    ...mapState('userInfo', ['loginCookie']),
    ...mapGetters('mapInfo', {'adressInfo': 'returnadressInfo'})
  },
  watch: {
    adressInfo: {
      handler(val) {

        // console.log(val)
        // if (this.map) this.map.remove(this.mass)

        // this.mass = null
        this.data_info = []

        this.getmark(val)
      }
    }
  },
  mounted() {

    this.initMap(this.icon);
    Bus.$on('initialmap', ({DM, listpoint, leval}) => {

      // console.log(DM, listpoint, leval)

      this.initsiteMap(DM, listpoint, leval)
    })

    Bus.$on('changeIcon', () => {

      // let icon = require('../assets/image/warnIcon.png')

      // this.initMap(icon);

      // console.log(DM, listpoint, leval)

      // this.initsiteMap(DM, listpoint, leval)
      this.map.remove(this.marker)

      // this.styleObject = [{
      //   url: require('../assets/image/warn.png'),  // 图标地址
      //   anchor: new AMap.Pixel(16, 16), // 图标显示位置偏移量，基准点为图标左上角
      //   size: new AMap.Size(25, 25)    // 图标大小
      // }];
      // console.log(this.styleObject)

      // this.addMarkers()

    })

    // this.initMark()
  },
  methods: {
    ...mapActions('mapInfo', {'setrightInfoBottom': 'actionsrightInfoBottom'}),
    initMap(icon) {
      this.map = new AMap.Map('map-cont', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        mapStyle: 'amap://styles/darkblue'
      });

      this.styleObject = [{
        url: icon,  // 图标地址
        anchor: new AMap.Pixel(25, 25), // 图标显示位置偏移量，基准点为图标左上角
        size: new AMap.Size(50, 50)    // 图标大小
      }];

      // this.mass = new AMap.MassMarks(this.data_info, {
      //   zIndex: 111,
      //   cursor: 'pointer',
      //   style: this.styleObject
      // })

      // this.addMarkers()
    },
    addMarkers() {
      console.log(this.styleObject)
      this.mass = new AMap.MassMarks(this.data_info, {
        zIndex: 999,
        cursor: 'pointer',
        style: this.styleObject
      })
      this.marker = new AMap.Marker({content: ' ', map: this.map});

      this.mass.on('mouseover', this.openInfo);

      this.mass.on('mouseout', this.closeInfo);

      this.mass.on('click', this.getList);
      this.mass.setMap(this.map);
    },

    getList(e) {
      Bus.$emit('leftPost', e.data.fid)
      this.setrightInfoBottom(this.righInfoBottom)
    },
    closeInfo() {
      this.map.clearInfoWindow();
    },
    async openInfo(e) {
      let params = {}
      params['placeId'] = e.data.fid
      try {
        let res = await this.$http.post('/location/getPlace.do', params)
        this.righInfoBottom = res.list[0]
        let {fAreaName, fVillagePrincipal, fAreaPrincipal, fAreaPhone, fAreaAddress} = res.list[0]
        this.openMask(fAreaName, fVillagePrincipal, fAreaPrincipal, fAreaPhone, fAreaAddress, e.data.lnglat)
      } catch (error) {
        }
    },
    openMask(fAreaName, fVillagePrincipal, fAreaPrincipal, fAreaPhone, fAreaAddress, lnglat) {
      if (fAreaName == null) fAreaName = '无'
      if (fVillagePrincipal == null) fVillagePrincipal = '无'
      if (fAreaPrincipal == null) fAreaPrincipal = '无'
      if (fAreaPhone == null) fAreaPhone = '无'
      if (fAreaAddress == null) fAreaAddress = '无'
      let infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30),
        isCustom: true,
        autoMove: true,
        content: "<div style='text-align: left;width:20rem;height:9rem;background:rgba(33,82,162,0.7);border-radius:1rem;border:solid 1px #cb1bbc;padding:0.12rem 0.1rem;'><p style='margin-top:0.04rem;font-size:0.14rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowarp;'>场所名称：" + fAreaName + '</p>' +
           "<p style='margin-top:0.04rem;font-size:0.14rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowarp;'>法人：" + fVillagePrincipal + '</p>' +
           "<p style='margin-top:0.04rem;font-size:0.14rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowarp;'>紧急联系人：" + fAreaPrincipal + '</p>' +
           "<p style='margin-top:0.04rem;font-size:0.14rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowarp;'>电话：" + fAreaPhone + '</p>' +
           "<p style='margin-top:0.04rem;font-size:0.14rem;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowarp;'>地址：" + fAreaAddress + '</p></div>'
      });
      infoWindow.open(this.map, lnglat);
    },
    initsiteMap(DM, listpoint, leval) {
      let x, y
      if (listpoint.length) {
        x = Number(listpoint[0])
        y = Number(listpoint[1])
      }

      if (DM != '') {
        this.map.setZoom(leval)
        this.map.setCity(DM);
      } else {
        this.map.setZoom(leval)
        this.map.setCenter(new AMap.LngLat(x, y));// 初始化地图,设置中心点坐标和地图级别
      }
    },
    async getmark({province, city, prefecture, areaName, placeName, placeId}) {
      if (this.map) this.map.remove(this.mass)

      // this.mass = null

      let params = {
        userId: this.loginCookie,
        province: province
      }

      if (city != '') {
        params['city'] = city;
      }
      if (prefecture != '') {
        params['prefecture'] = prefecture;
      }
      if (areaName != '') {
        params['areaName'] = areaName;
      }
      if (placeName != '') {
        params['placeId'] = placeId;
      }

      try {
        let res = await this.$http.post('/location/getPosition.do', params)
        let placeList = res.list
        for (let i = 0; i < placeList.length; i++) {
          let list = {
            lnglat: [Number(placeList[i].fPositionX), Number(placeList[i].fPositionY)],
            name: placeList[i].fAreaName,
            fid: placeList[i].fID,
            co: placeList[i].co,
            electricity: placeList[i].electricity,
            fire: placeList[i].fire,
            smoke: placeList[i].smoke,
            video: placeList[i].video,
            water: placeList[i].water
          };
          this.data_info.push(list);
        }

        // console.log(this.data_info)
        this.addMarkers()
      } catch (error) {
      }
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
    width: 76.2rem;
    left: 0;
    top: -2.8rem;
  }
  .map-title{
    position: absolute;
    color: #50FCFC;
    font-size: 1.25rem;
    left: 46%;
    top: -10px;
  }
  #map-cont{
    border: 2px solid #2A5B9C;
    border-top: none;
    width: 100%;
    height: 54rem;
    // margin: 2.5rem auto 0;
  }
}
</style>
