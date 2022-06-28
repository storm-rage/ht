/**
 * 电子债权凭证 路由
 */
const billLssueRouter = [
  {
    path: '/issuanceApply',
    name: 'issuanceApply',
    component: () => import('../views/billLssue/issuanceApply/index.vue'),
    meta: {
      isMock: true,
      title: `凭证签发申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/issuanceApplyDetails',
    name: 'issuanceApplyDetails',
    component: () => import('../views/billLssue/issuanceApply/details/index.vue'),
    meta:{
      isMock:false,
      title:`凭证签发申请详情`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
  {
    path: '/issuanceReview',
    name: 'issuanceReview',
    component: () => import('../views/billLssue/issuanceReview/index.vue'),
    meta: {
      isMock: true,
      title: `凭证签发复核`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/orderReview',
    name: 'orderReview',
    component: () => import('../views/billLssue/issuanceReview/review/index.vue'),
    meta:{
      isMock:false,
      title:`开单确认`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
  {
    path: '/issuanceVoucher',
    name: 'issuanceVoucher',
    component: () => import('../views/billLssue/issuanceVoucher/index.vue'),
    meta: {
      isMock: true,
      title: `我签发的凭证`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0
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
      refreshIndex: 0
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
      refreshIndex: 0
    },
  },
  {
    path: '/voucherTransferApplication',
    name: 'voucherTransferApplication',
    component: () => import('../views/billLssue/transferApplication/voucherTransferApplication.vue'),
    meta: {
      isMock: false,
      title: `凭证转让申请`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: false
    },
  }
]
export default billLssueRouter
