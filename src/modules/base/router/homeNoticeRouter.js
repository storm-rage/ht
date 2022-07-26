/**
 * 公告
 */
export default [
  {
    path: '/homeNotice',
    name: 'homeNotice',
    component: () => import('../views/homeNotice'),
    meta:{
      title:'公告列表',
      parent: 'home',
      keepAlive:false,
      refreshIndex:0,
      notRequireAuth: true
    }
  }
]
