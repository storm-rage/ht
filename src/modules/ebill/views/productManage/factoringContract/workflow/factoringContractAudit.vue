<template>
  <contract-detail :contract-info="contractInfo" :serial-no="serialNo"></contract-detail>
</template>
<script>
import ContractDetail from './components/contractDetail';
export default {
  components: {ContractDetail},
  props: {
    contractInfo: {
      type: Object,
      required: true
    },
    // 申请流水号
    serialNo: {
      type: String,
      required: true
    }
  },
  data () {
    return {};
  },
  methods: {}
};
</script>
