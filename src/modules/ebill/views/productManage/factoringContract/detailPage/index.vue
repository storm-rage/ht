<template>
  <zj-content-container>
    <zj-top-header title="供应商保理合同详情"></zj-top-header>
    <el-form  ref="form" label-width="180px">
      <zj-content-block>
        <zj-header title="客户基本信息"></zj-header>
        <zj-content>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="供应商名称：">
                  <span>国内商业保理合同</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天一级供应商：">
                  <span>xxxxxxx</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商编码：">
                  <span>62434343</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供应商统一社会信用代码：">
                  <span>8845454546565</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请产品：">
                  <span>订单保理、电子债券凭证</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号：">
                  <span>656546546556S</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同名称：">
                  <span>国内商业保理合同</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同有效期间：">
                  <span>2022-09-09 ～ 2023-09-08</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同状态：">
                  <span>生效</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <zj-table :pager="false">
            <zj-table-column
             type="seq"
             width="60"
              title="序号"/>
            <zj-table-column
              field="field2"
              title="合同编号"/>
            <zj-table-column
              field="field3"
              title="合同名称"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="供应商额度信息"></zj-header>
        <zj-content>
          <zj-table :pager="false" :dataList="quotaList" @radio-change="handleRadioChange" :radio-config="{highlight: true}">
            <zj-table-column type="radio" width="50"></zj-table-column>
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="field1"
              title="核心企业名称"/>
            <zj-table-column
              field="field2"
              title="核心企业是否海天集团"/>
            <zj-table-column
              field="field3"
              title="核心企业统一社会信用代码"/>
            <zj-table-column
              field="field4"
              title="保理标识"/>
            <zj-table-column
              field="field5"
              title="贸易关系状态"/>
            <zj-table-column
              field="field6"
              title="额度有效期"/>
            <zj-table-column
              field="field7"
              :formatter="money"
              title="授信额度" />
            <zj-table-column
              field="field8"
              title="额度状态"/>
          </zj-table>
        </zj-content>
      </zj-content-block>
      <zj-content-block v-if="fileList.length">
        <zj-header title="相关合同/协议附件"></zj-header>
        <zj-content>
          <zj-table :dataList="fileList">
            <zj-table-column
              type="seq"
              width="60"
              title="序号"/>
            <zj-table-column
              field="field1"
              title="合同/协议编号"/>
            <zj-table-column
              field="field2"
              title="合同/协议名称"/>
            <zj-table-column
              field="field3"
              title="生效日期"/>
            <zj-table-column
              field="field4"
              title="合同/协议状态"/>
            <zj-table-column title="操作" fixed="right">
              <template v-slot="{ row }">
                <zj-button type="text" @click="toDownload(row)">下载</zj-button>
              </template>
            </zj-table-column>
          </zj-table>
        </zj-content>
      </zj-content-block>
    </el-form>
    <zj-content-footer>
      <zj-button @click="back">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
export default {
  components: {},

  data () {
    return {
      quotaList: [
        {
          field1: '海天a公司',
          field2: '是',
          field3: '54354343423X4645656456',
          field4: '订单保理',
          field5: '生效',
          field6: '2022.09.09 ～ 2023.09.08',
          field7: '100,000,000.00',
          field8: '生效'
        }
      ],
      fileList: []
    };
  },
  methods: {
    toDownload (row) {},
    handleRadioChange ({row}) {
      this.fileList.push({
        field1: '123455',
        field2: '《应收账款保理业务通知书》',
        field3: '2022-09-09',
        field4: '生效'
      })
    },
    back () {}
  }
}
</script>
