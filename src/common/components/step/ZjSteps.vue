<template>
<div style="left: 40%;position: relative;transform: translateX(-50%);margin-left: 176px" :style="{width: pParentWidth+'px'}">
  <div id="zj-steps" :style="{width: parentWidth+'px'}">
    <el-row v-for="(item,index) in list" :key="index" class="zj-steps-item" :style="{width:width + 'px'}">
      <i :class="item.state"/>
      <span>{{ isDayTime ? dayTime(item.date) : item.createDatetime}}</span>
      <label :class="item.state" :title="item.label">{{item.notes}}</label>
      <b v-if="index+1 !== list.length"/>
    </el-row>
  </div>
</div>

</template>

<script>
    export default {
        name: "ZjSteps",
        computed: {
          parentWidth () {
            return (this.parentItemSize-1)*200+48;
          },
          pParentWidth () {
            return this.parentItemSize*200;
          }
        },
        props:{
          parentItemSize: {
            type: Number,
            default:1
          },
          isDayTime:{
            type:Boolean,
            default:true
          },
          width:{
            type: Number,
            default:400
          },
          list:{
            type:Array,
            default(){
              return []
            }
            // [
            //   {state:'',date:'2021-01-01 16:34:28',label:'融资申请提交'},
            //   {state:'',date:'2021-01-01 16:34:28',label:'融资复核通过'},
            //   {state:'error',date:'2021-01-01 16:34:28',label:'融资审核驳回'},
            // ]
          }
        }
    }
</script>

<style lang="less">
#zj-steps{
  position: relative;
  overflow: hidden;
  background-color: #F5F9FF;
  padding-left: 10px;
  .zj-steps-item{
    position: relative;
    /*padding-bottom: 12px;*/
    //left: 50%;
    //transform: translateX(-50%);
    min-width: 500px!important;
    i{
      display: inline-block;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #CFE3FC;
      transform: translateY(1px);
      &.success{
        background: #409eff;
      }
      &.error{
        background: #EF6666;
      }
    }
    span{
      display: inline-block;
      height: 20px;
      margin:0 10px;
      font-size: 14px;
      color: #999999;
    }
    label{
      display: inline-block;
      margin-left: 10px;
      width: calc(100% - 200px);
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      transform: translateY(5px);
      font-size: 14px;
      &.error{
        color: #EF6666;
      }
    }
    b{
      position: absolute;
      height: 17px;
      width: 3px;
      left: 4px;
      top: 80%;
      background: #CFE3FC;
    }
  }
}
</style>
