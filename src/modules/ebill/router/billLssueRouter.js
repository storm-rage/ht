/**
 * 电子债权凭证 路由
 */
const billLssueRouter = [
  {
    path: '/openBillApply',
    name: 'openBillApply',
    component: () => import('../views/billLssue/issuanceApply/index.vue'),
    meta: {
      title: `{0}签发申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/openBillApplyDetails',
    name: 'openBillApplyDetails',
    component: () => import('../views/billLssue/issuanceApply/details/index.vue'),
    meta: {
      title: `{0}签发申请详情`,
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
      title: `我签发的海诺单`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/myOpenBillDetail',
    name: 'myOpenBillDetail',
    component: () => import('../views/billLssue/issuanceVoucher/detail'),
    meta: {
      title: `电子债权凭证详情`,
      parent: 'myOpenBill',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/ebBillRejectAudit',
    name: 'ebBillRejectAudit',
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
      parent: 'ebBillRejectAudit',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/ebBillApply',
    name: 'ebBillApply',
    component: () => import('../views/billLssue/billassignApply/index.vue'),
    meta: {
      title: `转让申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
    },
  },
  {
    path: '/ebBillApplyDetail',
    name: 'ebBillApplyDetail',
    component: () => import('../views/billLssue/billassignApply/detail'),
    meta: {
      title: `转让申请详情`,
      parent: 'ebBillApply',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
    },
  },
  {
    path: '/billAssignApply',
    name: 'billAssignApply',
    component: () => import('../views/billLssue/billassignApply/billAssignApply.vue'),
    meta: {
      title: `凭证转让申请`,
      parent: 'ebBillApply',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/billAssignApplyS',
    name: 'billAssignApplyS',
    component: () => import('../views/billLssue/billassignApply/billAssignApplyS.vue'),
    meta: {
      title: `凭证转让申请-批量`,
      parent: 'ebBillApply',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/ebBillApplyReview',
    name: 'ebBillApplyReview',
    component: () => import('../views/billLssue/assignReview/index.vue'),
    meta: {
      title: `转让复核列表`,
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/assignReview',
    name: 'assignReview',
    component: () => import('../views/billLssue/assignReview/review.vue'),
    meta: {
      title: `凭证转让复核`,
      parent: 'ebBillApplyReview',
      keepAlive: true,
      refreshIndex: 0,
    }
  }
]
export default billLssueRouter
