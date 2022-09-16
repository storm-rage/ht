const multistageAgreementManageRouter = [
  {
    path: '/frontBackAgreeManage',
    name: 'frontBackAgreeManage',
    component: () => import('../views/multistageAgreementManage/index.vue'),
    meta: {
      isMock: true,
      title: '阶段性协议查询',
      root: '阶段性协议管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/multistageAgreementMaintain',
    name: 'multistageAgreementMaintain',
    component: () => import('../views/multistageAgreementManage/multistageAgreementMaintain.vue'),
    meta: {
      title: '阶段性协议维护',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'frontBackAgreeManage',
      refreshIndex: 0
    }
  },
  {
    path: '/multistageAgreementDetail',
    name: 'multistageAgreementDetail',
    component: () => import('../views/multistageAgreementManage/detail.vue'),
    meta: {
      title: '阶段性协议详情',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'frontBackAgreeManage',
      refreshIndex: 0
    }
  },
]
export default multistageAgreementManageRouter
