<template>
  <zj-content-block>
    <el-form ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <zj-content>
          <!-- 企业信息 -->
          <slot name="entInfo" />

          <!-- 法人信息 -->
          <legal-person ref="legalPerson" :detailData="detailData" />

          <!-- 企业联系人 -->
          <ent-linkman ref="entLinkman" :detailData="detailData" />

          <!-- 银行账户 -->
          <bank-account ref="bankAccount" />

          <!-- 控制人信息 -->
          <controller ref="controller" :detailData="detailData" v-if="$route.name !== 'registerAuditApplyAudit'"/>

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
        </zj-content>
      </zj-content-block>

      <zj-content-block>
        <zj-header title="操作用户信息" />
        <zj-content>
          <zj-table :pager="false" :dataList="detailData.sysEntRegLogList">
            <zj-table-column
              field="roleId"
              title="操作员类型"
              :formatter="
                (obj) => typeMap(dictionary.roleIdList, obj.cellValue)
              "
            />
            <zj-table-column field="userName" title="姓名" />
            <zj-table-column field="certNo" title="身份证号" />
            <zj-table-column title="证件有效期">
              <template v-slot="{ row }">
                {{ date(row.certStartDate)
                }}{{ row.certStartDate && row.certEndDate ? "~" : "" }}
                {{ date(row.certEndDate) }}
              </template>
            </zj-table-column>
            <zj-table-column field="mobileNo" title="手机号码" />
            <zj-table-column field="email" title="邮箱" />
            <zj-table-column field="bankAcctNo" title="银行卡号" />
            <zj-table-column field="htSysCode" title="海天业务系统账号" />
            <zj-table-column field="idCheckState" title="核查方式" />
          </zj-table>
        </zj-content>
      </zj-content-block>

      <zj-content-block>
        <!-- <zj-header title="相关资料附件" />
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
        </div> -->
      </zj-content-block>

      <zj-content-block>
        <zj-header title="企业其他信息" />
        <zj-collapse title="开票信息">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称："
                ><span>{{ detailData.name | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="纳税人识别号：">
                <span>{{ detailData.invoiceTaxpayerId | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱：">
                <span>{{ detailData.invoiceEmail | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话：">
                <span>{{ detailData.invoicePhone | value }}</span></el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行："
                ><span>{{ detailData.invoiceBankInfo | value }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行账号：">
                <span>{{
                  detailData.invoiceBankAccno | value
                }}</span></el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址："
                ><span>{{ detailData.invoiceAddress | value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
        <zj-collapse title="其他信息">
          <el-row>
            <el-col :span="8">
              <el-form-item label="注册渠道：">
                <span>{{
                  detailData.registerWebsite | value
                }}</span></el-form-item
              >
            </el-col>
            <el-col :span="8">
              <el-form-item label="买方企业：">
                <span>{{ detailData.myBuyers | value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </zj-collapse>
      </zj-content-block>
    </el-form>
  </zj-content-block>
</template>

<script>
import legalPerson from "../components/legalPerson";
import entLinkman from "../components/entLinkman";
import bankAccount from "../components/bankAccount";
import controller from "../components/controller";
import entInfo from "./entInfo";
export default {
  components: {
    legalPerson,
    entLinkman,
    bankAccount,
    controller,
  },
  mixins: [entInfo],
  data() {
    return {
      zjControl: {},
      detailData: {},
      dictionary: {},
      dataList: [],
      sysEntRegLogList: [],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
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
</style>
