const state = {
    adressInfo: {},
    rightInfoBottom: {}
  };

  const getters = {

    returnadressInfo: state => state.adressInfo,
    returnrightInfoBottom: state => state.rightInfoBottom

  };

  const actions = {
    actionsadressInfo(context, adressInfo) {
      context.commit('setadressInfo', adressInfo);
    },
    actionsrightInfoBottom(context, rightInfoBottom) {
      context.commit('setrightInfoBottom', rightInfoBottom);
    }
  };
  const mutations = {
    setadressInfo(state, adressInfo) {
      state.adressInfo = adressInfo;
    },
    setrightInfoBottom(state, rightInfoBottom) {
      state.rightInfoBottom = rightInfoBottom;
    }
  }

  export default {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
  }
