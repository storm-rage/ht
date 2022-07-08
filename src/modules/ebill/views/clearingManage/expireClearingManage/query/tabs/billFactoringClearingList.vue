<template>
<div>
  <zj-content>
    <el-radio-group v-model="selectTag">
      <el-radio-button label="1">凭证清算清单</el-radio-button>
      <el-radio-button label="2">凭证尾款清算清单</el-radio-button>
    </el-radio-group>
  </zj-content>

</div>
</template>

<script>
import BillClearingList from './sub/billClearingList';
export default {
  name: 'BillFactoringClearingList',
  components: {BillClearingList},

  data () {
    return {
      selectTag: '1',
      searchForm: {}
    }
  }
}
</script>
