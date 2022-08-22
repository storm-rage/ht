import router from '../../router/index.js'

// 缓存页签store
const state = {
  // 缓存的组件名
  cachedName: [],
  // 缓存的路由
  cachedRoute: [],
  // 当前路由index
  currentRouteIndex: 0,
  // -----------sw
  tabActive:'', //选中
  tabTagList:[], //tag
}

const mutations = {
  //添加-单
  tabAdd(state,rItem) {
    // const boo = state.tabTagList.some(item => item.name === rItem.name)
    const boo = state.tabTagList.findIndex(item => item.name === rItem.name)
    if (boo != -1) { // 存在则选择
      //设置选中
      state.tabActive = rItem.name
      // rItem里的params和query,fullPath需要更新，否则params和query固定为初次添加进tabTagList时的数据
      state.tabTagList[boo] = rItem
      if(rItem.params && rItem.params.boo){
        //强制刷新
        // const routes = router.getRoutes();
        // const route = routes.find((item) => {return item.name === rItem.name})
        const route = router.currentRoute
        if (route != null && route.meta) {
          route.meta.refreshIndex !== undefined ? route.meta.refreshIndex += 1 : route.meta.refreshIndex =0
          rItem.meta = {refreshIndex: route.meta.refreshIndex};
          state.currentRouteIndex = rItem.meta.refreshIndex
        }
      }
    }else { // 不存在则添加
      if(rItem.meta){
        rItem.meta.refreshIndex += 1
        state.currentRouteIndex = rItem.meta.refreshIndex
      }/*else {
        // 修复关闭跳转问题
        const route = router.getRoutes().find((item) => {return item.name === rItem.name})
        if (route != null && route.meta) {
          rItem.meta = route.meta
          // 缓存
          state.currentRouteIndex = rItem.meta.refreshIndex
        }
      }*/
      //并设置选中
      state.tabActive = rItem.name
      //添加到标签数组
      state.tabTagList.push(rItem)
    }
  },
  //关闭-单
  tabDel(state,rItem){
    //查找下标
    const index = state.tabTagList.findIndex(item => item.name === rItem.name)
    //当要删除的为当前选中的
    if(rItem.name === state.tabActive){
      //当下标存在 并且大于零
      if(index > 0){
        state.tabActive = state.tabTagList[index -1 ]['name']
      }
      //当下标存在 并且等于0 且 tabTagList 1
      else if(index === 0 && state.tabTagList.length > 1){
        state.tabActive = state.tabTagList[index + 1 ]['name']
      }
      else{
        state.tabActive = ''
      }
    }
    state.tabTagList.splice(index,1)
    router.push({name:state.tabActive ? state.tabActive : 'home'})
  },
  //关闭其他-留自己
  tabOther(state,rItem){
    let index = state.tabTagList.findIndex(item => item.name === rItem.name)
    //先删除右侧
    if(index < state.tabTagList.length - 1){
      state.tabTagList.splice(index+1,(state.tabTagList.length - 1) - index )
    }
    //再删除左侧
    if(index !== 0){
      state.tabTagList.splice(0,index)
    }
    router.push({name:rItem.name})
  },
  //关闭所有
  tabClear(state){
    state.tabTagList = []
    state.tabBreadList = []
    state.tabActive = ''
    state.cachedName = []
    state.cachedRoute = []
    router.push({name:'home'})
  },
  //刷新
  tabRefresh(state,rItem){
    const route = router.currentRoute;
    if (route&&route.name === rItem.name) {
      route.meta.refreshIndex !== undefined ? route.meta.refreshIndex += 1 : route.meta.refreshIndex =0;
      state.currentRouteIndex = route.meta.refreshIndex;
    }
  },
  //----------------------------------------------------
  ADD_CACHE: (state, route) => {
    if (!state.cachedName.includes(route.name) && route.meta&& route.meta.keepAlive) {
      state.cachedName.push(route.name)
      state.cachedRoute.push({
        path: route.path,
        fullPath: route.fullPath,
        name: route.name,
        meta: Object.assign(route.meta, { refreshIndex: 0 }),
        params: route.params,
        query: route.query
      })
    }
  },
  REFRESH_CACHE: (state, route) => {
    state.cachedRoute[state.cachedName.indexOf(route.name)].meta.refreshIndex++
  },
  REMOVE_CACHE: (state, route) => {
    const index = state.cachedName.indexOf(route.name)
    if (index >= 0) {
      state.cachedName.splice(index, 1)
      state.cachedRoute.splice(index, 1)
    }
  },
  REMOVE_OTHER_CACHE: (state, route) => {
    const index = state.cachedName.indexOf(route.name)
    if (index >= 0) {
      state.cachedName = state.cachedName.splice(index, 1)
      state.cachedRoute = state.cachedRoute.splice(index, 1)
    }
  },
  REMOVE_ALL_CACHE: (state) => {
    state.cachedName = []
    state.cachedRoute = []
  }
}

const actions = {
  // 新增缓存
  addCache({ commit }, route) {
    commit('ADD_CACHE', route)
  },
  // 刷新缓存
  refreshCache({ commit }, route) {
    return new Promise(resolve => {
      commit('REFRESH_CACHE', route)
      resolve()
    })
  },
  // 删除缓存
  removeCache({ commit }, route) {
    return new Promise(resolve => {
      commit('REMOVE_CACHE', route)
      resolve()
    })
  },
  // 删除其他缓存
  removeOtherCache({ commit }, route) {
    return new Promise(resolve => {
      commit('REMOVE_OTHER_CACHE', route)
      resolve()
    })
  },
  // 删除所有缓存
  removeAllCache({ commit }) {
    return new Promise(resolve => {
      commit('REMOVE_ALL_CACHE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
