<template>
<div class="menu-tree">
    <label v-for="(item,index) in menuData" :key="index">
        <template v-if="item.children">
            <el-submenu :index="item.id.toString()" >
                <template slot="title">
                  <i v-if="item.icon" class="icon-img" :class="[`ht-iconfont ${item.icon}`,{'menu-collapse': collapse}]"/>
                  <span slot="title">{{item.name}}</span>
                </template>
                <MenuTree :menuData="item.children"></MenuTree>
            </el-submenu>
        </template>
        <template  v-else-if="!item.children && item.url">
            <el-menu-item :index="item.url" @click="toRouter(item)">
              <i v-if="item.icon" :class="[`ht-iconfont ${item.icon}`,{'menu-collapse': collapse}]" class="icon-img"/>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </template>
    </label>
</div>
</template>

<script>
    export default {
        name: "MenuTree",
        props:['menuData','collapse'],
        data () {
          return {
            currentMenu: {}
          };
        },
       watch: {
         '$route'() {
           if (this.$route) {
             const currentItem = this.menuData.filter(item => {
               return item.url == this.$route.name;
             });
             if (currentItem.length) {
               this.setCurrentMemu(currentItem[0]);
             }
           }
         }
       },
        created() {
         if (this.$route) {
           const currentItem = this.menuData.filter(item => {
             return item.url == this.$route.name;
           });
           if (currentItem.length) {
             this.setCurrentMemu(currentItem[0]);
           }
         }
       },
      methods:{
            setCurrentMemu (item) {
              this.currentMenu = item;
              if (this.$parent && this.$parent.$parent) {
                this.$parent.$parent.currentMenu = item;
              } else if (this.$parent) {
                this.$parent.currentMenu = item;
              }
            },
            toRouter(item){
              this.setCurrentMemu(item);
              let rItem = {
                name:item.url || item.name,
                params:{
                  boo:true
                }
              }
              this.$store.commit('tab/tabRefresh',rItem)
              this.$router.replace({name:item.url || item.name})
              this.$store.dispatch('menu/SET_MENU_ACTIVE',item.url || item.name) //设置选中
            }
        }
    }
</script>
<style lang="less">
.el-submenu .el-menu-item{
  min-width: auto!important;
}
</style>
