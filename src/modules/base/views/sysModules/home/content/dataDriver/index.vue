<template>
  <home-content-block class="home-content-data-driver" v-loading="loading">
    <zj-header title="数据驾驶舱"></zj-header>
    <!-- 核心企业   -->
    <hx-ent v-if="entInfo.entType===constEntType.HX&&zjBtn.getCoreDataCockpit" :detailInfo="detailInfo"></hx-ent>
    <!-- 供应商   -->
    <gys-ent v-if="entInfo.entType===constEntType.GYS&&zjBtn.getSupplierDataCockpit" :detailInfo="detailInfo"></gys-ent>
    <!--  运营  -->
    <yy-ent v-if="entInfo.entType===constEntType.YY&&zjBtn.getPlatformDataCockpit" :detailInfo="detailInfo"></yy-ent>
    <!-- 保理   -->
    <bl-ent v-if="entInfo.entType===constEntType.BL" :detailInfo="detailInfo"></bl-ent>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock';
import HxEnt from './hxEnt'
import GysEnt from './gysEnt'
import YyEnt from './yyEnt'
import BlEnt from './blEnt'
import { mapState } from 'vuex'
import {EntType} from "@modules/constant";
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
    YyEnt,
    BlEnt
  },
  created() {
    this.getApi();
    this.getDetail();
  },
  data () {
    return {
      zjControl: {
        getCoreDataCockpit: this.$api.home.getCoreDataCockpit,
        getFactoringDataCockpit: this.$api.home.getFactoringDataCockpit,
        getPlatformDataCockpit: this.$api.home.getPlatformDataCockpit,
        getSupplierDataCockpit: this.$api.home.getSupplierDataCockpit
      },
      constEntType: EntType,
      detailInfo: {},
      loading: false
    }
  },
  methods: {
    getDetail() {
      this.loading = true;
      if (this.entInfo.entType === EntType.BL) {
        // 保理
        this.zjControl.getFactoringDataCockpit().then(res => {
          this.loading = false;
          this.detailInfo = res.data;
        }).catch(() => {
          this.loading = false;
        });
      }else if (this.entInfo.entType === EntType.YY) {
        // 运营
        this.zjControl.getPlatformDataCockpit().then(res => {
          this.loading = false;
          this.detailInfo = res.data;
        }).catch(() => {
          this.loading = false;
        });
      }else if (this.entInfo.entType === EntType.GYS) {
        // 供应商
        this.zjControl.getSupplierDataCockpit().then(res => {
          this.loading = false;
          this.detailInfo = res.data;
        }).catch(() => {
          this.loading = false;
        });
      }else if (this.entInfo.entType === EntType.HX) {
        // 核心企业
        this.zjControl.getCoreDataCockpit().then(res => {
          this.loading = false;
          this.detailInfo = res.data;
        }).catch(() => {
          this.loading = false;
        });
      }
    },
  }
};
</script>
<style lang="less" scoped>
.home-content-data-driver {
  height: 100%;
}
</style>
