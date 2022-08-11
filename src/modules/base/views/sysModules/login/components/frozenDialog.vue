<template>
  <el-dialog
    class="login-frozenDialog"
    :visible.sync="show"
    width="350px"
    center
    :close-on-click-modal="false"
    @close="close"
    title="登录失败"
  >
    <div class="body-box">
      <el-row>
        <el-col :span="6">
          <i class="el-icon-warning zj-f-s-60" style="color: #ed5c48"/>
        </el-col>
        <el-col :span="18">
          <div>
            <el-row>当前账户是冻结状态，如有疑问</el-row>
            <el-row>请联系客服人员：</el-row>
            <el-row class="zj-m-b-15">
              <span class="primary" style="cursor: pointer">{{ phone }}</span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24" class="zj-center">
          <zj-button type="danger" style="width: 100px" @click="close">确认</zj-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "frozenDialog",
  data() {
    return {
      show: false,
      phone: ''
    }
  },
  methods: {
    open(phone) {
      this.phone = phone
      this.show = true
    },
    close() {
      this.show = false
      this.$emit('frozenClose')
    }
  }
}
</script>

<style lang="less">
.login-frozenDialog {
  .el-dialog {
    border-radius: 10px;
    border-color: transparent;
  }
  .el-dialog__header {
    background-color: #ed5c48;
    border-radius: 10px 10px 0 0;
    .el-dialog__close {
      font-size: 20px;
      color: #333;
    }
  }
}
</style>
