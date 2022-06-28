
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
      refreshIndex: 0
    }
  }
  // {
  //   path: '/billDetail',
  //   name: 'billDetail',
  //   component: () => import('../views/myBill/billDetail/index.vue'),
  //   meta:{
  //     isMock:false,
  //     title:`凭证详情`,
  //     keepAlive:true,
  //     refreshIndex:0,
  //     notRequireAuth: true
  //   }
  // },
]
export default agreementManageRouter
