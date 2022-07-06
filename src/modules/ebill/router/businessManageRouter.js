/**
 * 业务管理路由
 */
const businessManageRouter = [
  {
    path: '/businessManage',
    name: 'businessManage',
    component: () => import('../views/productManage/businessManage/list.vue'),
    meta: {
      isMock: false,
      title: '业务管理',
      root: '产品管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/businessDetail',
    name: 'businessDetail',
    component: () => import('../views/productManage/businessManage/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '供应商业务设置详情',
      root: '业务管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/contractReSign',
    name: 'contractReSign',
    component: () => import('../views/productManage/businessManage/contractSign/index.vue'),
    meta: {
      isMock: false,
      title: '供应商续签合同申请',
      root: '业务管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/tradeRelationMaintenance',
    name: 'tradeRelationMaintenance',
    component: () => import('../views/productManage/businessManage/tradeManage/tradeRelationMaintenance.vue'),
    meta: {
      isMock: false,
      title: '维护供应商业务参数',
      root: '业务管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/quotaMaintenance',
    name: 'quotaMaintenance',
    component: () => import('../views/productManage/businessManage/quotaManage/quotaMaintenance.vue'),
    meta: {
      isMock: false,
      title: '供应商额度管理',
      root: '业务管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  }
];
export default businessManageRouter;
