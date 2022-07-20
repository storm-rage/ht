<template>
    <zj-content-container>
      <!--  融资审核  -->
      <zj-top-header title="融资审核"></zj-top-header>
      <zj-content-block v-if="workflow === 'sqxx'">
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
                  <el-form-item label="接收时间：">
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
                  <el-form-item label="融资折扣率：">
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
                    <el-form-item label="收款账户户名：" >
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
                <zj-table-column field="voucherSigner" title="协议类型" />
                <zj-table-column field="entName" title="协议签订日期" />
                <zj-table-column field="voucherAcc" title="协议到期日" :formatter="date"/>
                <zj-table-column field="voucherAcc" title="协议数量"/>
                <zj-table-column field="voucherAcc" title="单价" :formatter="money"/>
                <zj-table-column field="voucherAcc" title="协议预估总价" :formatter="money"/>
                <zj-table-column field="voucherAcc" title="是否已开始执行"/>
                <zj-table-column field="voucherAcc" title="已执行数量"/>
                <zj-table-column field="state" title="状态"/>
                <zj-table-column field="fileName" title="附件"/>
                <zj-table-column title="操作">
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
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
                  <el-for-item label="剩余可用金额：">
                    {{form.contractNo}}
                  </el-for-item>
                </el-col>
                <el-col :span="8">
                  <el-for-item label="额度有效期：">
                    {{date(form.contractNo)}}至{{date(form.contractNo)}}
                  </el-for-item>
                </el-col>
              </el-row>
            </zj-content-block>
            <!--  操作记录  -->
            <operate-log/>
            <zj-content-block>
              <zj-header title="其他附件"/>
              <p>是否已完成中登查询？若无，点此前往<zj-button type="text" @click="toZdNet">中登网</zj-button></p>
              <zj-table ref="searchTable" class="zj-search-table" :dataList="detail.voucherList"
              >
                <zj-table-column field="index" title="序号" />
                <zj-table-column field="agreementNo" title="附件类型" />
                <zj-table-column field="remark" title="补充说明" />
                <zj-table-column field="fileName" title="附件名称" />
                <zj-table-column title="操作" >
                  <template v-slot="{row}">
                    <zj-button type="text" @click="attaDelete(row.fileId)">删除</zj-button>
                    <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
                  </template>
                </zj-table-column>
              </zj-table>
              <el-row>注：若上传中登登记证明文件，只支持上传PDF格式。</el-row>
              <el-row class="button-row">
                <zj-upload class="zj-inline" ref="upload" :httpRequest="infoUpload">
                  <zj-button slot="trigger">上传资料</zj-button>
                </zj-upload>
              </el-row>
            </zj-content-block>
            <zj-content-block>
              <zj-header title="审核意见"/>
              <el-form-item label="是否提交风控处理：" prop="opinion">
                <el-radio-group v-model="form.opinion">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审核意见：">
                <el-input type="textarea" aria-placeholder="审批拒绝时，审批意见必填"></el-input>
              </el-form-item>
            </zj-content-block>
          </el-form>
      </zj-content-block>

      <!-- 底部按钮栏 -->
      <zj-content-footer>
        <el-row class="ta-c w85 fixed-footer-btns">
          <zj-button type="primary" @click="passRecheck('复核通过')">审核通过</zj-button>
          <zj-button class="btn-warning" @click="rejectRecheck('复核拒绝')">审核拒绝</zj-button>
          <zj-button class="back" @click="back('返回上一层')">返回</zj-button>
        </el-row>
      </zj-content-footer>
      <pass-recheck-dialog ref="passRecheckDialog"/>
    </zj-content-container>
</template>

<script>
import OperateLog from "../../components/operateLog";
import passRecheckDialog from "./dialog/passRecheckDialog";

export default {
  name: "toDoReview",
  components: {
    OperateLog,
    passRecheckDialog,
  },
  data() {
    return {
      form:{},
      detail:{},
      zjControl: {},
      uDictionary:{},
      mDictionary:{},
      workflow: 'sqxx',
      workflowList: [
        { label: '融资申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
      ],
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
    toZdNet() {},
    attaDelete() {},
    attaDownLoad() {},
    infoUpload() {},
    passRecheck(flag) {
      this.$refs.passRecheckDialog.open(flag)
    },
    rejectRecheck(flag) {
      this.$refs.passRecheckDialog.open(flag)
    },
    back(flag) {
      this.$refs.passRecheckDialog.open(flag)
    },
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
