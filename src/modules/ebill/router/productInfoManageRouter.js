const productInfoManageRouter = [
  {
    path: '/productInfoManage',
    name: 'productInfoManage',
    component: () => import('../views/productManage/productInfoManage'),
    meta: {
      isMock: true,
      title: '产品信息管理',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/productInfoManageDetail',
    name: 'productInfoManageDetail',
    component: () => import('../views/productManage/productInfoManage/detail'),
    meta: {
      isMock: true,
      title: '产品详情',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'productInfoManage',
      notRequireAuth: true
    }
  },
  {
    path: '/productInfoManageEdit',
    name: 'productInfoManageEdit',
    component: () => import('../views/productManage/productInfoManage/edit'),
    meta: {
      isMock: true,
      title: '修改产品信息',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'productInfoManage',
      notRequireAuth: true
    }
  },
  {
    path: '/productInfoManageAdd',
    name: 'productInfoManageAdd',
    component: () => import('../views/productManage/productInfoManage/add'),
    meta: {
      isMock: true,
      title: '新增产品',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'productInfoManage',
      notRequireAuth: true
    }
  },

]
export default productInfoManageRouter
