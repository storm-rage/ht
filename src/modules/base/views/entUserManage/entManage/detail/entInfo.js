import pdfjs from "vue-pdfjs-update";
import CMapReaderFactory from "vue-pdf/src/CMapReaderFactory";
export default {
  data() {
    return {
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
    }
  },
  created() {
    this.initAttchInfo()
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
      this.infoBar = ['营业执照', '法定代表人身份证', '操作用户经办员', '操作用户复核员', '风险信息接收人', '委托授权书']
      let jb = this.detailData.entUserList.find(item => item.roleId == '2') || {}
      let fh = this.detailData.entUserList.find(item => item.roleId == '3') || {}
      let fx = this.detailData.entUserList.find(item => item.roleId == '4') || {}
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
          oneLabel: '操作用户经办员：', oneValue: jb.userName, twoLabel: '证件类型：', twoValue: jb.certType, threeLabel: '证件号码：', threeValue: jb.certNo,
          fourLabel: '证件有效期：', fourValue: this.date(jb.certStartDate), fiveValue: this.date(jb.certEndDate)
        },
        {
          oneLabel: '操作用户复核员：', oneValue: fh.userName, twoLabel: '证件类型：', twoValue: fh.certType, threeLabel: '证件号码：', threeValue: fh.certNo,
          fourLabel: '证件有效期：', fourValue: this.date(fh.certStartDate), fiveValue: this.date(fh.certEndDate)
        },
        {
          oneLabel: '风险信息接收人：', oneValue: fx.userName, twoLabel: '证件类型：', twoValue: fx.certType, threeLabel: '证件号码：', threeValue: fx.certNo,
          fourLabel: '证件有效期：', fourValue: this.date(fx.certStartDate), fiveValue: this.date(fx.certEndDate)
        },
      ]
      //是否开通天眼查
      if (this.detailData.isOpenTyc === '1') {
        // threeLabel:'天眼查核准日期',threeValue:''
        this.infoList[0].threeLabel = '天眼查核准日期：'
        if (this.detailData.approvedTime) {
          this.infoList[0].threeValue = this.tycDates(this.detailData.approvedTime)
        } else {
          this.infoList[0].threeValue = '--'
        }

      }
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
}
