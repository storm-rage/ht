/**
 * 个人中心 路由
 */


const personalCenterRouter = [
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('../views/sysModules/personalCenter/index.vue'),
    meta:{
      title:'个人中心',
      root:'个人中心',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
  {
    path: '/entInfoMaintain/:id',
    name: 'entInfoMaintain',
    component: () => import('../views/sysModules/personalCenter/entInfoMaintain'),
    meta:{
      title:'企业信息维护',
      root:'个人中心',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true

    }
  },
  {
    path: '/userInfoMaintain/:id',
    name: 'userInfoMaintain',
    component: () => import('../views/sysModules/personalCenter/userInfoMaintain'),
    meta:{
      title:'个人信息维护',
      root:'个人中心',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  }
]

export default personalCenterRouter
