<template>
  <el-dialog
    ref="dialog"
    class="certuficate"
    :class="{'dialogHidden': ukeyHide}"
    title="提示"
    :visible.sync="show"
    width="400px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <!-- 头部  -->
    <div slot="title">
      <h4 class="title">云证书验证</h4>
    </div>
    <!-- 主体  -->
    <div class="certuficate-body">
      <p>已发送验证码至您{{ phoneView(userInfo.mobileNo) }}的手机号！</p>
      <p class="phone">
        <span>验证码：</span>
        <el-input v-model="code" @change="changeInput"/>
        <template v-if="getCode">
          <zj-button @click="getPhoneCode">发送验证码</zj-button>
        </template>
        <template v-else>
          <label>{{ phoneText }}</label>
        </template>
      </p>
    </div>
    <!-- 底部  -->
    <div slot="footer" class="dialog-footer">
      <el-button :type=" isCode ? 'primary' : 'info'"
                 @click="onConfirm" :disabled="btnDisabled"
      >
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {mapState} from "vuex";
import ZjLog from "@pubComponent/log/ZjLog";

export default {
  name: "ZjCertuficate",
  data() {
    return {
      time: 60, //验证码事件倒数
      count: 0,
      phoneText: '', //验证码倒数显示文字
      code: this.code,
      getCode: false, //重新获取验证码
      //点击确认发送短信之后则禁用按钮
      btnDisabled: false,
      ukeyHide: false,

      show: false,//打开-关闭
      zjControl: {
        sendAuthorizeMessage: this.$api.baseCommon.sendAuthorizeMessage,//发送手机验证码
        checkAuthorizeMessage: this.$api.baseCommon.checkAuthorizeMessage,//验证手机验证码
      }
    }
  },
  methods: {
    //打开云证书
    open() {
      this.getPhoneCode()
    },
    //输入框内容发生改变
    changeInput(val) {
      this.$emit('changeInput', val)
    },
    //显示手机号码格式
    phoneView(str, start = 3, ent = 4) {
      if (!str) return
      return str.slice(0, start) + '***' + str.slice(11 - ent)
    },
    //获取验证码
    getPhoneCode() {
      this.ukeyHide = true
      ZjLog.lock('验证中...')
      this.zjControl.sendAuthorizeMessage().then(() => {
        //调用定时器
        this.getCode = false
        this.ukeyHide = false
        this.count = 0
        this.codeTime()
        ZjLog.unLock()

        this.show = true
      }).catch(() => { // 接口报错关闭弹窗
        this.ukeyHide = false
        this.code = ''
        ZjLog.unLock()
      })
    },
    //验证码计算
    codeTime() {
      this.count = this.time
      this.getCode = false
      let time = setInterval(() => {
        if (this.count === 0) {
          clearInterval(time)
          this.getCode = true
        }
        this.phoneText = this.count + 's'
        this.count--
      }, 1000)
    },
    // 提交云验证码
    onConfirm() {
      if (!this.code) {
        return this.$Message.warning('请输入验证码！')
      }

      this.btnDisabled = true

      ZjLog.lock('验证中...')
      this.ukeyHide = true
      this.zjControl.checkAuthorizeMessage({checkCode: this.code}).then(() => {
        // console.error('里面提交ret:', ret)
        this.btnDisabled = false
        ZjLog.unLock()
        this.$emit('confirm')
        this.close()
      }).catch(() => {
        this.code = ''
        this.btnDisabled = false

        this.ukeyHide = false
        this.getCode = false
        this.count = 0

        ZjLog.unLock()
      })
    },
    close() { // 父组件关闭
      this.show = false
      this.code = '' //清空验证码
      this.getCode = false //隐藏重新获取按钮
      this.phoneText = '' //清空倒数
      this.btnDisabled = false
    }
  },
  computed: {
    isCode() {
      return this.code ? true : false
    },
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
}
</script>

<style lang="less">
.dialogHidden {
  z-index: -1 !important;
}

.certuficate {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /*头部*/

  .el-dialog__header {
    padding: 10px 20px 0;

    .title {
      margin: 0 0 4px 0;
      font-size: 18px;
      color: silver;
    }

    .el-dialog__headerbtn {
      top: 15px;
    }

    .el-divider {
      margin: 0;
    }
  }

  /*主体*/

  .el-dialog__body {
    text-align: center;
    padding-bottom: 5px;

    .phone {
      span {
        margin-left: 35px;
      }

      .el-input {
        width: 100px;
        margin-right: 8px;
      }

      .zj-button, .vxe-button {
        text-align: left;

        span {
          margin: 0;
        }
      }

      label {
        display: inline-block;
        width: 68px;
        text-align: left;
      }
    }
  }

  /*底部*/

  .dialog-footer {
    text-align: center;

    .el-button {
      width: 70px;
      height: 30px;
    }
  }

}

</style>
