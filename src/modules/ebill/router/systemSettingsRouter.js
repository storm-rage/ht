// 设置  路由
const systemSettings = [
  //------------------------------- 银行资金方-供应商企业业务设置 --------------------------------------
  {
    path: '/bankFundingSeller',
    name: 'bankFundingSeller',
    component: () => import('../views/systemSettings/bankSup/index.vue'),
    meta:{
      title:'银行-供应商企业设置',
      keepAlive: true,
      root:'业务设置',
      refreshIndex:0,
    }
  },
  {
    path: '/bankFundingSellerAdd',
    name: 'bankFundingSellerAdd',
    component: () => import('../views/systemSettings/bankSup/addANDedit/addANDedit.vue'),
    meta:{
      title:'供应商企业参数配置',
      keepAlive: true,
      parent:'bankFundingSeller',
      refreshIndex:0,
      pageType:'add'
    }
  },
  {
    path: '/bankFundingSellerEdit',
    name: 'bankFundingSellerEdit',
    component: () => import('../views/systemSettings/bankSup/addANDedit/addANDedit.vue'),
    meta:{
      title:'供应商企业参数配置',
      keepAlive: true,
      parent:'bankFundingSeller',
      refreshIndex:0,
      pageType:'edit'
    }
  },
  {
    path: '/bankFundingSellerDetail',
    name: 'bankFundingSellerDetail',
    component: () => import('../views/systemSettings/bankSup/detail/details.vue'),
    meta:{
      title:'供应商企业参数配置详情',
      keepAlive: true,
      parent:'bankFundingSeller',
      refreshIndex:0,
    }
  },
  //------------------------------- 平台参数设置 --------------------------------------
  {
    path: '/sysPlatform',
    name: 'sysPlatform',
    component: () => import('../views/systemSettings/platform/index.vue'),
    meta:{
      title:'平台参数设置',
      keepAlive: true,
      root:'业务设置',
      refreshIndex:0,
    }
  },
  {
    path: '/pubProjectSetting',
    name: 'pubProjectSetting',
    component: () => import('../views/systemSettings/platform/projectSetting.vue'),
    meta:{
      title:'平台项目设置',
      keepAlive: true,
      root:'业务设置',
      refreshIndex:0,
    }
  },
  {
    path: '/bankDockingSetting',
    name: 'bankDockingSetting',
    component: () => import('../views/systemSettings/platform/projectDockSetting.vue'),
    meta:{
      title:'银行对接设置',
      keepAlive: true,
      root:'业务设置',
      refreshIndex:0,
    }
  },
  {
    path: '/bankDockingParamAdd',
    name: 'bankDockingParamAdd',
    component: () => import('../views/systemSettings/platform/projectDockParamAdd.vue'),
    meta:{
      title:'银行对接设置',
      keepAlive: true,
      parent:'bankDockingSetting',
      refreshIndex:0
    }
  },
  {
    path: '/bankDockingParamSetting',
    name: 'bankDockingParamSetting',
    component: () => import('../views/systemSettings/platform/projectDockParamSetting.vue'),
    meta:{
      title:'银行对接设置',
      keepAlive: true,
      parent:'bankDockingSetting',
      refreshIndex:0
    }
  },
  {
    path: '/bankDockingParamDetail',
    name: 'bankDockingParamDetail',
    component: () => import('../views/systemSettings/platform/projectDockParamDetail.vue'),
    meta:{
      title:'银行对接设置',
      keepAlive: true,
      parent:'bankDockingSetting',
      refreshIndex:0
    }
  },
  {
    path: '/addPlatformProject',
    name: 'addPlatformProject',
    component: () => import('../views/systemSettings/platform/sub/addProjectSetting.vue'),
    meta:{
      title:'平台项目-新增',
      keepAlive: true,
      parent:'pubProjectSetting',
      refreshIndex:0
    }
  },
  {
    path: '/editPlatformProject',
    name: 'editPlatformProject',
    component: () => import('../views/systemSettings/platform/sub/editProjectSetting.vue'),
    meta:{
      title:'平台项目-编辑',
      keepAlive: true,
      parent:'pubProjectSetting',
      refreshIndex:0
    }
  },
  {
    path: '/bizParamsSetting',
    name: 'bizParamsSetting',
    component: () => import('../views/systemSettings/platform/sub/bizParamsSetting.vue'),
    meta:{
      title:'业务参数设置',
      keepAlive: true,
      parent:'pubProjectSetting',
      refreshIndex:0
    }
  }
]

export default systemSettings
