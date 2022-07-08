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
 * 订单清算复核和交易详情页面
 */
import BizInfo from '../orderClearing/orderApply/bizInfo';
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
