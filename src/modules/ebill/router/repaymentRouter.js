
const repaymentRouter = [
  {
    path: '/repaymentApplyList',
    name: 'repaymentApply',
    component: () => import('../views/repayment/repaymentApply'),
    meta: {
      isMock: true,
      title: `提前还款申请`,
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/repaymentReviewList',
    name: 'repaymentReviewList',
    component: () => import('../views/repayment/repaymentReview'),
    meta: {
      isMock: true,
      title: `提前还款复核`,
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/repaymentApply',
    name: 'repaymentApply',
    component: () => import('../views/repayment/components/approval'),
    meta:{
      isMock:false,
      title:`提前还款申请`,
      keepAlive:true,
      refreshIndex:0,
      pageType: 'apply',
      notRequireAuth: true
    }
  },
  {
    path: '/repaymentReview',
    name: 'repaymentReview',
    component: () => import('../views/repayment/components/approval'),
    meta:{
      isMock:false,
      title:`提前还款复核`,
      keepAlive:true,
      refreshIndex:0,
      pageType: 'review',
      notRequireAuth: true
    }
  },
]
export default repaymentRouter
