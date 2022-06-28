<template>
  <div ref="viewBody" style="text-align: center;">
    <!-- 图片 -->
    <canvas v-if="fileType === 'img'" id="imgInlineCanvas" @click="openView" />
    <!-- pdf -->
    <el-pagination
      v-if="fileType === 'pdf' && pageTotal > 1"
      :currentPage.sync="currentPage"
      :pageSize="1"
      layout="prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>
    <canvas v-if="fileType === 'pdf'" id="pdfInlineCanvas" @click="openView" />
    <!-- 查看弹框 -->
    <zj-view :visible.sync="viewVisible" :filePath="viewPath" :url="viewUrl"></zj-view>
  </div>
</template>

<script>
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import pdfjs from 'vue-pdfjs-update'
export default {
  name: 'ZjViewInline',
  props: {
    // 文件名称
    fileName: String,
    // 文件路径
    filePath: String,
    // url
    url: [Object, Blob, String],
    // url为空时通过api获取
    api: Function,
    // api自定义参数 为空时默认取 { fileName, filePath }
    param: Object
  },
  data () {
    return {
      apiUrl: '',
      currentPage: 1,
      pageTotal: 0,
      viewVisible: false,
      viewPath: '',
      viewUrl: ''
    }
  },
  methods: {
    // 打开查看
    openView () {
      this.viewPath = this.filePath
      this.viewUrl = this.url || this.apiUrl
      this.viewVisible = true
    },
    // 渲染图片
    renderImg () {
      this.getImg(img => {
        // 获取canvas
        let imgCanvas = document.getElementById('imgInlineCanvas')
        let imgContext = imgCanvas.getContext('2d')
        // 防止高清屏图片变模糊
        let devicePixelRatio = window.devicePixelRatio || 1
        let webkitBackingStorePixelRatio = imgContext.webkitBackingStorePixelRatio ||
                imgContext.mozBackingStorePixelRatio ||
                imgContext.msBackingStorePixelRatio ||
                imgContext.oBackingStorePixelRatio ||
                imgContext.backingStorePixelRatio || 1
        let ratio = devicePixelRatio / webkitBackingStorePixelRatio
        // 获取图片真实宽和高
        let width = img.width * ratio
        let height = img.height * ratio
        if (width > this.$refs.viewBody.clientWidth) {
          // 超过当前div宽度
          imgCanvas.width = this.$refs.viewBody.clientWidth
          imgCanvas.height = height / width * imgCanvas.width
        } else {
          imgCanvas.width = width
          imgCanvas.height = height
        }
        imgContext.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height)
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
          let pdfCanvas = document.getElementById('pdfInlineCanvas')
          let pdfContext = pdfCanvas.getContext('2d')
          // 防止高清屏pdf变模糊
          let devicePixelRatio = window.devicePixelRatio || 1
          let webkitBackingStorePixelRatio = pdfContext.webkitBackingStorePixelRatio ||
                  pdfContext.mozBackingStorePixelRatio ||
                  pdfContext.msBackingStorePixelRatio ||
                  pdfContext.oBackingStorePixelRatio ||
                  pdfContext.backingStorePixelRatio || 1
          let ratio = devicePixelRatio / webkitBackingStorePixelRatio
          // 获取pdf真实宽和高
          let normalWidth = page.getViewport(1.5).width
          let viewport = page.getViewport(normalWidth > this.$refs.viewBody.clientWidth ? this.$refs.viewBody.clientWidth / normalWidth : 1.5)
          let width = viewport.width * ratio
          let height = viewport.height * ratio
          pdfCanvas.width = width
          pdfCanvas.height = height
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
    // 文件改变
    change () {
      return {
        fileName: this.fileName,
        filePath: this.filePath,
        url: this.url,
        api: this.api,
        param: this.param
      }
    }
  },
  watch: {
    // 文件改变
    change: {
      handler: function () {
        this.apiUrl = ''
        if (this.fileType === 'img') {
          this.renderImg()
        } else {
          this.currentPage === 1 ? this.renderPdf() : this.currentPage = 1
        }
      },
      deep: true
    },
    // pdf页码改变
    currentPage () {
      this.fileType === 'pdf' && this.renderPdf()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
