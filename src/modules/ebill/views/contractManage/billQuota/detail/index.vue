<template>
  <zj-content-container>
    <zj-top-header :title="title"></zj-top-header>
     <!--  合同信息  -->
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <zj-table :dataList="contractList" :pager="false">
          <zj-table-column
            field="contractNo"
            title="合同编号"/>
          <zj-table-column
            field="contractName"
            title="合同名称"/>
          <zj-table-column
            field="contractStartDate"
            title="合同生效日期"/>
          <zj-table-column
            field="contractEndDate"
            title="合同失效日期"/>
          <zj-table-column
            field="contractStatus"
            title="合同状态"
            :formatter="(obj) => typeMap(dic.ebContractStatusModel, obj.cellValue)"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  额度信息  -->
    <zj-content-block>
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table :dataList="quotaList" :pager="false">
          <zj-table-column
            field="buyerName"
            title="买方企业名称"/>
          <zj-table-column
            field="accountTransferStartDate"
            title="应收账款转让期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.accountTransferEndDate}}
            </template>
          </zj-table-column>
          <zj-table-column
            field="totalCreditAmount"
            title="授信额度" :formatter="money"/>
          <zj-table-column
            field="factoringCreditEndDate"
            title="额度期限">
            <template v-slot="{row}">
              {{row.accountTransferStartDate}}～{{row.factoringCreditEndDate}}
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  协议信息  -->
    <zj-content-block>
      <zj-header title="协议信息"></zj-header>
      <zj-content>
        <zj-table :dataList="fileList" :pager="false">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="agreementNo"
            title="合同/协议编号"/>
          <zj-table-column
            field="fileName"
            title="合同/协议名称"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  变更信息填写  -->
    <zj-content-block>
      <zj-header title="申请变更额度"></zj-header>
      <zj-content>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="申请增加额度：" prop="applyAddCreditAmount">
                <zj-number-input :disabled="!isEdit" formatterMoney v-model="form.applyAddCreditAmount" placeholder="请输入申请增加额度">
                  <template slot="append">元</template>
                </zj-number-input>
                <p class="zj-left">{{digitUp(form.applyAddCreditAmount)}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="额度到期日：" prop="creditExpireDate">
                <el-date-picker v-model="form.creditExpireDate" disabled type="date" placeholder="请选择额度到期日"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调整后额度：" prop="adjustCreditAmount">
                {{money(form.adjustCreditAmount)}}元
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    title: String,
    // 字典
    dic:Object,
    // 参数信息
    detailInfo: Object,
    // 附件信息
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    detailInfo: {
      deep: true,
      handler() {
        if (this.detailInfo) {
          this.contractList = [this.detailInfo];
          this.quotaList = [this.detailInfo];
          this.form = this.detailInfo;
        }
      }
    }
  },
  data() {
    return {
      zjControl: {
        downApi: this.$api.baseCommon.downloadFile
      },
      // 合同信息
      contractList: [],
      // 额度信息
      quotaList: [],
      // 额度变更信息
      form: {
        applyAddCreditAmount: '',
        creditExpireDate: '',
        adjustCreditAmount: ''
      },
      rules: {
        applyAddCreditAmount: [
          {required: true,message: '请输入申请增加额度',trigger: ['blur','change']}
        ],
        creditExpireDate: [
          {required: true,message: '请选择额度到期日',trigger: ['blur','change']}
        ]
      }
    }
  },
  methods: {
    toDownload(row) {
      this.zjControl.downApi(row);
    },
    //获取表单
    getForm () {
      return this.$refs.form;
    }
  }
};
</script>
