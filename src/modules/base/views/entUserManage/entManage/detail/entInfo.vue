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
          <controller ref="controller" :detailData="detailData" v-if="$route.name !== 'registerAuditApplyAudit'" />
          <!-- 天眼查信息 -->
          <zj-collapse title="天眼查信息" v-if="$route.name === 'registerAuditApplyAudit'">
            <zj-button type="text" @click="activeEyeSky = !activeEyeSky" ref="EyeSkyBtn">{{ activeEyeSky ? "收起" : "展开" }}</zj-button>
            <zj-button @click="getEyeSky">一键获取天眼查信息</zj-button>

            <zj-eye-sky :mountKey="true" ref="eyesky" :show="activeEyeSky" :entId="row.id" @eyeSkyChange="eyeSkyChange" />
          </zj-collapse>
        </zj-content>
      </zj-content-block>

      <zj-content-block>
        <zj-header title="操作用户信息" />
        <zj-content>
          <zj-table :pager="false" :dataList="detailData.entUserList">
            <zj-table-column field="roleId" title="操作员类型" :formatter="(obj)=>typeMap(dictionary.sysRoleList, obj.cellValue)" />
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
        <zj-header title="相关资料附件" />
        <div class="attach-body">
          <ul class="attach-bar">
            <li v-for="(item, index) in infoBar" :key="index" @click="infoBarChange(index)" :class="infoBarActive === index ? 'check' : ''">
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
                    <span>{{ date(infoItem.fourValue) }}至{{
                        date(infoItem.fiveValue)
                      }}</span>
                  </td>
                </tr>
              </table>
            </el-row>
            <div class="attach-box-img">
              <i class="el-icon-arrow-left previous" @click="prevnext('-')" />
              <div class="file-container">
                <img :src="viewItemUrl" :style="{
                    transform: 'translate(-50%,-50%) rotate(' + imgRoPx + ')',
                  }" v-if="viewItemType === 'image'" />
                <div id="pdfCanvasItem" :style="{
                    transform: 'translate(-50%,-50%) rotate(' + imgRoPx + ')',
                  }" v-if="viewItemType === 'pdf'" />
                <div class="img-opt-block">
                  <div class="item-title">
                    {{ infoBar[infoBarActive] }}
                  </div>
                  <div class="item-img">
                    <img src="~@assets/img/button/rota.png" style="
                        position: inherit;
                        left: inherit;
                        top: inherit;
                        width: auto;
                        height: auto;
                      " @click="rota" />
                    <img src="~@assets/img/button/down2.png" style="
                        position: inherit;
                        left: inherit;
                        top: inherit;
                        width: auto;
                        height: auto;
                      " @click="dolon" />
                    <img src="~@assets/img/button/zoom.png" style="
                        position: inherit;
                        left: inherit;
                        top: inherit;
                        width: auto;
                        height: auto;
                      " @click="previewFile(infoViewitem)" />
                  </div>
                </div>
              </div>
              <i class="el-icon-arrow-right next" @click="prevnext('+')" />
            </div>
          </div>
        </div>
      </zj-content-block>

      <zj-content-block>
        <zj-header title="企业其他信息" />
        <zj-content>
          <zj-collapse title="开票信息">
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业名称："><span>{{ detailData.name | value }}</span>
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
                  <span>{{ detailData.invoicePhone | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行："><span>{{ detailData.invoiceBankInfo | value }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号：">
                  <span>{{
                  detailData.invoiceBankAccno | value
                }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址："><span>{{ detailData.invoiceAddress | value }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </zj-content>
        <zj-content>
          <zj-collapse title="其他信息">
            <el-row>
              <el-col :span="8">
                <el-form-item label="注册渠道：">
                  <span>{{
                  detailData.registerWebsite | value
                }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="买方企业：">
                  <span>{{ detailData.myBuyers | value }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </zj-content>
      </zj-content-block>
    </el-form>
  </zj-content-block>
</template>

<script>
import legalPerson from "../components/legalPerson";
import entLinkman from "../components/entLinkman";
import bankAccount from "../components/bankAccount";
import controller from "../components/controller";
import pdfjs from "vue-pdfjs-update";
import CMapReaderFactory from "vue-pdf/src/CMapReaderFactory";
export default {
  components: {
    legalPerson,
    entLinkman,
    bankAccount,
    controller,
  },
  data() {
    return {
      zjControl: {
        downloadFile: this.$api.registerAudit.downloadFile,
        downloadFlow: this.$api.registerAudit.downloadFlow
      },
      detailData: {},
      dictionary: {},
      dataList: [],
      sysEntRegLogList: [],
      //相关附件资料
      infoBar: [], //导航栏
      infoList: [], //集合
      infoItem: {},//显示内容
      infoBarActive: 0, //导航栏选中
      infoViewList: [], //图片集合
      infoViewitem: {},//图片显示
      viewItemUrl: '',
      imgRotate: 0,//旋转
      imgRoPx: '0deg',
      viewItemType: 'image',
      currentPage: 1,
      pageTotal: 0,

      //天眼查
      nameSuccess: true,//企业名称
      bizLicenceSuccess: true,//信用代码
      legalPersonNameSuccess: true,//法定代表人姓名
      pcaSuccess: true,//企业注册地址
      activeEyeSky: false,//天眼查打开控制
      eyeSkyId: '',//天眼查企业id
      usedViewer: true, // 采用图片查看器
    };
  },
  created() {
    this.getRow()
  },
  watch: {
    detailData() {
      this.initAttchInfo()
    }
  },
  methods: {
    //一键获取天眼查信息
    getEyeSky() {
      this.activeEyeSky = true
      this.$refs.eyesky.resetIsOne()
      this.$refs.eyesky.getTycList()
    },
    //重新获取天眼查信息
    eyeSkyChange(res) {
      if (res && res.modelName === 'basicInfo') {
        //报红检测
        if (res.data) {
          this.nameSuccess = true
          this.bizLicenceSuccess = this.detailData.bizLicence === res.data.creditCode
          this.legalPersonNameSuccess = this.detailData.legalPersonName === res.data.legalPersonName
          // let newPac = this.detailData.provinceZh+'  '+this.detailData.cityZh+'  '+this.detailData.address
          let newPac = this.detailData.address
          let tycPac = res.data.legalPersonName + ''
          this.pcaSuccess = newPac.trim() === tycPac.trim()
        } else {
          this.nameSuccess = false
          this.bizLicenceSuccess = true
          this.legalPersonNameSuccess = true
          this.pcaSuccess = true
        }
      }
    },


    //相关附件资料------------------------------------------------------
    //相关附件资料初始化
    initAttchInfo() {
      console.log(this.detailData)
      this.infoBar = ['营业执照', '法定代表人身份证', '操作用户经办员', '操作用户复核员', '风险信息接收人', '委托授权书']
      let jb = this.detailData.entUserList.find(item => item.roleId == '5') || {}
      let fh = this.detailData.entUserList.find(item => item.roleId == '6') || {}
      let fx = this.detailData.entUserList.find(item => item.roleId == '7') || {}
      this.infoList = [
        {
          oneLabel: '统一社会信用代码：', oneValue: this.detailData.bizLicence,
          twoLabel: '工商有效期：', twoValue: this.date(this.detailData.registerEndDate),
          threeLabel: '注册资本：', threeValue: this.detailData.registerCapital,
        },
        {
          oneLabel: '法定代表人姓名：', oneValue: this.detailData.legalPersonName,
          twoLabel: '证件类型：', twoValue: this.detailData.legalCertType,
          threeLabel: '证件号码：', threeValue: this.detailData.legalCertNo,
          fourLabel: '证件有效期：', fourValue: this.date(this.detailData.legalCertRegDate),
          fiveValue: this.date(this.detailData.legalCertExpireDate)
        },
        {
          oneLabel: '经办员姓名:', oneValue: jb.userName,
          twoLabel: '经办员身份证号码：', twoValue: jb.certNo,
          threeLabel: '证件有效期：', threeValue: this.date(jb.certStartDate), fiveValue: this.date(jb.certEndDate)
        },
        {
          oneLabel: '操作用户复核员：', oneValue: fh.userName,
          twoLabel: '证件号码：', twoValue: fh.certNo,
          threeLabel: '证件有效期：', threeValue: this.date(fh.certStartDate), fiveValue: this.date(fh.certEndDate)
        },
        {
          oneLabel: '风险信息接收人：', oneValue: fx.userName,
          twoLabel: '证件号码：', twoLabel: fx.certNo,
          threeLabel: '证件有效期：', threeValue: this.date(fx.certStartDate), fiveValue: this.date(fx.certEndDate)
        },
      ]
      //是否开通天眼查
      // if (this.detailData.isOpenTyc === '1') {
      //   // threeLabel:'天眼查核准日期',threeValue:''
      //   this.infoList[0].threeLabel = '天眼查核准日期：'
      //   if (this.detailData.approvedTime) {
      //     this.infoList[0].threeValue = this.tycDates(this.detailData.approvedTime)
      //   } else {
      //     this.infoList[0].threeValue = '--'
      //   }

      // }
      this.infoViewList = [
        { fileId: this.detailData.qyyzFileId, fileName: this.detailData.qyyzAttachName },
        { fileId: this.detailData.qyfrzjFileId, fileName: this.detailData.qyfrzjAttachName },
        { fileId: jb.fileId, fileName: jb.attachName },
        { fileId: fh.fileId, fileName: fh.attachName },
        { fileId: fx.fileId, fileName: fx.attachName },
      ]
      this.infoBarChange(0)
    },
    //导航栏
    infoBarChange(index) {
      this.infoItem = this.infoList[index]
      this.infoBarActive = index
      //查看
      this.infoViewitem = this.infoViewList[index]
      if (!this.infoViewitem.fileId) {
        return
      }
      //判断类型
      if (this.isImg(this.infoViewitem.fileName) || this.isImg(this.infoViewitem.attachName)) {
        this.viewItemType = 'image'
      } else if (this.checkPdf(this.infoViewitem.fileName) || this.checkPdf(this.infoViewitem.attachName)) {
        this.viewItemType = 'pdf'
      }

      let params = {
        fileId: this.infoViewitem.fileId,
        fileName: this.infoViewitem.fileName
      }
      this.zjControl.downloadFlow(params).then(res => {
        let that = this
        let dataInfo = res.data
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(dataInfo)
        reader.onload = function (e) {
          let result = e.target.result
          let contentType = dataInfo.type
          let blob = new Blob([result], { type: contentType })
          let url = window.URL.createObjectURL(blob)
          that.viewItemUrl = url

          //调用pdf渲染
          if (that.viewItemType === 'pdf') {
            that.renderPdfs()
          }

          that.imgRotate = 0
          that.imgRoPx = that.imgRotate + 'deg'
        }
      })

    },
    //判断是否是pdf
    checkPdf(fileName) {
      return /^\.pdf$/i.test(this.extension(fileName))
    },
    //判断是否是img
    isImg(fileName) {
      return /^\.(jpg|jpeg|png|gif|svg|bmp)$/i.test(this.extension(fileName))
    },
    extension(fileName) {
      if (typeof fileName !== 'string') {
        fileName = String(fileName || '')
      }
      return ((fileName.match(/\.[^\\./]+$/ig) || '')[0] || '').toLowerCase()
    },
    //内容
    prevnext(tag) {
      if (tag === '-') {
        this.infoBarActive -= 1
      }
      else if (tag === '+') {
        this.infoBarActive += 1
      }
      if (this.infoBarActive < 0) {
        this.infoBarActive = this.infoBar.length - 1
      } else if (this.infoBarActive > this.infoBar.length - 1) {
        this.infoBarActive = 0
      }
      this.infoBarChange(this.infoBarActive)
    },
    //下载
    dolon() {
      this.zjControl.downloadFile(this.infoViewitem)
    },
    //旋转
    rota() {
      this.imgRotate >= 360 ? this.imgRotate = 90 : this.imgRotate += 90
      this.imgRoPx = this.imgRotate + 'deg'
    },
    // 渲染pdf
    renderPdfs(id, scaleView) {
      this.getPdfs(pdf => {
        console.error('12353')
        let pdfDoc = pdf
        // 因为不想要分页所以循环生成canvas   ---pdfDoc.numPages
        for (let i = 1; i <= 1; i++) {
          // 因为不知道把pdf解析了多少页，所以我们需要循环创建canvas并且一定要不同的id
          let canvas = document.createElement('canvas')
          document.getElementById('pdfCanvasItem').innerHTML = ''
          canvas.id = id
          let ctx = canvas.getContext('2d')
          // 通过getPage的方法获取到每一页的内容渲染，结束后把当前创建的canvas添加到页面中
          pdfDoc.getPage(i).then((page) => {
            let viewport = page.getViewport(1)
            let desiredWidth = 600
            let scale = desiredWidth / viewport.width
            let scaledViewport = page.getViewport(scale)
            if (scaleView) {
              scaledViewport = page.getViewport(scaleView)
            }
            canvas.width = scaledViewport.width
            canvas.height = scaledViewport.height

            // 进行文件读取加载
            let renderContext = { canvasContext: ctx, viewport: scaledViewport, }
            page.render(renderContext)
            document.getElementById('pdfCanvasItem').appendChild(canvas)
          })
        }
      })
    },
    // 获取pdf对象
    getPdfs(cb) {
      if (this.viewItemUrl) {
        // url直接获取
        pdfjs.getDocument({ url: this.viewItemUrl, CMapReaderFactory }).promise.then(pdf => {
          this.$nextTick(() => {
            cb(pdf)
          })
        }).catch((err) => {
          this.viewItemType = ''
        })
      }
    },
  }
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
