const billQuotaManageRouter = [
  {
    path: '/quotaApplyList',
    name: 'quotaApplyList',
    component: () => import('../views/contractManage/billQuota/apply/index.vue'),
    meta: {
      isMock: true,
      title: '额度变更申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/contractDetail',
    name: 'contractDetail',
    component: () => import('../views/contractManage/billQuota/apply/contractDetail/index.vue'),
    meta: {
      isMock: false,
      title: '国内商业保理合同详情',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/quotaChangeApply',
    name: 'quotaChangeApply',
    component: () => import('../views/contractManage/billQuota/apply/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '额度变更申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/quotaReviewList',
    name: 'quotaReviewList',
    component: () => import('../views/contractManage/billQuota/review/index.vue'),
    meta: {
      isMock: true,
      title: '额度变更复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/quotaChangeReview',
    name: 'quotaChangeReview',
    component: () => import('../views/contractManage/billQuota/review/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '额度变更复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/quotaChangeQuery',
    name: 'quotaChangeQuery',
    component: () => import('../views/contractManage/billQuota/query/index.vue'),
    meta: {
      isMock: true,
      title: '额度变更交易查询',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/changeDetail',
    name: 'changeDetail',
    component: () => import('../views/contractManage/billQuota/query/detailPage/index.vue'),
    meta: {
      isMock: false,
      title: '额度变更交易详情',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  }
]
export default billQuotaManageRouter
