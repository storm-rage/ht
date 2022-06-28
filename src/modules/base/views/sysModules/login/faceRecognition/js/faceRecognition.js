import faceRecognitionMixin from "./faceRecognitionMixin";
import loginMixin from "./loginMixin";

import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import pdfjs from 'vue-pdfjs-update'
pdfjs.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
// pdfjs.GlobalWorkerOptions.workerSrc = '/static/pdf/worker.js';
export default {
    mixins:[faceRecognitionMixin,loginMixin],
    data () {
        return {
            headerList:[{label:'首页',path:'/login'},{label:'联系我们',path:''}],
            // dialogVisible:false,
           dialogVisible:true,
            userName:'',
            threeANDtwo:false, // 默认为true--两方协议---需要人脸识别及签协议   false:隐藏序号与箭头
            onlyProtocol:false, // true只需要签署协议 --- false把人脸识别隐藏掉
            onlyFace:false, // true只需要人脸识别 --- false把签署协议隐藏掉
            protocolType:'', //提示所需步骤
            faceCodeSrc:'~@common/assets/img/test/demo.jpg',
            getNewFace:false, //识别失败时显示
            faceMsg:'', // 识别失败时提示

            isList:true, //true-显示文字与图片   false-显示下拉
            agreeList:[], //协议列表
            agreeActive:[],//协议列表打开项
            agreeItem:{},//协议项暂存
            viewItemUrl:'',//每项协议查看
            //
            zjControl:{
              getFaceQrode:this.$api.login.getFaceQrode,//获取二维码
              queryFaceResult:this.$api.login.queryFaceResult,//结果查询
              queryUserProtocol:this.$api.login.queryUserProtocol,//协议查询
              signUserProtocol:this.$api.login.signUserProtocol,//人脸签署
            },
            //
            agreeType:'',// 2-3
            agreeEntActive:'',//选中的项
            agreeCheckItem:{}, //协议项
        }
    },
    methods: {
        userHandle(flag){
            // 是否同时需要  人脸识别 与  签署协议
            if(this.userInfo.loginRes.userServiceAgreementFlag === '1' && this.userInfo.loginRes.faceCheck){
                this.onlyFace = true //显示二维码
                this.threeANDtwo = true //显示序号
                this.onlyProtocol = true // 显示协议
                this.protocolType = '仍需两步操作即可完成账户激活：'
                this.getFaceQrode() // 调用获取人脸识别二维码
            }
            // 只需要需要人脸识别
            else if (this.userInfo.loginRes.faceCheck){
                this.onlyFace = true //显示二维码
                this.threeANDtwo = false // 隐藏序号
                this.onlyProtocol = false // 隐藏协议
                this.protocolType = '仅剩一步操作即可完成账户激活：'
                this.getFaceQrode() // 调用获取人脸识别二维码
            }
            // 只需要签协议
            else if (this.userInfo.loginRes.userServiceAgreementFlag === '1'){
                this.onlyFace = false //隐藏二维码
                this.threeANDtwo = false // 隐藏序号
                this.onlyProtocol = true // 隐藏人脸识别
                this.protocolType = '您仅剩一步操作即可完成账户激活，请阅读并签署如下协议：'

                this.isList = false //显示下拉列表
                this.agreeActive = []
                this.methASD()
            }
            // 最后进入系统
            else{
                if(flag && flag==='face'){
                  this.$messageBox({
                    type:'success',
                    title:`温馨提示`,
                    content:`人脸识别成功`,
                    showCancelButton:false,
                    messageResolve:()=>{
                      this.removeRow()
                      let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                      this.saveInfo(loginRes) // 保存所需信息
                      this.$router.push('/home') //进入系统
                    },
                    messageReject:() => {
                      this.removeRow()
                      let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                      this.saveInfo(loginRes) // 保存所需信息
                      this.$router.push('/home') //进入系统
                    }
                  })
                }else{
                  this.removeRow()
                  let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                  this.saveInfo(loginRes) // 保存所需信息
                  this.$router.push('/home') //进入系统
                }

            }
        },
        // 人脸识别重新获取事件
        newFaceCode(){
          this.getFaceQrode()
        },
        // 获取人脸识别二维码
        getFaceQrode(){
            this.zjControl.getFaceQrode(this.qrodeData).then(ret => {
                let res = ret.data
                this.faceCodeSrc = 'data:image/png;base64,' + res.imgBase64 //替换人脸识别二维码
                this.getNewFace = false //将重新获取二维码隐藏掉
                this.faceMsg = '' //将识别提示也设为空
                this.pollingFun() //调用轮询
            })
        },
        // 定义轮询 --- 可改成可以传入参数（事件方法，超时提示，超时事件）
        pollingFun(){
            this.pollingCount = 0
            this.polling = window.setInterval(() => {
                this.pollingCount ++ //每次都将次数加1
                if (this.pollingCount > 40){ // 当次数大于等于40
                    this.clearPolling() //清掉轮询定时器
                    this.$log.error('识别超时，确定后将返回登录页面',()=>{
                        this.resetState() //调用登出事件
                    })
                }else {
                    setTimeout(this.queryFaceResult(), 0); // 每一秒调用 查询人脸识别结果
                }
            }, 5000)
        },
        // 清除轮询
        clearPolling(){
            let end = this.polling;
            let start = end - 100 > 0 ? end - 100 : 0;
            for (let i = start; i <= end; i++) {
                clearTimeout(i);
            }
        },
        // 查询人脸识别结果
        queryFaceResult(){
            this.zjControl.queryFaceResult().then(ret => {

                let res = ret.data

                //无错误信息
                if( !res.errorMsg || res.errorMsg.trim() === ''){ this.faceMsg = '' }
                // 识别是否成功
                if (res.faceCheck === '0'){ // 未识别
                    this.faceMsg = ''
                }else if(res.faceCheck === '1'){ //识别成功
                    this.faceMsg = '识别成功'
                    this.userInfo.loginRes.faceCheck = false //隐藏
                    this.getNewFace = false //将重新获取二维码隐藏
                    this.clearPolling() // 清除轮询
                    this.userHandle('face') //再次调用状态判断
                }else if(res.faceCheck === '2'){ //识别失败
                    this.faceMsg = '人脸识别失败！请重新操作' // 设置提示消息
                    this.getNewFace = true //将重新获取二维码显示出来
                    this.clearPolling() // 清除轮询
                }
            })
        },
        // 点击协议-查询
        methASD(){
            let params = {
              entId:this.userInfo.loginRes.entId,
            }
            this.zjControl.queryUserProtocol(params).then(res=>{
                this.isList = false //显示下拉列表
                this.agreeActive = []
                res.data.protocolList.forEach((item) => {
                    // item.coreEntName = '哈哈哈' //测试内容
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
                this.agreeList = res.data.protocolList

                if(this.agreeList.length < 1){
                  return this.$messageBox({
                    type:'info',
                    title:`温馨提示`,
                    content:`暂无需要签署的协议`,
                    confirmText:`进入系统`,
                    showCancelButton:false,
                    messageResolve:()=>{
                      this.removeRow()
                      let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                      this.saveInfo(loginRes) // 保存所需信息
                      this.$router.push('/home') //进入系统
                    },
                    messageReject:() => {
                      this.removeRow()
                      let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                      this.saveInfo(loginRes) // 保存所需信息
                      this.$router.push('/home') //进入系统
                    }
                  })
                }

                //选中第一项

                // this.agreeCheckItem = this.agreeList[0]
                // if(this.agreeType === 'YH_THREE'){
                //   this.agreeEntActive = this.agreeList[0].coreEntName
                //   this.agreeEntChange()
                // }else{
                //   this.agreeEntClick()
                //   this.agreeEntActive = this.agreeList[0].agreementId
                // }
                this.agreeEntClick(this.agreeList[0])
            })
        },

        //协议选中
        agreeEntClick(item){
          if(this.agreeType === 'YH_THREE'){
            this.agreeEntActive = item.coreEntName
          }else{
            this.agreeEntActive = item.entName
          }
          this.agreeEntChange()
        },
        agreeEntChange(){
          this.agreeCheckItem = this.agreeList.find(item => item.coreEntName === this.agreeEntActive || item.entName === this.agreeEntActive)
          if(this.agreeCheckItem.type !== 'flow'){return}
          if(this.agreeEntActive){
            this.$nextTick(() => {
              document.getElementById(`pdfCanvasItem`).innerHTML = ''
              //进行下载
              let params = {
                fileUrl:this.agreeCheckItem.fileId,
                fileId:this.agreeCheckItem.fileId,
                fileName:this.agreeCheckItem.fileName + '.pdf' ,
                // attachName:this.agreeCheckItem.fileName + '.pdf'
              }
              // let params2 = JSON.parse(JSON.stringify(params))
              // params2.fileName = params2.fileName + '.pdf'
              // params2.attachName = params2.attachName + '.pdf'
              // this.$api.sys.downloadFile(params2)
              this.$api.baseCommon.downloadPdf(params).then(res => {
                let that = this
                let dataInfo = res.data
                let reader = new window.FileReader()
                reader.readAsArrayBuffer(dataInfo)
                reader.onload = function (e) {
                  let result = e.target.result
                  let contentType = dataInfo.type
                  let blob = new Blob([result], { type: 'pdf' })
                  let url = window.URL.createObjectURL(blob)
                  that.agreeCheckItem.viewUrl = url
                  that.renderPdfs(that.agreeCheckItem)
                }
              })
            })
          }
        },
        // 限制打开一个
        agreeChange(arr){
          if(arr.length > 1){
            this.agreeActive = [arr[arr.length - 1 ]]
          }
        },
        // 人脸识别签署-调云证书
        signUserProtocol(item){
            this.agreeItem = Object.assign({},item)
            this.$refs.certuficate.open()
        },
        // 人脸识别签署-云证书返回
        signConfirm(){
          this.zjControl.signUserProtocol(this.agreeItem).then(res => {
            this.$messageBox({
              type:'success',
              // title:`${this.agreeList.length-1 > 0 ? '签署成功' : '激活成功'}`,
              // content:`${this.agreeList.length-1 > 0 ? '签署成功' : '恭喜您！已成功激活账户'}`,
              // confirmText:`${this.agreeList.length-1 > 0 ? '确定' : '去首页看看'}`,
              title:`${this.agreeList.length-1 > 0 ? '签署成功' : '签署成功'}`,
              content:`${this.agreeList.length-1 > 0 ? '恭喜您！签署成功！' : '恭喜您！签署成功！'}`,
              confirmText:`${this.agreeList.length-1 > 0 ? '完成' : '完成'}`,
              showCancelButton:false,
              messageResolve:()=>{
                if(this.agreeList.length-1 > 0){
                  this.methASD()
                }else{
                  this.removeRow()
                  let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                  this.saveInfo(loginRes) // 保存所需信息
                  this.$router.push('/home') //进入系统
                }
              },
              messageReject:() => {
                if(this.agreeList.length-1 > 0){
                  this.methASD()
                }else{
                  this.removeRow()
                  let loginRes = JSON.parse(sessionStorage.getItem('frLoginRes'))
                  this.saveInfo(loginRes) // 保存所需信息
                  this.$router.push('/home') //进入系统
                }
              }
            })
          })
        },
        // 登出事件
        resetState(){
            this.$router.push({name:'login'})
            this.clearPolling()
        },
        // 渲染pdf
        renderPdfs (item) {
          pdfjs.getDocument({
            url: item.viewUrl,
            CMapReaderFactory
            // cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
            // cMapPacked: true
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
                  // canvas.height = '400'
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
        }
    },
    destroyed() {
        this.clearPolling()
    }
}
