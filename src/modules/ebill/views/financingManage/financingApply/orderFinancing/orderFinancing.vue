<template>
  <zj-content-block>
    <!--  订单融资  -->
    <zj-content-block>
        <zj-content class="zj-search-response">
          <zj-table ref="tradeRelationTable"
                    :api="zjControl.getOrderFinancingCredit"
                    @after-load="handleDataChange"
                    @radio-change="handleRadioChange"
                    :radio-config="{highlight: true}"
                    :pager="false"
          >
            <zj-table-column type="radio" width="40"/>
            <zj-table-column field="buyerName" title="买方企业名称"/>
            <zj-table-column field="isFactoringCredit" title="是否已有订单保理额度" :formatter="obj=>typeMap(dictionary.isFactoringCredit,obj.cellValue)"/>
            <zj-table-column field="totalCreditAmount" title="额度总额" :formatter="money"/>
            <zj-table-column field="availableCreditAmount" title="剩余可用额度" :formatter="money"/>
          </zj-table>
          <div class="explain-text zj-m-l-10 zj-m-t-10">
            <div>注：</div>
            <ol class="explain-content">
              <li class="explain-item">以上额度信息仅供参考，实际以融资时额度为准。</li>
              <li class="explain-item">有生效的订单保理额度，才能发起订单融资。</li>
              <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
            </ol>
          </div>
        </zj-content>
        <zj-header title="阶段性协议信息"/>
      <zj-content>
        <zj-table ref="searchTable"
                  :dataList="agreementList"
                  @radio-change="handleRadioChange"
                  :radio-config="{highlight: true}"
                  :pager="false"
        >
          <zj-table-column field="agreementNo" title="阶段性协议编号"/>
          <zj-table-column field="agreementName" title="阶段性协议名称"/>
          <zj-table-column field="agreementType" title="协议类型" :formatter="obj=>typeMap(dictionary.agreementType,obj.cellValue)"/>
          <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
          <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
          <zj-table-column field="agreementStatus" title="状态" :formatter="obj=>typeMap(dictionary.agreementStatus,obj.cellValue)"/>
          <zj-table-column field="fileName" title="附件" />
          <vxe-table-column fixed="right" title="操作" width="120">
            <template v-slot="{row}">
              <zj-button type="text" @click="download(row)">下载</zj-button>
            </template>
          </vxe-table-column>
        </zj-table>
      </zj-content>
      </zj-content-block>
  </zj-content-block>
</template>
<script>
export default {
  name: 'orderFinancing',
  props: {
    zjControl: Object,
    dictionary: Object,
  },
  components: {},
  data() {
    return {
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08',
          state: '生效',
          fileName: '是'
        }
      ],
      agreementList: [],
      activeEntParams: {},
    };
  },
  methods: {
    handleDataChange(rows) {
      //默认勾选第一个贸易关系
      if (rows&& rows.length) {
        this.$refs.tradeRelationTable.setRadioRow(rows[0])
        this.handleRadioChange({row: rows[0]})
      }
    },
    handleRadioChange({row}) {
      this.activeEntParams = {...row}
      console.log(this.activeEntParams)
      this.$emit('nextStepParamsOrder',this.activeEntParams)
      //获取阶段性协议列表
      let params = {
        ...row
      }
      this.zjControl.getPhasedAgreement(params).then(res=>{
        this.agreementList = res.data.rows
      })
    },
    download(row) {
      this.zjControl.downloadFile({
        fileId: row.fileId,
        fileName: row.fileName,
      })
    },
  }
};
</script>
<style lang="less" scoped>
.explain-text {
  display: flex;
  padding-bottom: 20px;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}


</style>
