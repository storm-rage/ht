
const repaymentRouter = [
  {
    path: '/preRepaymentApply',
    name: 'preRepaymentApply',
    component: () => import('../views/repayment/repaymentApply'),
    meta: {
      title: `提前还款申请-列表`,
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/preRepaymentReview',
    name: 'preRepaymentReview',
    component: () => import('../views/repayment/repaymentReview'),
    meta: {
      title: `提前还款复核-列表`,
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/repaymentApply',
    name: 'repaymentApply',
    component: () => import('../views/repayment/repaymentApply/approval'),
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
    component: () => import('../views/repayment/repaymentReview/approval'),
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
