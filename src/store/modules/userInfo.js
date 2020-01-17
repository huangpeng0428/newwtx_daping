const state = {
  loginCookie: ''
};

const getters = {

  returnloginCookie: state => state.loginCookie

};

const actions = {
  actionsloginCookie(context, loginCookie) {
    context.commit('setloginCookie', loginCookie);
    }
}
const mutations = {
    setloginCookie(state, loginCookie) {
        state.loginCookie = loginCookie;

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
