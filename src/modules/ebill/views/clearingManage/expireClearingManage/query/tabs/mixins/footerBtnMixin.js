export default {
  watch: {
    '$store.state.menu.collapseFlag': {
      // 实现深度监听
      deep: true,
      handler() {
        this.setBottomBtnLeft();
      }
    }
  },
  mounted() {
    this.setBottomBtnLeft();
  },
  data () {
    return {
      // 底部按钮的偏移量
      bottomBtnLeft: 100
    }
  },
  methods: {
    /**
     * 设置底部按钮区域的左偏移量
     */
    setBottomBtnLeft () {
      this.bottomBtnLeft = this.$refs.clearingListRef.getBoundingClientRect().left - 10;
    },
  }
}
