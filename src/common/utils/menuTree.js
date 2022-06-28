const getMenuTreeList = (menuList) => {
  // 获取一级菜单
  let rootList = menuList.filter(item => !item.parentId || item.parentId === item.id)
  // 组装菜单树
  let menuTreeList = []
  menuTreeList = rootList.map(item => {
    return getMenuChildren(item, menuList)
  })
  // 过滤没有子节点且没有url的二级菜单
  menuTreeList = menuTreeList.map(item => {
    if (item.children) {
      item.children = item.children.filter(childrenItem => childrenItem.children || childrenItem.url)
    }
    return item
  })
  // 过滤没有子节点的一级菜单
  menuTreeList = menuTreeList.filter(item => item.children)
  //删除节点
  for(let i=0; i<menuTreeList.length; i++){
    if(menuTreeList[i].children.length <= 0){
      menuTreeList.splice(i,1)
      i--
    }
  };
  return menuTreeList
};
const getMenuChildren = (parent, menuList) => {
  parent.children = null
  menuList.find(item => {
    // 子节点
    if (item.parentId === parent.id && item.id !== parent.id) {
      parent.children ? parent.children.push(item) : parent.children = [item]
      parent.children.sort((a, b) => { return Number(a.sequence) - Number(b.sequence) })
      getMenuChildren(item, menuList)
    }
  })
  return parent
};

const getMenuPower = (list) => {
  //保存权限路径
  let urlArr = []
  list.forEach(item => {
    if(item.url !== null){
      urlArr.push(item.url)
    }
  });
  return urlArr;
}

export {getMenuTreeList,getMenuPower}
