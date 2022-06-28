<template>
<div id="ZjWorkflow" ref="workflow" :class="collapseFlag ? 'lTrue' : 'lFalse'">
  <div class="workflow-top">
    <!-- @slot 顶部插槽 -->
    <slot name="top"></slot>
  </div>
  <div class="workflow-bottom">
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="[ flag ? item[flag] ? 'block' : 'none' : 'block' ]">
        <span :class="active === item[code] ? 'wfActive' : ''" @click="activeClick(item)">{{item[desc]}}</span>
      </li>
    </ul>
	<div class="right">
    <!-- @slot 右边插槽 -->
		<slot name="right"></slot>
	</div>
  </div>
</div>
</template>

<script>
    /**
     * 页面底部组件
     */
    import {mapState} from "vuex";

    export default {
        name: "ZjWorkflow",
        model:{
          prop:'model',
          event:'change'
        },
        props:{
          //选中

          /**
          * 是否选中
          */

          model:{
            type:String,
            default:''
          },
          //切换tabs

          /**
          * 列表值
          */

          list:{
            type:Array,
            default(){
              return []
            }
          },
          //渲染名

          /**
          * code值
          */

          code:{
              type:String,
              default:'value'
          },
          //渲染绑定值

          /**
          * 描述值
          */

          desc:{
              type:String,
              default:'label'
          },
          //是否有判断条件

          /**
          * 判断条件变量，改变class
          */

          flag:{
              type:String,
              default:''
          },
        },
        data(){
          return{
            active:this.model
          }
        },
        methods:{
          activeClick(item){
            this.active = item[this.code]

            /**
             * 点击改变状态
             *
             * @property {string} item 列表code值
            */

            this.$emit('change',item[this.code])
          }
        },
        computed: {
          ...mapState({
            collapseFlag: state => state.menu.collapseFlag
          })
        },
    }
</script>

<style lang="less" scoped>

</style>
