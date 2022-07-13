<template>
  <home-content-block class="home-content-data-driver">
    <header>
      <img src="~@assets/img/home/dataDriver/font_bg.png">
    </header>
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
  background-color: #E6ECFC;
  height: 100%;
  background-image: url("~@assets/img/home/dataDriver/banner_bg.png");
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: contain;
}
</style>
