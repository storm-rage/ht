<template>
  <div>
    <!--  业务信息  -->
    <biz-info></biz-info>
    <!-- 附件信息   -->
    <clearing-file-info :is-edit="false"></clearing-file-info>
  </div>
</template>
<script>
/**
 * 凭证尾款清算复核和交易页面
 */
import BizInfo from '../billClearing/billBalanceApply/bizInfo';
import ClearingFileInfo from '../../components/clearingFileInfo';
export default {
  components: {
    BizInfo,
    ClearingFileInfo
  },
  data () {
    return {};
  }
}
</script>
