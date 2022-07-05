const myItemsRouter = [
  {
    path: '/myItems',
    name: 'myItems',
    component: () => import('../views/myItems/index.vue'),
    meta: {
      isMock: true,
      title: '我的代办',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0
    }
  }
]
export default myItemsRouter
