import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import mapInfo from './modules/mapInfo'
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    userInfo,
    mapInfo
  }
});
