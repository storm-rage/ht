<template>
  <zj-content-container>
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
                  <span>{{ detailData.name | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请类型：">
                  <span>{{ detailData.bizLicence | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请状态：">
                  <span>
                    {{
                      typeMap(dictionary.entTypeList, detailData.entType)
                    }}</span
                  >
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请时间：">
                  <span> {{ detailData.address }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-content>
        </zj-content-block>
        <!-- 企业基础信息 -->
        <ent-info />
      </zj-content-block>

      <!-- 审批信息 -->
      <zj-content-block class="zjcoll spxx mt-20" v-show="workflow === 'spxx'">
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
                <zj-content-tip
                  class="ml-20"
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
          <el-row v-show="workflow === 'sqxx'" class="btn-w85">
            <zj-button class="back" @click="goParent">返回</zj-button>
          </el-row>
          <el-row v-show="workflow === 'spxx'" class="btn-w85">
            <zj-button class="back" @click="goParent">返回</zj-button>
            <zj-button status="primary" @click="holdSave">暂存</zj-button>
            <zj-button class="pass" @click="auditPass">审核通过</zj-button>
            <zj-button class="retort" @click="auditReject">审核驳回</zj-button>
            <zj-button class="reject" @click="registerRefuse"
              >注册拒绝</zj-button
            >
          </el-row>
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
