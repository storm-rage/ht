<template>
  <div>
    <!--  业务信息  -->
    <biz-info :base-info="bizInfo.basicInfo" :bill-list="bizInfo.waitClearInfoList"></biz-info>
    <!-- 附件信息   -->
    <clearing-file-info ref="fileInfo" :is-edit="isEdit" :attach-list="bizInfo.attachInfoList" :bus-desc="bizInfo.basicInfo.bizDesc"></clearing-file-info>
  </div>
</template>
<script>
/**
 * 凭证尾款清算复核和交易页面
 */
import BizInfo from '../billClearing/billBalanceApply/bizInfo';
import ClearingFileInfo from '../../components/clearingFileInfo';
export default {
  props: {
    // 是否可以编辑（驳回待处理可以）
    isEdit: {
      type: Boolean,
      default: false
    },
    bizInfo: {
      type: Object,
      default: () => {
        return {
          attachInfoList:[],
          basicInfo: {},
          financeInfo: {},
          waitClearInfoList: [],
        }
      },
    }
  },
  components: {
    BizInfo,
    ClearingFileInfo
  },
  data () {
    return {};
  },
  methods: {
    getData() {
      return this.$refs.fileInfo.getData();
    },
  }
}
</script>
