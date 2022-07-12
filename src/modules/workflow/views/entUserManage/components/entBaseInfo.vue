<template>
  <zj-content-block>
    <zj-header title="企业基础信息"></zj-header>
    <zj-content>
      <el-form ref="form" label-width="160px">
        <zj-collapse title="企业信息">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称：">
                <span>{{ detailData.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码：">
                <span>{{ detailData.bizLicence }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="平台客户类型：">
                <!-- <span>{{
                  typeMap(dictionary.entTypeList, detailData.entType)
                }}</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业注册地址：">
                <span>{{ detailData.address }}</span></el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立日期：">
                <span>{{ detailData.address }}</span></el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册资本：">
                <span>{{ detailData.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业规模：">
                <!-- <span>{{
                  typeMap(dictionary.scaleList, detailData.scale)
                }}</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业经营类型：">
                <!-- <span>{{
                  typeMap(dictionary.scaleList, detailData.scale)
                }}</span> -->
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
        <zj-collapse title="法人信息">
          <el-row class="info-body">
            <el-col :span="8">
              <el-form-item label="企业法人姓名：">
                <span>{{ detailData.legalPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人身份证号码：">
                <!-- <span>{{
                  typeMap(dictionary.userCertTypeList, detailData.legalCertType)
                }}</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <span>{{ detailData.legalCertNo }}</span>
              <el-form-item label="法人手机手机号："> </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
        <zj-collapse title="企业联系人">
          <el-row class="info-body">
            <el-col :span="8">
              <el-form-item label="企业联系人姓名：">
                <span>{{ detailData.legalPersonName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业联系人手机号：">
                <!-- <span>{{
                  typeMap(dictionary.userCertTypeList, detailData.legalCertType)
                }}</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业联系地址：">
                <span>{{ detailData.legalCertNo }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
        <zj-collapse title="银行账户">
          <zj-table :pager="false" :dataList="dataList">
            <zj-table-column field="changeTime" title="银行账户名称" />
            <zj-table-column field="changeItem" title="银行账号" />
            <zj-table-column field="changeItem" title="银行账户开户行" />
            <zj-table-column field="changeItem" title="银行联行号" />
            <zj-table-column field="changeItem" title="银行类型" />
            <zj-table-column field="changeItem" title="核查方式" />
          </zj-table>
        </zj-collapse>
        <!-- <zj-collapse title="天眼查信息">
          <zj-button
            type="text"
            @click="activeEyeSky = !activeEyeSky"
            ref="EyeSkyBtn"
            >{{ activeEyeSky ? "收起" : "展开" }}</zj-button
          >
          <zj-button @click="getEyeSky">一键获取天眼查信息</zj-button>

          <zj-eye-sky
            :mountKey="true"
            ref="eyesky"
            :show="activeEyeSky"
            :entId="eyeSkyId"
            @eyeSkyChange="eyeSkyChange"
          />
        </zj-collapse> -->
      </el-form>
    </zj-content>
  </zj-content-block>
</template>
<script>
// 业务申请信息
export default {
  components: {},

  data() {
    return {
      detailData: {},
      dataList: [],
    };
  },
};
</script>
