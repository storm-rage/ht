// router集中注入
import Layout from '@pubComponent/layout/Layout.vue'
let parentLayoutRouter = [{
  path: '/',
  component: Layout,
  redirect: '/home',
  children: []
}];
const routerFiles = require.context('./', true, /\/(.*)Router\.js$/)
let configRouters = routerFiles.keys().reduce((routes, routerPath) => {
  const value = routerFiles(routerPath).default
  if (value) {
    if (value.length==1&&value[0].children) {
      return routes.concat(value)
    } else {
      parentLayoutRouter[0].children = parentLayoutRouter[0].children.concat(value);
      return routes||[];
    }
  }
}, []);
if (parentLayoutRouter[0].children.length) {
  if (!configRouters) {
    configRouters = parentLayoutRouter;
  } else {
    configRouters = configRouters.concat(parentLayoutRouter);
  }
}
export default configRouters
