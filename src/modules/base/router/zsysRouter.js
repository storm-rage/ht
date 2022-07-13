/**
 * sys基础路由
 */

const zsysRouter = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/sysModules/home'),
    meta: {
      title: '平台首页'
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
  }
]
export default zsysRouter
