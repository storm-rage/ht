<template>
  <div class="modelAggreement">
    <zj-list-layout>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="协议文本编号：">
            <el-input
              v-model="searchForm.agreementType"
              clearable
              @keyup.enter.native="enterSearch"
            />
          </el-form-item>
          <el-form-item label="协议类型：" class="col-center">
            <el-select
              v-model="searchForm.agreementTypeName"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="(item, index) in dictionary.agreementTypeList"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最近维护日期：" class="col-right">
            <zj-date-range-picker
              :startDate.sync="searchForm.modifyDatetimeBegin"
              :endDate.sync="searchForm.modifyDatetimeEnd"
            />
          </el-form-item>
          <el-form-item label="模板状态：" class="col-center">
            <el-select
              v-model="searchForm.isEffective"
              placeholder="请选择"
              clearable
              :popper-append-to-body="false"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="(item, index) in dictionary.isEffectiveFlagList"
                :key="index"
                :value="item.code"
                :label="item.desc"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table
        ref="searchTable"
        :params="searchForm"
        :api="zjControl.agreementList"
      >
        <zj-table-column field="agreementTypeName" title="协议类型" />
        <zj-table-column field="agreementType" title="协议文本编号" />
        <zj-table-column field="agreementTypeName" title="文件名称" />
        <!-- <zj-table-column field="modifyDatetime" title="附件" /> -->
        <zj-table-column field="isEffective" title="模板状态" />
        <zj-table-column field="agreementVersion" title="版本号" />
        <zj-table-column
          field="modifyDatetime"
          title="最近维护日期"
          :formatter="obj=>date(obj.cellValue)||'-'"
        />
        <zj-table-column title="操作" fixed="right">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toDetail(row)">下载</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
      <!-- </div> -->
    </zj-list-layout>
  </div>
</template>

<script>
// import download from "@utils/download";
export default {
  name: "modelAggreement",
  data() {
    return {
      zjControl: {
        downloadTemplate: this.$api.modelAggreement.downloadTemplate, //基础协议模板查询-模板下载
        getDirectory: this.$api.modelAggreement.getDirectory, //基础协议模板查询-数据字典
        agreementList: this.$api.modelAggreement.agreementList, //基础协议模板-列表查询
      },
      searchForm: {
        agreementType: "",
        agreementTypeName: "",
        modifyDatetimeBegin: "",
        modifyDatetimeEnd: "",
        isEffective: "",
      },
      dialogVisible: false,
      type: "info",
      tableData: [{ id: 1 }],
      formModel: {},
      dictionary: {
        agreementTypeList: [],
        isEffectiveFlagList: []
      }
    };
  },
  created() {
    this.zjControl.getDirectory().then((res) => {
      if (res.code === 200) {
        // console.log(res, "------");
        this.dictionary = res.data || {};
      }
    });
  },
  methods: {
    //下载
    toDetail(row) {
      console.log(row);
      // this.zjControl.downloadFile({agreeTemplateId,agreementName})
      this.zjControl.downloadTemplate({
        agreeTemplateId: row.id,
        agreementName: row.agreementName,
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>