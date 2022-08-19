const factoringContractManageRouter = [
  {
    path: '/factoringContractAudit',
    name: 'factoringContractAudit',
    component: () => import('../views/factoringContractManage/contract/review/audit.vue'),
    meta: {
      title: '国内商业保理合同确认',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/factoringContractApplyDetail',
    name: 'factoringContractApplyDetail',
    component: () => import('../views/factoringContractManage/contract/detail/detail.vue'),
    meta: {
      title: '国内商业保理合同确认交易详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/factoringQuotaChangeAudit',
    name: 'factoringQuotaChangeAudit',
    component: () => import('../views/factoringContractManage/quota/review/audit.vue'),
    meta: {
      title: '额度变更审核',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/factoringQuotaChangeDetail',
    name: 'factoringQuotaChangeDetail',
    component: () => import('../views/factoringContractManage/quota/detail/detail.vue'),
    meta: {
      title: '额度变更审核详情',
      parent: 'myTodo',
      keepAlive: true,
      refreshIndex: 0
    }
  },
];
export default factoringContractManageRouter
