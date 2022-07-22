<template>
  <zj-content-block>
    <zj-top-header title="电子债权凭证签收"/>
    <zj-content>
      <!--凭证详情-->
      <zj-collapse title="融单编号">
        <div>
          <span>融单编号：{{}}</span>
          <span>业务方：{{}}</span>
        </div>
        <table
          class="detail-table"
          border="0"
          cellspacing="0"
          cellpadding="0"
          width="100%"
        >
          <tr>
            <td rowspan="3" class="right">开单企业</td>
            <td>企业名称</td>
            <td colspan="2"></td>
            <td rowspan="5" class="right">收单企业</td>
            <td>企业名称</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="1">统一社会信用代码</td>
            <td colspan="2"></td>
            <td>统一社会信用代码</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>业务方</td>
            <td colspan="2"></td>
            <td>开户行</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="2">开单日期</td>
            <td colspan="2"></td>
            <td>银行账号</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="2">到期日期</td>
            <td colspan="2"></td>
            <td>联行号</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td colspan="2">金额</td>
            <td colspan="6">（大写）元 （小写）</td>
          </tr>
          <tr>
            <td colspan="2">开单说明</td>
            <td colspan="6"></td>
          </tr>
          <tr>
            <td colspan="8"><span class="underline red"></span></td>
          </tr>
          <tr>
            <td colspan="8" align="left">
              <div class="">签章处:</div>
              <div>
                <!-- <span v-for="item in detailData.billInfo.entSignatures" :key="item">
                      <img :src="'data:image/png;base64,'+item" alt="签章图片" width="150" height="150">
                    </span> -->
              </div>
            </td>
          </tr>
        </table>
      </zj-collapse>
      <el-row class="zj-center">
        <el-checkbox v-model="agreeCheck">已阅读并同意</el-checkbox>
        <zj-button type="text" @click="download">《收单确认书》</zj-button>
      </el-row>

    </zj-content>

    <zj-content-footer>
      <zj-button class="primary" @click="goParent">确认签收</zj-button>
      <zj-button class="back" @click="goParent">取消</zj-button>
    </zj-content-footer>
  </zj-content-block>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      detailData: {},
      agreeCheck: '',
    };
  },
  methods: {
    download(){},
  },
  created() {
  },
};
</script>

<style scoped lang="less">
.detail-table {
  border: 1px solid #DCDFE6;
}
</style>
