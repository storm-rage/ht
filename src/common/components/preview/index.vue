<template>
  <el-dialog
             :visible="visible"
             :title="title"
             :before-close="onClose"
             @opened="initView"
             class="zj-pdf-dialog"
             custom-class="zj-pdf-dialog"
             width="1130px"
             top="5vh"
             :modal="false"
             :lock-scroll="false"
             :close-on-click-modal="false"
             v-dialogDrag
             v-dialogDragWidth
  >

    <div class="dragBox"/>
    <div class="pdf-body">
      <div>
        <slot name="header"></slot>
      </div>

      <!-- 上下页按钮 -->
      <i class="el-icon-arrow-left pageBtn prveVB" v-if="prveVB" @click="viewPrve"/>
      <i class="el-icon-arrow-right pageBtn nextVB" v-if="nextVB" @click="viewNext"/>

      <!-- pdf -->
      <div id="pdfCanvas" v-if="fileType==='pdf'"></div>

      <!-- html -->
      <div id="pdfHtml" ref="pdfHtml" v-html="htmlStr" v-if="fileType==='html'"></div>

      <!-- image -->
      <div id="image" ref="image" class="image-wrap" v-if="fileType==='image'">
        <img :src="fileUrl" alt="">
      </div>

    </div>

    <slot name="footer" v-if="showFooter">
      <div class="footer-btns">
        <el-button
                v-if="!downLoad"
                type="primary"
                @click="sign"
        >
          签署确认
        </el-button>
        <el-button
          v-if="downLoad"
          type="primary"
          @click="downPdf"
        >
          下载
        </el-button>
        <el-button
          @click="onClose"
        >
          取消
        </el-button>
      </div>
    </slot>

  </el-dialog>
</template>

<script>
// import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
// import pdfjs from 'vue-pdfjs-update'

import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import pdfjs from 'vue-pdfjs-update'
pdfjs.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
export default {
  name: 'ZjImage',
  props: {
    // dialog显示
    visible: Boolean,
    // 文件名称---下载时
    fileName: String,
    // 文件路径---下载时
    filePath: String,
    // url--查看的地址
    fileUrl: [Object, Blob, String],
    // url为空时通过api获取
    api: Function,
    // api自定义参数 为空时默认取 { fileName, filePath }
    param: Object,
    title: String,
    showFooter: {
      type: Boolean,
      default: false
    },
    downLoad: {
      type: Boolean,
      default: false
    },
    isPdf: {
      type: Boolean,
      default: true
    },
    fileType: String,
    htmlStr: {
      type: String,
      default: ''
    },
    //新增分页
    prveVB:{
      type:Boolean,
      default:false
    },
    nextVB:{
      type:Boolean,
      default:false
    },

  },
  data () {
    return {
      scale: 100,
      rotate: 0,
      apiUrl: '',
      currentPage: 1,
      pageTotal: 0,
      //判断是否出现X轴滚动条
      bodyWidth:0,
      pdfWidth:0,
      pdfHtmlWidth:0,
      imageWidth: 0
    }
  },
  mounted() {
    window.onresize = () => {
      this.getWebCanvasWidth()
    }
  },
  methods: {
    //抛出分页按钮事件
    viewPrve(){
      this.$emit('viewPrve')
    },
    viewNext(){
      this.$emit('viewNext')
    },
    //监听窗口、dom变化
    getWebCanvasWidth(){
      if (!document.body){return}
      this.bodyWidth = document.body.clientWidth
      if (this.$refs.pdfCanvas) {
        this.pdfWidth = this.$refs.pdfCanvas.clientWidth + 200
      } else if (this.$refs.pdfHtml) {
        this.pdfHtmlWidth = this.$refs.pdfHtml.clientWidth
      } else if (this.$refs.images) {
        this.imageWidth = this.$refs.images.clientWidth
      }
    },
    // 关闭
    onClose () {
      this.scale = 100
      this.rotate = 0
      this.apiUrl = ''
      // 清除pdf canvas
      let pdfCanvas = document.getElementById('pdfCanvas')
      if (pdfCanvas) {
        pdfCanvas.innerHTML = ''
      }

      this.$emit('close')
    },
    // 初始化view
    initView () {
      if (this.fileType === 'pdf') {
        console.error('pdf')
        this.renderPdf()
      } else if (this.fileType === 'html') {
        console.error('html')
      } else if (this.fileType === 'image') {
        console.error('image')
      }
    },
    // 渲染pdf
    renderPdf () {
      // console.error(pdfjs.GlobalWorkerOptions)
      this.getPdf(pdf => {
        let pdfDoc = pdf
        // 因为不想要分页所以循环生成canvas
        let canvasList = []
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          // 因为不知道把pdf解析了多少页，所以我们需要循环创建canvas并且一定要不同的id
          let canvas = document.createElement('canvas')
          canvas.id = `pdf${i}`
          let ctx = canvas.getContext('2d')
          // 通过getPage的方法获取到每一页的内容渲染，结束后把当前创建的canvas添加到页面中
          pdfDoc.getPage(i).then((page) => {
            let viewport = page.getViewport(1)
            let desiredWidth = '1080'
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
                document.getElementById(`pdfCanvas`).appendChild(canvasList.find(citem => citem.id === `pdf${key}`))
              }
            }
            // document.getElementById('pdfCanvas').appendChild(canvas)
          })
        }
      })
    },
    // 获取pdf对象
    getPdf (cb) {
      if (this.fileUrl) {
        // url直接获取
        pdfjs.getDocument({ url: this.fileUrl, CMapReaderFactory }).promise.then(pdf => {
          this.$nextTick(() => {
            cb(pdf)
          })
        })
      } else if (this.apiUrl) {
        // url已通过api获取
        pdfjs.getDocument({ url: this.apiUrl, CMapReaderFactory }).promise.then(pdf => {
          this.$nextTick(() => {
            cb(pdf)
          })
        })
      } else {
        // 通过api获取url
        this.api(this.param ? this.param : { fileName: this.fileName, filePath: this.filePath }, 2).then(url => {
          this.apiUrl = url
          pdfjs.getDocument({ url, CMapReaderFactory }).promise.then(pdf => {
            this.$nextTick(() => {
              cb(pdf)
            })
          })
        })
      }
    },
    sign () { // 签署协议
      this.$emit('sign')
    },
    downPdf () { // 下载pdf
      this.$emit('downPdf')
    }
  },
  computed: {
  },
  watch: {
    fileType(val){
      if(val === 'image'){
        let pdfCanvas = document.getElementById('pdfCanvas')
        if (pdfCanvas) {
          pdfCanvas.innerHTML = ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pdf-body {
  overflow: scroll;
  height: 100%;
  position: relative;
  padding-left: 65px;
  padding-right: 65px;
  position: relative;
  .pageBtn{
    font-size: 35px;
    font-weight: bold;
    border-radius: 50%;
    /*background: #D3B366;*/
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:hover{
      color: #D3B366;
      cursor: pointer;
    }
    &.prveVB{
      left: 10px;
    }
    &.nextVB{
      right: 10px;
    }
  }

}
.image-wrap {
  img {
    width: 100%;
  }
}
.footer-btns {
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #e6e6e6;
  button {
    margin: 0 10px;
  }
}
</style>
<style lang="less">
  .el-dialog__wrapper{
    padding-bottom:10vh;
  }

.zj-pdf-dialog .el-dialog__body{
  overflow: hidden!important;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-top: 0;
  height: 100%;
  overflow: hidden;
  background: white;
  position: relative;
  .dragBox{
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 9px;
    height: 9px;
    /*background: red;*/
    z-index: 99999;
    cursor: se-resize;
  }
}
  .zj-pdf-dialog{
    height: 100%;
  }
</style>
