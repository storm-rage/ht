<template>
  <div class="agreement-content">
    <div class="protocol-box" :class="[ isOnlyAgreement ? 'protocol-width' : '']">
      <!-- 标题 -->
      <div class="protocol-box-header" v-if="isMultipleEnt">
        <div class="number" v-if="!isOnlyAgreement">②</div>
        <div class="content">签署用户服务协议</div>
      </div>
      <!-- 身体 -->
      <div class="protocol-box-body" v-if="isMultipleEnt">
        <img src="~@assets/img/faceRecognition/protocol.png"/>
      </div>

      <!-- 签署协议 -->
      <div v-if="!isMultipleEnt" class="ratify-accord">
        <div class="ent-list">
          <div class="company" v-for="(item,index) in protocolList"
               :key="index"
               @click="handleEntSelect(item)"
               :class="currentAgree.coreEntName === item.coreEntName || currentAgree.entName === item.entName ? 'ent-check' : ''"
          >
            {{item.coreEntName || item.entName}}
          </div>
        </div>
        <p class="hint">
          {{ agreeType === 'YH_TWO' ? '您仅剩一步即可完成账户激活，请阅读并签署如下用户服务协议：'
          : agreeType === 'YH_THREE' ? '请阅读并签署如下用户服务协议：'
            : '请阅读并签署如下用户服务协议'
          }}
        </p>
        <div v-if="currentAgree" class="protocol-content">
          <div style="overflow-y: scroll;border: 1px solid #999999;height: 400px" class="zj-m-b-15 ">
            <div v-show="currentAgree.type === 'html'">
              <div style="margin: 20px 30px" v-html="currentAgree.agreementContent"/>
            </div>
            <div v-show="currentAgree.type === 'flow'">
              <div class="zj-m-b-10 pdf-img">
                <div id="pdfCanvasItem" class="pdf-canvas-item" v-show="currentAgree.viewType==='pdf'" />
              </div>
            </div>
          </div>
          <div class="btn-sign">
            <zj-button type="primary" @click="signUserProtocol">同意并签署</zj-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="handleCertuficateDone"/>
  </div>
</template>
<script>
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import pdfjs from 'vue-pdfjs-update'
pdfjs.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

export default {
  props: {
    isOnlyAgreement: Boolean,
    // 企业ID,请求协议
    entId:String,
    // 是否使用云证书
    isUseYunCert: {
      type: Boolean,
      default: true
    }
  },
  created() {
    // this.agreeActive = []
    this.getAgreement();
  },
  data() {
    return {
      zjControl:{
        downloadPdf: this.$api.baseCommon.downloadPdf,//下载协议
        queryUserProtocol:this.$api.login.queryUserProtocol,//协议查询
        signUserProtocol:this.$api.login.signUserProtocol//人脸签署
      },
      agreeType: '',
      // 协议列表
      protocolList: [],
      // 当前选中的协议
      currentAgree: {},
      // 是否多企业
      isMultipleEnt: false
    }
  },
  methods: {
    getAgreement() {
      this.zjControl.queryUserProtocol({entId: this.entId}).then(res=>{
        this.$emit('setIsSuccess',true);
        this.isMultipleEnt = false //显示下拉列表
        res.data.protocolList.forEach((item) => {
          if(item.agreementContent){
            item.type = 'html'
          }else {
            item.type = 'flow'
            item.viewUrl = ''
            item.viewType = 'pdf'
          }
        })
        //赋予
        this.agreeType = res.data.agreementType
        this.protocolList = res.data.protocolList

        if(this.protocolList.length < 1){
          return this.$messageBox({
            type:'info',
            title:`温馨提示`,
            content:`暂无需要签署的协议`,
            confirmText:`进入系统`,
            showCancelButton:false,
            messageResolve:()=>{
              this.$emit('done');
            },
            messageReject:() => {
              this.$emit('done');
            }
          })
        }
        this.handleEntSelect(this.protocolList[0])
      }).catch(() => {
        this.$emit('setIsSuccess',false);
      })
    },
    handleEntSelect(item) {
      this.currentAgree = item;
      // if(this.agreeType === 'YH_THREE'){
      //   this.agreeEntActive = item.coreEntName
      // }else{
      //   this.agreeEntActive = item.entName
      // }
      this.handleAgreeRender()
    },
    // 处理渲染
    handleAgreeRender() {
      if(this.currentAgree.type !== 'flow'){return}
      this.$nextTick(() => {
        document.getElementById(`pdfCanvasItem`).innerHTML = ''
        //进行下载
        let params = {
          fileUrl:this.currentAgree.fileId,
          fileId:this.currentAgree.fileId,
          fileName:this.currentAgree.fileName + '.pdf' ,
        }
        this.zjControl.downloadPdf(params).then(res => {
          let that = this
          let dataInfo = res.data
          let reader = new window.FileReader()
          reader.readAsArrayBuffer(dataInfo)
          reader.onload = function (e) {
            let result = e.target.result
            let contentType = dataInfo.type || 'pdf'
            let blob = new Blob([result], { type: contentType })
            let url = window.URL.createObjectURL(blob)
            that.currentAgree.viewUrl = url
            that.renderPdfs(that.currentAgree)
          }
        })
      })
    },
    // 渲染pdf
    renderPdfs (item) {
      pdfjs.getDocument({
        url: item.viewUrl,
        CMapReaderFactory
      }).promise.then(pdf => {
        this.$nextTick(() => {
          let pdfDoc = pdf
          // 因为不想要分页所以循环生成canvas   ---pdfDoc.numPages
          let canvasList = []
          for (let i = 1; i <= pdfDoc.numPages; i++) {
            // 因为不知道把pdf解析了多少页，所以我们需要循环创建canvas并且一定要不同的id
            let canvas = document.createElement('canvas')
            canvas.id = `pdf${i}`
            let ctx = canvas.getContext('2d')
            // 通过getPage的方法获取到每一页的内容渲染，结束后把当前创建的canvas添加到页面中
            pdfDoc.getPage(i).then((page) => {
              let viewport = page.getViewport(1)
              let desiredWidth = '778'
              let scale = desiredWidth / viewport.width
              let scaledViewport = page.getViewport(scale)
              canvas.height = scaledViewport.height
              canvas.width = scaledViewport.width
              // 进行文件读取加载
              let renderContext = { canvasContext: ctx, viewport: scaledViewport, }
              page.render(renderContext)
              canvasList.push(canvas)
              if(canvasList.length === pdfDoc.numPages){
                for(let key=1; key<=canvasList.length;key++){
                  document.getElementById(`pdfCanvasItem`).appendChild(canvasList.find(citem => citem.id === `pdf${key}`))
                }
              }
            })
          }
        })
      })
    },
    // 去签协议
    signUserProtocol() {
      if (this.isUseYunCert) {
        // 调用云证书
        this.$refs.certuficate.open()
      }else {
        this.handleCertuficateDone();
      }
    },
    //云证书返回
    handleCertuficateDone(){
      this.zjControl.signUserProtocol(this.currentAgree).then(() => {
        this.$messageBox({
          type:'success',
          title:`${this.protocolList.length-1 > 0 ? '签署成功' : '签署成功'}`,
          content:`${this.protocolList.length-1 > 0 ? '恭喜您！签署成功！' : '恭喜您！签署成功！'}`,
          confirmText:`${this.protocolList.length-1 > 0 ? '完成' : '完成'}`,
          showCancelButton:false,
          messageResolve:()=>{
            if(this.protocolList.length-1 > 0){
              this.getAgreement()
            }else{
              this.$emit('done');
            }
          },
          messageReject:() => {
            if(this.protocolList.length-1 > 0){
              this.getAgreement()
            }else{
              this.$emit('done');
            }
          }
        })
      })
    }
  }
};
</script>
<style lang="less" scoped>
.agreement-content {
  //协议图片
  .protocol-box{
    vertical-align: top;
    display: inline-block;
    width: 40%;
    &.protocol-width{
      width: 100%;
    }
    //标题
    .protocol-box-header{
      .number{
        display: inline-block;
        font-size: 22px;
        vertical-align: top;
        color: #d0d0d0;
      }
      .content{
        display: inline-block;
        padding: 7px 0 0 5px;
        text-align: left;
        color: #d0d0d0;
        /*font-weight: bold;*/
      }
    }
    //身体
    .protocol-box-body{
      img{
        width: 120px; //100
        padding: 25px 0 0 20px;
        height: 130px;//105px
      }
    }
    //签署协议
    .ratify-accord{
      .ent-list{
        text-align: left;
        .company{
          display: inline-block;
          cursor: pointer;
          height: 29px;
          font-weight: bold;
          font-size: 14px;
          line-height: 32px;
          text-indent: 29px;
          margin-right: 55px;
          background: url("~@assets/img/faceRecognition/ent.png") left center no-repeat;
          &.entCheck{
            color: #5494f2;
            background: url("~@assets/img/faceRecognition/entO.png") left center no-repeat;
          }
        }
      }
      .hint{ //提示
        text-align: left;
        padding: 8px 0 5px;
        font-size: 12px;
      }
      .protocol-content{ //协议框
        .pdf-img{
          position: relative;
          padding-bottom: 30px;
          .pdf-canvas-item{
            height: 400px;
          }
          .fot-btn-row{
            position: absolute;
            height: 30px;
            border-bottom: 0;
          }
        }
        .btn-sign{
          text-align: center;
          button{
            width: 125px;
          }
        }
      }
    }
  }
}
</style>
