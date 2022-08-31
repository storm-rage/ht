<template>
  <div class="navbar-message-tip" @click="goMessageView">
    <i class="ht-iconfont hd-shixing_remind"></i>&nbsp;消息&nbsp;<span class="message-tip-badge" v-if="messageNum&&messageNum!=0">{{messageNum + (messageNum>99?'+':'')}}</span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      messageNum: state=> state.user.messageTipNum
    })
  },
  created() {
    this.$store.dispatch('user/setMessageTipNum').then(()=>{}).catch(()=>{})
  },
  methods: {
    goMessageView() {
      this.goChild('homeMessage')
    }
  },
};
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.navbar-message-tip {
  cursor: pointer;
  // width: 106px;
  margin-right: 30px;
  .message-tip-badge {
    background-color: @danger-color;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    height: 18px;
    line-height: 17px;
    width: 35px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
  }
}
</style>
