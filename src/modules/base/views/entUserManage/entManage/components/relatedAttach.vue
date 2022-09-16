<template>
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
              <td v-for="item in infoItem" :key="item.value">
                <label>{{ item.label }}</label>
                <span>{{ item.value }}</span>
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
    <!--   查看器 -->
    <zj-preview :visible.sync="viewShow" :fileUrl="viewItemUrl" :showFooter="false" :fileType="viewItemType" @close="viewShow = false" />
  </zj-content-block>
</template>
<script>
import pdfjs from "vue-pdfjs-update";
import CMapReaderFactory from "vue-pdf/src/CMapReaderFactory";
export default {
  components: {},
  props: {
    // attachInfo: {
    //   type: Object,
    //   default: () => { },
    // },
    infoBar: {
      type: Array,
      default: () => [],
    },
    infoList: {
      type: Array,
      default: () => [],
    },
    infoViewList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    infoBar(data) {
      this.infoBarChange(0)
    }
  },
  data() {
    return {
      zjControl: {
        downloadFile: this.$api.registerAudit.downloadFile,
        downloadFlow: this.$api.registerAudit.downloadFlow
      },
      //相关附件资料
      // infoBar: [], //导航栏
      // infoList: [], //集合
      infoItem: {},//显示内容
      infoBarActive: 0, //导航栏选中
      // infoViewList: [], //图片集合
      infoViewitem: {},//图片显示
      viewItemUrl: '',
      imgRotate: 0,//旋转
      imgRoPx: '0deg',
      viewItemType: 'image',
      currentPage: 1,
      pageTotal: 0,
      viewShow: false
    };
  },
  methods: {
    //导航栏
    infoBarChange(index) {
      this.infoItem = this.infoList[index]
      this.infoBarActive = index
      //查看
      this.infoViewitem = this.infoViewList[index]
      if (!this.infoViewitem.fileId) {
        this.infoViewitem = { fileId: null, fileName: null }
        this.viewItemUrl = ''
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
    previewFile() {
      this.viewShow = true
    }
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