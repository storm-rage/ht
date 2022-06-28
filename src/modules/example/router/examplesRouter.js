/**
 * sys基础路由
 */
const examplesRouter = [
    {
      path: '/staticPage',
      name: 'staticPage',
      component: () => import('../views/staticPage.vue'),
      meta: {
        notRequireAuth: true
      }
    },
    // 父子组件
    {
      path: '/parentComp',
      name: 'parentComp',
      component: () => import('../views/parent.vue'),
      meta: {
        notRequireAuth: true
      }
    },
]

export default examplesRouter
