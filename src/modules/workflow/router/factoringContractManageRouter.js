const factoringContractManageRouter = [
  {
    path: '/factoringContractAudit',
    name: 'factoringContractAudit',
    component: () => import('../views/factoringContractManage/contract/audit.vue'),
    meta: {
      isMock: true,
      title: '国内商业保理合同确认',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/factoringContractApplyDetail',
    name: 'factoringContractApplyDetail',
    component: () => import('../views/factoringContractManage/contract/detail.vue'),
    meta: {
      isMock: true,
      title: '国内商业保理合同确认交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/factoringQuotaChangeAudit',
    name: 'factoringQuotaChangeAudit',
    component: () => import('../views/factoringContractManage/quota/audit.vue'),
    meta: {
      isMock: true,
      title: '额度变更审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/factoringQuotaChangeDetail',
    name: 'factoringQuotaChangeDetail',
    component: () => import('../views/factoringContractManage/quota/detail.vue'),
    meta: {
      isMock: true,
      title: '额度变更审核详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
];
export default factoringContractManageRouter
