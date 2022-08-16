<template>
  <div>
    <div class="sw-tab tab">
      <div style="overflow: hidden" ref="navTab">
        <el-tabs
          v-model="activeRouter"
          @contextmenu.prevent.native="openContextmenu"
          @tab-click="handleTabsClick"
          @tab-remove="handleTabsRemove"
          type="border-card">
          <el-tab-pane  v-for="item in tabTagList"
                        :label="tabTagTitle(item)"
                        :name="item.name"
                        closable
                        :key="item.name">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <ul v-show="contextmenuVisible" :style="{ left: contextmenuLeft + 'px',top: contextmenuTop + 'px'}" class="tab-context-menu">
      <li @click="refreshTab" v-if="$route.name === currentRoute.name">刷新当前</li>
      <li @click="deleteClick(currentRoute, $event)">关闭当前</li>
      <li @click="closeAllTab">全部关闭</li>
<!--      <li @click="closeOtherTab" v-if="tabTagList && tabTagList.length > 1">关闭其他</li>-->
    </ul>
  </div>

</template>

<script>
import {mapState} from "vuex";
export default {
  name: 'Tab',
  data () {
    return {
      contextmenuVisible: false,
      contextmenuLeft: 0,
      contextmenuTop: 0,
      currentRoute: this.$route,
      rightNavLeft: 0,
      rightNavTop: 0,
      activeRouter: this.$route.name
    }
  },
  methods: {
    //标题
    tabTagTitle(item){
      let title = item.meta ? item.meta.title : ''
      //融单签收
      if(item.name === 'billSign'){
        title = `${this.$store.getters['project/productName']}签收`
      }
      return title.replace(new RegExp("\\{0\\}","g"), this.$store.getters['project/productName'])
    },
    //删除
    deleteClick(item){
      this.$store.commit('tab/tabDel',item)
    },
    closeAllTab () {
      this.$store.commit('tab/tabClear');
    },
    /**
     * 点击事件
     * @param route
     */
    handleTabsClick(tabPane){
      const route = this.tabTagList.find((item) => {
        return item.name === tabPane.name;
      });
      this.currentRoute = route
      this.$router.push(route)
    },
    /**
     * 移除
     * @param name
     */
    handleTabsRemove (name) {
      const delRoute = this.tabTagList.find((item) => {
        return item.name === name;
      });
      this.deleteClick(delRoute)
    },
    // 打开标签页右击菜单
    openContextmenu(e) {
      const menuMinWidth = 105
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth
      const left = e.clientX

      if (left > maxLeft) {
        this.contextmenuLeft = maxLeft
      } else {
        this.contextmenuLeft = left
      }
      this.contextmenuLeft = left
      this.contextmenuTop = e.clientY
      this.contextmenuVisible = true;
    },
    // 关闭标签页右击菜单
    closeContextmenu () {
      this.contextmenuVisible = false
    },
    // 关闭其他标签页
    closeOtherTab () {
      this.$store.commit('tab/tabOther',this.currentRoute)
    },
    //刷新标签
    refreshTab () {
      if (this.contextmenuVisible) {
        this.contextmenuVisible = false;
      }
      this.$store.commit('tab/tabRefresh',this.currentRoute)
    }
  },
  computed: {
    ...mapState({
      tabTagList: state => state.tab.tabTagList, //标签
    })
  },
  created() {
    let rItem = {
      name:this.$route.name,
      fullPath:this.$route.fullPath,
      path:this.$route.path,
      meta:this.$route.meta
    }
    this.$store.commit('tab/tabAdd',rItem)
  },
  watch: {
    '$route'(newRouter){
      let rItem = {
        name:newRouter.name,
        fullPath:newRouter.fullPath,
        path:newRouter.path,
        meta:newRouter.meta,
        query: newRouter.query,
        params:{
          boo:newRouter.params && newRouter.params.rowData ? true : false
        }
      }
      this.$store.commit('tab/tabAdd',rItem)
      this.activeRouter = this.$route.name
      if(!this.$refs.tab){return}

    },
    contextmenuVisible (value) {
      // 监听标签页右击菜单 同步添加关闭方法
      if (value) {
        document.body.addEventListener('click', this.closeContextmenu)
      } else {
        document.body.removeEventListener('click', this.closeContextmenu)
      }
    }
  }
}
</script>
<style lang="less">
.sw-tab {
  .el-tabs--border-card{
    border: none;
  }
  .el-tabs__content {
    display: none;
  }
  .el-tabs__nav-prev,.el-tabs__nav-next {
    font-size: 18px;
    line-height: 31px;
  }
}
</style>
