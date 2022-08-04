
const myBillRouter = [
  {
    path: '/myBill',
    name: 'myBill',
    component: () => import('../views/myBill/index.vue'),
    meta: {
      isMock: true,
      title: `我的凭证`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billDetail',
    name: 'billDetail',
    component: () => import('../views/myBill/billDetail/index.vue'),
    meta:{
      isMock:false,
      title:`电子债权凭证详情`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default myBillRouter
