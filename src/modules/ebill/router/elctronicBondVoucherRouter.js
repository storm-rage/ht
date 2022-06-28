const elctronicBondVoucherRouter = [
  {
    path: '/myFactoringContractSigned',
    name: 'myFactoringContractSigned',
    component: () => import('../views/contractManagement/index.vue'),
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
    component: () => import('../views/contractManagement/applicationSigningFactoringContract/index.vue'),
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
    component: () => import('../views/contractManagement/contractSingningDetails.vue'),
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
    component: () => import('../views/contractManagement/applicationSigningFactoringContract/contractSingningApplication.vue'),
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
    component: () => import('../views/contractManagement/reviewFactoringContractSigning/index.vue'),
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
    component: () => import('../views/contractManagement/reviewFactoringContractSigning/contractSigningReview.vue'),
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
    path: '/quotaChangeApplication',
    name: 'quotaChangeApplication',
    component: () => import('../views/limitChange/quotaChangeApplication/index.vue'),
    meta: {
      isMock: true,
      title: `额度变更申请`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/domesticBusiness',
    name: 'domesticBusiness',
    component: () => import('../views/limitChange/quotaChangeApplication/domesticBusiness.vue'),
    meta: {
      isMock: false,
      title: `国内商业保理合同详情`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  },
  {
    path: '/quotaChangeApplicationChild',
    name: 'quotaChangeApplicationChild',
    component: () => import('../views/limitChange/quotaChangeApplication/quotaChangeApplicationChild.vue'),
    meta: {
      isMock: false,
      title: `额度变更申请child`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  },
  {
    path: '/limitReview',
    name: 'limitReview',
    component: () => import('../views/limitChange/limitReview/index.vue'),
    meta: {
      isMock: true,
      title: `额度变更复核`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/limitReviewChild',
    name: 'limitReviewChild',
    component: () => import('../views/limitChange/limitReview/limitReviewChild.vue'),
    meta: {
      isMock: false,
      title: `额度变更复核child`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  },
  {
    path: '/limitChangeTransaction',
    name: 'limitChangeTransaction',
    component: () => import('../views/limitChange/limitChangeTransaction/index.vue'),
    meta: {
      isMock: true,
      title: `额度变更交易查询`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/limitChangeDetails',
    name: 'limitChangeDetails',
    component: () => import('../views/limitChange/limitChangeTransaction/limitChangeDetails.vue'),
    meta: {
      isMock: false,
      title: `额度变更交易查询`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  }

]
export default elctronicBondVoucherRouter