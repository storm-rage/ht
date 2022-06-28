import routes from '../modules/router.config';
import {uuid} from '@utils/index'
/**
 * 构造静态菜单树
 * @param routes 路由
 */
export const genMockMenu = () => {
  const menuList = []
  if (process.env.VUE_APP_IS_MOCK) {
    const rootId = uuid();
    //融单menu
    const rootMenu = {
      icon: null,
      children:[],
      id: rootId,
      isMenu: '1',
      name: "融单",
      parentId: null,
      remark: null,
      sequence: '1',
      type: '',
      url: null
    }
    menuList.push(rootMenu)
    const mockMenu = routes[0].children.filter((item) => {
      return item.meta&&item.meta.isMock&&item.meta.root;
    })
    const parentRouter = {};
    if (mockMenu.length) {
      mockMenu.forEach((item) => {
        const router = parentRouter[item.meta.root];
        const parentId = uuid();
        const menu = {
          icon: null,
          id: uuid(),
          isMenu: '1',
          name: item.meta.title,
          parentId:parentId,
          remark: null,
          sequence: '01',
          type: 'ebill',
          url: item.name
        }
        if (router) {
          menu.parentId = router.id;
          menuList.push(menu)
        }else {
          parentRouter[item.meta.root] = {
            icon: 'query',
            id: parentId,
            isMenu: '1',
            name: item.meta.root,
            parentId: rootId,
            remark: null,
            sequence: '07',
            type: null,
            url: null
          }
          menuList.push(menu)
          menuList.push(parentRouter[item.meta.root])
        }
      })
    }
  }
  return menuList;
}
