<template>
  <div>
    <div class="zj-search-condition">
      <el-row class="button-row">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search">查询</vxe-button>
      </el-row>
      <el-form ref="searchForm" :model="searchForm">
        <el-form-item label="申请日期：" class="col-right">
          <zj-date-range-picker
            :startDate.sync="searchForm.expireDateStart"
            :endDate.sync="searchForm.expireDateEnd"
          />
        </el-form-item>
        <el-form-item label="申请状态：" class="col-center">
           <el-select v-model="searchForm.isGenerateVoucher"
                     placeholder="请选择"
                     clearable
                     :popper-append-to-body="false" >
            <el-option value="" label="全部"></el-option>
            <!-- <el-option
              v-for="item in dictionary.isGenerateVouchers"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            >
            </el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
    <div style="padding-top: 20px">
      <zj-button class="confirm"  @click="$router.push('/productsOpenedApply')">产品开通申请</zj-button>
<!--        <el-button type="primary">产品开通申请</el-button>-->
    </div>
    </div>
    <div class="zj-search-response">
      <zj-table ref="searchTable" :params="searchForm" :api="zjControl.tableApi">
        <zj-table-column field="issueEntName" title="申请流水号"/>
        <zj-table-column field="ebillAmt" title="申请时间" :formatter="money"/>
        <zj-table-column field="transferAmt" title="申请产品" :formatter="money"/>
        <zj-table-column field="state" title="申请状态" :formatter="(obj) => typeMap(dictionary.enterpriseStateList, obj.cellValue)"/>
      </zj-table>
    </div>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      zjControl: {},
      searchForm:{

      }
    }
  },
  created() {
    this.getApi()
  },
  methods: {
    toBillDetails(row) {
      console.log(row);
    }
  }
}
</script>
