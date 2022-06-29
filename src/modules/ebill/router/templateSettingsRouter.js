/**
 * 模板设置 路由
 */
const templateSettings = [

  //------------------------------- 模板设置 --------------------------------------
  {
    path: '/agreementTemplateSet',
    name: 'agreementTemplateSet',
    component: () => import('../views/templateSetting/agreementTemplateSet/index.vue'),
    meta:{
      title:'协议模板设置',
      keepAlive: true,
      root:'业务设置',
      refreshIndex:0,
    }
  },

  {
    path: '/bizParamsSetting',
    name: 'bizParamsSetting',
    component: () => import('../views/templateSetting/agreementTemplateSet/index.vue'),
    meta:{
      title:'业务参数设置',
      keepAlive: true,
      parent:'agreementTemplateSet',
      refreshIndex:0
    }
  }
]

export default templateSettings
