<template>
  <zj-content-container>
    <!--  产品信息管理  -->
    <zj-content-block>
      <zj-content>
        <div class="zj-search-condition zj-m-b-20" style="border-bottom: none;">
          <el-row class="button-row">
            <zj-button class="reset" icon="el-icon-refresh" @click="resetSearch">重置</zj-button>
            <zj-button class="search" icon="el-icon-search" @click="search">查询</zj-button>
          </el-row>
          <el-row class="button-row">
            <zj-button class="append" icon="el-icon-circle-plus-outline" @click="goChild('productInfoManageAdd')">新增产品</zj-button>
          </el-row>
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="产品名称：">
              <el-input
                v-model="searchForm.productName"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
            <el-form-item label="业务类型：">
              <el-select v-model="searchForm.businessType">
                <el-option value="全部" />
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型：">
              <el-select v-model="searchForm.productType">
                <el-option value="全部" />
              </el-select>
            </el-form-item>
            <el-form-item label="产品编号：">
              <el-input
                v-model="searchForm.productNo"
                @keyup.enter.native="enterSearch"
              />
            </el-form-item>
            <el-form-item label="产品状态：">
              <el-select v-model="searchForm.productState">
                <el-option value="全部" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="zj-search-response">
          <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column title="产品编号">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDetail(row)">{{row.field1}}</zj-button>
              </template>
            </zj-table-column>
            <zj-table-column field="field2" title="产品名称"/>
            <zj-table-column field="field3" title="业务类型"/>
            <zj-table-column field="field4" title="产品类型"/>
            <zj-table-column field="field5" title="上次维护时间" :formatter="date"/>
            <zj-table-column field="field6" title="产品状态"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toEdit(row)">修改</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </div>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchForm: {
        productName: '',
        businessType: '',
        productType: '',
        productNo: '',
        productState: '',
      },
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
      tradeList: []
    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
  }
};
</script>
