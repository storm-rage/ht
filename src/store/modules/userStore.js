// 用户store
const state = {
  // 用户信息
  userInfo: {},
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  CLOSE_USER_SIGNZJDJBFLAG: (state) => {
    state.userInfo.signZJDJBFlag = false
  },
  SET_USER_POWER:(state, power) => {
    state.userInfo.power = power
  }
}

const actions = {
  // 设置用户信息
  setUserInfo ({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
  },
  // 修改登录时弹出的资金登记簿
  closeUserSignZJDJBFlag({commit}){
    commit('CLOSE_USER_SIGNZJDJBFLAG')
  },
  //设置权限url
  setUserPower({ commit },power) {
    commit('SET_USER_POWER', power)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
