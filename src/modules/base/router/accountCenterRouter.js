/**
 * 账户中心 路由
 */


const accountCenter = [
  {
    path: '/myEntBank',
    name: 'myEntBank',
    component: () => import('../views/sysModules/accountCenter/corporateBankAccount.vue'),
    meta:{
      title:'企业银行账户',
      root:'账户中心',
      keepAlive:true,
      refreshIndex:0
    }
  },
  {
    path: '/myBasicInformation',
    name: 'myBasicInformation',
    component: () => import('../views/sysModules/accountCenter/myBasicInformation.vue'),
    meta:{
      title:'我的基本信息',
      root:'账户中心',
      keepAlive:true,
      refreshIndex:0
    }
  },
  {
    path: '/myBillingInformation',
    name: 'myBillingInformation',
    component: () => import('../views/sysModules/accountCenter/myBillingInformation.vue'),
    meta:{
      title:'我的开票信息',
      root:'账户中心',
      keepAlive:true,
      refreshIndex:0
    }
  },
  {
    path: '/myBusinessUsers',
    name: 'myBusinessUsers',
    component: () => import('../views/sysModules/accountCenter/myBusinessUsers.vue'),
    meta:{
      title:'我的企业用户',
      root:'账户中心',
      keepAlive:true,
      refreshIndex:0
    }
  }
]

export default accountCenter
