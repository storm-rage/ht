<template>
<div>
  <zj-list-layout>
    <template slot="searchForm">
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="当前持有人：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="签发人：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="原始凭证编号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="凭证实际到期日：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="收款单号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
        <el-form-item label="凭证编号：">
          <el-input v-model="searchForm.issueEntName" @keyup.enter.native="enterSearch"/>
        </el-form-item>
      </el-form>
    </template>
    <!--    table-->
  </zj-list-layout>
  <zj-content-footer v-if="showBottomBtn">
    <zj-button type="primary" @click="batchClearingApply" :api="zjBtn.passBillSignBatch">清算申请</zj-button>
  </zj-content-footer>
</div>
</template>

<script>
export default {
  data () {
    return {
      showBottomBtn: false
    }
  },
  methods: {
    batchClearingApply () {}
  }
}
</script>
