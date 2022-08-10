/**
 * 电子债权凭证 路由
 */
const billLssueRouter = [
  {
    path: '/openBillApply',
    name: 'openBillApply',
    component: () => import('../views/billLssue/issuanceApply/index.vue'),
    meta: {
      isMock: true,
      title: `凭证签发申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/openBillApplyDetails',
    name: 'openBillApplyDetails',
    component: () => import('../views/billLssue/issuanceApply/details/index.vue'),
    meta: {
      isMock: false,
      title: `凭证签发申请详情`,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/offlineDatails',
    name: 'offlineDatails',
    component: () => import('../views/billLssue/issuanceApply/details/offlineDatails.vue'),
    meta: {
      isMock: false,
      title: `债权凭证签发申请`,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/openBillApplyConfirm',
    name: 'openBillApplyConfirm',
    component: () => import('../views/billLssue/issuanceApply/details/confirm.vue'),
    meta: {
      isMock: false,
      title: `请确认电子债权凭证签发申请`,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/openBillAudit',
    name: 'openBillAudit',
    component: () => import('../views/billLssue/issuanceReview/index.vue'),
    meta: {
      isMock: true,
      title: `凭证签发复核-列表`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/issuanceReview',
    name: 'issuanceReview',
    component: () => import('../views/billLssue/issuanceReview/review/index.vue'),
    meta: {
      isMock: false,
      title: `债权凭证签发复核`,
      parent: 'openBillAudit',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/myOpenBill',
    name: 'myOpenBill',
    component: () => import('../views/billLssue/issuanceVoucher/index.vue'),
    meta: {
      title: `我签发的凭证`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/cancellationReview',
    name: 'cancellationReview',
    component: () => import('../views/billLssue/cancellationReview/index.vue'),
    meta: {
      isMock: true,
      title: `凭证作废复核`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billCancellationReview',
    name: 'billCancellationReview',
    component: () => import('../views/billLssue/cancellationReview/billCancellationReview'),
    meta: {
      isMock: true,
      title: `债权凭证作废复核`,
      parent: 'cancellationReview',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/tansferApp',
    name: 'tansferApp',
    component: () => import('../views/billLssue/transferApplication/index.vue'),
    meta: {
      isMock: true,
      title: `转让申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
  {
    path: '/billAssignApply',
    name: 'billAssignApply',
    component: () => import('../views/billLssue/transferApplication/billAssignApply.vue'),
    meta: {
      isMock: false,
      title: `凭证转让申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billAssignApplyS',
    name: 'billAssignApplyS',
    component: () => import('../views/billLssue/transferApplication/billAssignApplyS.vue'),
    meta: {
      isMock: false,
      title: `凭证转让申请-批量`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferCheck',
    name: 'transferCheck',
    component: () => import('../views/billLssue/transferCheck/index.vue'),
    meta: {
      isMock: false,
      title: `转让复核`,
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferCheckDetails',
    name: 'transferCheckDetails',
    component: () => import('../views/billLssue/transferCheck/detail.vue'),
    meta: {
      isMock: false,
      title: `凭证转让复核`,
      root: '转让复核',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    },
  },
]
export default billLssueRouter
