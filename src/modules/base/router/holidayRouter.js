/**
 * 节假日
 */
const holidayRouter = [
  {
    path: '/holidaySet',
    name: 'holidaySet',
    component: () => import('../../ebill/views/holiday'),
    meta: {
      title:'节假日',
      // parent: 'home',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  }
]

export default holidayRouter
