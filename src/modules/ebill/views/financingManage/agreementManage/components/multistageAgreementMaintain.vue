<template>
  <zj-content-container>
    <!--  阶段性协议维护  -->
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
          <li class="explain-item">是否已有订单保理额度，不影响维护阶段性协议。</li>
        </ol>
      </div>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="阶段性协议信息"></zj-header>
      <zj-table ref="searchTable" :dataList="list" >
        <zj-table-column field="field1" title="买方企业名称"/>
        <zj-table-column field="field2" title="阶段性协议编号"/>
        <zj-table-column field="field2" title="阶段性协议名称"/>
        <zj-table-column field="field2" title="协议类型"/>
        <zj-table-column field="field2" title="协议签订日期" :formatter="date"/>
        <zj-table-column field="field2" title="协议预计到期日" :formatter="date"/>
        <zj-table-column field="field3" title="状态"/>
      </zj-table>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="请上传贸易合同附件"></zj-header>
      <div class="explain-text">
        <div>注：</div>
        <ol class="explain-content">
          <li class="explain-item">支持的上传的文件格式：PDF、图片、压缩包！</li>
          <li class="explain-item">直接上传合同附件即可，保理公司会根据上传的合同维护对应的阶段性协议。保理公司维护后，您可使用阶段性协议发起融资。</li>
        </ol>
      </div>
      <zj-table ref="searchTable" :dataList="list" >
        <zj-table-column field="index" title="序号"/>
        <zj-table-column field="fileName" title="合同附件"/>
        <zj-table-column field="remark" title="附件说明"/>
        <zj-table-column title="操作">
          <template v-slot="{row}">
            <zj-button typ="text" @click="attaDownload(row.fileId)">下载</zj-button>
            <zj-button typ="text" @click="attaDelete(row.fileId)">删除</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
      <el-row class="button-row">
        <zj-button type="primary" icon="el-icon-circle-plus-outline" @click="addAtta">新增</zj-button>
      </el-row>
    </zj-content-block>
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
      this.goChild('multistageAgreementDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
    attaDownload (row) {},
    attaDelete (row) {},
    addAtta() {},
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
