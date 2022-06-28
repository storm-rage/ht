<template>
<div class="sw-anchor">
  <ul class="sw-anchor-ul">
    <li
      v-for="(item,index) in list"
      :key="index"
      @click="anchorClick(item)"
      :class="value === item.name ? 'anchorCheck' : ''"
    >
      <div :id="item.name" v-if="item.show">
        {{item.label}}
      </div>
    </li>
  </ul>

<!--  <div class="shrinkIcon" ref="shrinkIcon" id="shrinkIcon" @click="shrinkIcon=!shrinkIcon">-->
<!--    <span v-if="shrinkIcon">-->
<!--      <i class="el-icon-d-arrow-left"/>-->
<!--    </span>-->
<!--    <span v-else>-->
<!--      <i class="el-icon-d-arrow-left"/>-->
<!--    </span>-->
<!--  </div>-->
<!--  <ul class="sw-anchor-fixed" ref="anchor" :style="{right:rightStyle}" v-show="shrinkIcon">-->
<!--    <li v-for="(item,index) in list" :key="index"-->
<!--        :style="{'min-width':widthStyle}"-->
<!--        @click="anchorClick(item)"-->
<!--        :class="value === item.name ? 'anchorCheck' : ''"-->
<!--    >-->
<!--      <div v-if="item.show">{{item.label}}</div>-->
<!--    </li>-->
<!--  </ul>-->
    <ul class="sw-anchor-fixed" ref="anchor" style="display: none">
      <li v-for="(item,index) in list" :key="index"
          @click="anchorClick(item)"
          :class="value === item.name ? 'anchorCheck' : ''"
      >
        <div v-if="item.show">
          <el-tooltip effect="dark" :content="item.label" placement="left" popper-class="sw-anchor-fixed-item">
            <i :class="item.icon"/>
          </el-tooltip>

        </div>
      </li>
    </ul>
</div>
</template>

<script>
    export default {
        name: "ZjAnchor",
        props:{
          list:{
            type:Array,
            default(){
              return []
            }
          },
          width:{
            type:Number,
            default:120
          },
          right:{
            type:Number,
            default:56
          },
          value:{
            type:String,
            default:''
          }
        },
        watch: {
          // shrinkIcon (val) {
          //   if (!val) {
          //     this.$refs.shrinkIcon.style.right = '0px'
          //   } else {
          //     setTimeout(() => {
          //       this.$refs.shrinkIcon.style.right = this.$refs.anchor.clientWidth + 16 + 'px'
          //     })
          //   }
          // }
        },
        data() {
          return {
            shrinkIcon: true,
            testModel:true
          }
        },
        mounted() {
          // setTimeout(() => {
          //   if (this.$refs.shrinkIcon.style.marginTop) return
          //   this.$refs.shrinkIcon.style.right = this.$refs.anchor.clientWidth + 16 + 'px'
          //   if (this.$refs.anchor.clientHeight > 35) {
          //     this.$refs.shrinkIcon.style.height = this.$refs.anchor.clientHeight - 12 + 'px'
          //   } else {
          //     this.$refs.shrinkIcon.style.height = this.$refs.anchor.clientHeight + 'px'
          //   }
          // }, 500)

          // <zj-anchor :list="[{label:'贸易',name:'maoyi'},{label:'管理',name:'guanli'},{label:'分配',name:'fenpei'}]" :value.sync="anchor" @change="anchorChange"/>
          // anchor:'fenpei'
          // anchorChange({oldName,newName}){
          //   console.log('anchor:',this.anchor)
          //   console.log(oldName,newName)
          // }
        },
        computed:{
          widthStyle(){
            return this.width + 'px'
          },
          rightStyle(){
            return this.right + 'px'
          }
        },
        methods:{
          anchorClick(anchor){
            let anchorElement = document.getElementById(anchor.name);
            if(anchorElement) {
              anchorElement.scrollIntoView();
            }
            this.$emit('change',{
              oldName: this.value,
              newName: anchor.name
            })
            this.$emit('update:value', anchor.name)
          }
        }
    }
</script>

<style scoped lang="less">
  @import "~@assets/less/variables.less";
.sw-anchor{
  /*margin-bottom: 15px;*/
  ul{
    list-style: none;
    text-align: center;
  }
  //横向
  .sw-anchor-ul{
    li{
      float: left;
      border-right: none;
      cursor: pointer;
      background-color: #fff;
      margin-right: 8px;
      &:hover {
        > div {
          color: @primary-main-color;
          border: 1px solid @primary-main-color!important;
          border-bottom: 0!important;
          &:hover {
            color: @primary-main-color;
          }
        }

      }
      &.anchorCheck {
        > div {
          color: #fff;
          background-color: @primary-main-color;
          border: 1px solid @primary-main-color!important;
          border-bottom: 0!important;
          &:hover {
            color: #fff;
          }
        }
      }
      > div {
        padding: 9px 20px;
        border: 1px solid #d0d0d0;
        border-bottom: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        &:hover {
          border: 1px solid @primary-main-color;
          color: @primary-main-color;
        }
      }
    }
    &:after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .shrinkIcon {
    cursor: pointer;
    position: fixed;
    top: calc(50% + 2px);
    width: 20px;
    right: 16px;
    transform: translateY(-40%);
    background-color: #fff;
    display: flex;
    border: 1px solid #EEEEEE;

    color:#999999;
    border-right: 0;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    z-index: 98;
    &:hover{
      color: @primary-main-color;
    }
  }
  //固定视窗
  .sw-anchor-fixed{
    z-index: 99;
    position: fixed;
    right: 0px!important;
    top: 50%;
    transform: translateY(-40%);
    background-color: #fff;
    font-size: 13px;
    box-shadow: 4px 2px 12px #7b7f8480;
    /*border-radius: 8px;*/
    overflow: hidden;
    width: 40px;
    li{
      cursor: pointer;
      &.anchorCheck {
        > div {
          //background-color: @primary-main-color;
          //color: #fff;
         // &:hover {
           // background-color: @primary-main-color;
           // color: #fff;
         // }
          i{
            color: @primary-main-color;
            font-size: 22px;
            &:hover{
              color: @primary-main-color;
            }
          }
          .icon-yanjing_huaban1{
            font-size: 26px!important;
          }
        }
      }
      > div {
        border-left: 0;
        height: 35px;
        line-height: 35px;
        background-color: #fff;
        &:hover {
          border-left: 0;
          color: @primary-main-color;
        }
      }
      a{
        color: #ccc;
      }
    }
  }
  //移入
  .sw-anchor-ul,.sw-anchor-fixed{
    li{
      letter-spacing: 1.5px;
    }
  }

}
</style>
<style lang="less">
  @import "~@assets/less/variables.less";
  .sw-anchor-fixed-item{
    background: @primary-main-color!important;
    .popper__arrow{
      border-left-color:  @primary-main-color!important;
      &:after{
        border-left-color:  @primary-main-color!important;
      }
    }
  }
</style>
