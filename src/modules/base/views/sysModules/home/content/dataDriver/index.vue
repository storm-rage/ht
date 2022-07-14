<template>
  <home-content-block class="home-content-data-driver">
    <zj-header title="数据驾驶舱"></zj-header>
    <!-- todo:?   -->
    <hx-ent v-if="currentEnt==='1'"></hx-ent>
    <!-- 供应商   -->
    <gys-ent v-if="currentEnt==='2'"></gys-ent>
    <!--  运营  -->
    <yy-ent v-if="currentEnt==='3'"></yy-ent>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock';
import HxEnt from './hxEnt'
import GysEnt from './gysEnt'
import YyEnt from './yyEnt'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      entInfo: state => state.enterprise.entInfo,
    })
  },
  components: {
    HomeContentBlock,
    HxEnt,
    GysEnt,
    YyEnt
  },
  data () {
    return {
      currentEnt: '3'
    }
  }
};
</script>
<style lang="less" scoped>
.home-content-data-driver {
  height: 100%;
}
</style>
