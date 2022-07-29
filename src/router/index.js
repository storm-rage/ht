/** 路由配置入口 */
import Router from 'vue-router'
import Vue from 'vue'
import store from '../store'
import RouterConfig from '../modules/router.config';
import CommonRouters from './commonRouter';
import {Message} from 'element-ui'

Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: RouterConfig.concat(CommonRouters),
  mode: 'history',
  fallback: true
})
router.beforeEach((to, from, next) => {
  // 需要确认权限
  if (!to.meta.notRequireAuth) {
    // 确认是否已登录
    const userInfo = store.state.user.userInfo
    //1.未登录
    if (!userInfo || !userInfo.userName) {
      return router.replace({
        path: '/login'
      })
    }
    //2.已登录
    else{
      //是否存在权限
      let whiteList = ['login','forgetPass','userInfo','register','401','404','500']
      let powerArr = [...store.state.user.userInfo.power,...whiteList]
      let routerName = to.meta.parent
      if(!to.meta.parent){
        routerName = to.name
      }
      const key = powerArr.includes(routerName)
      if(!to.meta.notRequireAuth && !key && to.name!== 'home' && to.name !== 'whith'){
        Message.error('当前用户无此菜单权限，如有疑问，请联系系统管理员！')
        window.setTimeout(()=>{
          router.replace({name:from.name})
        },1500)
      }else{
        next()
      }
    }
    // 添加缓存页签
    if (!store.state.tab.cachedName.includes(to.name)) {
      // 当前页签未缓存 遍历菜单列表判断是否需要缓存
      let menu = store.state.menu.menuList.find(item => item.url === to.name)
      if (menu) {
        to.meta.title = to.meta.title || menu.name
        store.dispatch('tab/addCache', to)
      }
    }
  }
  else {
    next()
  }
  //头部标题
  if (to.meta.title) {
    window.document.title = to.meta.title.replace(new RegExp("\\{0\\}","g"),store.getters['project/productName'])
  } else {
    let menu = store.state.menu.menuList.find(item => item.url === to.name)
    window.document.title = menu ? menu.name : process.env.VUE_APP_TITLE
  }
})

router.afterEach( ( to,form ) => {
  if( to.name !== 'register' ){
    let localArr = ['registerStep','registerEntInfoObj']
    localArr.forEach(item => sessionStorage.removeItem(item) )
  }
})

export default router
