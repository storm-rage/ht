import Layout from '@pubComponent/layout/DefaultLayout';

export default [{
  path: '/workflow',
  component: Layout,
  meta: {
    notRequireAuth: true
  },
  children: [
    {
      path: 'businessApplyYamiAudit',
      name: 'businessApplyYamiAudit',
      component: () => import('../views/businessManage/biz/yami/audit.vue'),
      meta: {
        title: '供应商业务申请审核',
        parent:'login'
      }
    },
    {
      path: 'contractReSignYamiAudit',
      name: 'contractReSignYamiAudit',
      component: () => import('../views/businessManage/contractReSign/yami/audit.vue'),
      meta: {
        title: '供应商合同续签审核',
        parent:'login'
      }
    },
    {
      path: 'quotaChangeYamiAudit',
      name: 'quotaChangeYamiAudit',
      component: () => import('../views/businessManage/quotaChange/yami/audit.vue'),
      meta: {
        title: '供应商额度申请审核',
        parent:'login'
      }
    },
    {
      path: 'tradeChangeYamiAudit',
      name: 'tradeChangeYamiAudit',
      component: () => import('../views/businessManage/tradeChange/yami/audit.vue'),
      meta: {
        title: '供应商业务维护审核',
        parent:'login'
      }
    },
    {
      path: 'financeYamiAudit',
      name: 'financeYamiAudit',
      component: () => import('../views/financingReviewManage/yami/audit.vue'),
      meta: {
        title: '融资风控审核',
        parent:'login'
      }
    },

  ]
}]
