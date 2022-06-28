import i18n from '@common/i18n';
import {getMenuPower} from '@utils/menuTree';
// 项目store
const state = {
  // 项目信息
  projectInfo: {},
  // 可切换项目列表
  projectList: []
}
/*
* 设置项目名称
* */
const getters = {
  productName: (state) => {
    if (state.projectInfo.productName) {
      i18n.setLocaleMessage('zifp', {
        'lang': {
          'domain': 'zifp',
          'financingName': state.projectInfo.productName
        }
      })
      return state.projectInfo.productName;
    } else {
      return  '融单'
    }
  }
};
const mutations = {
  SET_PROJECT_INFO: (state, projectInfo) => {
    state.projectInfo = projectInfo
  },
  SET_PROJECT_LIST: (state, projectList) => {
    state.projectList = projectList
  }
}
const actions = {
  // 设置项目信息
  setProjectInfo ({ commit }, value) {
    commit('SET_PROJECT_INFO', value)
  },
  // 设置项目列表
  setProjectList ({ commit }, value) {
    commit('SET_PROJECT_LIST', value)
  },
  // 切换项目
  changeProject({commit, state, dispatch},{data,projectInfo}) {
    if (data.projectList&&data.projectList.length) {
      commit('SET_PROJECT_INFO', projectInfo)
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
