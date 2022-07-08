
/**
 * 站内信
 */
 const platformManagerRouter = [
    {
        path: '/operatorAnnouncement',
        name: 'operatorAnnouncement',
        component: () => import('../views/platformManager/operatorAnnouncement/index.vue'),
        meta: {
          isMock: true,
          title: `运营公告维护`,
          root: '平台管理',
          keepAlive: true,
          refreshIndex: 0,
          notRequireAuth: true
        },
      },
      {
        path: '/modelAggreement',
        name: 'modelAggreement',
        component: () => import('../views/platformManager/modelAggreement/index.vue'),
        meta: {
          isMock: true,
          title: `基础协议模板查询`,
          root: '平台管理',
          keepAlive: true,
          refreshIndex: 0,
          notRequireAuth: true
        },
      },
      {
        path: '/basicInfo',
        name: 'basicInfo',
        component: () => import('../views/platformManager/basicInfo/index.vue'),
        meta: {
          isMock: true,
          title: `平台基础信息设置`,
          root: '平台管理',
          keepAlive: true,
          refreshIndex: 0,
          notRequireAuth: true
        },
      }
    //   {
    //     path: '/voucherTransferApplication',
    //     name: 'voucherTransferApplication',
    //     component: () => import('../views/billLssue/transferApplication/voucherTransferApplication.vue'),
    //     meta: {
    //       isMock: false,
    //       title: `凭证转让申请`,
    //       root: '电子债权凭证',
    //       keepAlive: true,
    //       refreshIndex: 0,
    //       notRequireAuth: true
    //     },
    //   },
  ]
  
  export default platformManagerRouter