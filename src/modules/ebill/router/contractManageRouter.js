/**
 * 保理合同（企业端）
 */
const contractManageRouter = [
  {
    path: '/ebContractManageEnterprise',
    name: 'ebContractManageEnterprise',
    component: () => import('../views/contractManage/factoringContract/query/index.vue'),
    meta: {
      title: '我签约的保理合同',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/mySignContractDetail',
    name: 'mySignContractDetail',
    component: () => import('../views/contractManage/factoringContract/query/detailPage/index.vue'),
    meta: {
      title: '合同签约详情',
      parent: 'ebContractManageEnterprise',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/ebContractApply',
    name: 'ebContractApply',
    component: () => import('../views/contractManage/factoringContract/apply/index.vue'),
    meta: {
      title: '保理合同签约申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSignApply',
    name: 'contractSignApply',
    component: () => import('../views/contractManage/factoringContract/apply/detailPage/index.vue'),
    meta: {
      title: '合同签约申请',
      parent: 'ebContractApply',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/ebContractApplyReview',
    name: 'ebContractApplyReview',
    component: () => import('../views/contractManage/factoringContract/review/index.vue'),
    meta: {
      title: '保理合同签约复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSignReview',
    name: 'contractSignReview',
    component: () => import('../views/contractManage/factoringContract/review/detailPage/index.vue'),
    meta: {
      title: '合同签约复核',
      parent: 'ebContractApplyReview',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSignReview2',
    name: 'contractSignReview2',
    component: () => import('../views/contractManage/factoringContract/review/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '合同签约复核122',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  }
]
export default contractManageRouter
