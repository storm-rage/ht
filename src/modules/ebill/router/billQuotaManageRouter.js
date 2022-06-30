const billQuotaManageRouter = [
  {
    path: '/quotaChangeApplication',
    name: 'quotaChangeApplication',
    component: () => import('../views/contractManage/billQuota/apply/index.vue'),
    meta: {
      isMock: true,
      title: `额度变更申请`,
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/quotaChangeApplicationChild',
    name: 'quotaChangeApplicationChild',
    component: () => import('../views/contractManage/billQuota/apply/quotaChangeApplicationChild.vue'),
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
    component: () => import('../views/contractManage/billQuota/review/index.vue'),
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
    component: () => import('../views/contractManage/billQuota/review/limitReviewChild.vue'),
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
    component: () => import('../views/contractManage/billQuota/change/index.vue'),
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
    component: () => import('../views/contractManage/billQuota/change/limitChangeDetails.vue'),
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
export default billQuotaManageRouter
