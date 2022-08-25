<template>
  <el-dialog
    class="login-frozenDialog"
    :visible.sync="show"
    width="350px"
    center
    :close-on-click-modal="false"
    @close="close"
    title="登录"
  >
    
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
    open() {
      this.phone = "12"
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

</style>
