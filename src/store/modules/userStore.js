// 用户store
import windowCookie from "@utils/cookie";
import {windowLsStorege,windowSSStorage} from '@utils/storageUtils';

const state = {
  // 用户信息
  userInfo: {},
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    const token = windowCookie.get('XSRF-TOKEN');
    if (userInfo && token) {
      userInfo.token = token;
    }
    state.userInfo = userInfo;
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
  },
  // 退出登录清除相关信息
  logoutToClearUserInfo() {
    //清除local存储的信息
    windowSSStorage.clear()
    let localArr = ['regType','vuexAlong']
    localArr.forEach(item => {
      windowLsStorege.removeItem(item)
    })
    window.clearVuexAlong()
    //清除cookie
    let cookieArr = ['userName','powerArr','XSRF-TOKEN','SESSION']
    cookieArr.forEach(item =>{
      windowCookie.remove(item)
    })
  },
}

const getters = {
  // 校验cookie里面的token和store里面的token是否相同
  isCurrentToken: (state) => () => {
    if (state.userInfo && state.userInfo.userName) {
      return state.userInfo&&state.userInfo.userName&&state.userInfo.token === windowCookie.get('XSRF-TOKEN')
    }
    return true;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
