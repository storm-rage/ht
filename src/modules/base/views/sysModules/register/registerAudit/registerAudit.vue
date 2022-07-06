<template>
  <zj-content-container
    id="newApplyAudit"
    :class="[
      $route.name === 'registerAuditApplyAudit'
        ? 'registerAuditApply'
        : 'registerAuditProtocol',
    ]"
  >
    <zj-top-header title="企业注册审核"></zj-top-header>
    <!-- 业务申请信息 -->
    <el-collapse v-model="sqxxCollapseList" v-show="workflow === 'sqxx'">
      <zj-content>
        <zj-collapse title="业务申请信息" name="entInfo">
          <div>
            <el-row>
              <el-col :span="8">
                <label>申请流水号：</label>
                <span :class="nameSuccess ? '' : 'red'">{{
                  detailData.name | value
                }}</span>
              </el-col>
              <el-col :span="8">
                <label>申请类型：</label>
                <span :class="bizLicenceSuccess ? '' : 'red'">{{
                  detailData.bizLicence | value
                }}</span>
              </el-col>
              <el-col :span="8">
                <label>申请状态：</label>
                <span>{{
                  typeMap(dictionary.entTypeList, detailData.entType)
                }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <label>申请时间：</label>
                <span :class="pcaSuccess ? '' : 'red'">{{
                  detailData.address
                }}</span>
              </el-col>
            </el-row>
          </div>
        </zj-collapse>
      </zj-content>
      <zj-content>
        <zj-collapse title="企业基础信息" name="entInfo">
          <div>
            <div>
              <h4 class="bl zj-m-t-0">企业信息</h4>
              <div class="info-body">
                <el-row>
                  <el-col :span="8">
                    <label>企业名称：</label>
                    <span :class="nameSuccess ? '' : 'red'">{{
                      detailData.name | value
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>统一社会信用代码：</label>
                    <span :class="bizLicenceSuccess ? '' : 'red'">{{
                      detailData.bizLicence | value
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>平台客户类型：</label>
                    <span>{{
                      typeMap(dictionary.entTypeList, detailData.entType)
                    }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>企业注册地址：</label>
                    <span :class="pcaSuccess ? '' : 'red'">{{
                      detailData.address
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>成立日期：</label>
                    <span :class="pcaSuccess ? '' : 'red'">{{
                      detailData.address
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>注册资本：</label>
                    <span :class="pcaSuccess ? '' : 'red'">{{
                      detailData.address
                    }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>企业规模：</label>
                    <span>{{
                      typeMap(dictionary.scaleList, detailData.scale)
                    }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>企业经营类型：</label>
                    <span>{{
                      typeMap(dictionary.scaleList, detailData.scale)
                    }}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <h4 class="bl">法人信息</h4>
              <el-row class="info-body">
                <el-col :span="8">
                  <label>企业法人姓名：</label>
                  <span :class="legalPersonNameSuccess ? '' : 'red'">{{
                    detailData.legalPersonName | value
                  }}</span>
                </el-col>
                <el-col :span="8">
                  <label>法人身份证号码：</label>
                  <span>{{
                    typeMap(
                      dictionary.userCertTypeList,
                      detailData.legalCertType
                    )
                  }}</span>
                </el-col>
                <el-col :span="8">
                  <label>法人手机手机号：</label>
                  <span>{{ detailData.legalCertNo | value }}</span>
                </el-col>
              </el-row>
            </div>
            <div>
              <h4 class="bl">企业联系人</h4>
              <el-row class="info-body">
                <el-col :span="8">
                  <label>企业联系人姓名：</label>
                  <span :class="legalPersonNameSuccess ? '' : 'red'">{{
                    detailData.legalPersonName | value
                  }}</span>
                </el-col>
                <el-col :span="8">
                  <label>企业联系人手机号：</label>
                  <span>{{
                    typeMap(
                      dictionary.userCertTypeList,
                      detailData.legalCertType
                    )
                  }}</span>
                </el-col>
                <el-col :span="8">
                  <label>企业联系地址：</label>
                  <span>{{ detailData.legalCertNo | value }}</span>
                </el-col>
              </el-row>
            </div>
            <div class="legal">
              <h4 class="bl">银行账户</h4>
              <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
              >
                <vxe-table-column field="changeTime" title="银行账户名称" />
                <vxe-table-column field="changeItem" title="银行账号" />
                <vxe-table-column field="changeItem" title="银行账户开户行" />
                <vxe-table-column field="changeItem" title="银行联行号" />
                <vxe-table-column field="changeItem" title="银行类型" />
                <vxe-table-column field="changeItem" title="核查方式" />
              </vxe-table>
            </div>
            <div class="eye" v-if="detailData.isOpenTyc === '1'">
              <h4 class="bl">
                天眼查信息
                <zj-button
                  type="text"
                  @click="activeEyeSky = !activeEyeSky"
                  ref="EyeSkyBtn"
                  >{{ activeEyeSky ? "收起" : "展开" }}</zj-button
                >
                <zj-button @click="getEyeSky">一键获取天眼查信息</zj-button>
              </h4>
              <zj-eye-sky
                :mountKey="true"
                ref="eyesky"
                :show="activeEyeSky"
                :entId="eyeSkyId"
                @eyeSkyChange="eyeSkyChange"
              />
            </div>
          </div>
        </zj-collapse>
      </zj-content>
      <zj-content>
        <zj-collapse title="操作用户信息" name="userInfo">
          <vxe-table
            header-cell-class-name="headerCell"
            highlight-hover-row
            auto-resize
            border
            align="center"
            :data="tableData"
          >
            <vxe-table-column field="changeTime" title="姓名" />
            <vxe-table-column field="changeItem" title="用户名" />
            <vxe-table-column field="changeItem" title="证件类型" />
            <vxe-table-column field="changeItem" title="证件号码" />
            <vxe-table-column field="changeItem" title="邮箱" />
            <vxe-table-column field="changeItem" title="手机号" />
          </vxe-table>
        </zj-collapse>
      </zj-content>
      <zj-content>
        <zj-collapse title="相关资料附件" name="attach">
          <div class="attach-body">
            <ul class="attach-bar">
              <li
                v-for="(item, index) in infoBar"
                :key="index"
                @click="infoBarChange(index)"
                :class="infoBarActive === index ? 'check' : ''"
              >
                {{ item }}
              </li>
            </ul>
            <div class="attach-box">
              <el-row class="attach-box-bar">
                <table>
                  <tr>
                    <td>
                      <label>{{ infoItem.oneLabel }}</label>
                      <span>{{ infoItem.oneValue }}</span>
                    </td>
                    <td>
                      <label>{{ infoItem.twoLabel }}</label>
                      <span v-if="infoBarActive !== 0">{{
                        typeMap(
                          this.dictionary.legalCertTypeList,
                          infoItem.twoValue
                        )
                      }}</span>
                      <span v-else>{{ infoItem.twoValue }}</span>
                    </td>
                    <td>
                      <label>{{ infoItem.threeLabel }}</label>
                      <span>{{ infoItem.threeValue }}</span>
                    </td>
                    <td v-if="infoBarActive !== 0">
                      <label>{{ infoItem.fourLabel }}</label>
                      <span
                        >{{ date(infoItem.fourValue) }}至{{
                          date(infoItem.fiveValue)
                        }}</span
                      >
                    </td>
                  </tr>
                </table>
              </el-row>
              <div class="attach-box-img">
                <i class="el-icon-arrow-left previous" @click="prevnext('-')" />
                <div class="file-container">
                  <img
                    :src="viewItemUrl"
                    :style="{
                      transform: 'translate(-50%,-50%) rotate(' + imgRoPx + ')',
                    }"
                    v-if="viewItemType === 'image'"
                  />
                  <div
                    id="pdfCanvasItem"
                    :style="{
                      transform: 'translate(-50%,-50%) rotate(' + imgRoPx + ')',
                    }"
                    v-if="viewItemType === 'pdf'"
                  />
                  <div class="img-opt-block">
                    <div class="item-title">
                      {{ infoBar[infoBarActive] }}
                    </div>
                    <div class="item-img">
                      <img
                        src="~@assets/img/button/rota.png"
                        style="
                          position: inherit;
                          left: inherit;
                          top: inherit;
                          width: auto;
                          height: auto;
                        "
                        @click="rota"
                      />
                      <img
                        src="~@assets/img/button/down2.png"
                        style="
                          position: inherit;
                          left: inherit;
                          top: inherit;
                          width: auto;
                          height: auto;
                        "
                        @click="dolon"
                      />
                      <img
                        src="~@assets/img/button/zoom.png"
                        style="
                          position: inherit;
                          left: inherit;
                          top: inherit;
                          width: auto;
                          height: auto;
                        "
                        @click="previewFile(infoViewitem)"
                      />
                    </div>
                  </div>
                </div>
                <i class="el-icon-arrow-right next" @click="prevnext('+')" />
              </div>
            </div>
          </div>
        </zj-collapse>
      </zj-content>
      <zj-content>
        <zj-collapse title="企业其他信息" name="entOtherInfo">
          <div class="entOtherInfo-body">
            <h4 class="bl">开票信息</h4>
            <div class="info-body">
              <el-row>
                <el-col :span="8">
                  <label>企业名称：</label>
                  <span>{{ detailData.name | value }}</span>
                </el-col>
                <el-col :span="8">
                  <label>纳税人识别号：</label>
                  <span>{{ detailData.invoiceTaxpayerId | value }}</span>
                </el-col>
                <el-col :span="8">
                  <label>邮箱：</label>
                  <span>{{ detailData.invoiceEmail | value }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <label>电话：</label>
                  <span>{{ detailData.invoicePhone | value }}</span>
                </el-col>
                <el-col :span="8">
                  <label>开户行：</label>
                  <span>{{ detailData.invoiceBankInfo | value }}</span>
                </el-col>
                <el-col :span="8">
                  <label>银行账号：</label>
                  <span>{{ detailData.invoiceBankAccno | value }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <label>地址：</label>
                  <span>{{ detailData.invoicePhone | value }}</span>
                </el-col>
              </el-row>
            </div>
            <h4 class="bl">其他信息</h4>
            <div class="info-body">
              <el-row>
                <el-col :span="8">
                  <label>注册渠道：</label>
                  <span>{{ detailData.registerWebsite | value }}</span>
                </el-col>
                <el-col :span="8">
                  <label>买方企业：</label>
                  <span>{{ detailData.myBuyers | value }}</span>
                </el-col>
              </el-row>
              <el-row
                v-if="$route.name === 'registerAuditProtocolAudit'"
                class="entOtherInfo-body"
              >
                <template v-if="detailData.entType === 'S'">
                  <h4 class="orderTitle bl">供应商企业类型</h4>
                  <el-row>
                    <el-col :span="24" class="s130">
                      <label> </label>
                      <span>{{
                        typeMap(
                          dictionary.supplierTypeList,
                          detailData.supplierType
                        )
                      }}</span>
                    </el-col>
                  </el-row>
                </template>
                <template v-if="detailData.entType === 'B'">
                  <el-row>
                    <el-col :span="8">
                      <label>隶属企业：</label>
                      <span>{{ detailData.parentEntName | value }}</span>
                    </el-col>
                    <el-col :span="8">
                      <label>签章企业：</label>
                      <span>{{ detailData.sealEntName | value }}</span>
                    </el-col>
                  </el-row>
                </template>
              </el-row>
            </div>
          </div>
        </zj-collapse>
      </zj-content>
    </el-collapse>
    <!-- 审批信息 -->
    <el-collapse
      class="zjcoll spxx mt-20"
      v-model="spxxCollapseList"
      v-show="workflow === 'spxx'"
    >
      <!--操作记录 -->
      <zj-content>
        <zj-collapse title="操作记录" name="czjl">
          <vxe-table
            header-cell-class-name="headerCell"
            highlight-hover-row
            auto-resize
            border
            align="center"
            :data="tableData"
          >
            <vxe-table-column type="seq" title="序号" width="60" />
            <vxe-table-column field="changeTime" title="业务节点" />
            <vxe-table-column field="changeItem" title="处理人" />
            <vxe-table-column field="changeItem" title="处理时间" />
            <vxe-table-column field="changeItem" title="审核结果" />
            <vxe-table-column field="changeItem" title="审核意见" />
          </vxe-table>
        </zj-collapse>
      </zj-content>
      <!--审核信息 -->
      <zj-content>
        <zj-collapse title="审核信息" name="spxx">
          <h4 class="bl zj-m-b-10">审核信息</h4>
          <el-form label-width="140px" :model="form" :rules="rules" ref="form">
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
                v-model="form.shortName"
                :maxlength="101"
                placeholder="请填写企业简称"
              />
            </el-form-item>
            <el-form-item label="注册企业曾用名：" prop="beforeName">
              <el-input
                v-model="form.beforeName"
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
                v-model="form.customCode"
                :maxlength="21"
                placeholder="请填写客户编码"
              />
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
            <template v-if="form.entType === 'B'">
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
            </template>
            <!-- 供应商 -->
            <template v-else-if="form.entType === 'S'">
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
                  <zj-table-column field="buyerEntName" title="推荐企业名称" />
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
            </template>

            <h4 class="bl zj-m-t-0">审核意见</h4>
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
          </el-form>
        </zj-collapse>
      </zj-content>
    </el-collapse>

    <!-- 底部工作流状态 -->
    <zj-workflow v-model="workflow" :list="workflowList">
      <!-- 审核时 -->
      <el-row slot="right" v-if="$route.name === 'registerAuditApplyAudit'">
        <el-row v-show="workflow === 'sqxx'" class="btn-w85">
          <zj-button class="back" @click="goParent">返回</zj-button>
        </el-row>
        <el-row v-show="workflow === 'spxx'" class="btn-w85">
          <zj-button class="back" @click="goParent">返回</zj-button>
          <zj-button status="primary" @click="holdSave">暂存</zj-button>
          <zj-button class="pass" @click="auditPass">审核通过</zj-button>
          <zj-button class="retort" @click="auditReject">审核驳回</zj-button>
          <zj-button class="reject" @click="registerRefuse">注册拒绝</zj-button>
        </el-row>
      </el-row>
    </zj-workflow>
    <!-- 协议时 -->
    <zj-content-footer v-if="$route.name === 'registerAuditProtocolAudit'">
      <zj-button class="back" @click="goParent">返回</zj-button>
      <zj-button class="pass" @click="confirm" :api="zjBtn.submitConfirm"
        >确认提交</zj-button
      >
    </zj-content-footer>

    <!--   查看器 -->
    <zj-preview
      :visible.sync="viewShow"
      :fileUrl="viewUrl"
      :showFooter="false"
      :fileType="viewType"
      @close="viewShow = false"
    />
  </zj-content-container>
</template>

<script>
import registerAudit from "./commom/registerAudit";
export default registerAudit;
</script>

<style scoped lang="less">
#newApplyAudit {
  .projectText {
    color: #ee9712;
    padding: 5px 0 20px 50px;
  }

  .info-body {
    padding: 20px 0;
    .el-col {
      > label,
      > span {
        display: inline-block;
      }
      > label {
        width: 130px;
        text-align: right;
        color: #999999;
      }
      > span {
        width: calc(100% - 130px);
      }
    }
  }

  //操作用户信息
  .userInfo-body {
    table {
      width: 100%;
      td,
      th {
        text-align: center;
        width: 12.5%;
      }
      th {
        //background-color: rgb(226,241,255);
        height: 32px;
        background-color: #e8e8e8;
      }
      p {
        cursor: default;
      }
    }
  }
  //相关附件资料
  .attach-body {
    .attach-bar {
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      li {
        float: left;
        color: gray;
        cursor: pointer;
        margin-left: 30px;
      }
      .check {
        color: #1199c4; //#409eff
      }
    }
    .attach-box {
      margin: 10px 20px;
      padding-top: 8px;
      border-radius: 10px;
      border: 1px solid gainsboro;
      text-align: center;
      //标题
      .attach-box-bar {
        table {
          width: 100%;
          table-layout: fixed;
          td {
            //text-align: center;
          }
          label {
            color: gray;
          }
        }
      }
      //图片承载区
      .attach-box-img {
        height: 400px;
        width: 100%;
        margin: 15px 0;
        overflow: hidden;

        //background-color: #8cc5ff;
        position: relative;
        .file-container {
          width: 713px;
          background: #f7f7f7;
          height: 100%;
          margin: 0 auto;
          .img-opt-block {
            display: flex;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10;
            position: absolute;
            width: inherit;
            bottom: 0px;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            padding-right: 20px;
            .item-title {
              flex: 0 0 20%;
              text-align: left;
              color: #ffffff;
            }
            .item-img {
              flex: 0 0 80%;
              text-align: right;
              img {
                vertical-align: middle;
                cursor: pointer;
              }
              img + img {
                margin-left: 10px;
              }
            }
          }
        }
        img {
          box-shadow: 2px 2px 12px #7b7f8480;
        }
        img,
        #pdfCanvasItem {
          position: absolute;
          left: 50%;
          top: 50%;
          max-height: 380px;
          //transform: translate(-50%,-50%);
          //width: 100%;
          width: 600px;
        }
        .previous,
        .next {
          display: block;
          width: 30px;
          height: 30px;
          font-size: 24px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          z-index: 9;
        }
        .previous {
          left: 20%;
        }
        .next {
          right: 20%;
        }
        .previous:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  //注册初审审批信息
  .spxx {
  }
}
</style>
<style lang="less">
#newApplyAudit {
  .sqxx,
  .spxx {
    background: white;
  }
  .zjcoll {
    .el-collapse-item__header {
      padding-left: 1em;
    }
  }
  .el-collapse-item__wrap {
    padding-left: 0;
    padding-right: 0;
  }
  .history {
    //步骤条
    .el-steps {
      margin-left: 20px;
      .el-step__head {
        width: 14px;
        //竖线
        .el-step__line {
          left: 5px;
          transform: translateY(6px);
          border-color: #999999;
        }
        //小圆圈
        .el-step__icon {
          width: 12px;
          height: 12px;
          transform: translateY(2px);
          opacity: 0;
          border-color: #999999;
          background: #999999;
          .el-step__icon-inner {
            display: none;
          }
        }
      }
      .el-step__main {
        .history-content {
          font-size: 12px;
          color: #999999;
          //最后一项
          &.last {
            color: #333333;
          }
          label,
          span,
          i,
          b {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            margin-right: 8px;
          }
        }
      }
      //最后一项
      .is-flex {
        .el-step__icon {
          opacity: 1;
        }
      }
    }
  }

  .el-collapse-item__wrap {
    overflow: inherit;
  }
  //供应商类型
  .s130 {
    label {
      display: inline-block;
      width: 60px !important;
    }
    span {
      display: inline-block;
      width: calc(100% - 60px) !important;
    }
  }

  //隶属企业
  .el-icon-circle-close {
    transform: translateY(0px);
  }
  //间接供应商表格
  .supplierType-item {
    .zj-table {
      width: 50%;
    }
  }
}
</style>
<style lang="less">
#newApplyAudit {
  .sqxx,
  .spxx {
    padding-bottom: 60px;
  }
  //工作流
  &.registerAuditApply {
    #ZjWorkflow {
      ul {
        width: 210px;
      }
      .right {
        text-align: center;
        width: calc(100% - 210px);
      }
    }
  }
  &.registerAuditProtocol {
    #ZjWorkflow {
      .right {
        text-align: center;
        width: 100%;
      }
    }
  }
}
</style>
