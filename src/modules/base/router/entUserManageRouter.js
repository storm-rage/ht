/**
 * 企业信息管理 路由
 */

const entUserManage = [
  //--------------------------------------------- 企业信息管理 ---------------------------------------------
  //主页面
  {
    path: '/sysEnterprise',
    name: 'sysEnterprise',
    component: () => import('../views/entUserManage/entManage'),
    meta: {
      title: '企业信息管理',
      root: '客户信息管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  //新增
  {
    path: '/entManageAdd',
    name: 'entManageAdd',
    // component: () => import('../views/entUserManage/entManage/addEnterPrises/AddEnterPrises.vue'),
    component: () => import('../views/entUserManage/entManage/enterpriseManage.vue'),
    meta: {
      title: '企业信息管理-新增',
      parent: 'sysEnterprise',
      pageType: 'add',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  //新增趋势
  {
    path: '/entManageTen',
    name: 'entManageTen',
    component: () => import('../views/entUserManage/entManage/appendTendency/AppendTendency.vue'),
    meta: {
      title: '企业信息管理-新增趋势',
      parent: 'sysEnterprise',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  //详情
  {
    path: '/entManageDetail',
    name: 'entManageDetail',
    // component: () => import('../views/entUserManage/entManage/detailsEnterPrises/DetailsEnterPrises.vue'),
    component: () => import('../views/entUserManage/entManage/enterpriseManage.vue'),
    meta: {
      title: '企业信息管理-详情',
      parent: 'sysEnterprise',
      pageType: 'detail',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  //修改
  {
    path: '/entManageEdit',
    name: 'entManageEdit',
    // component: () => import('../views/entUserManage/entManage/editEnterPrises/EditEnterPrises.vue'),
    component: () => import('../views/entUserManage/entManage/enterpriseManage.vue'),
    meta: {
      title: '企业信息管理-修改信息',
      parent: 'sysEnterprise',
      pageType: 'edit',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  //--------------------------------------------- 用户信息管理 ---------------------------------------------
  {
    path: '/sysUser',
    name: 'sysUser',
    component: () => import('../views/entUserManage/userManage'),
    meta: {
      title: '企业用户信息管理',
      root: '企业与用户管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/userVindicate',
    name: 'userVindicate',
    component: () => import('../views/entUserManage/userManage/vindicate'),
    meta: {
      title: '企业用户信息管理-维护',
      parent: 'sysUser',
      isManage: true,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/userAdd',
    name: 'userAdd',
    component: () => import('../views/entUserManage/userManage/userForm'),
    meta: {
      title: '企业用户信息管理-新增',
      parent: 'sysUser',
      isManage: true,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/userUpdate',
    name: 'userUpdate',
    component: () => import('../views/entUserManage/userManage/userForm'),
    meta: {
      title: '企业用户信息管理-修改',
      parent: 'sysUser',
      isManage: true,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  // {
  //   path: '/userManageMag',
  //   name: 'userManageMag',
  //   component: () => import('../views/entUserManage/userManage/userInfo/manage/ManageUser.vue'),
  //   meta: {
  //     title: '企业用户信息管理-管理',
  //     parent: 'sysUser',
  //     isManage: true,
  //     keepAlive: true,
  //     refreshIndex: 0,
  //     notRequireAuth: true
  //   }
  // },
  {
    path: '/userManageDetail',
    name: 'userManageDetail',
    component: () => import('../views/entUserManage/userManage/vindicate'),
    meta: {
      title: '企业用户信息管理-详情',
      parent: 'sysUser',
      isManage: false,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true,
      pageType: 'detail'
    }
  }
]

export default entUserManage
