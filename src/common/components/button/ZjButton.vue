<template>
  <el-button
    v-bind="attr"
    v-on="events"
    @click="zjButtonClick"
    v-show="apiShow"
    :class="colorClass"
    class="zj-buttons"
  >
    <!--    :style="btnStyle"-->
    <slot></slot>
  </el-button>
</template>

<script>
  export default {
    name: "ZjButton.vue",
    props:{
      //--------------- element 自带
      //尺寸
      size:{
        type:String,
        default:'small'
      },
      //类型
      type:{
        type:String,
        default:''
      },
      //朴素
      plain:{
        type:Boolean,
        default:false
      },
      //圆角
      round:{
        type:Boolean,
        default:false
      },
      //圆形
      circle:{
        type:Boolean,
        default:false
      },
      //加载
      loading:{
        type:Boolean,
        default:false
      },
      //禁用
      disabled:{
        type:Boolean,
        default:false
      },
      //图标
      icon:{
        type:String,
        default:''
      },
      //聚焦
      autofocus:{
        type:Boolean,
        default:false
      },
      //原生type
      nativeType:{
        type:String,
        default:'button'
      },
      //---------------------whl 另加---------------------
      //权限控制
      api:[Function, String,Object],
      //自定义属性-------
      cus:{
        type:Boolean,
        default:false
      },
      //颜色
      color:[String],
      //宽度
      width:[Number,String],
      //高度
      height:[Number,String],
    },
    data(){
      return {

      }
    },
    computed:{
      //element自带属性原样返回
      attr(){
        return {
          size:this.size,
          type:this.type,
          plain:this.plain,
          round:this.round,
          circle:this.circle,
          loading:this.loading,
          disabled:this.disabled,
          icon:this.icon,
          autofocus:this.autofocus,
          nativeType:this.nativeType
        }
      },
      //自带属性
      events() {
        return {
          // 下拉列表按钮点击时会触发该事件 { name, $event }
          'dropdown-click': (params) => {
            this.$emit('dropdown-click', params)
          }
        }
      },
      //增加权限控制
      apiShow(){
        //当api传入时进行判读
        if (typeof this.api === 'function' || typeof this.api === 'undefined' || typeof this.api === 'object') {
          return true
        } else {
          return false
        }
      },
      //对类型进行控制
      colorClass(){
        let className = ''
        if(this.type === 'text'){
          if(this.color){
            className = 'zj-buttons-text ' + this.color
          }else{
            className = 'zj-buttons-text'
          }
        }else{
          if(this.color){
            className = 'zj-buttons-' + this.color
          }
        }
        return className
      },
      //进行宽度控制
      // btnStyle(){
      //   return{
      //     width:this.width+'px',
      //     height:this.height+'px'
      //   }
      // }
    },
    methods:{
      zjButtonClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">
  .zj-buttons{
    /*box-sizing: border-box;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*padding: 3px 15px;*/
    //文字类型
    &.zj-buttons-text{
      span{
        margin: 0 0.8em!important;
      }
      &.green{
        color: #5bbf4a !important;
        &:hover{
          color: #ace2a2 !important;
        }
      }
    }
    //按钮类型
    //绿色
    &.zj-buttons-green{
      border-color: #9df8cc!important;
      background-color: #30ac6a!important;
      color: white!important;
      &:hover{
        background-color: #40c67f!important;
        color: #F5F5F5!important;
      }
    }
    //蓝色
    &.zj-buttons-blue{ /* 浅蓝的按钮 */
      border-color: #4092e3!important;
      background-color: #169BD5!important;
      color: white;
      &:hover{
        background-color: #61acf8!important;
      }
    }
  }
</style>
