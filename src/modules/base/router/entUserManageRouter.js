/**
 * 企业信息管理 路由
 */

const entUserManage = [
  //--------------------------------------------- 企业信息管理 ---------------------------------------------
  //主页面
  {
    path: '/sysEnterprise',
    name: 'sysEnterprise',
    component: () => import('../views/entUserManage/entManage/index.vue'),
    meta: {
      title: '企业信息管理',
      root: '客户信息管理',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  //新增
  {
    path: '/entManageAdd',
    name: 'entManageAdd',
    component: () => import('../views/entUserManage/entManage/enterpriseManage.vue'),
    meta: {
      title: '企业信息管理-新增',
      parent: 'sysEnterprise',
      pageType: 'add',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/entDetail',
    name: 'entDetail',
    component: () => import('../views/entUserManage/entManage/detail'),
    meta: {
      title: '企业详情',
      parent: 'sysEnterprise',
      isManage: false,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true,
      pageType: 'detail'
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
      title: '维护用户信息',
      parent: 'sysUser',
      isManage: true,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    component: () => import('../views/entUserManage/userManage/vindicate'),
    meta: {
      title: '用户详情',
      parent: 'sysUser',
      isManage: false,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true,
      pageType: 'detail'
    }
  },
  {
    path: '/userAdd',
    name: 'userAdd',
    component: () => import('../views/entUserManage/userManage/userAdd/index'),
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
    component: () => import('../views/entUserManage/userManage/userUpdate/index.vue'),
    meta: {
      title: '企业用户信息管理-修改',
      parent: 'sysUser',
      isManage: true,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
]

export default entUserManage
