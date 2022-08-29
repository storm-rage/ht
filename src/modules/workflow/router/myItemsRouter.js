const myItemsRouter = [
  {
    path: '/myTodo',
    name: 'myTodo',
    component: () => import('../views/myItems/index.vue'),
    meta: {
      title: '我的待办',
      root: '我的待办',
      keepAlive: true,
      refreshIndex: 0
    }
  }
]
export default myItemsRouter
