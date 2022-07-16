const tradeRelationsRouter = [
  {
    path: '/tradeRelationsAudit',
    name: 'tradeRelationsAudit',
    component: () => import('../views/tradeRelations/audit.vue'),
    meta: {
      isMock: true,
      title: '贸易关系审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/tradeRelationsDetail',
    name: 'tradeRelationsDetail',
    component: () => import('../views/tradeRelations/detail.vue'),
    meta: {
      isMock: true,
      title: '贸易关系交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
]
export default tradeRelationsRouter
