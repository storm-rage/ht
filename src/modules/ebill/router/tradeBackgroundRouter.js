
const tradeBackgroundRouter = [
  {
    path: '/tradeRelations',
    name: 'tradeRelations',
    component: () => import('../views/tradeBackground/tradeRelations/index.vue'),
    meta: {
      title: `贸易关系管理`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/busiessTradeRelations',
    name: 'busiessTradeRelations',
    component: () => import('../views/tradeBackground/busiessTradeRelations/index.vue'),
    meta: {
      isMock: true,
      title: `贸易关系管理`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/busiessTradeRelationsInfo',
    name: 'busiessTradeRelationsInfo',
    component: () => import('../views/tradeBackground/busiessTradeRelations/myTradeRelations/info.vue'),
    meta: {
      isMock: false,
      title: `贸易关系详情`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/busiessTradeRelationsDealInfo',
    name: 'busiessTradeRelationsDealInfo',
    component: () => import('../views/tradeBackground/busiessTradeRelations/info.vue'),
    meta: {
      isMock: false,
      title: `贸易关系交易详情`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/tradeRelations',
    name: 'tradeRelations',
    component: () => import('../views/tradeBackground/tradeRelations/index.vue'),
    meta: {
      isMock: true,
      title: `贸易关系管理`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/myStatement',
    name: 'myStatement',
    component: () => import('../views/tradeBackground/myStatement/index.vue'),
    meta: {
      isMock: true,
      title: `我的对账单`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
]
export default tradeBackgroundRouter
