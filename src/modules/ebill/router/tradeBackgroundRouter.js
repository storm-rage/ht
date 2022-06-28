
const tradeBackgroundRouter = [
  {
    path: '/tradeRelations',
    name: 'tradeRelations',
    component: () => import('../views/tradeBackground/tradeRelations/index.vue'),
    meta: {
      isMock: true,
      title: `贸易关系管理`,
      root: '贸易背景管理',
      keepAlive: true,
      refreshIndex: 0
    }
  }
]
export default tradeBackgroundRouter
