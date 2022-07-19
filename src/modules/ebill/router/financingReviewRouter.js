const financingReviewRouter = [
  {
    path: '/financingReview',
    name: 'financingReview',
    component: () => import('../views/financingManage/financingReview'),
    meta: {
      isMock: true,
      title: '融资复核',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/orderFinancingReview',
    name: 'orderFinancingReview',
    component: () => import('../views/financingManage/financingReview/review'),
    meta: {
      isMock: true,
      title: '融资融资复核',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'financingReview',
      notRequireAuth: true
    }
  },
]
export default financingReviewRouter
