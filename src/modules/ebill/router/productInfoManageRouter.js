const productInfoManageRouter = [
  {
    path: '/pubProductSetting',
    name: 'pubProductSetting',
    component: () => import('../views/productManage/productInfoManage'),
    meta: {
      title: '产品信息管理',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/productInfoManageDetail',
    name: 'productInfoManageDetail',
    component: () => import('../views/productManage/productInfoManage/detail'),
    meta: {
      title: '产品详情',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'pubProductSetting',
    }
  },
  {
    path: '/productInfoManageEdit',
    name: 'productInfoManageEdit',
    component: () => import('../views/productManage/productInfoManage/edit'),
    meta: {
      title: '产品信息',
      root: '产品信息管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'pubProductSetting',
    }
  },

]
export default productInfoManageRouter
