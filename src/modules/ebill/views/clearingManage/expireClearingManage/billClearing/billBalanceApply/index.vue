<template>
  <zj-content-container>
    <zj-top-header title="凭证尾款清算申请"></zj-top-header>
    <biz-info :base-info="basicInfo" :bill-list="billList"></biz-info>
    <!-- 附件信息   -->
    <clearing-file-info ref="fileInfo"
                        is-edit
                        :attach-list="attachList"
                        :bus-desc="basicInfo.bizDesc"></clearing-file-info>
    <zj-content-footer>
      <zj-button type="primary" :disabled="loading" :api="zjBtn.submitClearApply" @click="toApply">提交申请</zj-button>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
/**
 * 单笔多笔凭证尾款清算
 */
import BizInfo from './bizInfo';
import ClearingFileInfo from '../../../components/clearingFileInfo';
import detailClearingMixin from '../../mixins/detailClearingMixin';
export default {
  mixins: [detailClearingMixin],
  components: {
    BizInfo,
    ClearingFileInfo
  }
}
</script>
