/**
 * 业务参数验证 路由
 */

const bizParamValidate = [
  {
    path: '/bizParamValidate',
    name: 'bizParamValidate',
    component: () => import('../views/sysModules/bizParamValidate/bizParamValidate.vue'),
    meta: {
      title: '业务参数验证',
      notRequireAuth: true
    }
  },
]

export default bizParamValidate
