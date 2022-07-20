<template>
    <zj-content-container>
      <!--  融资交易详情  -->
      <zj-top-header title="融资交易详情"></zj-top-header>
      <zj-content-block>
          <el-form :model="form" ref="form" label-width="200px" class="financingForm">
            <zj-content-block>
              <zj-header title="交易信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资流水号：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="融资产品：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请时间：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="业务状态：">
                  {{form.entName}}
                </el-form-item>
              </el-row>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="融资申请信息"/>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资企业：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="买方企业名称：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="融资月利率：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="融资申请金额：">
                    {{form.entName}}
                    <div>{{digitUp(9999)}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="融资开始日：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="融资到期日：">
                    {{form.entName}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="预计融资期限：">
                    {{date(form.dateStart)}}至{{date(form.dateStart)}}共{{form.total}}天
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="预计利息：">
                    {{form.entName}}
                    <zj-text-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）"></zj-text-tip>
                  </el-form-item>
                </el-col>
              </el-row>
              <zj-collapse title="收款账户" class="zj-m-t-10">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="银行账户户名：" >
                      {{form.bankAccname}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款银行开户行：">
                      {{form.bankName}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收款银行银行账号：">
                      {{form.bankAccno}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收款银行联行号：">
                      {{form.bankAccno}}
                    </el-form-item>
                  </el-col>
                </el-row>
              </zj-collapse>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
              >
                <zj-table-column field="voucherNo" title="阶段性协议编号" />
                <zj-table-column field="voucherNo" title="阶段性协议名称" />
                <zj-table-column field="voucherSigner" title="协议签订日期" :formatter="date"/>
                <zj-table-column field="entName" title="协议到期日" :formatter="date"/>
                <zj-table-column field="entName" title="数量" />
                <zj-table-column field="entName" title="单价" :formatter="money"/>
                <zj-table-column field="entName" title="协议预估总价" :formatter="money"/>
                <zj-table-column field="state" title="状态" />
                <zj-table-column field="fileName" title="附件" />
                <zj-table-column title="操作">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDownload(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
                <el-row slot="pager-left" class="slotRows" >
                  订单预估总额：{{moneyNoSynbol(' ')}}
                </el-row>
              </zj-table>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="协议信息"/>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
              >
                <zj-table-column field="index" title="序号" />
                <zj-table-column field="agreementNo" title="协议编号" />
                <zj-table-column field="fileName" title="协议名称" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="agreementDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="保理合同信息"/>
              <el-row>
                <el-col :span="8">
                  <el-for-item label="保理合同编号：">
                    {{form.contractNo}}
                  </el-for-item>
                </el-col>
                <el-col :span="8">
                  <el-for-item label="总额度：">
                    {{form.contractNo}}
                  </el-for-item>
                </el-col>
                <el-col :span="8">
                  <el-for-item label="剩余可用金额：">
                    {{form.contractNo}}
                  </el-for-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-for-item label="额度有效期：">
                    {{date(form.contractNo)}}至{{date(form.contractNo)}}
                  </el-for-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="其他附件"/>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
              >
                <zj-table-column field="index" title="序号" />
                <zj-table-column field="agreementNo" title="附件类型" />
                <zj-table-column field="fileName" title="补充说明" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
            </zj-content-block>
            <!--  操作记录  -->
            <operate-log/>
          </el-form>
      </zj-content-block>

      <!-- 底部按钮栏 -->
      <zj-content-footer>
        <el-row class="ta-c w85 fixed-footer-btns">
          <zj-button class="back" @click="goParent">返回</zj-button>
        </el-row>
      </zj-content-footer>

    </zj-content-container>
</template>

<script>
import OperateLog from "../../components/operateLog";

export default {
  name: "doneDetail",
  components: {
    OperateLog,
  },
  data() {
    return {
      form:{},
      detail:{},
      zjControl: {},
      uDictionary:{},
      mDictionary:{},
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

    }
  },
  methods: {
    agreementDownLoad() {

    },
    attaDownLoad() {},
    submit(){
      this.$refs.submitDialog.open({form: this.form}, true)
    },
  }
}
</script>

<style scoped lang="less">
.quota-manage {
  height: 40px;
  line-height:40px;
  text-align: right;
  margin-bottom: 20px;
  color: #e6a23c;
  background-color: #fdf6ec;
}
.financingForm {
  margin-top: 20px;
}
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
.hd-row {
  position: relative;
  &:after {
    position: absolute;
    top: 36px;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #cbcbcb;
  }
}

</style>
