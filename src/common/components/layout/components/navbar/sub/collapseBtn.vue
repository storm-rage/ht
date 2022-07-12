<template>
  <div class="collapse-btn"><i :class="collapseFlag?'el-icon-s-unfold':'el-icon-s-fold'" @click="collapseFlagClick"/></div>
</template>
<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      collapseFlag: state => state.menu.collapseFlag,
    })
  },
  methods:{
    collapseFlagClick(){
      this.$store.dispatch('menu/setCollapseFlag',!this.collapseFlag)
    }
  }
};
</script>
<style lang="less" scoped>
.collapse-btn {
  cursor: pointer;
  width: 40px;
  font-size: 20px;
}
</style>
