import {getMenuPower} from '@utils/menuTree';
export default {
  methods:{
    //保存相关信息
    saveInfo(loginRes){
      // 设置项目列表
      this.$store.dispatch('project/setProjectList', loginRes.projectList);
      if (loginRes.projectList&&loginRes.projectList.length&&!loginRes.currentProject) {
        this.$store.dispatch('project/setProjectInfo', loginRes.projectList[0]);
      } else if(loginRes.currentProject) {
        this.$store.dispatch('project/setProjectInfo', loginRes.currentProject);
      }
      // 保存菜单树
      this.$store.dispatch('menu/setMenuTreeList', JSON.parse(JSON.stringify(loginRes.resList)));
      // 保存菜单列表
      this.$store.dispatch('menu/setMenuList', JSON.parse(JSON.stringify(loginRes.resList)));
      // 保存用户信息
      this.$store.dispatch('user/setUserInfo', {
        userName: loginRes.userName,
        loginName: loginRes.loginName,
        // password:loginRes.password,
        entName: loginRes.entName,
        entType:loginRes.entType,
        entId:loginRes.entId,
        mobileNo:loginRes.mobileNo,
        power:getMenuPower(loginRes.resList),
        signZJDJBFlag:loginRes.signZJDJBFlag
      })
      //设置默认到账户中心
      this.$store.dispatch('menu/setNavMenuActive', '0')
    }
  }
}
