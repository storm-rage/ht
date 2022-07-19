const financingReviewManageRouter = [
  {
    path: '/financingReviewManage',
    name: 'financingReviewManage',
    component: () => import('../views/financingReviewManage/index'),
    meta: {
      isMock: true,
      title: '融资审核管理',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/financingReviewToDoDetail',
    name: 'financingReviewToDoDetail',
    component: () => import('../views/financingReviewManage/toDo/toDoDetail'),
    meta: {
      isMock: true,
      title: '融资交易详情',
      root: '融资管理',
      keepAlive: true,
      parent:'financingReviewManage',
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/financingReviewToDoReview',
    name: 'financingReviewToDoReview',
    component: () => import('../views/financingReviewManage/toDo/toDoReview'),
    meta: {
      isMock: true,
      title: '融资审核',
      root: '融资管理',
      keepAlive: true,
      parent:'financingReviewManage',
      refreshIndex: 0,
      notRequireAuth: true
    }
  },

]
export default financingReviewManageRouter
