import breadArr from './breadArr.js'
import router from '../../router/index.js'

// 缓存页签store
const state = {
  // 缓存的组件名
  cachedName: [],
  // 缓存的路由
  cachedRoute: [],
  // -----------sw
  tabActive:'', //选中
  tabTagList:[], //tag
  tabBreadList:[],//bread
}

const mutations = {
  //添加-单
  tabAdd(state,rItem) {
    //不添加缓存的白名单过滤
    let whiteArr = ['whith']
    let key = whiteArr.some(item => item === rItem.name)
    if (key && rItem !== 'whith') {
      state.tabTagList = []
      state.tabBreadList = []
      state.tabActive = ''
      return
    }else if(rItem === 'whith'){
      return
    }

    // 存在则选择
    let boo = state.tabTagList.some(item => item.name === rItem.name)
    if (boo) {
      //设置选中
      state.tabActive = rItem.name
      if(rItem.params && rItem.params.boo){
        //强制刷新
        router.options.routes.map(item => {
          if(item.name === rItem.name){
            item.meta.refreshIndex !== undefined ? item.meta.refreshIndex += 1 : item.meta.refreshIndex =0
          }else if(item.children){
            item.children.map(citem => {
              if(citem.name === rItem.name){
                citem.meta.refreshIndex !== undefined ? citem.meta.refreshIndex += 1 : citem.meta.refreshIndex =0
              }
            })
          }
        })
      }
    }
    // 不存在则添加
    else {
      if(rItem.meta){
        rItem.meta.refreshIndex += 1
      }
      //并设置选中
      state.tabActive = rItem.name
      //添加到标签数组
      state.tabTagList.push(rItem)
    }
    //进行面包屑组装
    state.tabBreadList = breadArr(router.options.routes, state.tabActive)
  },
  //关闭-单
  tabDel(state,rItem){
    //查找下标
    let index = state.tabTagList.findIndex(item => item.name === rItem.name)
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
    // //设置选中
    // state.tabActive = rItem.name
    // //组装面包屑
    // state.tabBreadList = breadArr(router.options.routes, state.tabActive)

    router.push({name:rItem.name})
  },
  //关闭所有
  tabClear(state,rItem){
    state.tabTagList = []
    state.tabBreadList = []
    state.tabActive = ''
    router.push({name:'home'})
  },
  //刷新
  tabRefresh(state,rItem){
    router.options.routes.map((item,index) => {
      if(item.name === rItem.name){
        item.meta.refreshIndex !== undefined ? item.meta.refreshIndex += 1 : item.meta.refreshIndex =0
      }else if(item.children){
        item.children.map((citem,cindex) => {
          if(citem.name === rItem.name){
            citem.meta.refreshIndex !== undefined ? citem.meta.refreshIndex += 1 : citem.meta.refreshIndex =0
            router.options.routes[index].children[cindex].meta.refreshIndex+=1
          }else if(citem.children){
            citem.children.map(ccitem => {
              ccitem.meta.refreshIndex !== undefined ? ccitem.meta.refreshIndex += 1 : ccitem.meta.refreshIndex =0
            })
          }
        })
      }
    })
  },
  //----------------------------------------------------
  ADD_CACHE: (state, route) => {
    if (!state.cachedName.includes(route.name)) {
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
