/**
 * 业务申请 路由
 */
const businessApplyRouter = [
    {
      path: '/productsOpened',
      name: 'productsOpened',
      component: () => import('../views/businessApply/productsOpened/index.vue'),
      meta:{
        isMock:true,
        title:`产品开通申请`,
        root:'业务申请',
        keepAlive:true,
        refreshIndex:0
      }
    },
    {
      path: '/transactionQuery',
      name: 'transactionQuery',
      component: () => import('../views/businessApply/transactionQuery/index.vue'),
      meta:{
        isMock:true,
        title:`基础信息维护交易查询`,
        root:'业务申请',
        keepAlive:true,
        refreshIndex:0
      }
    },
    {
      path: '/transactionQueryDetails',
      name: 'transactionQueryDetails',
      component: () => import('../views/businessApply/transactionQuery/details/index.vue'),
      meta:{
        isMock:false,
        title:`基础信息维护交易详情`,
        keepAlive:true,
        refreshIndex:0,
        notRequireAuth: true
      }
    },
    {
      path: '/productsOpenedApply',
      name: 'productsOpenedApply',
      component: () => import('../views/businessApply/productsOpenedApply/index.vue'),
      meta:{
        isMock:false,
        title:`产品开通申请`,
        keepAlive:true,
        refreshIndex:0,
        notRequireAuth: true
      }
    }
  ]
  export default businessApplyRouter
