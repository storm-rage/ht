/**
 * 保理合同查询页面路由（运营端）
 * @type {*[]}
 */
const factoringContractRouter = [
  {
    path: '/ebContractManagement',
    name: 'ebContractManagement',
    component: () => import('../views/productManage/factoringContract/query/list.vue'),
    meta: {
      title: '保理合同查询',
      root: '产品管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/factoringContractDetail',
    name: 'factoringContractDetail',
    component: () => import('../views/productManage/factoringContract/detailPage/index.vue'),
    meta: {
      title: '供应商保理合同详情',
      parent: 'ebContractManagement',
      keepAlive: true,
      refreshIndex: 0
    },
  },
];
export default factoringContractRouter
