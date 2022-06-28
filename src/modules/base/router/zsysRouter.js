/**
 * sys基础路由
 */

const zsysRouter = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/sysModules/home'),
    meta: {
      title: '工作台'
    }
  },
  {
    path:'/whith',
    name:'whith',
    component:() => import('../views/sysModules/home/whith.vue')
  },
  {
    path:'/rolePower',
    name:'rolePower',
    component:()=>import('../views/sysModules/rolePower/RolePower'),
    meta: {
      title: '角色权限配置'
    }
  }/*,
  // 测试页面
  {
    path: '/testPage',
    name: 'testPage',
    component: () => import('../views/examples/testPage.vue'),
    meta: {
      notRequireAuth: true
    }
  },*/
]
export default zsysRouter
