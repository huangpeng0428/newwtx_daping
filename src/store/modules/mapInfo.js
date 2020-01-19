const state = {
    adressInfo: {}
  };

  const getters = {

    returnadressInfo: state => state.adressInfo

  };

  const actions = {
    actionsadressInfo(context, adressInfo) {
      context.commit('setadressInfo', adressInfo);
      }
  }
  const mutations = {
      setadressInfo(state, adressInfo) {
          state.adressInfo = adressInfo;
          console.log(state)

          // state.loginCookie = Vue.prototype.cookies.get("loginCookie");
      }
  }

  export default {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
  }
