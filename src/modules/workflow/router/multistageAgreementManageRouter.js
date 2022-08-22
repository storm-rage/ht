const multistageAgreementManageRouter = [
  {
    path: '/frontBackAgreeManage',
    name: 'frontBackAgreeManage',
    component: () => import('../views/multistageAgreementManage/index.vue'),
    meta: {
      isMock: true,
      title: '阶段性协议管理',
      root: '阶段性协议管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/multistageAgreementMaintain',
    name: 'multistageAgreementMaintain',
    component: () => import('../views/multistageAgreementManage/multistageAgreementSearch/maintain/index'),
    meta: {
      isMock: true,
      title: '阶段性协议维护',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'frontBackAgreeManage',
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/multistageAgreementDetail',
    name: 'multistageAgreementDetail',
    component: () => import('../views/multistageAgreementManage/multistageAgreementSearch/maintain/detail'),
    meta: {
      isMock: true,
      title: '阶段性协议详情',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'frontBackAgreeManage',
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/multistageAgreementDetailToDo',
    name: 'multistageAgreementDetailToDo',
    component: () => import('../views/multistageAgreementManage/multistageAgreementSearch/maintain/todoDetail'),
    meta: {
      isMock: true,
      title: '阶段性协议维护交易详情',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'frontBackAgreeManage',
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
]
export default multistageAgreementManageRouter
