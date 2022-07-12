import i18n from '@common/i18n';
import {getMenuPower} from '@utils/menuTree';
// 企业store，一个用户多个企业
const state = {
  // 企业信息
  entInfo: {},
  // 可切换项目列表
  entList: []
}
/*
* 设置项目名称
* */
const getters = {
  entName: (state) => {
    if (state.entInfo.entName) {
      i18n.setLocaleMessage('zifp', {
        'lang': {
          'domain': 'zifp',
          'financingName': state.entInfo.entName
        }
      })
      return state.entInfo.entName;
    } else {
      return  '融单'
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
  // 切换企业
  changeEnt({commit, state, dispatch},{data,entInfo}) {
    if (data.entList&&data.entList.length) {
      commit('SET_ENT_INFO', entInfo)
    }
    dispatch('menu/setMenuTreeList', data.resList,{ root: true })
    dispatch('menu/setMenuList', data.resList,{ root: true })
    dispatch('menu/setNavMenuActive', '0',{ root: true })
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
