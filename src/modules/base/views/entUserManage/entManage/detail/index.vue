<template>
  <zj-content-container>
    <zj-top-header>企业详情</zj-top-header>
    <ent-info ref="entInfo">
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
                  <span>{{ detailData.entType | value }}</span>
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天集团：">
                 <span>{{ detailData.isHtEnterprise | value }}</span>
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
                  <span>{{ detailData.registerStartDate | value  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本：">
                  <span>{{ detailData.registerCapital | value  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业注册地址：">
                  <span>{{ detailData.address | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业规模：">
                  <span>{{ detailData.scale | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业经营类型：">
                 <span>{{ detailData.custType | value  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </zj-collapse>
      </template>
    </ent-info>
  </zj-content-container>
</template>

<script>
import entInfo from "./entInfo.vue";
export default {
  components: {
    entInfo,
  },
  data() {
    return {
      zjControl: {
        queryEntDictionary: this.$api.entInfoManage.queryEntDictionary,
        getEnterprise: this.$api.entInfoManage.getEnterprise
      },
      detailData: {},
    };
  },
  created() {
    this.getRow()
    this.queryEntDictionary()
    this.getEnterprise()
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
      this.zjControl.getEnterprise({id: this.row.id}).then(res => {
        this.detailData = res.data
        this.handleProps(res.data)
      })
    },
    // 传递值给子组件
    handleProps(data) {
      let entInfoDom = this.$refs.entInfo
      entInfoDom.$data.detailData = data
    }
  },
};
</script>

<style scoped>
</style>
