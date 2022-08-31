<template>
  <zj-content-container>
    <zj-top-header>企业详情</zj-top-header>
    <ent-info ref="entInfo" :detailData="detailData" :dictionary="dictionary">
      <template slot="entInfo">
        <zj-collapse title="企业信息">
          <el-form ref="form" label-width="160px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称：">
                  <span>{{ detailData.name | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业简称：">
                  <span>{{ detailData.shortName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="曾用名：">
                  <span>{{ detailData.beforeName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平台客户类型：">
                  <span>{{
                    typeMap(dictionary.entTypeList, detailData.entType)
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天集团：">
                  <span>{{
                    typeMap(
                      dictionary.isHtEnterpriseList,
                      detailData.isHtEnterprise
                    )
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户业务系统编码：">
                  <span>{{ detailData.customCode | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="成立日期：">
                  <span>{{ detailData.registerStartDate | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本：">
                  <span>{{ detailData.registerCapital | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业注册地址：">
                  <span>{{ detailData.address | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业规模：">
                  <span>{{
                    typeMap(dictionary.scaleList, detailData.scale)
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业经营类型：">
                  <span>{{ detailData.custType | value }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </zj-collapse>
      </template>
    </ent-info>
    <zj-content-footer>
      <zj-button @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import entInfo from "../components/entInfo.vue";
export default {
  components: {
    entInfo,
  },
  data() {
    return {
      zjControl: {
        queryEntDictionary: this.$api.entInfoManage.queryEntDictionary,
        getEnterprise: this.$api.entInfoManage.getEnterprise,
        getEbBusinessParamLog: this.$api.entInfoManage.getEbBusinessParamLog,
      },
      detailData: {},
      dictionary: {},
    };
  },
  created() {
    this.getRow();
    this.queryEntDictionary();
    this.getEnterprise();
  },
  methods: {
    // 获取字典
    queryEntDictionary() {
      this.zjControl.queryEntDictionary().then((res) => {
        this.dictionary = res.data;
      });
    },
    // 获取详情
    getEnterprise() {
      this.zjControl.getEnterprise({ id: this.row.id }).then((res) => {
        // 银行账户
        if (!res.data.entBanksList) {
          res.data.entBanksList = [{
            entBanksList: res.data.entBanksList,
            bankAccno: res.data.bankAccno,
            bankName: res.data.bankName,
            bankNo: res.data.bankNo,
            bankType: res.data.bankType,
          }]
        }
        this.detailData = res.data;
        console.log(this.detailData)
      });
    },
  },
};
</script>

<style scoped>
</style>
