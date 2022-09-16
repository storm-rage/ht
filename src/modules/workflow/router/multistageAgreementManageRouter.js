const multistageAgreementManageRouter = [
  {
    path: '/multistageAgreementMaintainAudit',
    name: 'multistageAgreementMaintainAudit',
    component: () => import('../views/multistageAgreementManage/multistageAgreementSearch/maintain/index.vue'),
    meta: {
      title: '阶段性协议维护',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'myTodo',
      refreshIndex: 0
    }
  },
  {
    path: '/multistageAgreementAuditDetail',
    name: 'multistageAgreementAuditDetail',
    component: () => import('../views/multistageAgreementManage/multistageAgreementSearch/maintain/detail.vue'),
    meta: {
      title: '阶段性协议详情',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'myTodo',
      refreshIndex: 0
    }
  },
  {
    path: '/multistageAgreementDetailToDo',
    name: 'multistageAgreementDetailToDo',
    component: () => import('../views/multistageAgreementManage/multistageAgreementSearch/maintain/todoDetail.vue'),
    meta: {
      title: '阶段性协议维护交易详情',
      root: '阶段性协议管理',
      keepAlive: true,
      parent:'myTodo',
      refreshIndex: 0
    }
  },
]
export default multistageAgreementManageRouter
