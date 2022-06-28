/**
 * 站内信
 */
const messageRouter = [
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message'),
    meta:{
      title:'站内信列表',
      root:'站内信列表',
      parent: 'home',
      keepAlive:false,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
  {
    path: '/messageDetail/:id',
    name: 'messageDetail',
    component: () => import('../views/message/detail'),
    meta:{
      title:'站内信详情',
      root:'站内信详情',
      parent: 'message',
      keepAlive:false,
      refreshIndex:0,
      notRequireAuth: true
    }
  }
]

export default messageRouter

