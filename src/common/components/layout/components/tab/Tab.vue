<template>
  <div>
    <div class="sw-tab tab">
      <!-- 面包屑 -->
      <!--    <div class="sw-bread">-->
      <!--      <label>当前位置：</label>-->
      <!--      <el-breadcrumb separator-class="el-icon-arrow-right" >-->
      <!--        <el-breadcrumb-item v-for="(item,index) in tabBreadList" :key="index" :to="{ name:item.name }">-->
      <!--          {{item.meta.title}}-->
      <!--        </el-breadcrumb-item>-->
      <!--      </el-breadcrumb>-->
      <!--    </div>-->

    <span class="tab-nav left left-nav" @click="back">
      <i class="el-icon-arrow-left"/>
    </span>
      <span class="tab-nav right right-nav" v-show="scrollable" @click="scrollToNext">
        <div class="arrow-one right"></div>
        <div class="arrow-one right"></div>
    </span>
      <div style="overflow: hidden" ref="navTab">
        <div class="tabScroll" ref="tabScroll" :style="navScrollStyle">
          <!-- 缓存页签 -->
          <!--      <el-tag ref="tab" v-for="(item,index) in tabTagList" :key="index" :to="item"-->
          <!--              @click="routerCut(item)"-->
          <!--              closable @close="deleteClick(item)"-->
          <!--              @contextmenu.prevent.native="openContextmenu(item, $event)"-->
          <!--      >-->
          <!--        <i class="aliveI"  :class=" item.name === tabActive ? 'success' : '' ">●</i>-->
          <!--        {{item.meta.title}}-->
          <!--      </el-tag>-->
          <router-link
            ref="tab"
            v-for="item in tabTagList"
            :key="item.index"
            :to="item"
            tag="span"
            class="tab-item"
            :title="item.meta ? transferTagTitle(item.meta.title) : ''"
            :class="item.name === $route.name ? 'active' : ''"
            @contextmenu.prevent.native="openContextmenu(item, $event)">
            <label>
              {{tabTagTitle(item)}}
            </label>
            <span class="tab-close" @click.stop="deleteClick(item)">&times;</span>
          </router-link>
        </div>
      </div>
    </div>
    <ul  @mouseleave.prevent="leaveRightNavMenu" v-show="rightNavMenuFlag" :style="{ left: rightNavLeft + 'px',top: rightNavTop + 'px'}" class="tab-context-menu w85px" >
      <li @click="refreshTab">刷新当前</li>
      <li @click="deleteClick(currentRoute, $event)">关闭当前</li>
      <li @click="closeAllTab">全部关闭</li>
    </ul>
    <ul v-show="contextmenuVisible" :style="{ left: contextmenuLeft + 'px',top: contextmenuTop + 'px'}" class="tab-context-menu">
      <li @click="refreshTab" v-if="$route.name === currentRoute.name">刷新</li>
      <li @click="deleteClick(currentRoute, $event)">关闭</li>
      <li @click="closeOtherTab" v-if="tabTagList && tabTagList.length > 1">关闭其他</li>
      <!--      <li @click="closeAllTab">关闭所有</li>-->
    </ul>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {removeResizeListener} from "element-ui/src/utils/resize-event";
export default {
  name: 'Tab',
  components: {
    // TabScroll
  },
  data () {
    return {
      contextmenuVisible: false,
      contextmenuLeft: 0,
      contextmenuTop: 0,
      currentRoute: {},
      scrollable: false,
      rightNavLeft: 0,
      rightNavTop: 0,
      rightNavMenuFlag: false,
      //偏移量
      navOffset: 0
    }
  },
  methods: {
    transferTagTitle (title) {
      return title.replace(new RegExp("\\{0\\}","g"), this.$store.getters['project/productName']);
    },
    //标题
    tabTagTitle(item){
      let title = item.meta ? item.meta.title : ''
      //融单签收
      if(item.name === 'billSign'){
        title = `${this.$store.getters['project/productName']}签收`
      }
      // console.error(title,item.name,item.name === 'billSign')
      return title.replace(new RegExp("\\{0\\}","g"), this.$store.getters['project/productName'])
    },
    //返回
    back(){
      //存在上级则返回上级
      if(this.hasParent) {
        this.goParent()
      } else {
        //old-无上级则直接关闭
        let currentIndex = 0;
        this.tabTagList.forEach((item, index) => {
          if (item.name === this.$router.currentRoute.name) {
            currentIndex = index;
          }
        });
        currentIndex = Math.max(currentIndex-1, 0);
        const tab = {...this.tabTagList[currentIndex]};
        this.$router.push(tab);
        this.scrollToPrev();
      }
    },
    //切换
    routerCut(item){
      this.$router.push({name:item.name})
    },
    //删除
    deleteClick(item,event){
      this.$store.commit('tab/tabDel',item)
      if (event.currentTarget && event.currentTarget.parentElement) {
        this.navOffset = this.navOffset - event.currentTarget.parentElement.offsetWidth;
        this.navOffset = Math.max(this.navOffset, 0);
        this.setScrollable();
      }
      // console.info(event.currentTarget.parentElement.offsetWidth);
      // console.info(event.target.parentElement);
    },
    closeAllTab () {
      this.$store.commit('tab/tabClear');
    },
    showRightNavMenu (e) {
      const left = e.clientX-70
      this.rightNavLeft = left
      this.rightNavTop = e.clientY+10
      this.rightNavMenuFlag = !this.rightNavMenuFlag
      this.currentRoute = this.$router.currentRoute;
    },
    leaveRightNavMenu () {
      this.rightNavMenuFlag = !this.rightNavMenuFlag
    },
    // 打开标签页右击菜单
    openContextmenu(route, e) {
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
      this.currentRoute = route
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
      if (this.rightNavMenuFlag) {
        this.rightNavMenuFlag = false;
      }
      this.$store.commit('tab/tabRefresh',this.currentRoute)
    },
    // 是否滚动
    setScrollable () {
      const navWidth = this.$refs.navTab.offsetWidth;
      // const tabScrollWidth = this.tabTagList.length*100;
      const tabScrollWidth = this.$refs.tabScroll.offsetWidth;
      this.scrollable = tabScrollWidth >= navWidth;
      if (this.scrollable) {
        this.$refs.tabScroll.style.marginRight = '35px';
      } else {
        this.$refs.tabScroll.style.marginRight = '';
      }
      return this.scrollable;
    },
    scrollToActiveTab() {
      if (!this.setScrollable()) {
        return;
      }
      const navBounding = this.$refs.navTab.getBoundingClientRect();
      const activeTab = this.$el.querySelector('.active');
      const activeTabBounding = activeTab.getBoundingClientRect();
      if (!activeTab) return;
      const currentOffset = this.navOffset;
      if (activeTabBounding.right > navBounding.right) {
        const navBounding = this.$refs.navTab.getBoundingClientRect();
        const rightNavW = this.getRightNavW();
        // 增加情况
        this.navOffset += activeTabBounding.right - navBounding.right + rightNavW;
      }else {
        if (currentOffset > 0) {
          this.navOffset = 0;
        }
      }
    },
    // 滚动到上一页
    scrollToPrev () {
      const navWidth = this.$refs.navTab.getBoundingClientRect().right;
      const currentOffset = this.navOffset;
      if (!currentOffset) return;
      this.navOffset = currentOffset>navWidth?currentOffset - navWidth:0;
    },
    // 滚动倒是下一页
    scrollToNext() {
      const navWidth = this.$refs.navTab.offsetWidth;
      const tabScrollWidth = this.$refs.tabScroll.offsetWidth;
      const rightNavWidth = this.getRightNavW();
      const currentOffset = this.navOffset;

      if (tabScrollWidth - currentOffset <= navWidth) return;
      this.navOffset = tabScrollWidth - currentOffset > navWidth * 2 ? currentOffset + navWidth : (tabScrollWidth - navWidth + rightNavWidth);
    },
    getRightNavW() {//计算右边距
      const rightNav = this.$el.querySelector('.right-nav');
      const rightNavW = rightNav.getBoundingClientRect().width;
      if (rightNavW) {
        return rightNavW + 10;
      }else {
        return 46;
      }
    },
    // 计算左边距
    getLeftNavW() {
      const leftNav = this.$el.querySelector('.left-nav');
      const leftNavW = leftNav.getBoundingClientRect().width;
      if (leftNavW) {
        return leftNavW + 10;
      }else {
        return 46;
      }
    },
    // 更新滚动位移
    updateTab() {
      if (!this.setScrollable()) {
        return;
      }
      const navBounding = this.$refs.navTab.getBoundingClientRect();
      const activeTab = this.$el.querySelector('.active');
      const activeTabBounding = activeTab.getBoundingClientRect();
      if (!activeTab) return;
      const leftNavW = this.getLeftNavW();
      if (activeTabBounding.left < navBounding.left + leftNavW) {
        this.navOffset = this.navOffset - (navBounding.left - activeTabBounding.left) - leftNavW;
      }
      if (activeTabBounding.right > navBounding.right) {
        const rightNavW = this.getRightNavW();
        this.navOffset += activeTabBounding.right - navBounding.right + rightNavW;
      }
    },
  },
  computed: {
    ...mapState({
      tabBreadList: state => state.tab.tabBreadList, //面包屑
      tabActive: state => state.tab.tabActive, //选中
      tabTagList: state => state.tab.tabTagList, //标签
    }),
    navScrollStyle() {
      return {
        transform: `translateX(-${this.navOffset}px)`
      }
    },
    hasParent () {
      return this.$route.meta.newParent || this.$route.meta.parent;
    }
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
  mounted() {
    // this.setScrollable();
    this.scrollToActiveTab();
    //--------状态
    // this.$nextTick(() => {
    //   // 监听路由 滚动条同步最新位置
    //   this.$refs.tab.find(item => {
    //     if (item.$attrs.to.name === this.$route.name) {
    //       this.$refs.tabScroll.moveToTarget(item)
    //     }
    //   })
    // })

    //---------无状态
    // this.$nextTick(()=>{
    //   if(this.$refs.tab){
    //     // 监听路由 滚动条同步最新位置
    //     this.$refs.tab.find(item => {
    //       if (item.to.name === this.$route.name) {
    //         this.$refs.tabScroll.moveToTarget(item)
    //       }
    //     })
    //   }
    // })
  },
  watch: {
    '$route'(newRouter){
      let rItem = {
        name:newRouter.name,
        fullPath:newRouter.fullPath,
        path:newRouter.path,
        meta:newRouter.meta,
        params:{
          boo:newRouter.params && newRouter.params.rowData ? true : false
        }
      }
      this.$store.commit('tab/tabAdd',rItem)
      // this.$nextTick(() => {
      //   // 监听路由 滚动条同步最新位置
      //   this.$refs.tab.find(item => {
      //     if (item.$attrs.to.name === this.$route.name) {
      //       this.$refs.tabScroll.moveToTarget(item)
      //     }
      //   })
      // })
      this.$nextTick(() => {
        this.updateTab();
      });
      if(!this.$refs.tab){return}
      // 监听路由 滚动条同步最新位置
      // this.$refs.tab.find(item => {
      //   if (item.to.name === this.$route.name) {
      //     this.$refs.tabScroll.moveToTarget(item)
      //   }
      // })

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
