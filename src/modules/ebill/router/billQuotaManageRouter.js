/**
 * 额度变更路由
 * @type {any}
 */
const billQuotaManageRouter = [
  {
    path: '/adjustCreditApply',
    name: 'adjustCreditApply',
    component: () => import('../views/contractManage/billQuota/apply/index.vue'),
    meta: {
      title: '额度变更申请',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/contractDetail',
    name: 'contractDetail',
    component: () => import('../views/contractManage/billQuota/apply/contractDetail/index.vue'),
    meta: {
      title: '国内商业保理合同详情',
      parent: 'adjustCreditApply',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/quotaChangeApply',
    name: 'quotaChangeApply',
    component: () => import('../views/contractManage/billQuota/apply/detailPage/index.vue'),
    meta: {
      title: '额度变更申请',
      parent: 'adjustCreditApply',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/adjustCreditReview',
    name: 'adjustCreditReview',
    component: () => import('../views/contractManage/billQuota/review/index.vue'),
    meta: {
      title: '额度变更复核',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/quotaChangeReview',
    name: 'quotaChangeReview',
    component: () => import('../views/contractManage/billQuota/review/detailPage/index.vue'),
    meta: {
      title: '额度变更复核',
      parent: 'adjustCreditReview',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/creditChangeDeal',
    name: 'creditChangeDeal',
    component: () => import('../views/contractManage/billQuota/query/index.vue'),
    meta: {
      title: '额度变更交易查询',
      root: '合同管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/changeDetail',
    name: 'changeDetail',
    component: () => import('../views/contractManage/billQuota/query/detailPage/index.vue'),
    meta: {
      title: '额度变更交易详情',
      parent: 'creditChangeDeal',
      keepAlive: true,
      refreshIndex: 0
    },
  }
]
export default billQuotaManageRouter
