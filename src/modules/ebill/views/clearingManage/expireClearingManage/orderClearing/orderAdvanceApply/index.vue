<template>
  <zj-content-container>
    <zj-top-header title="提前还款清算申请"></zj-top-header>
    <biz-info></biz-info>
    <!-- 附件信息   -->
    <clearing-file-info is-edit></clearing-file-info>
    <zj-content-footer>
      <zj-button type="primary" @click="toApply">提交申请</zj-button>
      <zj-button  @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 单笔多笔提前还款清算申请
 */
import BizInfo from './bizInfo';
import ClearingFileInfo from '../../../components/clearingFileInfo';
export default {
  components: {
    BizInfo,
    ClearingFileInfo
  },
  data () {
    return {
    };
  },
  methods: {
    toApply () {
      this.$confirm('是否确认提交申请？','温馨提示',{
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // todo:请求
      })
    },
    back () {}
  }
}
</script>
