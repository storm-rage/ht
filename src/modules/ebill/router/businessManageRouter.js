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
  }
];
export default businessManageRouter;
