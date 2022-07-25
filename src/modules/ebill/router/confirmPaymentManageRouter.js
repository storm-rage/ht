/**
 * 确认收款路由
 * @type {any}
 */
const confirmPaymentManageRouter = [
  {
    path: '/confirmReceipt',
    name: 'confirmReceipt',
    component: () => import('../views/clearingManage/confirmPaymentManage/query/list.vue'),
    meta: {
      title: '确认收款',
      root: '清算管理',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/billConfirmPaymentApply',
    name: 'billConfirmPaymentApply',
    component: () => import('../views/clearingManage/confirmPaymentManage/billConfirmPaymentApply/index.vue'),
    meta: {
      title: '凭证确认收款申请',
      parent: 'confirmReceipt',
      keepAlive: true,
      refreshIndex: 0
    },
  },
  {
    path: '/otherConfirmPaymentApply',
    name: 'otherConfirmPaymentApply',
    component: () => import('../views/clearingManage/confirmPaymentManage/otherConfirmPaymentApply/index.vue'),
    meta: {
      title: '非凭证确认收款申请',
      parent: 'confirmReceipt',
      keepAlive: true,
      refreshIndex: 0
    },
  },
];
export default confirmPaymentManageRouter;
