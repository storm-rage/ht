
const agreementManageRouter = [
  {
    path: '/frontPhasedAgreeManage',
    name: 'frontPhasedAgreeManage',
    component: () => import('../views/financingManage/agreementManage/index.vue'),
    meta:{
      title:`阶段性协议管理`,
      root: '融资管理',
      keepAlive:true,
      refreshIndex:0,
    }
  },
  {
    path: '/frontPhasedMaintainLog',
    name: 'frontPhasedMaintainLog',
    component: () => import('../views/financingManage/agreementManage/components/maintainLog'),
    meta:{
      title:`阶段性协议维护记录`,
      root: '融资管理',
      keepAlive:true,
      parent: 'frontPhasedAgreeManage',
      refreshIndex:0,
    }
  },
  {
    path: '/frontPhasedMaintainLogDetail',
    name: 'frontPhasedMaintainLogDetail',
    component: () => import('../views/financingManage/agreementManage/components/maintainLogDetail.vue'),
    meta:{
      title:`阶段性协议维护详情`,
      root: '融资管理',
      keepAlive:true,
      parent: 'frontPhasedMaintainLog',
      refreshIndex:0,
      notRequireAuth: true,
    }
  },
]
export default agreementManageRouter
