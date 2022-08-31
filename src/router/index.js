/** 路由配置入口 */
import Router from 'vue-router'
import Vue from 'vue'
import store from '../store'
import RouterConfig from '../modules/router.config';
import CommonRouters from './commonRouter';
import {Message} from 'element-ui'
import {windowSSStorage} from '@utils/storageUtils';
import {RouterWhiteList,YaMiWorkFlowRouter,SSORouter} from './constant';

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

router.beforeEach((to, from, next) => {
  const pathName = window.location.pathname;
  if (pathName.indexOf(SSORouter.workflow)>=0&&to.query&&to.query.token&&to.query.businessKey&&to.query.type) {
    // 处理流程引擎
    store.dispatch('user/ymEngineSsoLoin',to.query.token).then((res) => {
      if (res.isSuccess) {
        next({
          path: YaMiWorkFlowRouter[to.query.type],
          query:{
            bizId:to.query.businessKey,
            bizType:to.query.type,
          },
          replace: true
        })
      }else {
        next('/login')
      }
    }).catch(() => {
      next('/login')
    })
  }else if (pathName.indexOf(SSORouter.sso)>=0&&to.query&&to.query.token) {
    // 处理单点登录
    store.dispatch('user/ssoTokenLogin',to.query.token).then((res) => {
      if (res.isSuccess) {
        if (res.needSignAgreement) {
          next({
            path: '/signAgreement',
            params:{
              rowData:res.model
            }
          })
        }else {
          next('/home')
        }
      }else {
        next(false)
      }
    }).catch(() => {
      next(false)
    })
  }else {
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
        let powerArr = [...store.state.user.userInfo.power,...RouterWhiteList]
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
      // if (!store.state.tab.cachedName.includes(to.name)) {
      //   // 当前页签未缓存 遍历菜单列表判断是否需要缓存
      //   // const menu = store.state.menu.menuList.find(item => item.url === to.name)
      //   // if (menu) {
      //   //   to.meta.title = to.meta.title || menu.name
      //   // }
      //   store.dispatch('tab/addCache', to)
      // }
    }
    else {
      next()
    }
  }

  //头部标题
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    // const menu = store.state.menu.menuList.find(item => item.url === to.name)
    window.document.title = process.env.VUE_APP_TITLE
  }
})

router.afterEach( ( to,form ) => {
  if( to.name !== 'register' ){
    const localArr = ['registerStep','registerEntInfoObj']
    localArr.forEach(item => windowSSStorage.removeItem(item) )
  }
})

export default router
