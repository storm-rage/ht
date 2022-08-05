<template>
  <div class="face-recognition">
    <div class="face-box-container">
      <!-- 人脸识别 -->
      <div class="face-box" :class="isOnlyFace? 'is-only-face' : ''">
        <div class="face-box-header">
          <div class="number" v-if="!isOnlyFace">①</div>
          <div class="content">
            <p>打开支付宝或微信</p>
            <p>扫描下方二维码完成人脸识别</p>
          </div>
        </div>
        <div class="face-box-body">
          <img :src="faceCodeSrc"/>
          <div class="reset-box">
            <zj-button class="reset-face" @click="newFaceCode" v-show="showReBtn">点击重新识别</zj-button>
            <p class="box-face-msg" :class=" showReBtn ? 'error' : 'success'">{{faceMsg}}</p>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    // 登录名，人脸请求
    loginName: String,
    //是否只有人脸识别
    isOnlyFace: Boolean,
  },
  data() {
    return {
      zjControl:{
        getFaceQrode:this.$api.login.getFaceQrode,//获取二维码
        queryFaceResult:this.$api.login.queryFaceResult//结果查询
      },
      showReBtn: false,
      faceMsg: '',
      // 人脸识别url
      faceCodeSrc: '',
      // 计数
      pollingCount: 0
    };
  },
  created() {
    this.getFaceQrode();
  },
  destroyed() {
    this.clearPolling()
  },
  methods: {
    // 获取人脸识别二维码
    getFaceQrode(){
      this.zjControl.getFaceQrode({loginName: this.loginName}).then(ret => {
        let res = ret.data
        this.faceCodeSrc = 'data:image/png;base64,' + res.imgBase64 //替换人脸识别二维码
        this.showReBtn = false //将重新获取二维码隐藏掉
        this.faceMsg = '' //将识别提示也设为空
        this.pollingFun() //调用轮询
      })
    },
    // 定义轮询 --- 可改成可以传入参数（事件方法，超时提示，超时事件）
    pollingFun(){
      this.pollingCount = 0
      this.polling = window.setInterval(() => {
        this.pollingCount ++ //每次都将次数加1
        if (this.pollingCount > 40){ // 当次数大于等于40
          this.clearPolling() //清掉轮询定时器
          this.$log.error('识别超时，确定后将返回登录页面',()=>{
            this.resetState() //调用登出事件
          })
        }else {
          setTimeout(this.queryFaceResult(), 0); // 每一秒调用 查询人脸识别结果
        }
      }, 5000)
    },
    // 查询人脸识别结果
    queryFaceResult(){
      this.zjControl.queryFaceResult().then(ret => {
        let res = ret.data
        //无错误信息
        if( !res.errorMsg || res.errorMsg.trim() === ''){ this.faceMsg = '' }
        // 识别是否成功
        if (res.faceCheck === '0'){ // 未识别
          this.faceMsg = ''
        }else if(res.faceCheck === '1'){ //识别成功
          this.faceMsg = '识别成功'
          //隐藏
          this.$emit('setFaceStatus', false);
          this.showReBtn = false //将重新获取二维码隐藏
          this.clearPolling() // 清除轮询
          this.$messageBox({
            type:'confirm',
            title:`温馨提示`,
            content:`人脸识别成功`,
            showCancelButton:false,
            messageResolve:()=>{
              this.$emit('done');
            },
            messageReject:() => {
              this.$emit('done');
            }
          })
        }else if(res.faceCheck === '2'){ //识别失败
          this.faceMsg = '人脸识别失败！请重新操作' // 设置提示消息
          this.showReBtn = true //将重新获取二维码显示出来
          this.clearPolling() // 清除轮询
        }
      })
    },
    // 清除轮询
    clearPolling(){
      let end = this.polling;
      let start = end - 100 > 0 ? end - 100 : 0;
      for (let i = start; i <= end; i++) {
        clearTimeout(i);
      }
    },
    // 登出事件
    resetState(){
      this.$router.push({name:'login'})
      this.clearPolling()
    },
    //人脸识别重新获取事件
    newFaceCode() {
      this.getFaceQrode()
    },
  }
};
</script>
<style lang="less" scoped>
.face-recognition {
  text-align: center;
  .face-box-container {
    .face-box {
      display: inline-block;
      width: 40%;
      &.is-only-face {
        margin: auto;
      }
      .face-box-header{ //标题
        .number{
          display: inline-block;
          font-size: 22px;
          vertical-align: top;
        }
        .content{
          display: inline-block;
          padding: 7px 0 0 5px;
          text-align: left;
          p{
            color: #333333;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      //body
      .face-box-body{
        /*padding: 10px 0;*/
        img{
          width: 160px;
          height: 160px;
          margin-left: 5px;
        }
        .reset-box{
          text-align: center;
          padding-bottom: 10px;
          .reset-face{
            background-color: #1566A2!important;
            color: white!important;
            border-radius: 12px;
            width: 140px;
          }
          .box-face-msg{
            padding-top: 2px;
            font-size: 14px;
          }
        }

      }
    }
  }
}
</style>
