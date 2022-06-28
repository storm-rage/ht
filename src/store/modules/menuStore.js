import {getMenuTreeList} from '@utils/menuTree';
// 菜单store
const state = {
  // 菜单列表
  menuList: [],
  // 树状菜单列表
  menuTreeList: [],
  // 当前导航菜单index
  navMenuActive: 0,
  // 菜单折叠标志
  collapseFlag: false,
  //选中的路由
  menuActive:'',
  // 展开菜单
  menuOpen: false,
  // 全展
  menuOpenList:[]
}

const mutations = {
  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList
  },
  SET_MENU_TREE_LIST: (state, menuTreeList) => {
    state.menuTreeList = menuTreeList
  },
  SET_NAV_MENU_ACTIVE: (state, navMenuActive) => {
    state.navMenuActive = navMenuActive
  },
  SET_COLLAPSE_FLAG: (state, collapseFlag) => {
    state.collapseFlag = collapseFlag
  },
  //设置选中
  SET_MENU_ACTIVE(state, menuActive){
    state.menuActive = menuActive
  },
  //设置菜单展开
  SET_MENU_OPEN(state, menuOpen){
    state.menuOpen = menuOpen
  },
  //设置菜单展开列表
  SET_MENU_OPEN_LIST(state,menuOpenList){
    state.menuOpenList = menuOpenList
  }
}

const actions = {
  // 设置菜单列表
  setMenuList ({ commit }, menuList) {
    commit('SET_MENU_LIST', getMenuTreeList(menuList))
  },
  // 设置树状菜单列表
  setMenuTreeList ({ commit }, menuTreeList) {
    commit('SET_MENU_TREE_LIST', getMenuTreeList(menuTreeList))
  },
  // 设置当前导航菜单index
  setNavMenuActive ({ commit }, navMenuActive) {
    commit('SET_NAV_MENU_ACTIVE', navMenuActive)
  },
  // 设置菜单折叠标志
  setCollapseFlag ({ commit }, collapseFlag) {
    commit('SET_COLLAPSE_FLAG', collapseFlag)
  },
  //设置选中
  SET_MENU_ACTIVE({ commit }, menuActive){
    commit('SET_MENU_ACTIVE',menuActive)
  },
  //设置菜单展开
  setMenuOpen ({ commit }, menuOpen) {
    commit('SET_MENU_OPEN', menuOpen)
  },
  //设置菜单展开列表
  setMenuOpenList({ commit },menuOpenList){
    commit('SET_MENU_OPEN_LIST', menuOpenList)
  },
  //设置静态菜单，只有mock为true才使用
  setStaticMenuList({commit},menuList) {
    commit('SET_MENU_LIST', menuList)
    commit('SET_MENU_TREE_LIST', menuList)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
