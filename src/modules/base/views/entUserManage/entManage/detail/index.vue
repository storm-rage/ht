<template>
  <zj-content-container>
    <el-form ref="form" label-width="160px">
      <zj-content-block>
        <zj-header title="企业基础信息" />
        <zj-content>
          <zj-collapse title="企业信息" name="userInfo">
            <div class="info-body">
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
                    <span>{{
                      typeMap(dictionary.entTypeList, detailData.entType)
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业注册地址：">
                    <span>{{ detailData.address }}</span>
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
                  <el-form-item label="企业规模：">
                    <span>{{
                      typeMap(dictionary.scaleList, detailData.scale)
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业经营类型：">
                    <span>{{
                      typeMap(dictionary.scaleList, detailData.scale)
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </zj-collapse>
          <zj-collapse title="法人信息">
            <el-row class="info-body">
              <el-col :span="8">
                <el-form-item label="企业法人姓名：">
                  <span>{{ detailData.legalPersonName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证号码：">
                  <span>{{
                    typeMap(
                      dictionary.userCertTypeList,
                      detailData.legalCertType
                    )
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <span>{{ detailData.legalCertNo | value }}</span>
                <el-form-item label="法人手机手机号："> </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="企业联系人">
            <el-row class="info-body">
              <el-col :span="8">
                <el-form-item label="企业联系人姓名：">
                  <span>{{ detailData.legalPersonName | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业联系人手机号：">
                  <span>{{
                    typeMap(
                      dictionary.userCertTypeList,
                      detailData.legalCertType
                    )
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业联系地址：">
                  <span>{{ detailData.legalCertNo | value }}</span>
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
          <zj-collapse title="控制人信息">
            <el-row>
              <el-col :span="8">
                <el-form-item label="控制人姓名：" prop="field1">
                  546565465
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="控制人身份证号：" prop="field1">
                  4234
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="控制人身份证有效期：" prop="field1">
                  4324
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="天眼查信息">
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
          </zj-collapse>
        </zj-content>
      </zj-content-block>

      <zj-content-block>
        <zj-header title="操作用户信息" />
        <zj-table :pager="false" :dataList="dataList">
          <zj-table-column field="changeTime" title="姓名" />
          <zj-table-column field="changeItem" title="用户名" />
          <zj-table-column field="changeItem" title="证件类型" />
          <zj-table-column field="changeItem" title="证件号码" />
          <zj-table-column field="changeItem" title="邮箱" />
          <zj-table-column field="changeItem" title="手机号" />
        </zj-table>
      </zj-content-block>

      <!-- <zj-content-block>
        <zj-header title="相关资料附件" />
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
      </zj-content-block> -->

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
                ><span>{{ detailData.invoicePhone | value }}</span>
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
  </zj-content-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      zjControl: {},
      detailData: {},
      dictionary: {},
      activeEyeSky:false,//天眼查打开控制
    };
  },
  methods: {
     //一键获取天眼查信息
    getEyeSky(){
      this.activeEyeSky = true
      this.$refs.eyesky.resetIsOne()
      this.$refs.eyesky.getTycList()
    },
  },
};
</script>

<style scoped>
</style>
