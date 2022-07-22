
const agreementManageRouter = [
  {
    path: '/agreementManage',
    name: 'agreementManage',
    component: () => import('../views/agreementManage/index.vue'),
    meta: {
      isMock: true,
      title: `阶段性协议管理`,
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/financingAgreementManage',
    name: 'financingAgreementManage',
    component: () => import('../views/financingManage/agreementManage'),
    meta:{
      isMock: true,
      title:`阶段性协议管理`,
      root: '融资管理',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default agreementManageRouter
