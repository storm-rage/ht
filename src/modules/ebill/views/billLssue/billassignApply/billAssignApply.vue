<template>
  <zj-content-container>
    <zj-top-header>凭证转让申请</zj-top-header>
    <zj-content-block>
      <zj-header>电子债权凭证信息</zj-header>
      <el-form ref="form" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="原始凭证编号：">
              <span>{{ detailData.rootCode | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证编号：">
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
            <el-form-item label="凭证签发日期：">
              <span>{{ detailData.payableIssuanceDate | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证到期日：">
              <span>{{ detailData.payableExpireDate | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签收日期：">
              <span>{{ detailData.holderDate | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证金额：">
              <span>{{ detailData.ebillAmt | value }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label=" 备注：">
              <span>{{ detailData.remark | value }}</span>
            </el-form-item>
          </el-col>
          <el-button class="zj-f-r zj-m-r-20" type="primary"
            >贸易背景</el-button
          >
        </el-row>
      </el-form>
    </zj-content-block>

    <zj-content-block>
      <zj-header>转让信息</zj-header>
      <zj-button type="primary" class="zj-m-l-20 zj-m-b-10" @click="sysUserAdd"
        >新增被转让人</zj-button
      >
      <zj-table
        ref="sysUser"
        :dataList="billInfoList"
        :edit-config="{
          trigger: 'manual',
          mode: 'row',
          icon: '-',
          autoClear: false,
          showStatus: true,
        }"
      >
        <zj-table-column
          field="holderName"
          title="被转让人名称"
          :edit-render="{ name: '$select' }"
        />
        <zj-table-column
          field="ebillAmt"
          title="转让金额"
          :formatter="money"
          :edit-render="{ name: '$input' }"
        />
        <zj-table-column
          field="bankAccount"
          title="收款账号"
          :edit-render="{ name: '$input' }"
        />
        <zj-table-column
          field="bankAccname"
          title="收款银行账户名称"
          :edit-render="{ name: '$input' }"
        />
        <zj-table-column
          field="bankNo"
          title="收款银行联行号"
          :edit-render="{ name: '$input' }"
        />
        <zj-table-column
          field="bankName"
          title="收款账户开户行"
          :edit-render="{ name: '$input' }"
        />
        <zj-table-column
          field="remark"
          title="备注"
          :edit-render="{ name: '$input' }"
        />
        <zj-table-column title="操作" fixed="right" width="250px">
          <template v-slot="{ row, rowIndex }">
            <template v-if="!$refs.sysUser.isActiveByRow(row)">
              <zj-button
                type="text"
                @click="goChild('entManageDetail', row)"
                :api="zjBtn.getEnterprise"
                >相关协议</zj-button
              >
              <zj-button
                type="text"
                @click="sysUserEdit(row)"
                :api="zjBtn.getEnterprise"
                >修改</zj-button
              >
              <zj-button
                type="text"
                @click="sysUserDel(rowIndex)"
                :api="zjBtn.getEnterprise"
                >删除</zj-button
              >
            </template>
            <template v-if="$refs.sysUser.isActiveByRow(row)">
              <zj-button type="text" @click="sysUserSave(row, rowIndex)"
                >保存</zj-button
              >
              <zj-button type="text" @click="sysUserCancel(row, rowIndex)"
                >取消</zj-button
              >
            </template>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content-block>

    <zj-content-footer>
      <zj-button type="primary" @click="toApply">提交申请</zj-button>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {
      zjControl: this.$api.billAssignApply,
      detailData: {},
      billInfoList: [],
    };
  },
  created() {
    this.getRow();
    this.detailData = this.row;
  },
  methods: {
    // 提交申请
    toApply() {
      this.$confirm(
        `您本次申请转让<b style="font-size: 18px;">1</b>笔电子债权凭证，共计：<br/>
        <b style="font-size: 18px;">${this.detailData.ebillAmt}</b>元请确认<br>`,
        "转让申请确认",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      ).then(() => {
        let params = {
          ids: [this.row.ebillCode],
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
      let item = {};
      this.billInfoList.push(item);
      this.$refs.sysUser.setActiveRow(item);
    },
    //保存新增被转让人
    sysUserSave(row, rowIndex) {
      row.save = true;
      this.$refs.sysUser.clearActived();
    },
    //取消新增被转让人
    sysUserCancel(row, rowIndex) {
      this.billInfoList.splice(rowIndex, 1);
      this.$refs.sysUser.clearActived();
    },
    //修改新增被转让人
    sysUserEdit(row) {
      if (this.sysUserIng()) {
        return;
      }
      this.$refs.sysUser.setActiveRow(row);
    },
    //删除新增被转让人
    sysUserDel(rowIndex) {
      if (this.sysUserIng()) {
        return;
      }
      this.billInfoList.splice(rowIndex, 1);
    },
  },
};
</script>

<style lang="less" scoped>
</style>