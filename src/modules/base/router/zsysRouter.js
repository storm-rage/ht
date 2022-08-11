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
    path:'/rolePower',
    name:'rolePower',
    component:()=>import('../views/sysModules/rolePower/RolePower'),
    meta: {
      title: '角色权限配置'
    }
  }
]
export default zsysRouter
