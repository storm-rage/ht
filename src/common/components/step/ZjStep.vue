<template>
  <el-row style="position: relative;overflow: hidden" id="zj-step">
    <div class="zj-progress" style="left: 40%;transform: translateX(-50%)" :style="{width:list.length * width + 'px'}">
      <div class="zj-progress-item" v-for="(item,index) in list" :class="[item.flag]" :key="index">
        <div class="zj-progress-item_box" :style="{width:width+'px'}" :class="[item.after,index === list.length -1 ?  'noAfter' : '']">
          <span class="zj-progress-item_box-index">{{ index+1 }}</span>
          <label class="zj-progress-item_box-label">{{item.desc}}</label>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
    export default {
        name: "ZjStep",
        props:{
          width:{
            type:Number,
            default:200
          },
          list:{
            type:Array,
            default(){
              return []
            }
          }
          // stepList:[
          //   {label:'开单申请',state:'success',after:'error'},
          //   {label:'平台审核',state:'error',after:'info'},
          //   {label:'开单复核',state:'info'}
          // ],
        },
        watch:{
          list(newList){
            this.$emit('boxWidth',(newList.length - 1.5) * this.width)
          }
        }
    }
</script>

<style lang="less">
  #zj-step{
    .zj-progress{
      position:relative;
      height: 100px;
      .zj-progress-item{
        display: inline-block;
        vertical-align: top;
        /*width: 141px;*/
        font-size: 12px;
        color: #999999;
        position: relative;
        &.success{
          color: #606266;
          .zj-progress-item_box{
            &:before{
              background: url(~@assets/img/progressBar/bg-progress-active.png) no-repeat center;
            }
            .zj-progress-item_box-label{
              color: #91d65c;
            }
          }
        }
        &.error{
          color: #EF6666;
          .zj-progress-item_box{
            &:before{
              background: url(~@assets/img/progressBar/bg-progress-error.png) no-repeat center;
            }
          }
        }
        .zj-progress-item_box {
          position: relative;
          height: 80px;
          line-height: 88px;
          text-align: right;
          color: #FFFFFF;
          z-index: 9;
          .zj-progress-item_box-index{
            position: relative;
            z-index: 9;
            color: black;
            top:-1px;
            left: 1px;
            color: white;
          }
          .zj-progress-item_box-label{
            display: inline-block;
            width: 120px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 100%;
            z-index: 9;
            transform: translateX(-50%);
            color: gray;
            overflow: hidden;
          }
          //之前
          &:before{
            z-index: 9;
            position: relative;
            top: 19px;
            left: 29px;
            width: 48px;
            height: 48px;
            display: inline-block;
            content: ' ';
            background: url(~@assets/img/progressBar/bg-progress.png) no-repeat center;
          }
          //之后
          &:after{
            content: " ";
            display: block;
            position: absolute;
            top: 50%;
            left: 100%;
            width: 100%;
            height: 10%;
            transform: translateY(-25%);
            background: #EF6666;
            z-index: 8;
          }
          //无之后
          &.noAfter{
            &:after{
              display: none;
            }
          }
          //之后未激活
          &.info{
            &:after{
              background: gainsboro;
            }
          }
          //之后成功
          &.success{
            &:after{
              background: #91d65c;
            }
          }
        }
      }
    }
  }
</style>
