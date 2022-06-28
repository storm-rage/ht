const homeRouter = [
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
  }
];
