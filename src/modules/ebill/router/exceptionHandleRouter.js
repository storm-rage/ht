/**
 * 融资审核
 */

const exceptionHandle = [
  {
    path: '/bankExceptionHandle',
    name: 'bankExceptionHandle',
    component: () => import('../views/exceptionHandle/list.vue'),
    meta:{
      isMock: true,
      title:'接口异常管理',
      root:'接口管理',
      keepAlive:true,
      refreshIndex:0
    }
  }
]

export default exceptionHandle
