<template>
  <div class="register-progress">
    <div class="register-progress-item w120px" :class="itemClass(1)">
      <div class="register-progress-index-start">{{ index[1] }}</div>
      <div class="register-progress-title left75px">线上注册申请</div>
      <div class="register-progress-desc left50px">
        <div class="register-progress-desc-prefix">{{ descPrefix[1] }}</div>
        {{ desc[1] }}
      </div>
    </div>
    <div class="register-progress-item" :class="itemClass(2)">
      <div class="register-progress-index">{{ index[2] }}</div>
      <div class="register-progress-title left108px">平台审核</div>
      <div class="register-progress-desc">
        <div class="register-progress-desc-prefix">{{ descPrefix[2] }}</div>
        {{ desc[2] }}
      </div>
    </div>
    <div class="register-progress-item" :class="itemClass(3)">
      <div class="register-progress-index">{{ index[3] }}</div>
      <div class="register-progress-title left92px">盖章并邮寄资料</div>
      <div class="register-progress-desc">
        <div class="register-progress-desc-prefix">{{ descPrefix[3] }}</div>
        {{ desc[3] }}
      </div>
    </div>
    <div class="register-progress-item" :class="itemClass(4)">
      <div class="register-progress-index">{{ index[4] }}</div>
      <div class="register-progress-title left94px">资料核对发证书</div>
      <div class="register-progress-desc">
        <div class="register-progress-desc-prefix">{{ descPrefix[4] }}</div>
        {{ desc[4] }}
      </div>
    </div>
    <div class="register-progress-item" :class="itemClass(5)">
      <div class="register-progress-index">{{ index[5] }}</div>
      <div class="register-progress-title left108px">注册成功</div>
      <div class="register-progress-desc">
        <div class="register-progress-desc-prefix">{{ descPrefix[5] }}</div>
        {{ desc[5] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterProgressBar',
  props: {
    active: Number,
    error: Boolean,
    errorInfo: String
  },
  data () {
    return {
      index: ['0', '1', '2', '3', '4', '5'],
      descPrefix: ['', '', '', '', '', ''],
      desc: [
        '',
        '用户线上填写注册信息并上传公司相关资料',
        '平台线上审核注册信息',
        '平台审核通过后，用户登录系统下载并打印企业注册资料，盖章后邮寄至指定地址',
        '平台审核邮寄资料，并发放平台操作所需要的数字证书',
        '短信通知注册成功信息及用户密码'
      ]
    }
  },
  methods: {
    itemClass (index) {
      if (this.error && this.active === index) {
        this.desc[index] = this.errorInfo
        this.descPrefix[index] = '驳回原因：'
        return 'error'
      } else if (this.active >= index) {
        return 'active'
      }
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
.register-progress-item {
  display: inline-block;
  vertical-align: top;
  width: 141px;
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
  left: 73px;
  width: 110px;
  padding: 10px;
  min-height: 56px;
  border: 1px solid #D8D8D8;
  background: #FFFFFF;
  border-radius: 5px;
  line-height: 14px;
  word-wrap: break-word;
  margin-top: 5px;
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
