<template>
<div class="sw-tabs">
  <ul class="sw-tabs-header">
    <li v-for="(item,index) in list" :key="index" :class="[model === item.name ? 'checked' : '']">
        <div
          v-if="item.api && typeof(item.api) === 'function'"
          @click="aliveChange(item.name)"
        >
          {{item.label}}
        </div>
    </li>
  </ul>
  <div class="sw-tabs-body"
       v-for="(item,index) in list" :key="index"
       :style="{display:model === item.name  ? 'block' : 'none'}"
  >
    <div v-if="item.api && typeof(item.api) === 'function'">
      <slot :name="item.name"/>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "ZjTabs",
        model:{
          prop:'model',
          event:'change'
        },
        props:{
          model:String,
          list:{
            type:Array,
            default(){
              return []
            }
          },
          alive:{
            type:String,
            default:""
          }
        },
        methods:{
          aliveChange(name){
            this.$emit('change',name)
          }
        },
    }
</script>

<style scoped lang="less">
.sw-tabs{
  width: 100%;
  .hidden{
    display: none!important;
  }
  .sw-tabs-header{
    width: 100%;
    list-style: none;
    overflow: hidden;
    &:after{
      content: "";
      display: block;
      clear:both;
    }
    li{
      float: left;
      height: 40px;
      line-height: 40px;
      margin-left: 8px;
      padding: 0 30px;
      color: #303133;
      border: 1px solid #E4E7ED;
      border-bottom: 0;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.checked{
        background-color: #5494f2;
        color: #fff;
        border: 1px solid #5494f2!important;
      }
      &:hover{
        border: 1px solid #5494f2;
        border-bottom: 0;
      }
    }
  }
  .sw-tabs-body {
    border: 1px solid #5494f2;
    min-height: 500px;
    padding: 15px;
    overflow: auto;
  }
}
</style>
