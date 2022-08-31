<template>
  <zj-content-container>
    <zj-top-header>凭证转让申请</zj-top-header>
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="原始海e单编号：">
              <span>{{ detailData.rootCode | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海e单编号：">
              <span>{{ detailData.ebillCode | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发人：">
              <span>{{ detailData.payEntName | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原始持有人：">
              <span>{{ detailData.receiptEntName | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海e单签发日期：">
              <span>{{ detailData.payableIssuanceDate | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海e单到期日：">
              <span>{{ detailData.payableExpireDate | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签收日期：">
              <span>{{ detailData.holderDate | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="海e单金额：">
              <span>{{ detailData.ebillAmt | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=" 备注：">
              <span>{{ detailData.remark | value }}</span>
            </el-form-item>
          </el-col>
          <el-button v-if="!detailData.htSign" class="zj-f-r zj-m-r-20" type="primary" :api="zjBtn.getEnterprise" @click="openDialog">贸易背景</el-button>
        </el-row>
      </el-form>
    </zj-content-block>

    <zj-content-block>
      <zj-header>转让信息</zj-header>
      <zj-button type="primary" class="zj-m-l-20 zj-m-b-10" @click="sysUserAdd">新增被转让人</zj-button>
      <zj-table ref="sysUser" :dataList="billInfoList" :edit-config="{
          trigger: 'manual',
          mode: 'row',
          icon: '-',
          autoClear: false,
          showStatus: true,
        }">
        <zj-table-column field="sellerEntName" title="被转让人名称" :edit-render="{
           name: '$select', options: entityList, optionProps: {value: 'index', label: 'sellerEntName'},events:{change:selectChange}
        }">
          <!-- <template v-slot:edit="scope"></template> -->
        </zj-table-column>
        <zj-table-column field="ebillAmt" title="转让金额" :formatter="money" :edit-render="{ name: '$input' }" >
          <template v-slot:edit="scope">
              <vxe-input
                v-model="scope.row.ebillAmt"
                type="float"
                digits="2"
                :controls="false"
                style="width: 100%;"
              ></vxe-input>
            </template>
        </zj-table-column>
        <zj-table-column field="bankAccount" title="收款账号" :edit-render="{ name: '$input' }" />
        <zj-table-column field="bankAccname" title="收款银行账户名称" :edit-render="{ name: '$input' }" />
        <zj-table-column field="bankNo" title="收款银行联行号" :edit-render="{ name: '$input' }" />
        <zj-table-column field="bankName" title="收款账户开户行" :edit-render="{ name: '$input' }" />
        <zj-table-column field="remark" title="备注" :edit-render="{ name: '$input' }" />
        <zj-table-column title="操作" fixed="right" width="250px">
          <template v-slot="{ row, rowIndex }">
            <template v-if="!$refs.sysUser.isActiveByRow(row)">
              <zj-button type="text" @click="previewAgreement(row)">相关协议</zj-button>
              <zj-button type="text" @click="sysUserEdit(row)">修改</zj-button>
              <zj-button type="text" @click="sysUserDel(rowIndex)">删除</zj-button>
            </template>
            <template v-if="$refs.sysUser.isActiveByRow(row)">
              <zj-button type="text" @click="sysUserSave(row, rowIndex)">保存</zj-button>
              <zj-button type="text" @click="sysUserCancel(row, rowIndex)">取消</zj-button>
            </template>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content-block>

    <zj-content-footer>
      <zj-button type="primary" @click="toApply" :disabled="!billInfoList.length">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>

    <trade-bj-dialog ref="tradeBjDialog" v-if="tradeBjShow" :visible.sync="tradeBjShow" :rowData="row"/>
    <!-- 查看器 -->
    <zj-preview :visible.sync="viewShow" :showFooter="false" :title="agreementObj.agreementName" :htmlStr="agreementObj.agreementContent" fileType="html" @close="viewShow=false"/>
  </zj-content-container>
</template>

<script>
import tradeBjDialog from './dialog/tradeBjDialog'
import view from "@pubComponent/preview/view";
import { mapState } from 'vuex'
export default {
  components: {
    tradeBjDialog
  },
  computed: {
    ...mapState({
      entInfo: state => state.enterprise.entInfo,
    })
  },
  mixins:[view],
  data() {
    return {
      zjControl: this.$api.billAssignApply,
      detailData: {},
      billInfoList: [],
      billInfoRow: {},
      entityList: [],
      currentEditIndex: 0,
      ebillAmt: 0,
      tradeBjShow: false,
      agreementObj: {
        agreementName: "",
        agreementContent: "",
      },
    };
  },
  created() {
    this.getRow();
    this.detailData = this.row;
    this.getTradeRalation()
  },
  methods: {
    selectChange(data, $event) {
      let row = this.entityList[$event.value]
      // console.log(row, $event)
      this.$set(this.billInfoList, this.currentEditIndex, Object.assign(this.billInfoList[this.currentEditIndex], row));
    },
    // 获取当前企业贸易关系
    getTradeRalation() {
      this.zjControl.getTradeRalation({ ids: [this.row.id] }).then(res => {
        this.entityList = res.data.entityList || []
        this.entityList.forEach((item, index) => {
          item.index = index
        })
        // console.log(this.entityList)
      })
    },
    // 提交申请
    toApply() {
      this.ebillAmt = 0
      this.billInfoList.forEach(item => {
        this.ebillAmt += parseInt(item.ebillAmt)
      })
      if(this.ebillAmt > this.detailData.ebillAmt) {
        this.$messageBox({
          content: "转让总金额需小于等于凭证金额！",
          type: "error",
        });
        return
      }
      this.$confirm(
        `您本次申请转让<b style="font-size: 18px;color: #000000;">1</b>笔电子债权凭证，共计：<br/>
        <b style="font-size: 18px;color: #000000;">${this.ebillAmt}</b>元,<br/>
        请确认<br>`,
        "转让申请确认",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      ).then(() => {
        let params = {
          ids: [this.row.id],
          billInfoList: this.billInfoList
        };
        this.zjControl.submitEbBillOneToMany(params).then((res) => {
          this.$message.success("申请成功!");
          this.goParent();
        });
      });
    },
    //新增被转让人编辑检测
    sysUserIng() {
      let key = this.$refs.sysUser.getActiveRecord() ? true : false;
      if (key) {
        this.$messageBox({
          content: "请您先保存正在编辑的数据",
          type: "info",
        });
      }
      return key;
    },
    //新增被转让人
    sysUserAdd() {
      if (this.sysUserIng()) {
        return;
      }
      let item = {
        sellerEntName: '',
        ebillAmt: this.detailData.ebillAmt,
        // ebillAmt: 0.00,
        bankAccount: '',
        bankAccname: '',
        bankNo: '',
        bankName: '',
        remark: ''
      };
      this.billInfoList.push(item);
      this.$refs.sysUser.setActiveRow(item);
      this.billInfoRow = JSON.parse(JSON.stringify(item))
      this.currentEditIndex = this.billInfoList.length - 1;
    },
    //保存新增被转让人
    sysUserSave(row, rowIndex) {
      // console.log(row, rowIndex)
      row.save = true;
      this.$set(this.billInfoList, rowIndex, Object.assign({}, row));
      this.$refs.sysUser.clearActived();
    },
    //取消新增被转让人
    sysUserCancel(row, rowIndex) {
      // this.billInfoList.splice(rowIndex, 1);
      this.$set(this.billInfoList, rowIndex, this.billInfoRow);
      this.$refs.sysUser.clearActived();
    },
    //修改新增被转让人
    sysUserEdit(row, index) {
      if (this.sysUserIng()) {
        return;
      }
      this.billInfoRow = JSON.parse(JSON.stringify(row))
      this.$refs.sysUser.setActiveRow(row);
      this.currentEditIndex = index;
    },
    //删除新增被转让人
    sysUserDel(rowIndex) {
      if (this.sysUserIng()) {
        return;
      }
      this.billInfoList.splice(rowIndex, 1);
    },
    openDialog() {
      // this.$refs.tradeBjDialog.open(this.row)
      this.tradeBjShow = true
    },
    // 相关协议
    previewAgreement(row) {
      let params = {
        ebillCode: this.detailData.ebillCode,
        fromEntId: this.entInfo.entId,
        fromEntName: this.entInfo.entName,
        holderName : row.sellerEntName,
        payableExpireDate: this.detailData.payableExpireDate,
        payEntName: this.detailData.payEntName,
        tranAmt: row.ebillAmt,
      }
      this.zjControl.getEbBillAgreementDetail(params).then(res=>{
        this.agreementObj = res.data || {}
        this.viewShow = true
      }).catch(()=>{

      })
    }
  },
};
</script>

<style lang="less" scoped>
</style>