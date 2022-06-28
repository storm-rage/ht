<template>
  <div class="zj-fold ss" :style="{minWidth:minw+'px'}">
    <div class="zj-fold-content" ref="zjFold" :style="{height:btnCheck ? countHeight+'px' : rowHeight+'px'}">
      <slot></slot>
    </div>
    <div class="zj-fold-btn" :style="{textAlign:align}" v-if="btnShow">
      <zj-button class="fold-btn" type="text" @click="btnCheck = !btnCheck" :style="{fontSize:fons+'px'}">
        {{btnCheck ? '收起' : '展开'}}
      </zj-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "fold",
    props:{
      //超过多少行展示按钮
      row:{
        type:Number,
        default:3
      },
      //按钮对齐方式
      align:{
        type:String,
        default:'right'
      },
      //控制本组件亲子代元素除该类名以外的元素全删除掉
      clas:{
        type:String,
        default:'zj-fold-item'
      },
      //文字大小
      fons:{
        type:Number,
        default:14
      },
      //最小宽度
      minw:{
        type:Number,
        default:500
      }
    },
    data(){
      return {
        countHeight:0,
        rowHeight:0,
        btnShow:false,
        btnCheck:false
      }
    },
    methods:{
      //监听视窗宽度变化
      webWidth(){
        //获取子代列表
        let childrenList = this.$refs.zjFold.children
        let sum = 0
        let count = 0
        let countHeight =0
        let rowHeight = 0
        //进行遍历
        for(let key in childrenList){
          if( typeof(childrenList[key]) === 'object'){
            if(sum < this.row){
              rowHeight += childrenList[key].offsetHeight
              sum++
            }
            count++
            countHeight+=childrenList[key].offsetHeight
          }
        }
        this.countHeight = countHeight
        this.rowHeight = rowHeight

        if(this.row > count){
          this.btnShow=false
        }else{
          this.btnShow=true
        }
        //判断元素是否等于row数
        // count > this.row ? this.btnShow=true : this.btnShow=false
      },
      //保存子组件高度
      getItemHeight(){
        console.error('父组件')
      }
    },
    mounted() {
      //获取dom的children集合
      let childrenList = this.$refs.zjFold.children
      //进行遍历
      for(let key in childrenList){
        //隐藏掉不是el-row的元素
        if(typeof(childrenList[key]) === 'object' && childrenList[key].className.indexOf(this.clas) < 0){
          this.$refs.zjFold.removeChild( childrenList[key])
        }
      }
      let _this = this
      window.onresize = () => {
        _this.webWidth()
      }
      //先调用一遍
      _this.webWidth()
    }
  }
</script>

<style scoped lang="less">
  .zj-fold{
    width: 100%;
    .zj-fold-content{
      overflow-y: hidden;
      width: 100%;
      &.th{
        transition: height 0.5s;
      }
    }
    .zj-fold-btn{
      width: 100%;
      .fold-btn{
        margin: 4px;
      }
    }
  }
</style>
