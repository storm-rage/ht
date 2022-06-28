<template>
<div>
  <el-dialog :title="titleFlag ? '协议查看' : ''" :visible.sync="agreeDialog" width="1000px" height="500px" class="agree-dialog"
             :close-on-click-modal="false" @close="close"
  >
    <div class="html-content" id="htmlContent" ref="htmlContent" v-if="protocolList.length">
      <div class="zj-f-l">
        <div
          v-for="(item, index) in protocolList"
          class="link-item"
          :class="{'active': protocolIndex===index}"
          :ref="'link'+index"
          :id="'link'+index"
          :key="'link'+index"
          @click="indexClick(index)"
        >
          <a :href="'#'+index" :title="title ? item[title] : item[fileName]">
            {{title ? item[title] : item[fileName]}}
          </a><br>
        </div>
      </div>
      <div class="zj-f-r">
        <div
          v-for="(item, index) in protocolList"
          :key="'content'+index"
          :ref="'content'+index"
          :id="'content'+index"
          :class="[protocolIndex===index ? 'block' : 'none']"
        >
          <a :name="index"/>
          <!-- html -->
          <div v-if="item.fileType === 'html'" v-html="item[html]"></div>
          <!-- img -->
          <div :id="'image'+index" ref="image" class="image-wrap" v-else-if="item.fileType==='image'">
            <img :src="item.fileUrl" alt="">
          </div>
          <!-- pdf -->
          <div :id="'pdfCanvas'+index" class="pdf-warp" v-else-if="item.fileType ==='pdf' "></div>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js';
  import pdfjs from 'vue-pdfjs-update';
  pdfjs.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    export default {
        name: "ZjMultiAgree",
        props:{
          titleFlag:{
            type:Boolean,
            default:true
          },
          suffix:{
            type:String,
            default:''
          },
        },
        data(){
          return {
            agreeDialog:false,
            protocolList:[], // 协议文件列表
            protocolIndex:0, // 协议菜单高亮

            fileName:'protocolName',
            fileId:'',
            html:'htmlStr',
            title:''
          }
        },
        methods:{
          //打开 {list = [],fileName = 'protocolName',html = 'htmlStr',fileId = 'protocolFileId',title = ''}
          open(obj = {}){
            let list = obj.list || []
            let fileName = obj.fileName || 'protocolName'
            let html = obj.html || 'htmlStr'
            let fileId = obj.fileId || 'protocolFileId'
            let title = obj.title || ''

            list.map(item => {
              item.fileType = ''
              item.fileUrl = ''
            })
            this.protocolList = list
            this.fileName = fileName
            this.html = html
            this.fileId = fileId
            this.title = title
            if (list.length) {
              this.agreeDialog = true

              this.indexClick(this.protocolIndex)

              setTimeout(() => {
                this.$refs.htmlContent.addEventListener('scroll', this.handleScroll)
              }, 1000)
            } else {
              this.$message.warning('无协议内容')
            }
          },

          //滑动计算
          handleScroll () {
            let aaH = 0
            this.protocolList.map((item, index) => {
              if (index < this.protocolList.length-1 && index <= this.protocolIndex) {
                aaH += this.$refs['content'+index][0].offsetHeight
                if (this.$refs.htmlContent.scrollTop > aaH) {
                  this.protocolIndex = index+1
                } else {
                  this.protocolIndex = index
                }
              }
            })
          },

          //点击
          indexClick(index){
            this.protocolIndex = index
            //若是没协议文本就是文件流形式
            if(!this.protocolList[index][this.html]){
              this.initView(index)
            }else{
              this.protocolList[index].fileType = 'html'
            }
          },
          //初始化对应视图
          initView(index){
            this.protocolList[index].fileType = '' //文件类型
            let fileName = this.protocolList[index][this.fileName]
            this.getView(index)
          },
          //获取视图
          getView(index){
            let fileName = this.protocolList[index][this.fileName] + this.suffix
            let fileId = this.protocolList[index][this.fileId]
            if (this.isImg(fileName)) {
              this.protocolList[index].fileType = 'image'
            } else if (this.checkPdf(fileName)) {
              this.protocolList[index].fileType = 'pdf'
            }
            //先判断是否已经获取过
            //未获取
            if( !this.protocolList[index].fileUrl ){
              let params = {
                fileUrl:fileId,
                fileId,
                fileName
              }
              this.$api.baseCommon.downloadPdf(params).then(res => {
                let that = this
                let dataInfo = res.data
                let reader = new window.FileReader()
                reader.readAsArrayBuffer(dataInfo)
                reader.onload = function (e) {
                  let result = e.target.result
                  let contentType = dataInfo.type
                  let blob = new Blob([result], { type: contentType })
                  that.protocolList[index].fileUrl = window.URL.createObjectURL(blob)
                  if(that.protocolList[index].fileType === 'pdf'){
                    that.renderPdf(index)
                  }
                }
              }).catch(err => {
                console.log(err)
              })
            }
          },
          // 渲染pdf
          renderPdf (index) {
            this.getPdf(pdf => {
              let pdfDoc = pdf
              // 因为不想要分页所以循环生成canvas
              let canvasList = []
              for (let i = 1; i <= pdfDoc.numPages; i++) {
                // 因为不知道把pdf解析了多少页，所以我们需要循环创建canvas并且一定要不同的id
                let canvas = document.createElement('canvas')
                canvas.id = `${index}pdf${i}`
                let ctx = canvas.getContext('2d')
                // 通过getPage的方法获取到每一页的内容渲染，结束后把当前创建的canvas添加到页面中
                pdfDoc.getPage(i).then((page) => {
                  let viewport = page.getViewport(1)
                  let desiredWidth = '870'
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
                      document.getElementById(`pdfCanvas${index}`).appendChild(canvasList.find(citem => citem.id === `${index}pdf${key}`))
                    }
                  }
                  // document.getElementById('pdfCanvas').appendChild(canvas)
                })
              }
            },index)
          },
          // 获取pdf对象
          getPdf (cb,index) {
            // url直接获取
            pdfjs.getDocument({ url: this.protocolList[index].fileUrl, CMapReaderFactory }).promise.then(pdf => {
              this.$nextTick(() => {
                cb(pdf)
              })
            })
          },


          //关闭
          close(){
            this.protocolIndex = 0
            this.agreeDialog = false
          },

          //工具
          //判断是否是pdf
          checkPdf(fileName){
            return /^\.pdf$/i.test(this.extension(fileName))
          },
          //判断是否是img
          isImg(fileName){
            return /^\.(jpg|jpeg|png|gif|svg|bmp)$/i.test(this.extension(fileName))
          },
          extension (fileName) {
            if (typeof fileName !== 'string') {
              fileName = String(fileName || '')
            }
            return ((fileName.match(/\.[^\\./]+$/ig) || '')[0] || '').toLowerCase()
          },
        }
    }
</script>

<style lang="less">
  .agree-dialog {
    .el-dialog__header{
      text-align: center;
      .el-dialog__title{
        font-size: 20px;
      }
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__headerbtn {
      top: 12px;
      right: 12px;
      font-size: 20px;
    }

    .html-content {
      height: 500px;
      overflow-y: scroll;
      padding: 15px;
      >.zj-f-l {
        width: 100px;
        position: absolute;
        top: 60px;
        .link-item {
          height: 35px;
          line-height: 35px;
          border: 1px solid #e6e6e6;
          font-weight: bold;
          text-align: center;
          &.active {
            background-color: #e0eefd;
          }
          a {
            text-decoration: none;
            display: block;
            color: #61acf8;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100px;
          }
        }
      }
      >.zj-f-r {
        position: absolute;
        left: 120px;
        top: 60px;
        width: calc(100% - 120px);
        height: calc(100% - 60px);
        overflow: auto;
        /*.image-wrap,.pdf-warp{*/
        /*  width: 100%;*/
        /*  height: 100%;*/
        /*  overflow: auto;*/
        /*}*/
      }
    }
  }
</style>
