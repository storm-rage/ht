import Layout from '@pubComponent/layout/DefaultLayout';

export default [{
  path: '/workflow',
  component: Layout,
  meta: {
    notRequireAuth: true
  },
  children: [
    {
      path: 'businessApplyWAudit',
      name: 'businessApplyWAudit',
      component: () => import('../views/businessManage/biz/yami/audit.vue'),
      meta: {
        title: '供应商业务申请审核',
        parent:'login'
      }
    }
  ]
}]
