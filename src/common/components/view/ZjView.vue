<template>
  <el-dialog :visible="visible" fullscreen @close="close" @opened="initView" class="zj-view-dialog">
    <div class="view-body" ref="viewBody">
      <label style="position: fixed;top: 1px;left:50%;z-index: 9999999;">123132{{isScroll}}</label>
      <!-- 图片 -->
      <canvas v-if="fileType === 'img'" id="imgCanvas" ref="imgCanvas"/>
      <!-- pdf -->
      <canvas v-if="fileType === 'pdf'" id="pdfCanvas" ref="pdfCanvas"/>


      <!-- 操作 -->
      <div class="view-imgpdf-row" :class="isScroll ? 'xScroll' : ''">
        <div class="view-operate">
          <el-tooltip content="放大">
            <zj-button icon="fa fa-plus" @click="plus"></zj-button>
          </el-tooltip>
          <el-tooltip content="缩小">
            <zj-button icon="fa fa fa-minus" @click="minus"></zj-button>
          </el-tooltip>
          <el-tooltip content="重置">
            <zj-button icon="fa fa-refresh" @click="refresh"></zj-button>
          </el-tooltip>
          <el-tooltip content="逆时针旋转">
            <zj-button icon="fa fa-rotate-left" @click="rotateLeft"></zj-button>
          </el-tooltip>
          <el-tooltip content="顺时针旋转">
            <zj-button icon="fa fa-rotate-right" @click="rotateRight"></zj-button>
          </el-tooltip>
          <el-tooltip content="下载" v-show="downKey">
            <zj-button icon="el-icon-download" @click="download"></zj-button>
          </el-tooltip>
        </div>
        <!-- pdf分页 -->
        <el-pagination
                class="view-pagination"
                v-if="fileType === 'pdf' && pageTotal > 1"
                :currentPage.sync="currentPage"
                :pageSize="1"
                layout="prev, pager, next, jumper"
                :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import pdfjs from 'vue-pdfjs-update'
import download from "@utils/download";
export default {
  name: 'ZjView',
  props: {
    // dialog显示
    visible: Boolean,
    // 是否允许下载
    downKey:{
      type:Boolean,
      default:true
    },
    // 文件名称---下载时
    fileName: String,
    // 文件路径---下载时
    filePath: String,
    // url--查看的地址
    url: [Object, Blob, String],
    // url为空时通过api获取
    api: Function,
    // api自定义参数 为空时默认取 { fileName, filePath }
    param: Object
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
      imgWidth:0
    }
  },
  mounted() {
    let _this = this
    window.onresize = () => {
      _this.getWebCanvasWidth()
    }
  },
  methods: {
    //监听窗口、dom变化
    getWebCanvasWidth(){
      if (!document.body){return}
      this.bodyWidth = document.body.clientWidth
      if(this.$refs.pdfCanvas){
        this.pdfWidth = this.$refs.pdfCanvas.clientWidth + 200
      }
      else if(this.$refs.imgCanvas){
        this.imgWidth = this.$refs.imgCanvas.clientWidth
      }
    },
    // 关闭
    close () {
      this.$emit('update:visible', false)
      //以防万一，多发送一个关闭事件
      this.$emit('close')
      this.scale = 100
      this.rotate = 0
      this.apiUrl = ''
      this.currentPage = 1
      this.pageTotal = 0
      if (this.fileType == 'img') {
        // 清除图片 canvas
        let imgCanvas = document.getElementById('imgCanvas')
        let imgContext = imgCanvas.getContext('2d')
        imgContext.clearRect(0,0, imgCanvas.width, imgCanvas.height)
      } else {
        // 清除pdf canvas
        let pdfCanvas = document.getElementById('pdfCanvas')
        let pdfContext = pdfCanvas.getContext('2d')
        pdfContext.clearRect(0,0, pdfCanvas.width, pdfCanvas.height)
      }
    },
    // 放大
    plus () {
      this.scale < 190 ? this.scale += 30 : this.scale = 190
      this.getWebCanvasWidth() //调用宽度计算
    },
    // 缩小
    minus () {
      this.scale > 10 ? this.scale -= 30 : this.scale = 10
      this.getWebCanvasWidth() //调用宽度计算
    },
    // 重置
    refresh () {
      this.scale = 100
      this.rotate = 0
      this.getWebCanvasWidth() //调用宽度计算
    },
    // 逆时针旋转
    rotateLeft () {
      this.rotate >= 90 ? this.rotate -= 90 : this.rotate = 270
    },
    // 顺时针旋转
    rotateRight () {
      this.rotate <= 180 ? this.rotate += 90 : this.rotate = 0
    },
    //下载
    download,
    downloadFile(){
      let downFile = {
        fileName:this.fileName,
        fileUrl:this.filePath
      }
      this.download(
              '/common/download-file',
              downFile,
              1,
              'post'
      )
    },
    // 初始化view
    initView () {
      this.fileType === 'img' ? this.renderImg() : this.renderPdf()
    },
    // 渲染图片
    renderImg () {
      this.getImg(img => {
        // 获取canvas
        let imgCanvas = document.getElementById('imgCanvas')
        let imgContext = imgCanvas.getContext('2d')
        if (!this.visible) {
          imgContext.clearRect(0,0, imgCanvas.width, imgCanvas.height)
        }
        // 防止高清屏图片变模糊
        let devicePixelRatio = window.devicePixelRatio || 1
        let webkitBackingStorePixelRatio = imgContext.webkitBackingStorePixelRatio ||
                imgContext.mozBackingStorePixelRatio ||
                imgContext.msBackingStorePixelRatio ||
                imgContext.oBackingStorePixelRatio ||
                imgContext.backingStorePixelRatio || 1
        let ratio = devicePixelRatio / webkitBackingStorePixelRatio
        // 获取图片真实宽和高
        let width = img.width * ratio * this.scale / 100
        let height = img.height * ratio * this.scale / 100
        // 计算旋转角度
        if (this.rotate == 90) {
          // 90度
          imgCanvas.width = height
          imgCanvas.height = width
          imgContext.rotate(this.rotate * Math.PI / 180)
          imgContext.translate(0, -1 * height)
        } else if (this.rotate == 180) {
          // 180度
          imgCanvas.width = width
          imgCanvas.height = height
          imgContext.rotate(this.rotate * Math.PI / 180)
          imgContext.translate(-1 * width, -1 * height)
        } else if (this.rotate == 270) {
          // 270度
          imgCanvas.width = height
          imgCanvas.height = width
          imgContext.rotate(this.rotate * Math.PI / 180)
          imgContext.translate(-1 * width, 0)
        } else {
          // 0度
          imgCanvas.width = width
          imgCanvas.height = height
          imgContext.rotate(this.rotate * Math.PI / 180)
          imgContext.translate(0, 0)
        }
        imgContext.drawImage(img, 0, 0, width, height)
      })
    },
    // 获取图片对象
    getImg (cb) {
      let img = new Image()
      img.onload = function () {
        cb(img)
      }
      if (this.url) {
        // url直接获取
        img.src = this.url
      } else if (this.apiUrl) {
        // url已通过api获取
        img.src = this.apiUrl
      } else {
        // 通过api获取url
        this.api(this.param ? this.param : { fileName: this.fileName, filePath: this.filePath }, 2).then(url => {
          this.apiUrl = url
          img.src = this.apiUrl
        })
      }
    },
    // 渲染pdf
    renderPdf () {
      this.getPdf(pdf => {
        this.pageTotal = pdf.numPages
        pdf.getPage(this.currentPage).then(page => {
          // 获取canvas
          let pdfCanvas = document.getElementById('pdfCanvas')
          let pdfContext = pdfCanvas.getContext('2d')
          if (!this.visible) {
            pdfContext.clearRect(0,0, pdfCanvas.width, pdfCanvas.height)
          }
          // 防止高清屏pdf变模糊
          let devicePixelRatio = window.devicePixelRatio || 1
          let webkitBackingStorePixelRatio = pdfContext.webkitBackingStorePixelRatio ||
                  pdfContext.mozBackingStorePixelRatio ||
                  pdfContext.msBackingStorePixelRatio ||
                  pdfContext.oBackingStorePixelRatio ||
                  pdfContext.backingStorePixelRatio || 1
          let ratio = devicePixelRatio / webkitBackingStorePixelRatio
          // 获取pdf真实宽和高
          let viewport = page.getViewport(this.scale / 100 * 1.5)
          let width = viewport.width * ratio
          let height = viewport.height * ratio
          // 计算旋转角度
          if (this.rotate == 90) {
            // 90度
            pdfCanvas.width = height
            pdfCanvas.height = width
            pdfContext.rotate(this.rotate * Math.PI / 180)
            pdfContext.translate(0, -1 * height)
          } else if (this.rotate == 180) {
            // 180度
            pdfCanvas.width = width
            pdfCanvas.height = height
            pdfContext.rotate(this.rotate * Math.PI / 180)
            pdfContext.translate(-1 * width, -1 * height)
          } else if (this.rotate == 270) {
            // 270度
            pdfCanvas.width = height
            pdfCanvas.height = width
            pdfContext.rotate(this.rotate * Math.PI / 180)
            pdfContext.translate(-1 * width, 0)
          } else {
            // 0度
            pdfCanvas.width = width
            pdfCanvas.height = height
            pdfContext.rotate(this.rotate * Math.PI / 180)
            pdfContext.translate(0, 0)
          }
          page.render({
            canvasContext: pdfContext,
            viewport: viewport
          })
        })
      })
    },
    // 获取pdf对象
    getPdf (cb) {
      if (this.url) {
        // url直接获取
        pdfjs.getDocument({ url: this.url, CMapReaderFactory }).promise.then(pdf => {
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
  },
  computed: {
    // 文件类型
    fileType () {
      if (/\.pdf$/i.test(this.filePath)) {
        return 'pdf'
      } else if (/\.(jpg|jpeg|png|gif|svg|bmp)$/i.test(this.filePath)) {
        return 'img'
      }
      return ''
    },
    // 文件参数
    transform () {
      return { rotate: this.rotate, scale: this.scale }
    },
    isScroll () {
      return this.imgWidth > this.bodyWidth || this.pdfWidth > this.bodyWidth
    }
  },
  watch: {
    // 文件参数
    transform: {
      handler: function () {
        this.fileType === 'img' ? this.renderImg() : this.renderPdf()
      },
      deep: true
    },
    // pdf页码改变
    currentPage () {
      if (this.fileType === 'pdf') {
        if (this.rotate === 0 && this.scale === 100) {
          this.renderPdf()
        } else {
          this.refresh()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.view-body {
  position: absolute;
  left: 50px;
  top: 50px;
  bottom: 50px;
  right: 50px;
  text-align: center;
  overflow: auto;
}
/*.view-pagination {*/
/*  position: fixed;*/
/*  bottom: 0;*/
/*}*/
/*.view-operate {*/
/*  position: fixed;*/
/*  bottom: 0;*/
/*  right: 30px;*/
/*}*/
</style>
<style lang="less">
  .vxe-button--icon.el-icon-download{
    font-weight: bold;
  }
  //设置滚动条
  ::-webkit-scrollbar-track{
    z-index: 9999999;
  }
  //设置dialog --- sw的设置
  .zj-view-dialog{
    .el-dialog__close{
      position: fixed;
      right: 30px;
      font-size: 26px;
      border: 2px solid #9F9F9F;
      border-radius: 50%;
      cursor: pointer;
      z-index: 99999;
      &:hover,&:focus{
        border-color: #409EFF;
      }
    }
    .el-dialog__header{
      height: 0;
      padding: 0;
    }
    .el-dialog__body{
      height: 100%;
      padding: 0;
      .view-body{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        //canvas
        canvas{
          margin-bottom: 64px;
        }
        //按钮栏
        .view-imgpdf-row {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          text-align: center;
          &.xScroll{
            bottom: 17px; //浏览器滚动条的x高，y宽
          }
          //img-pdf按钮栏
          .view-operate {
            padding: 4px;
            /*.vxe-button {*/
            /*  border-color: rgba(0, 0, 0, 0);*/
            /*  &:hover {*/
            /*    background-color: #8cc5ff;*/
            /*    color: #008489;*/
            /*  }*/
            /*}*/
            .vxe-button.type--button{
              border-color: #cad9ea;
              background-color: #008489;
              color: #fff;
              &:hover{
                background-color: #EF6666;
                color: #E7E7E7;
                border-color: plum;
              }
            }
          }
          //pdf按钮栏
          .el-pagination {
            //上下按钮
            button {
              background: none;
              color: #FFFBEB;
              &:hover {
                /*color: #8cc5ff;*/
                color: #E7E7E7;
              }
            }

            //中间数字
            li.number {
              background: none;
              color: #FFFBEB;

              &:hover {
                color: red;
              }
            }

            li.active {
              color: #8cc5ff;
            }
            //前往
            .el-pagination__jump {
              color: #fff;
              .el-input {
                padding: 0;
                margin: 0 4px;

                .el-input__inner {
                  height: 24px;
                  width: auto;
                  transform: translateY(-1px);
                  &:focus {
                    color: red;
                    border-color: #8cc5ff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" scoped>

</style>
