const contractManageRouter = [
  {
    path: '/myFactoringContractSigned',
    name: 'myFactoringContractSigned',
    component: () => import('../views/contractManage/factoringContract/index.vue'),
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
    path: '/applicationSigningFactoringContract',
    name: 'applicationSigningFactoringContract',
    component: () => import('../views/contractManage/factoringContract/apply/index.vue'),
    meta: {
      isMock: true,
      title: `保理合同签约申请`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSingningDetails',
    name: 'contractSingningDetails',
    component: () => import('../views/contractManage/factoringContract/detail/contractSingningDetails.vue'),
    meta: {
      isMock: false,
      title: `合同签约详情`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  },
  {
    path: '/contractSingningApplication',
    name: 'contractSingningApplication',
    component: () => import('../views/contractManage/factoringContract/apply/contractSingningApplication.vue'),
    meta: {
      isMock: false,
      title: `合同签约申请`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  },
  {
    path: '/reviewFactoringContractSigning',
    name: 'reviewFactoringContractSigning',
    component: () => import('../views/contractManage/factoringContract/review/index.vue'),
    meta: {
      isMock: true,
      title: `保理合同签约复核`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractSigningReview',
    name: 'contractSigningReview',
    component: () => import('../views/contractManage/factoringContract/review/contractSigningReview.vue'),
    meta: {
      isMock: false,
      title: `合同签约复核`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  },
  {
    path: '/domesticBusiness',
    name: 'domesticBusiness',
    component: () => import('../views/contractManage/billQuota/apply/domesticBusiness.vue'),
    meta: {
      isMock: false,
      title: `国内商业保理合同详情`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  }
]
export default contractManageRouter
