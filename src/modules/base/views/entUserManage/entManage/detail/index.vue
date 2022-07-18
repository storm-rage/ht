<template>
  <zj-content-container>
    <zj-top-header>企业详情</zj-top-header>
    <ent-info>
      <template slot="entInfo">
        <zj-collapse title="企业信息">
          <el-form ref="form" label-width="160px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业简称：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="曾用名：">
                  <span>{{ detailData.aaa | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="平台客户类型：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否海天集团：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户业务系统编码：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="成立日期：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册资本：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业注册地址：">
                  <span>{{ detailData.address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业规模：">
                  <span></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业经营类型：">
                  <span></span>
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
      zjControl: {},
      detailData: {},
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
