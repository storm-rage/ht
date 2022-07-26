/**
 * 站内信
 */
const homeMessageRouter = [
  {
    path: '/homeMessage',
    name: 'homeMessage',
    component: () => import('../views/homeMessage'),
    meta:{
      title:'站内信列表',
      parent: 'home',
      keepAlive:false,
      refreshIndex:0,
      notRequireAuth: true
    }
  }
]

export default homeMessageRouter

