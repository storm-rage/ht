import {getMenuPower} from '@utils/menuTree';
// 企业store，一个用户多个企业
const state = {
  // 企业信息
  entInfo: {},
  // 可切换项目列表
  entList: []
}
/*
* 设置企业名称
* */
const getters = {
  entName: (state) => {
    if (state.entInfo.entName) {
      return state.entInfo.entName;
    }
  }
};
const mutations = {
  SET_ENT_INFO: (state, entInfo) => {
    state.entInfo = entInfo
  },
  SET_ENT_LIST: (state, entList) => {
    state.entList = entList
  }
}
const actions = {
  // 设置企业信息
  setEntInfo ({ commit }, value) {
    commit('SET_ENT_INFO', value)
  },
  // 设置企业列表
  setEntList ({ commit }, value) {
    commit('SET_ENT_LIST', value)
  },
  //保存企业信息
  saveEntInfo({commit}, entList) {
    // 设置项目列表
    commit('SET_ENT_LIST', entList)
    if (entList && entList.length) {
      commit('SET_ENT_INFO', entList[0]);
    }
  },
  // 切换企业
  changeEnt({commit, state, dispatch},{data,entInfo}) {
    if (data.entList&&data.entList.length) {
      commit('SET_ENT_INFO', entInfo)
    }
    dispatch('menu/saveMenuTreeList', data.resList,{ root: true })
    // dispatch('menu/setNavMenuActive', '0',{ root: true })
    dispatch('user/setUserPower', getMenuPower(data.resList),{ root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
