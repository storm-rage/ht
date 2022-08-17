
const tradeBackgroundRouter = [
  {
    // 贸易关系管理-供应商
    path: '/tradeRelationEnt',
    // tradeRelationEnt​
    name: 'tradeRelationEnt',
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
    // 贸易关系管理-平台方
    path: '/tradeRelationPlatform',
    name: 'tradeRelationPlatform',
    component: () => import('../views/tradeBackground/busiessTradeRelations/index.vue'),
    meta: {
      isMock: true,
      title: `贸易关系管理平台方`,
      root: '客户信息管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/busiessTradeRelationsInfo',
    name: 'busiessTradeRelationsInfo',
    component: () => import('../views/tradeBackground/busiessTradeRelations/detilt'),
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
    path: '/myAccountBill',
    name: 'myAccountBill',
    component: () => import('../views/tradeBackground/myStatement/index.vue'),
    meta: {
      title: `我的对账单`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0,
    }
  }
]
export default tradeBackgroundRouter
