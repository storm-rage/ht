<template>
  <zj-content-container>
    <!--  我的阶段性协议  -->
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
        <zj-table-column type="radio" width="60"/>
        <zj-table-column field="field1" title="买方企业名称"/>
        <zj-table-column field="field2" title="是否已有订单保理额度" :formatter="money"/>
        <zj-table-column field="field3" title="额度总额" :formatter="money"/>
        <zj-table-column field="field4" title="可用额度" :formatter="money"/>
      </zj-table>
      <div class="explain-text">
        <div>注：</div>
        <ol class="explain-content">
          <li class="explain-item">以上额度信息仅供参考，实际以融资时额度为准。</li>
        </ol>
      </div>
    </zj-content-block>
    <zj-list-layout>
      <zj-header title="阶段性协议信息"></zj-header>
      <tempalte slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="状态：">
            <el-select v-model="searchForm.supplierName">
              <el-option label="全部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议签订日期：">
            <zj-date-range-picker
              :startDate.sync="searchForm.lastTimeDateStart"
              :endDate.sync="searchForm.lastTimeDateEnd"
            />
          </el-form-item>
          <el-form-item label="贸易合同编号：">
            <el-input v-model="searchForm.entName" @keyup.enter.native="enterSearch"/>
          </el-form-item>
          <el-form-item label="协议类型：">
            <el-select v-model="searchForm.supplierName">
              <el-option label="全部"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </tempalte>
      <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
        <zj-table-column field="field1" title="买方企业名称"/>
        <zj-table-column field="field2" title="阶段性协议编号"/>
        <zj-table-column field="field3" title="阶段性协议名称"/>
        <zj-table-column field="field3" title="协议签订日期" :formatter="date"/>
        <zj-table-column field="field3" title="协议类型"/>
        <zj-table-column field="field5" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="fileName" title="协议附件"/>
        <zj-table-column field="field6" title="状态" />
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="attaDownload(row.fileId)">下载</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>

  </zj-content-container>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {
      searchForm: {
        supplierName: '',
        supplierCode: '',
        lastTimeDateStart:'',
        lastTimeDateEnd:'',
        entName: '',
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
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
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
    maintain () {
      this.goChild('multistageAgreementMaintain')
    },
    toDetail (row) {
      this.goChild('multistageAgreementDetailToDo', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
    attaDownload(row) {},
  }
};
</script>
