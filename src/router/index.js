/** 路由配置入口 */
import Router from 'vue-router'
import Vue from 'vue'
import store from '../store'
import RouterConfig from '../modules/router.config';
import CommonRouters from './commonRouter';
import {Message} from 'element-ui'
import {windowSSStorage} from '@utils/storageUtils';
Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}
const router = new Router({
  routes: RouterConfig.concat(CommonRouters),
  mode: 'history',
  fallback: true
})
// 处理单点登录
router.beforeResolve((to, from, next) => {
  const searchParams = window.location.search
  if (searchParams && searchParams.indexOf('?token') >= 0&&to.name!=='signAgreement') {
    const query = searchParams.split('&');
    const tokenQuery = query[0].split('=')
    const token = tokenQuery[1];
    if (token) {
      store.dispatch('user/ssoTokenLogin',token).then((res) => {
        if (res.isSuccess) {
          if (res.needSignAgreement) {
            next({
              path: '/signAgreement',
              params:{
                rowData:res.model
              }
            })
          }else {
            window.location.href='/home';
          }
        }else {
          // window.location.href='/login';
        }
      }).catch(() => {
        // window.location.href='/login';
      })
    }else {
      // window.location.href='/login';
    }
  }else {
   next();
  }
});
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
      if(!to.meta.notRequireAuth && !key && to.name!== 'home'){
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
    window.document.title = to.meta.title
  } else {
    let menu = store.state.menu.menuList.find(item => item.url === to.name)
    window.document.title = menu ? menu.name : process.env.VUE_APP_TITLE
  }
})

router.afterEach( ( to,form ) => {
  if( to.name !== 'register' ){
    let localArr = ['registerStep','registerEntInfoObj']
    localArr.forEach(item => windowSSStorage.removeItem(item) )
  }
})

export default router
