<template>
  <div>
  <zj-content-container>
    <!--  订单融资  -->
    <zj-content-block>
      <zj-content>
        <div class="zj-search-response">
          <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column type="radio" width="40"/>
            <zj-table-column field="field1" title="买方企业名称"/>
            <zj-table-column field="field2" title="是否已有订单保理额度"/>
            <zj-table-column field="field3" title="额度总额"/>
            <zj-table-column field="field5" title="剩余可用额度" :formatter="money"/>
          </zj-table>
          <div class="explain-text">
            <div>注：</div>
            <ol class="explain-content">
              <li class="explain-item">以上额度信息仅供参考，实际以融资时额度为准。</li>
              <li class="explain-item">有生效的订单保理额度，才能发起订单融资。</li>
              <li class="explain-item">剩余可用额度=额度总额-实际已用额度-在途使用额度。</li>
            </ol>
          </div>
        </div>
        <zj-header title="阶段性协议信息"></zj-header>
        <zj-table ref="searchTable" :dataList="list"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
          <zj-table-column field="field1" title="阶段性协议编号"/>
          <zj-table-column field="field2" title="阶段性协议名称"/>
          <zj-table-column field="field3" title="协议类型"/>
          <zj-table-column field="field5" title="协议签订日期" :formatter="date"/>
          <zj-table-column field="field5" title="协议预计到期日" :formatter="date"/>
          <zj-table-column field="state" title="状态" />
          <zj-table-column field="fileName" title="附件" />
          <vxe-table-column fixed="right" title="操作">
            <template v-slot="{row}">
              <zj-button type="text" @click="download(row)">下载</zj-button>
            </template>
          </vxe-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
  <el-row style="position: relative;margin-top: 20px;">
    <zj-content-footer>
      <zj-button class="submit-button" @click="goChild('orderFinancingDetail')">下一步</zj-button>
    </zj-content-footer>
  </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchForm: {
        supplierName: '',
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
          field5: '2022.09.08',
          state: '生效',
          fileName: '是'
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
    toEditQuota(row) {},
    download(){},
    nextStep(){},
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
