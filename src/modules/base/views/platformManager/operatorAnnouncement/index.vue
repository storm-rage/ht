<template>
  <div class="operatorAnnouncement">
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="类型：" class="col-center">
            <el-select
              v-model="typeListRes"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转让申请日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.expireDateStart"
              :endDate.sync="searchForm.expireDateEnd"
            />
          </el-form-item>
          <el-form-item label="申请流水号：">
            <el-input
              v-model="searchForm.issueEntName"
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
        </el-form>
      </template>
      <template slot="btnGroups">
        <zj-button class="zj-m-l-10 mb-10 mt-10" type="primary" @click="add"
          >新增</zj-button
        >
      </template>

      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.sysNoticeAddPage"
      >
        <zj-table-column field="type" title="类型" />
        <zj-table-column field="theme" title="标题" />
        <zj-table-column field="target" title="对象" />
        <zj-table-column field="content" title="内容" />
        <zj-table-column
          field="validStartDatetime"
          title="有效期起始时间"
          :formatter="date"
        />
        <zj-table-column
          field="validEndDatetime"
          title="有效期截止时间"
          :formatter="date"
        />
        <zj-table-column field="state" title="开关状态" />
        <zj-table-column
          field="createDatetime"
          title="创建时间"
          :formatter="date"
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button
              type="text"
              @click="toDetail(row)"
              :api="zjBtn.sysNoticeAddDetails"
              >详情</zj-button
            >
            <zj-button type="text" @click="toEdit(row)">修改</zj-button>
            <zj-button type="text" @click="toDel(row)">删除</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>

    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      center
      width="60%"
      :title="
        type == 'add'
          ? '运营公告新增'
          : type == 'update'
          ? '运营公告修改'
          : '运营公告详情'
      "
      custom-class="mbi-editDialog"
      @close="cancel"
      top="6vh"
    >
      <el-form
        ref="form"
        class="mbi-form"
        :model="formModel"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="140px"
      >
        <el-form-item
          label="类型："
          prop="entName"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-select
            v-if="type != 'info'"
            v-model="formModel.type"
            placeholder="请选择"
            clearable
            :disabled="true"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.desc"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <span v-else>公告</span>
        </el-form-item>
        <el-form-item
          label="标题："
          :class="{ 'zj-m-b-5': !editFlag }"
          prop="invoiceTaxpayerId"
        >
          <el-input v-if="type != 'info'" v-model="formModel.theme" />
          <span v-else>标题标题标题</span>
        </el-form-item>
        <el-form-item
          label="对象："
          prop="invoiceAddress"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-radio-group v-model="formModel.target" v-if="type != 'info'">
            <el-radio :label="1" value="1">门户</el-radio>
            <el-radio :label="2" value="2">运营</el-radio>
          </el-radio-group>
          <span v-else>标题标题标题</span>
        </el-form-item>
        <el-form-item
          label="内容："
          prop="invoicePhone"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-input
            v-if="type != 'info'"
            type="textarea"
            v-model="formModel.content"
          />
          <p v-else>内容内容内容内容内容</p>
        </el-form-item>
        <el-form-item
          label="图片："
          prop="invoiceBankInfo"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <zj-upload />
        </el-form-item>
        <el-form-item
          label="有效期："
          prop="invoiceBankAccno"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <zj-date-range-picker
            v-if="type != 'info'"
            :startDate.sync="formModel.validStartDatetime"
            :endDate.sync="formModel.validEndDatetime"
          />
          <span v-else>2021-01-01至2021-09-01</span>
        </el-form-item>
        <el-form-item
          label="开关："
          prop="invoiceEmail"
          :class="{ 'zj-m-b-5': !editFlag }"
        >
          <el-switch v-model="formModel.state" />
        </el-form-item>
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <zj-button type="primary" v-if="!type == ''" @click="save">保存</zj-button>
        <zj-button class="back" @click="dialogVisible = false">取消</zj-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {
        sysNoticeAddDirectory:
          this.$api.operatorAnnouncement.sysNoticeAddDirectory, //数据字典
        sysNoticeAdd: this.$api.operatorAnnouncement.sysNoticeAdd, //新增公告信息
        sysNoticeAddDelete: this.$api.operatorAnnouncement.sysNoticeAddDelete, //删除系统公告
        sysNoticeAddPage: this.$api.operatorAnnouncement.sysNoticeAddPage, //查询系统公告集
        sysNoticeAddAller: this.$api.operatorAnnouncement.sysNoticeAddAller, //修改系统公告
        sysNoticeAddDetails: this.$api.operatorAnnouncement.sysNoticeAddDetails, //系统公告详情
      },
      searchForm: {},
      dialogVisible: false,
      type: "info",
      tableData: [{ id: 1 }],
      formModel: {},
      editFlag: "1",
      formRules: {},
      typeListRes: "",
      typeList: [],
    };
  },
  created() {
    this.apiDic();
  },
  watch: {
    dialogVisible(value) {
      if (!value) {
        this.formModel = {};
        // this.$set()
      }
    },
  },
  methods: {
    apiDic() {
      let params = {
        id: "1",
      };
      this.zjControl.sysNoticeAddDirectory(params).then((res) => {
        if (res.code === 200) {
          // console.log(res.data.typeList, "=====字典======");
          this.typeList = res.data.typeList;
        }
      });
    },
    cancel() {
      // alert("X");
    },
    //详情
    toDetail(row) {
      this.type = "";
      this.dialogVisible = true;
      this.formModel = {...row};
      if (this.formModel.target === "门户") {
        this.formModel.target = 1;
      } else {
        this.formModel.target = 2;
      }
      if(this.formModel.state == "开启"){
        this.formModel.state = true
      }else{
        this.formModel.state = false
      }
    },
    //新增
    add() {
      this.type = "add";
      this.formModel.type = "2" // 公告
      this.dialogVisible = true;
    },
    //修改
    toEdit(row) {
      this.type = "update";
      this.dialogVisible = true;
      this.formModel = {...row};
      if (this.formModel.target === "门户") {
        this.formModel.target = 1;
      } else {
        this.formModel.target = 2;
      }
      if(this.formModel.state == "开启"){
        this.formModel.state = true
      }else{
        this.formModel.state = false
      }
      this.formModel.id = row.id
      // console.log(row)
    },
    //删除
    toDel(row) {
      this.$messageBox({
        type: "warning",
        content: "您确定要删除吗",
      }).then(() => {
        this.zjControl.sysNoticeAddDelete({ id: row.id }).then(() => {
          alert("已删除");
        });
      }).catch(()=>{})
    },
    //保存
    save() {
      if (this.type === "add") {
        // alert("保存");
        let params = {
          state: this.formModel.state?'1':'2', //开关状态（ 1:开启 2:关闭）
          target: this.formModel.target, //展示对象（1:核心企业 2:供应商,3:核心企业和供应商）
          theme: this.formModel.theme, //公告主题
          type: this.formModel.type, //公告类型（1:弹框,2:公告,3:宣传栏）
          validEndDatetime: this.formModel.validEndDatetime, //有效结束日期
          validStartDatetime: this.formModel.validStartDatetime, //有效开始日期
          content: this.formModel.content, //内容
        };
        this.zjControl.sysNoticeAdd(params).then((res) => {
          this.$message.success("新增成功！");
          this.dialogVisible = false;
          this.$refs.searchTable.getList()
        });
      } else if (this.type === "update") {
        // alert("修改");
        let params = {
          state: this.formModel.state?'1':'2', //开关状态（ 1:开启 2:关闭）
          target: this.formModel.target, //展示对象（1:核心企业 2:供应商,3:核心企业和供应商）
          theme: this.formModel.theme, //公告主题
          type: this.formModel.type, //公告类型（1:弹框,2:公告,3:宣传栏）
          validEndDatetime: this.formModel.validEndDatetime, //有效结束日期
          validStartDatetime: this.formModel.validStartDatetime, //有效开始日期
          content: this.formModel.content, //内容
          id: this.formModel.id
        };
        this.zjControl.sysNoticeAddAller(params).then((res) => {
          this.$message.success("修改成功！");
          this.dialogVisible = false;
          this.$refs.searchTable.getList()
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>