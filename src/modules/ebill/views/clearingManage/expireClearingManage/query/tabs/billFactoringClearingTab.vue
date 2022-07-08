<template>
<div>
  <zj-content>
    <el-radio-group v-model="selectTag">
      <el-radio-button label="billClearingList">凭证清算清单</el-radio-button>
      <el-radio-button label="billBalanceClearingList">凭证尾款清算清单</el-radio-button>
    </el-radio-group>
  </zj-content>
  <component :is="selectTag"></component>
</div>
</template>

<script>
import billClearingList from './bill/billClearingList';
import billBalanceClearingList from './bill/billBalanceClearingList';
export default {
  name: 'BillFactoringClearingTab',
  components: {
    billClearingList,
    billBalanceClearingList
  },

  data () {
    return {
      selectTag: 'billClearingList'
    }
  }
}
</script>
