/**
 * 电子债权凭证 路由
 */
 const credentialPrintRouter = [
    {
      path: '/credentialPrint',
      name: 'credentialPrint',
      component: () => import('../views/credentialPrint/index.vue'),
      meta: {
        isMock: true,
        title: `凭据打印`,
        root: '凭据打印',
        keepAlive: true,
        refreshIndex: 0,
        notRequireAuth: true
      }
    },
    {
        path: '/credentialPrintDetail',
        name: 'credentialPrintDetail',
        component: () => import('../views/credentialPrint/detail.vue'),
        meta: {
          isMock: false,
          title: '凭据打印详情',
          root: '凭据打印',
          keepAlive: true,
          refreshIndex: 0,
          notRequireAuth: true
        },
      }
]
export default credentialPrintRouter