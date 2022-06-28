<template>
  <div class="register-progress">
    <div class="register-progress-item active w120px">
      <div class="register-progress-index-start">{{ index[1] }}</div>
      <div class="register-progress-title left75px" >1.线上注册申请</div>
      <div class="register-progress-desc left50px" :class="[isReject ? 'isReject' : '']">
        <div class="register-progress-desc-prefix">{{ descPrefix[1] }}</div>
        {{ desc[1] }}
      </div>
    </div>
    <div class="register-progress-item active">
      <div class="register-progress-index">{{ index[2] }}</div>
      <div class="register-progress-title left250px">2.平台审核</div>
      <div class="register-progress-desc">
        <div class="register-progress-desc-prefix">{{ descPrefix[2] }}</div>
        {{ desc[2] }}
      </div>
    </div>
    <div class="register-progress-item error">
      <div class="register-progress-index">{{ index[3] }}</div>
      <div class="register-progress-title left250px">3.{{ title }}</div>
      <div class="register-progress-desc" v-if="errorInfo"> <!--   -->
        <div class="register-progress-desc-prefix">驳回原因：</div>
        <div style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;"
             class="mah48px"
             :title="errorInfo"
        >
          {{ errorInfo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterProgressBarFail',
  props: {
    title: String,
    errorInfo: String,
    isReject:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      index: ['0', '1', '2', 'X'],
      descPrefix: ['', '', '', ''],
      desc: [
        '',
        '用户线上填写注册信息并上传公司相关资料',
        '平台线上审核注册信息',
        ''
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.register-progress-item {
  display: inline-block;
  vertical-align: top;
  width: 285px;
  font-size: 12px;
  color: #999999;
}
.register-progress-item.active {
  color: #606266;
}
.register-progress-item.error {
  color: #EF6666;
}
.register-progress-item .register-progress-index-start {
  height: 80px;
  line-height: 88px;
  text-align: right;
  color: #FFFFFF;
}
.register-progress-item .register-progress-index-start:before {
  position: relative;
  top: 19px;
  left: 29px;
  width: 48px;
  height: 48px;
  display: inline-block;
  content: ' ';
  background: url(~@assets/img/progressBar/bg-progress.png) no-repeat center;
  z-index: -1;
}
.register-progress-item.active .register-progress-index-start:before {
  background: url(~@assets/img/progressBar/bg-progress-active.png) no-repeat center;
}
.register-progress-item.error .register-progress-index-start:before {
  background: url(~@assets/img/progressBar/bg-progress-error.png) no-repeat center;
}
.register-progress-item .register-progress-index {
  height: 80px;
  line-height: 88px;
  text-align: right;
  font-size: 13.33px;
  color: #FFFFFF;
}
.register-progress-item .register-progress-index:before {
  position: relative;
  top: 19px;
  left: 29px;
  width: 49px;
  height: 49px;
  display: inline-block;
  content: ' ';
  background: url(~@assets/img/progressBar/bg-progress.png) no-repeat center;
  z-index: -1;
}
.register-progress-item.active .register-progress-index:before {
  background: url(~@assets/img/progressBar/bg-progress-active.png) no-repeat center;
}
.register-progress-item.error .register-progress-index:before {
  background: url(~@assets/img/progressBar/bg-progress-error.png) no-repeat center;
}
.register-progress-item .register-progress-index:after {
  position: relative;
  top: -49px;
  height: 8px;
  display: block;
  content: ' ';
  background-color: #D8D8D8;
  z-index: -2;
}
.register-progress-item.active .register-progress-index:after {
  background-color: #91D45C;
}
.register-progress-item.error .register-progress-index:after {
  background-color: #EF6666;
}
.register-progress-item .register-progress-title {
  position: relative;
  top: -4px;
  font-size: 12px;
}
.register-progress-item .register-progress-desc {
  position: relative;
  left: 215px;
  width: 110px;
  padding: 10px;
  min-height: 56px;
  border: 1px solid #EEEEEE;
  background: #FFFFFF;
  border-radius: 5px;
  line-height: 14px;
  word-wrap: break-word;
  margin-top: 5px;
  &.isReject{
    left: 50px!important;
  }
}
.register-progress-item.active .register-progress-desc {
  border: 1px solid #67C23A;
}
.register-progress-item.error .register-progress-desc {
  border: 1px solid #FF431B;
}
.register-progress-item .register-progress-desc:before {
  content: '';
  position: absolute;
  top: -6px;
  left: 60px;
  padding: 5px;
  background: inherit;
  border: inherit;
  border-right: 0;
  border-bottom: 0;
  transform: rotate(45deg);
}
.register-progress-item .register-progress-desc-prefix {
  color: #333333;
}
</style>
