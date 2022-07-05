const contractManageRouter = [
  {
    path: '/contractSignQuery',
    name: 'contractSignQuery',
    component: () => import('../views/contractManage/factoringContract/query/index.vue'),
    meta: {
      isMock: true,
      title: '我签约的保理合同',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/mySignContractDetail',
    name: 'mySignContractDetail',
    component: () => import('../views/contractManage/factoringContract/query/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '合同签约详情',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/contractSignApplyList',
    name: 'contractSignApplyList',
    component: () => import('../views/contractManage/factoringContract/apply/index.vue'),
    meta: {
      isMock: true,
      title: '保理合同签约申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/contractSignApply',
    name: 'contractSignApply',
    component: () => import('../views/contractManage/factoringContract/apply/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '合同签约申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/contractSignReviewList',
    name: 'contractSignReviewList',
    component: () => import('../views/contractManage/factoringContract/review/index.vue'),
    meta: {
      isMock: true,
      title: '保理合同签约复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/contractSignReview',
    name: 'contractSignReview',
    component: () => import('../views/contractManage/factoringContract/review/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '合同签约复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
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
