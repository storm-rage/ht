<template>
  <zj-content-block>
    <zj-collapse title="银行账户">
      <zj-table :pager="false" :dataList="dataList">
        <zj-table-column field="bankAccname" title="银行账户名称" />
        <zj-table-column field="bankAccno" title="银行账号" />
        <zj-table-column field="bankName" title="银行账户开户行" />
        <zj-table-column field="bankNo" title="银行联行号" />
        <zj-table-column field="bankType" title="银行类型" />
        <zj-table-column
          field="checkState"
          title="核查方式"
          v-if="isShowInspect"
          :formatter="
            (obj) =>
              typeMap(
                [
                  { code: '01', desc: '运营商手机号验证' },
                  { code: '02', desc: '银行卡四要素验证' },
                ],
                obj.cellValue
              )
          "
        />
      </zj-table>
    </zj-collapse>
  </zj-content-block>
</template>
<script>
// 业务申请信息
export default {
  components: {},
  props: {
    isShowInspect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
};
</script>
