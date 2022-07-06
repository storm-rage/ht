/**
 * 保理合同查询页面路由（运营端）
 * @type {*[]}
 */
const factoringContractRouter = [
  {
    path: '/factoringContractQuery',
    name: 'factoringContractQuery',
    component: () => import('../views/productManage/factoringContract/query/list.vue'),
    meta: {
      isMock: false,
      title: '保理合同查询',
      root: '产品管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/factoringContractDetail',
    name: 'factoringContractDetail',
    component: () => import('../views/productManage/factoringContract/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '供应商保理合同详情',
      root: '产品管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
];
export default factoringContractRouter
