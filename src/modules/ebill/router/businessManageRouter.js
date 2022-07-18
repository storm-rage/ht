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
      refreshIndex: 0
    },
  },
  {
    path: '/businessDetail',
    name: 'businessDetail',
    component: () => import('../views/productManage/businessManage/detailPage/index.vue'),
    meta: {
      title: '供应商业务设置详情',
      parent: 'businessManage',
      keepAlive: true,
      refreshIndex: 0,
    },
  },
  {
    path: '/contractReSign',
    name: 'contractReSign',
    component: () => import('../views/productManage/businessManage/contractSign/index.vue'),
    meta: {
      title: '供应商续签合同申请',
      parent: 'businessManage',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/tradeRelationMaintenance',
    name: 'tradeRelationMaintenance',
    component: () => import('../views/productManage/businessManage/tradeManage/tradeRelationMaintenance.vue'),
    meta: {
      title: '维护供应商业务参数',
      parent: 'businessManage',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/quotaMaintenance',
    name: 'quotaMaintenance',
    component: () => import('../views/productManage/businessManage/quotaManage/quotaMaintenance.vue'),
    meta: {
      title: '供应商额度管理',
      parent: 'businessManage',
      keepAlive: true,
      refreshIndex: 0
    },
  }
];
export default businessManageRouter;
