import ZjLog from "@pubComponent/log/ZjLog";
export default {
  data(){
    return {
      usedViewer: true, // 默认采用v-Viewer
      isShowFooter: false,
      isDownLoad: false,
      viewShow: false, //查看或pdf
      viewUrl: '', //显示的url
      viewType: '', //文件类型
      //请求的api
      viewApi:this.$api.baseCommon.downloadPdf,
      downApi:this.$api.baseCommon.downloadFile,
      //是否开启分页
      viewData:{
        page:1,//当前页
        size:10,//每页大小
        index:0,//当前位置
        list:[],//未分页的数据数组
        rows:[], //当前页的数据数组（当不是通过api获取时，则为list的截取部分）
        item:{},//当前位置的参数
        total:0,//总数
        //是否通过api获取
        isApi:true,
        //表格的ref
        viewRef:'',
        //是否开启分页（开启则显示按钮）
        isList:false,
        //表格是否分页
        pager:true,
        //按钮
        prveVB:false,
        nextVB:false,
        oldType:''
      },
      /*
      *   前端分页: views(row,true,'invoTable',false,contractData.invoiceList,true)
      *   前端不分页: views(row,true,'invoTable',false,contractData.invoiceList,false)
      *   请求分页: views(row,true,'invoTable',true,contractData.invoiceList,true)
      *   单个: views(row)
      *
      *
          <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"
              :prveVB="viewData.prveVB" :nextVB="viewData.nextVB" @viewPrve="viewPrve" @viewNext="viewNext" ref="zjPreview"
          >
            <div slot="header">{{viewData.item}}</div>
          </zj-preview>
      * */
    }
  },
  methods:{
    //只是获取url
    getViewUrl(row){
      let params = {
        fileUrl:row.fileId || row.sealFileId || row.agreementFileId,
        fileId: row.fileId || row.sealFileId || agreementFileId,
        fileName: row.fileName || row.attachName || row.sealFileName || row.agreementTypeName
      }
      this.viewApi(params).then(res => {
        let that = this
        let dataInfo = res.data
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(dataInfo)
        reader.onload = function (e) {
          let result = e.target.result
          let contentType = dataInfo.type
          let blob = new Blob([result], { type: contentType })
          let url = window.URL.createObjectURL(blob)
          that.viewUrl = url
          //获取url后执行
          if(that.gvuSuccess && typeof(that.gvuSuccess) === "function"){
            that.gvuSuccess()
          }
        }
      })
    },

    //初始化显示: 某项    是否分页          表格ref      是否api获取    不通过api的数组     表格是否分页
    views (     row,  pageFlag = false,  Ref,    apiFlag = true,      list,       pager = true) {
      //保存当前对象
      this.viewData.item = Object.assign({},row)
      //检测是否开启分页
      this.viewData.isList = pageFlag
      if(pageFlag){
        //通过api获取
        if(apiFlag){
          //获取当前页
          this.viewData.page = this.$refs[Ref].tablePagerCurrentPage || 1
          //获取大小
          this.viewData.size = this.$refs[Ref].tablePagerPageSize || 10

          this.viewData.rows = this.$refs[Ref].viewsData.rows
          this.viewData.total = this.$refs[Ref].viewsData.total
          this.viewData.viewRef = Ref
          this.viewData.pager = pager
        }
        //不通过api获取
        else{
          this.viewData.viewRef = Ref
          //获取当前页
          this.viewData.page = this.$refs[Ref].tablePagerCurrentPage || 1
          //获取大小
          this.viewData.size = pager ? this.$refs[Ref].tablePagerPageSize : list.length
          //表格是否分页
          this.viewData.pager = pager

          this.viewData.list = list
          this.viewData.rows = list.slice( (this.viewData.page-1) *this.viewData.size ,this.viewData.page*this.viewData.size )
          this.viewData.total = list.length
        }

        //查找当前位置
        this.viewData.index = this.viewData.rows.findIndex(item=> item.id===row.id || item._XID === row._XID)
      }
      //检测是否由api
      this.viewData.isApi = apiFlag

      this.updateView(row,true)
    },
    //更新视图
    updateView(row, boo = false){
      if (this.isImg(row.fileName) || this.isImg(row.attachName) || this.isImg(row.sealFileName) || this.isImg(row.agreementFileName)) {
        this.viewType = 'image'
      } else if (this.checkPdf(row.fileName) || this.checkPdf(row.attachName) || this.checkPdf(row.sealFileName) || this.checkPdf(row.agreementFileName) || row.protocolName) {
        this.viewType = 'pdf'
      } else {
        this.viewUrl = ''
        if(this.viewData.isList){
          this.viewBtn()
        }
        if(!row.fileId){
          return this.$message.warning('暂无附件可查看')
        }
        return this.$message.warning('该附件无法查看')
      }

      let params = {
        fileUrl: row.fileId || row.agreementFileId || row.sealFileId || row.agreementFileId,
        fileId: row.fileId || row.agreementFileId || row.sealFileId || row.agreementFileId,
        fileName: row.fileName || row.attachName || row.sealFileName || row.agreementTypeName || row.agreementName || row.protocolName
      }
      this.viewApi(params).then(res => {
        let that = this
        let dataInfo = res.data
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(dataInfo)
        reader.onload = function (e) {
          let result = e.target.result
          let contentType = dataInfo.type
          let blob = new Blob([result], { type: contentType })
          let url = window.URL.createObjectURL(blob)
          that.viewUrl = url
          //检测按钮是否可显
          that.viewBtn()
          //第一次则打开
          if(boo){
            if (that.usedViewer&&that.viewType === 'image') { //采用图片查看器
              that.$viewerApi({
                options: {
                  'title': false
                },
                images: [url],
              })
            } else {
              that.viewShow = true
            }
          }else{
            if (that.viewType === 'pdf'){
              that.viewShow = false
              setTimeout(() =>{
                that.viewShow = true
              },1)
            }else{
              that.$refs.zjPreview.initView()
            }
          }
          that.viewData.oldType = that.viewType
        }
      })
    },
    //上一张
    viewPrve(){
      //先判断是否是表格分页
      if(this.viewData.pager){
        //判断当前index是否到达上一页
        if(this.viewData.index === 0 && this.viewData.page > 1){
          this.viewData.index = this.viewData.size - 1
          this.viewData.page -= 1

          let params = {
            currentPage:this.viewData.page,
            pageSize:this.viewData.size
          }

          //是否开启了api获取
          if(this.viewData.isApi){
            this.$refs[this.viewData.viewRef].pagerPageChange(params)

          }else{
            this.$refs[this.viewData.viewRef].pagerPageChange(params)

            this.viewData.rows = this.viewData.list.slice( (this.viewData.page-1) *this.viewData.size ,this.viewData.page*this.viewData.size )
            this.viewData.item = this.viewData.rows[this.viewData.index]
            this.updateView(this.viewData.item)
          }
        }else{
          this.viewData.index --
          this.viewData.item = Object.assign({},this.viewData.rows[this.viewData.index])
          this.updateView(this.viewData.item)
        }
      }
      //表格不分页
      else{
        this.viewData.index --
        this.viewData.item = Object.assign({},this.viewData.rows[this.viewData.index])
        this.updateView(this.viewData.item)
      }
    },
    //下一张
    viewNext(){
      //先判断是否是表格分页
      if(this.viewData.pager){
        //判断当前index是否到达下一页
        if(this.viewData.index === this.viewData.size -1 || (this.viewData.page < (this.viewData.total / this.viewData.size)) ){
          this.viewData.index = 0
          this.viewData.page += 1

          let params = {
            currentPage:this.viewData.page,
            pageSize:this.viewData.size
          }
          //是否开启了api获取
          if(this.viewData.isApi){
            this.$refs[this.viewData.viewRef].pagerPageChange(params)
          }else{
            this.$refs[this.viewData.viewRef].pagerPageChange(params)

            this.viewData.rows = this.viewData.list.slice( (this.viewData.page-1) *this.viewData.size ,this.viewData.page*this.viewData.size )
            this.viewData.item = this.viewData.rows[this.viewData.index]
            this.updateView(this.viewData.item)
          }
        }else{
          this.viewData.index ++
          this.viewData.item = Object.assign({},this.viewData.rows[this.viewData.index])
          this.updateView(this.viewData.item)
        }
      }
      //表格不分页
      else{
        this.viewData.index ++
        this.viewData.item = Object.assign({},this.viewData.rows[this.viewData.index])
        this.updateView(this.viewData.item)
      }
    },
    //检测上下按钮是否可显
    viewBtn(){
      if(this.viewData.isList){
        //上
        this.viewData.prveVB = this.viewData.page !== 1 || (this.viewData.page === 1 && this.viewData.index !== 0)
        //下
        this.viewData.nextVB = (((this.viewData.page-1) * this.viewData.size) + this.viewData.index + 1) !== this.viewData.total
      }
      else{
        this.viewData.prveVB = false
        this.viewData.nextVB = false
      }
    },
    //通过api方式获取的数据则使用该方法
    viewChange(){
      this.$nextTick(() => {
        this.viewData.rows = Object.assign({},this.$refs[this.viewData.viewRef].viewsData.rows)
        this.viewData.item = this.viewData.rows[this.viewData.index]
        this.updateView(this.viewData.item)
      })
    },
    //下载
    downs(row){

      let params = {
        fileUrl: row.fileUrl || row.fileId || row.sealFileId || row.agreementFileId || row.errorFileId || row.afterFileId,
        fileId: row.fileId || row.fileUrl || row.sealFileId || row.agreementFileId || row.errorFileId || row.afterFileId,
        fileName: row.fileName || row.attachName || row.sealFileName || row.agreementFileName || row.protocolName,
        attachName:row.attachName || row.fileName || row.sealFileName || row.agreementFileName || row.protocolName
      }

      if (!params.fileId && params.fileName) {
        return this.$Message.warning('缺少文件ID！')
      }

      if (params.fileId && !params.fileName) {
        return this.$Message.warning('缺少文件名称！')
      }

      this.downApi(params)
    },


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

    //路由方式查看
    previewFile(row = {},isPdf = false){
      let fileName = row.fileName || row.attachName || row.sealFileName || row.agreementFileName || row.protocolName
      if(isPdf){
        fileName += '.pdf'
      }
      let fileId = row.fileId || row.sealFileId || row.agreementFileId || row.protocolId || row.errorFileId || row.afterFileId
      let fileType = ''
      if ( this.isImg(fileName) ) {
        fileType = 'image'
      } else if ( this.checkPdf(fileName) ) {
        fileType = 'pdf'
      } else {
        return this.$messageBox({
          type:'error',
          content:'该附件暂不支持查看'
        })
      }
      let routerData = this.$router.resolve({
        name:'zjView',
        query:{
          fileId,fileName,fileType
        }
      })
      let newHref = routerData.href
      window.open(newHref,'_blank')
    },

  },
  // created() {
  //   if(this.zjControl && this.zjControl.downloadFile){
  //     this.downApi = this.zjControl.downloadFile
  //   }
  //   if(this.zjControl && (this.zjControl.dowmFlowFile || this.zjControl.downFlowFile)){
  //     this.viewApi = this.zjControl.dowmFlowFile || this.zjControl.downFlowFile
  //   }
  // }
}
