<template>
  <zj-content-container>
    <div></div>
    <zj-top-header title="企业注册审核"></zj-top-header>
    <el-form label-width="160px">
      <!-- 业务申请信息 -->
      <zj-content-block v-show="workflow === 'sqxx'">
        <zj-content-block>
          <zj-header title="业务申请信息" />
          <zj-content>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请流水号：">
                  <span>{{ detailData.serialNo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请类型：">
                  <span>
                    {{
                      typeMap(dictionary.applyType, detailData.applyType)
                    }}</span
                  >
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请状态：">
                  <span> {{ detailData.applyStatus }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请时间：">
                  <span> {{ detailData.applyDatetime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-content>
        </zj-content-block>
        <!-- 企业基础信息 -->
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
                    <el-form-item label="统一社会信用代码：">
                      <span>{{ detailData.bizLicence | value }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="平台客户类型：">
                      <span>{{ detailData.aaaaaa | value }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="企业注册地址：">
                      <span>{{ detailData.address }}</span>
                    </el-form-item>
                  </el-col>
                   <el-col :span="8">
                    <el-form-item label="成立日期：">
                      <span>{{ detailData.registerStartDate }}</span>
                    </el-form-item>
                  </el-col>
                   <el-col :span="8">
                    <el-form-item label="注册资本：">
                      <span>{{ detailData.registerCapital }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="企业规模：">
                      <span>{{ detailData.scale }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="企业经营类型：">
                      <span>{{ typeMap(dictionary.custTypeList,detailData.custType) }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </zj-collapse>
          </template>
        </ent-info>
      </zj-content-block>

      <!-- 审批信息 -->
      <zj-content-block v-show="workflow === 'spxx'">
        <!--操作记录 -->
        <operate-log></operate-log>
        <!--审核信息 -->
        <el-form label-width="170px" :model="form" :rules="rules" ref="form">
          <zj-content>
            <zj-collapse title="审核信息">
              <el-form-item label="平台客户类型：" prop="entType">
                <el-radio-group v-model="form.entType" @change="entTypeChange">
                  <el-radio
                    v-for="item in dictionary.platFormAuditEntTypeList"
                    :key="item.code"
                    :label="item.code"
                    >{{ item.desc }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否海天集团：" prop="entType">
                <el-radio-group v-model="form.entType" @change="entTypeChange">
                  <el-radio :label="form.a">是</el-radio>
                  <el-radio :label="form.b">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="注册企业名称：" prop="name">
                {{ form.name }}
              </el-form-item>

              <el-form-item label="注册企业简称：" prop="shortName">
                <el-input
                  v-model.trim="form.shortName"
                  :maxlength="101"
                  placeholder="请填写企业简称"
                />
              </el-form-item>
              <el-form-item label="注册企业曾用名：" prop="beforeName">
                <el-input
                  v-model.trim="form.beforeName"
                  placeholder="如有多个，使用逗号分隔"
                  :maxlength="200"
                />
              </el-form-item>
              <el-form-item label="买方企业名称：" prop="myBuyers">
                {{ form.myBuyers }}
                <div class="red zj-f-s-12">{{ myBuyersMessage }}</div>
              </el-form-item>
              <el-form-item label="客户业务系统编码：" prop="customCode">
                <el-input
                  v-model.trim="form.customCode"
                  :maxlength="21"
                  placeholder="请填写客户编码"
                />
                <zj-content-tip
                  class="zj-m-l-10"
                  text="注：供应商在核心企业业务系统的编码，选填。"
                ></zj-content-tip>
              </el-form-item>
              <!-- <el-form-item
                v-for="(item, index) in form.projectInfoList"
                :key="index"
                :prop="'projectInfoList.' + index + '.projectId'"
                :rules="{
                  required: true,
                  index,
                  item,
                  validator: projectValidator,
                  trigger: 'change',
                }"
                label="所属项目："
                class="no-required pil-sc"
                :class="item.operationFlag === 'D' ? 'none' : ''"
              >
                <template v-if="projectFlag">
                  <div slot="label" class="inline">
                    <i
                      class="el-icon-delete project-i"
                      @click="projectDel(item, index)"
                    />
                    所属项目：
                  </div>
                </template>
                <el-select
                  v-model="item.projectId"
                  :popper-append-to-body="false"
                  @change="projectEdit(item)"
                >
                  <el-option
                    v-for="(citem, cindex) in projectInfoListCHECKBOX"
                    :disabled="citem.disabled"
                    :key="cindex"
                    :value="citem.projectId"
                    :label="citem.projectName"
                  ></el-option>
                </el-select>
                <zj-checkbox
                  v-if="item.projectId"
                  :checkAll="false"
                  :list="
                    projectInfoListCHECKBOX.find(
                      (pitem) => pitem.projectId === item.projectId
                    ).productTypeList
                  "
                  :value.sync="item.selectProductList"
                />
              </el-form-item> -->
              <!-- <el-row class="projectAdd">
                <i
                  class="el-icon-circle-plus-outline project-i"
                  @click="projectAdd"
                />
              </el-row> -->
              <!-- <el-row class="projectText">
                说明：产品非必填，如果不选择产品，后续供应商可在登录后的页面发起开通申请
              </el-row> -->
              <!-- 核心企业 -->
              <!-- <template v-if="form.entType === 'B'">
                <el-form-item
                  label="隶属企业："
                  ref="parentEntId"
                  prop="parentEntId"
                >
                  <el-select
                    v-model="form.parentEntId"
                    clearable
                    filterable
                    placeholder="请选择隶属企业"
                    @change="parentChange"
                    @clear="parentClear"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in parentList"
                      :key="item.index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="签章企业：" prop="sealEntId">
                  <el-select
                    v-model="form.sealEntId"
                    filterable
                    placeholder="请选择签章企业"
                    :popper-append-to-body="false"
                  >
                    <el-option
                      v-for="item in sealList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </template> -->
              <!-- 供应商 -->
              <!-- <template v-else-if="form.entType === 'S'">
                <el-form-item
                  prop="supplierType"
                  ref="supplierType"
                  label-width="40px"
                  class="supplierType-item"
                >
                  <el-radio-group
                    v-model="form.supplierType"
                    @change="supplierChange"
                  >
                    <el-radio
                      v-for="item in dictionary.supplierTypeList"
                      :key="item.code"
                      :label="item.code"
                      >{{ item.desc }}</el-radio
                    >
                  </el-radio-group>
                  <template v-if="form.supplierType === '02'">
                    <span
                      class="success zj-m-l-10"
                      v-if="
                        form.supplierTradeList && form.supplierTradeList.length
                      "
                      >√ 该供应商有贸易关系推荐函</span
                    >
                    <span class="error zj-m-l-10" v-else
                      >× 该供应商尚无贸易关系推荐函</span
                    >
                  </template>
                  <zj-table
                    ref="searchTable"
                    class="zj-search-table mw400px zj-m-b-0"
                    v-show="form.entType === 'S' && form.supplierType === '02'"
                    :dataList="form.supplierTradeList"
                  >
                    <zj-table-column
                      field="buyerEntName"
                      title="推荐企业名称"
                    />
                    <zj-table-column title="上传证明材料">
                      <template v-slot="{ row }">
                        <zj-upload
                          :httpRequest="uploadSupLier"
                          :data="{ row }"
                          class="zj-inline"
                          v-if="zjBtn.uploadAttach"
                        >
                          <zj-button type="text">{{
                            row.fileId ? "重新上传" : "上传"
                          }}</zj-button>
                        </zj-upload>
                        <zj-button
                          type="text"
                          @click="downSupLier(row)"
                          class="zj-m-l-10"
                          style="text-decoration: underline"
                          v-show="row.fileId"
                        >
                          {{ row.attachName }}
                        </zj-button>
                      </template>
                    </zj-table-column>
                  </zj-table>
                </el-form-item>
              </template> -->
            </zj-collapse>
          </zj-content>

          <!-- <zj-content-block>
            <zj-header>审核意见</zj-header>
            <el-row class="zj-p-l-30">
              <span class="inline zj-p-l-15">{{ detailData.notes }}</span>
            </el-row>
            <el-form-item label-width="40px" prop="notes">
              <el-input
                type="textarea"
                placeholder="请输入审核意见"
                v-model="form.notes"
                :rows="5"
                :show-word-limit="true"
                :maxlength="1000"
                style="width: 50%; min-height: 60px"
              />
            </el-form-item>
          </zj-content-block> -->
        </el-form>
        <!--  审核意见  -->
        <audit-remark></audit-remark>
      </zj-content-block>

      <!-- 底部工作流状态 -->
      <zj-workflow v-model="workflow" :list="workflowList">
        <!-- 审核时 -->
        <el-row slot="right" v-if="$route.name === 'registerAuditApplyAudit'">
          <el-row v-show="workflow === 'spxx'" class="btn-w85">
            <zj-button status="primary" @click="holdSave">暂存</zj-button>
            <zj-button class="pass" @click="auditPass">审核通过</zj-button>
            <zj-button class="retort" @click="auditReject">审核驳回</zj-button>
            <zj-button class="reject" @click="registerRefuse">注册拒绝</zj-button>
          </el-row>
            <zj-button v-show="workflow === 'sqxx'" class="back" @click="goParent">返回</zj-button>
        </el-row>
      </zj-workflow>
      <!-- 协议时 -->
      <!-- <zj-content-footer v-if="$route.name === 'registerAuditProtocolAudit'">
      <zj-button class="back" @click="goParent">返回</zj-button>
      <zj-button class="pass" @click="confirm" :api="zjBtn.submitConfirm"
        >确认提交</zj-button
      >
    </zj-content-footer> -->

      <!--   查看器 -->
      <zj-preview
        :visible.sync="viewShow"
        :fileUrl="viewUrl"
        :showFooter="false"
        :fileType="viewType"
        @close="viewShow = false"
      />
    </el-form>
  </zj-content-container>
</template>

<script>
import registerAudit from "./commom/registerAudit";
export default registerAudit;
</script>

<style scoped lang="less">
// 工作流
/deep/.workflow-bottom {
  .right {
    float: none !important;
    width: calc(100% - 400px) !important;
    display: flex;
    justify-content: center;
  }
}
</style>