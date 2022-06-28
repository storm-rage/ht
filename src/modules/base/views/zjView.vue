<template>
  <div id="pdfImg">
    <!-- pdf -->
    <div id="zjPdf-page" v-if="fileType === 'pdf'">
      <div class="msg" :class="[msgFlag ? 'block' : 'none',total <= 1 ? 'w100' : '']">{{msg}}</div>
      <div class="title">
        <div class="left" v-if="total > 1"/>
        <div class="right"
             :class="[total <= 1 ? 'w100' : '']"
        >
          {{flag ? title : '正在渲染...'}}
        </div>
        <i class="close el-icon-close" title="关闭" @click="cancel"/>
      </div>
      <div id="page" v-if="total > 1">
        <div v-for="index in total" :key="index"
             :class="[index === active ? 'active' : '','page-canvas']"
             :id="'page-canvas-item'+index"
             @click="pageClick(index)"
        >
          <div class="shade" :class="[index === active ? 'block' : 'none']" :id="'shade'+index"/>
          <p>{{index}}</p>
        </div>
      </div>
      <div id="view" :class="[total <= 1 ? 'w100' : '']">
        <!--  分页容器 -->
        <div class="pager" v-show="flag">
          <template v-if="total > 1 ">
            <el-input v-model.number="pager" @blur="pagerBlur" @keyup.enter.native="pagerKeyup"/>
            <span>/</span>
            <span>{{total}}</span>
          </template>

          <zj-button type="text" icon="iconfont icon-xiazai1" class="xz" @click="downFile" title="下载文件"/>
          <zj-button type="text" icon="el-icon-circle-plus" class="jj" @click="plusANDminus('+')" :disabled="!supZoom" :title="supZoom ? '放大' : '该浏览器不支持pdf缩放功能'"/>
          <zj-button type="text" icon="el-icon-remove" class="jj" @click="plusANDminus('-')" :disabled="!supZoom" :title="supZoom ? '缩小' : '该浏览器不支持pdf缩放功能'"/>
        </div>
        <!-- 显示容器 -->
        <div id="view-body" @scroll="scroll($event)">
          <div v-for="index in total" :key="index"
               :class="['view-canvas']"
               :id="'view-canvas-item'+index"
               :style="{zoom:zoomStyle}"
          >
            <!-- index === active ? 'block' : 'none', -->
          </div>
        </div>
        <!-- 下载取消 -->
        <div class="view-button" v-show="flag" :class="[scale > 1 ? 'scroll' :'']">
          <zj-button icon="el-icon-download" class="mainButton"
                     @click="downFile"
                     :title="'下载 ' + query.fileName"
          >
            下载
          </zj-button>
          <zj-button class="back" @click="cancel">取消</zj-button>
        </div>
        <!-- 上一页下一页 -->
        <div id="prev-next" v-show="total > 1">
          <zj-button @click="prevPage"
                     :disabled="active === 1"
                     :title="active === 1 ? '当前已是第一页' : ''"
                     icon="el-icon-caret-top"
                     :class="[active !== 1 ? 'hoverColor' : '']"
          />
          <zj-button @click="nextPage"
                     :disabled="active === total"
                     :title="active === total ? '当前已是最后一页' : ''"
                     icon="el-icon-caret-bottom"
                     :class="[active !== total ? 'hoverColor' : '']"
          />
        </div>
      </div>
    </div>
    <!-- img -->
    <div id="zjImg-page" v-if="fileType === 'image'">
      <div class="msg" :class="[msgFlag ? 'block' : 'none']">{{msg}}</div>
      <div class="title">
        {{flag ? title : '正在渲染...'}}
        <i class="close el-icon-close" title="关闭" @click="cancel"/>
      </div>
      <!-- 顶部按钮栏 -->
      <div class="pager" v-show="flag">
        <zj-button type="text" icon="iconfont icon-xiazai1" class="xz" @click="downFile" title="下载文件"/>
        <zj-button type="text" icon="el-icon-circle-plus" class="jj" @click="plusANDminus('+')"/>
        <zj-button type="text" icon="el-icon-remove" class="jj" @click="plusANDminus('-')"/>
        <zj-button type="text" icon="el-icon-refresh-left" class="jj" @click="rightANDLeft('-')"/>
        <zj-button type="text" icon="el-icon-refresh-right" class="jj" @click="rightANDLeft('+')"/>
      </div>
      <!-- 内容 -->
      <div class="body">
        <div id="imgBox" :style="{height:imgHeightStyle,width:imgWidthStyle,transform:'scale('+scale+')'}" :class="[isY ? 'p-vb' : '']">
          <img :src="blobUrl" :style="{transform:transformStyle,height:imgHeight+'px',width:imgWidth+'px'}" id="img" @click="elImg"/>
        </div>
        <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="viewerList"/>
      </div>
      <!-- 底部按钮栏 -->
      <div class="view-button" v-show="flag" :class="[scale > 1 ? 'scroll' :'']">
        <zj-button icon="el-icon-download" class="mainButton"
                   @click="downFile"
                   :title="'下载 ' + query.fileName"
        >
          下载
        </zj-button>
        <zj-button class="back" @click="cancel">取消</zj-button>
      </div>
    </div>
  </div>

</template>

<script>
  import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
  import pdfjs from 'vue-pdfjs-update'
  pdfjs.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
  export default {
    name: "zjPdf",
    components:{
      ElImageViewer
    },
    data(){
      return {
        query:{},
        active:1,
        total:0,

        fileType:'',

        blobUrl:'',
        title:'',
        flag:false,
        pager:1,
        pagerItemHeight:0, //左侧每一项高度
        viewItemHeight:0, //右侧每一项高度
        scrollKey:true, //是否开启滚动监听
        //pdf
        zoomStyle:'',

        //图片
        transformStyle:'translate(-50%,-50%) rotate(0deg)',
        isY:false,
        imgWidth:0,
        imgHeight:0,
        imgWidthStyle:'',
        imgHeightStyle:'',
        //借助el-image-viewer显示
        showViewer:false,
        viewerList:[],

        //放大缩小
        rotate:0, //旋转
        scale:1, //缩放
        scaleRatio:0.25,//每次缩放
        scaleMax:2,//最大缩放
        scaleMin:0.5,//最小缩放
        msg:'',//提示
        msgFlag:false,//是否显示提示
        supZoom:true, //当前浏览器是否支持缩放
      }
    },
    created(){
      let userAgent = navigator.userAgent
      this.supZoom = !( userAgent.indexOf('Firefox') > -1 )

      this.query = JSON.parse(JSON.stringify(this.$route.query))
      this.fileType = this.query.fileType
    },
    mounted() {
      let {fileName} = this.query
      if(fileName){
        this.title = fileName.slice(0,fileName.lastIndexOf('.'))
      }
      this.getPageBlob()
    },
    methods:{
      //左侧分页事件委派
      pageClick(index,viewBoo){
        if(this.total <=1){return}
        this.active = index
        this.pager = this.active

        //设置左侧定位
        document.getElementById('page').scrollTop = this.pagerItemHeight * (index - 1)
        if(viewBoo){ return }
        //先关闭滚动监听
        this.scrollKey = false
        //设置右侧定位
        let pb = 16 //对应css的变量 viewCanvasBottom
        document.getElementById('view-body').scrollTop = ( this.viewItemHeight  + pb) * (index - 1) * this.scale
        //最后再开启
        setTimeout(() => {
          this.scrollKey = true
        },500)
      },
      //获取图片大小
      getImgSize(){
        let img = new Image()
        img.src = this.blobUrl
        const that = this
        img.onload = () => {
          that.imgWidth = img.width
          that.imgHeight = img.height
          that.imgBefore()
        }
      },
      //图片旋转缩放前置
      imgBefore(){
        if(this.rotate === 90 || this.rotate === 270){
          this.imgWidthStyle = ( this.imgHeight * this.scale ) + 'px'
          this.imgHeightStyle = ( this.imgWidth * this.scale ) + 'px'
          this.isY = true
        }else{
          this.imgWidthStyle = ( this.imgWidth * this.scale ) + 'px'
          this.imgHeightStyle = ( this.imgHeight * this.scale ) + 'px'
          this.isY = false
        }
        let x = this.scale <= 1
          ? '-50%'
          : this.rotate === 90 || this.rotate === 270
            ? '-50%'
            : this.scale === 1.25
              ? '-47%'
              : this.scale === 1.5
                ? '-40%'
                : this.scale === 1.75
                  ? '-35%'
                  : this.scale === 2
                    ? '-31%'
                    : '0'
        let y = this.scale === 1
          ? this.rotate === 90 || this.rotate === 270
            ? '20%'
            : '-50%'
          : this.scale === 1.25
            ? this.rotate === 90 || this.rotate === 270
              ? '25%'
              : '-47%'
            : this.scale === 1.5
              ? this.rotate === 90 || this.rotate === 270
                ? '30%'
                : '-35%'
              : this.scale === 1.75
                ? this.rotate === 90 || this.rotate === 270
                  ? '35%'
                  : '-25%'
                : this.scale === 2
                  ? this.rotate === 90 || this.rotate === 270
                    ? '40%'
                    : '-17%'
                  : this.scale === 0.75
                    ? this.rotate === 90 || this.rotate === 270
                      ? '0'
                      : '-50%'
                    : this.scale === 0.5
                      ? this.rotate === 90 || this.rotate === 270
                        ? '-35%'
                        : '-50%'
                      : '0'
        this.transformStyle = `translate(${x},${img.width <= 1024 ? '-' + y : y}) rotate(${this.rotate}deg)`
      },
      //el-image
      elImg(){
        this.showViewer = true
      },
      closeViewer(){
        this.showViewer = false
      },
      //放大缩小
      plusANDminus(type){
        if(type === '+'){
          this.scale >= this.scaleMax ? this.scale = this.scaleMax : this.scale += this.scaleRatio
        }else if(type === '-'){
          this.scale <= this.scaleMin ? this.scale = this.scaleMin : this.scale -= this.scaleRatio
        }
        if(this.fileType === 'pdf'){
          this.zoomStyle = `${this.scale}` //pdf
          //获取当前页
          let pb = 16 //对应css的变量 viewCanvasBottom
          let top = document.getElementById('view-body').scrollTop
          let itemHeight = ( this.viewItemHeight + pb ) * this.scale
          let index = Math.ceil(top / itemHeight )
          let newIndex = index ? index > this.total ? this.total  : index  : 1
          this.pageClick(newIndex)
        }else if(this.fileType === 'image'){
          this.imgBefore()
        }
        this.msg = `当前缩放比例：${this.scale * 100}%`
        this.msgFlag = true
        setTimeout(() => {
          this.msgFlag = false
        },1600)

      },
      //图片旋转
      rightANDLeft(type){
        if(type === '+'){
          (this.rotate + 90) >= 360 ? this.rotate = 0 : this.rotate+=90
        }else if(type === '-'){
          (this.rotate - 90) < 0 ? this.rotate = 270 : this.rotate-=90
        }
        this.imgBefore()
      },
      //上一页
      prevPage(){
        if(this.active !== 1){
          this.active --
          this.pager = this.active
        }
        this.pageClick(this.active)
      },
      //下一页
      nextPage(){
        if(this.active !== this.total){
          this.active ++
          this.pager = this.active
        }
        this.pageClick(this.active)
      },
      //分页回车
      pagerKeyup(){
        if(!this.pager){return}
        this.pagerBlur()
      },
      //分页输入离开
      pagerBlur(){
        //当 输入的分页 大于0 并且小于等于总页数                      更新左侧选中               恢复输入的分页
        (this.pager > 0) && (this.pager <= this.total) ? this.active = this.pager : this.pager = this.active
        this.pageClick(this.pager) //调用左侧点击事件
      },
      //下载
      downFile(){
        let {fileId,fileName} = this.query
        let params = {
          fileId,fileName,
          fileUrl:fileId
        }
        this.$api.baseCommon.downloadFile(params)
      },
      //取消
      cancel(){
        window.location.href = 'about:blank'
        window.close()
      },
      //滚动监听
      scroll(e){
        if(!this.scrollKey){return}
        let top = e.target.scrollTop
        let pb = 16 //对应css的变量 viewCanvasBottom
        let itemHeight = (this.viewItemHeight + pb)  * this.scale
        let index = Math.ceil(top/itemHeight) || 1 //页数
        this.pageClick(index,true) //调用左侧点击事件，并不重新定位右侧
      },
      //获取pagePdf文件流
      getPageBlob(){
        let {fileId,fileName} = this.query
        let params = {
          fileId,fileName,
          fileUrl:fileId
        }
        this.$api.baseCommon.downloadPdf(params).then(res => {
          let that = this
          let dataInfo = res.data
          let reader = new window.FileReader()
          reader.readAsArrayBuffer(dataInfo)
          reader.onload = function (e) {
            let result = e.target.result
            let contentType = dataInfo.type
            let pageBlob = new Blob([result], { type: contentType })
            that.blobUrl = window.URL.createObjectURL(pageBlob)
            if(that.fileType === 'pdf'){
              that.pageRenderPdf()
            }else if(that.fileType === 'image'){
              that.viewerList = [that.blobUrl]
              that.getImgSize()
              that.flag = true
            }
          }
        })
      },
      // 获取pagePdf对象
      getPagePdf (cb) {
        // url直接获取
        pdfjs.getDocument({ url: this.blobUrl, CMapReaderFactory }).promise.then(pdf => {
          this.$nextTick(() => {
            cb(pdf)
          })
        })
      },
      // 渲染pagePdf
      pageRenderPdf () {
        this.getPagePdf(pdf => {
          let pdfDoc = pdf
          // 因为不想要分页所以循环生成canvas
          // 左侧缩略图
          let pageCanvasList = []
          for (let i = 1; i <= pdfDoc.numPages; i++) {
            //记录总页数
            if(this.total <= 0){
              this.total = pdfDoc.numPages
            }
            this.$nextTick(() => {
              // 因为不知道把pdf解析了多少页，所以我们需要循环创建canvas并且一定要不同的id
              //创建canvas
              let canvas = document.createElement('canvas')
              canvas.id = `pagePdf${i}`
              canvas.className = `${i}`
              let ctx = canvas.getContext('2d')
              // 通过getPage的方法获取到每一页的内容渲染，结束后把当前创建的canvas添加到页面中
              pdfDoc.getPage(i).then((page) => {
                let viewport = page.getViewport(1)

                let desiredWidth = document.getElementById(`page-canvas-item${i}`).clientWidth
                let scale = desiredWidth / viewport.width
                let scaledViewport = page.getViewport(scale)
                // canvas.height = scaledViewport.height
                canvas.height = scaledViewport.width * 1.2
                this.pagerItemHeight = scaledViewport.width * 1.2
                // document.getElementById(`shade${i}`).style.height = scaledViewport.width * 1.2 + 10 + 'px'
                canvas.width = scaledViewport.width
                // document.getElementById(`shade${i}`).style.width = scaledViewport.width + 10 + 'px'


                // 进行文件读取加载
                let renderContext = { canvasContext: ctx, viewport: scaledViewport, }
                page.render(renderContext)
                pageCanvasList.push(canvas)
                if(pageCanvasList.length === pdfDoc.numPages){
                  for(let key=1; key<=pageCanvasList.length;key++){
                    this.$nextTick(() => {
                      document.getElementById(`page-canvas-item${key}`).appendChild(pageCanvasList.find(citem => citem.id === `pagePdf${key}`))
                    })
                  }
                  this.flag = true
                }
              })
            })
          }
          //右侧显示图
          let viewCanvasList = []
          let width = 0
          let height = 0
          for (let i = 1; i <= pdfDoc.numPages; i++) {
            //记录总页数
            if(this.total <= 0){
              this.total = pdfDoc.numPages
            }
            this.$nextTick(() => {
              // 因为不知道把pdf解析了多少页，所以我们需要循环创建canvas并且一定要不同的id
              //创建canvas
              let canvas = document.createElement('canvas')
              canvas.id = `viewPdf${i}`
              let ctx = canvas.getContext('2d')
              // 通过getPage的方法获取到每一页的内容渲染，结束后把当前创建的canvas添加到页面中
              pdfDoc.getPage(i).then((page) => {
                let viewport = page.getViewport(1)
                let desiredWidth = document.getElementById(`view-canvas-item${i}`).clientWidth
                let scale = desiredWidth / viewport.width
                let scaledViewport = page.getViewport(scale)

                if(scaledViewport.width){
                  width = scaledViewport.width
                }
                if(scaledViewport.height){
                  height = scaledViewport.height
                }
                this.viewItemHeight = height
                canvas.height = height
                canvas.width = width


                // 进行文件读取加载
                let renderContext = { canvasContext: ctx, viewport: scaledViewport }
                page.render(renderContext)
                viewCanvasList.push(canvas)
                if(viewCanvasList.length === pdfDoc.numPages){
                  for(let key=1; key<=viewCanvasList.length;key++){
                    document.getElementById(`view-canvas-item${key}`).appendChild(viewCanvasList.find(citem => citem.id === `viewPdf${key}`))
                  }
                  this.flag = true
                }
              })
            })
          }
        })
      },
    },
  }
</script>

<style  lang="less">
  @pageWidth:20%; //缩略图容器的宽度
  @titleHeight:50px; //标题的高度
  @viewButtonHeight:50px;//按钮栏的高度
  @backgroudColor:rgba(0,0,0,0.7);//背景色
  @pagerRowHeight:40px; //分页的高度
  @viewCanvasBottom:16px;//右侧canvas的下边距 - 对应js
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box!important;
    -moz-box-sizing: border-box!important;
    -o-box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    -ms-box-sizing: border-box!important;
  }
  #pdfImg{
    width: 100%;
    height: 100%;
    position: relative;
    //公共部分
    #zjPdf-page,#zjImg-page{
      width: 100%;
      height: 100%;
      position: relative;
      background: linear-gradient(to top,#4C4C4C,#303030);
    }
    .msg{ //放大提示
      position: fixed;
      width: 150px;
      height: 40px;
      left: calc(55% - 50px);
      &.w100{
        left: 50%!important;
        transform: translateX(-50%);
        width: 150px!important;
      }
      top: calc(50% - 20px);
      background: rgba(0,0,0,0.4);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
    }
    .title{ //标题
      position: absolute;
      background: white;
      z-index: 2;
      left: 0;
      top: 0;
      height: @titleHeight;
      width: 100%;
      display: flex;
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 1px;
      .close{
        font-size: 18px;
        cursor: pointer;
        position: absolute;
        right: 35px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .pager{ //顶部按钮
      position: absolute;
      left: 0;
      width: 100%;
      height: @pagerRowHeight;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      .vxe-button{
        font-weight: bold;
        font-size: 18px;
        color: white;
        margin: 5px;
        &:hover{
          color: #1199C4;
        }

        &.jj{
          color: #c5c5c5;
          font-size: 24px;
          &:hover{
            opacity: 0.8;
          }
        }
      }
    }
    .view-button { //底部按钮栏
      z-index: 2;
      position: absolute;
      bottom: 0;
      &.scroll {
        bottom: 7.5px; //预留滚动条的高
      }
      right: 0;
      left: 0;
      height: @viewButtonHeight;
      background-color: @backgroudColor;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    //pdf
    #zjPdf-page{
      .msg{
        left: calc(55% - 50px);
        top: calc(50% - 20px);
      }
      .title{
        .left{
          width:@pageWidth ;
          height: 100%;
        }
        .right{
          width: calc(100% - @pageWidth);
          &.w100{
            width: 100%!important;
          }
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      #page{
        width: @pageWidth;
        &.w100{
          width: 100%!important;
        }
        height: calc(100% - @titleHeight - 10px);
        position: absolute;
        left: 0;
        top: calc(@titleHeight + 10px);
        padding: calc(@pagerRowHeight + 5px) 4.2% 1%;
        overflow:auto ;
        .page-canvas{
          position: relative;
          width: 100%;
          /*height: 30%;*/
          margin-bottom: 15%;
          /*overflow-x: hidden;*/
          cursor: pointer;
          &:last-child{
            margin-bottom: 0;
          }
          canvas{
            height: 100%;
            width: 100%;

          }
          .shade{
            box-sizing: border-box!important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            border: 10px solid rgba(0,0,0,0);
          }
          //选中时
          &.active{
            .shade{
              background-color: rgba(0,0,0,0);
              border-color:  #878787;
            }
          }
          p{
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            color: white;
          }
        }

      }
      #view{
        position: absolute;
        left: @pageWidth;
        &.w100{
          left: 0!important;
        }
        right: 0;
        top: calc(@titleHeight + 10px);
        height: calc(100% - @titleHeight - 10px);
        padding-top: calc(@pagerRowHeight + 10px);
        .pager{
          top: 0;

          .el-input{
            width: 30px;
            margin-right: 5px;
            .el-input__inner{
              padding:0;
              text-align: center;
              height: 25px;
            }
          }
          span{
            font-size: 14px;
            margin:0 5px;
          }
          .vxe-button{
            &.xz{
              margin-left: 20px!important;
            }
          }

        }
        #view-body{
          height: 100%;
          width: 100%;
          overflow:auto ;
          padding:0 10% @viewButtonHeight;
          .view-canvas{
            width: 100%;
            padding-bottom: @viewCanvasBottom;
          }
        }
        .view-button{
          .vxe-button{
            width: 85px;
            i{
              font-weight: bold;
            }
          }
        }
        #prev-next{
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          .vxe-button{
            font-size: 20px;
            padding: 2px 4px;
            display: block;
            margin: 0 0 2px 0;
            background-color: @backgroudColor;
            border:none;
            color: white;
            &:last-child{
              margin-bottom: 0;
            }
            &:active{
              box-shadow: none!important;
              border: none!important;
            }
            &.is-disabled{
              &:hover{
                color: white!important;
              }
            }
          }
        }
      }
    }
    //img
    #zjImg-page{
      .msg{
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .title{
        align-items: center;
        justify-content: center;
      }
      .pager{
        top: @titleHeight;
      }
      .body{
        position: absolute;
        left: 0;
        top: calc(@titleHeight + @pagerRowHeight);
        width: 100%;
        // 100% - 标题高 - 顶部按钮高 - 底部按钮高
        height: calc(100% - @titleHeight - @pagerRowHeight);
        padding: 40px 0 calc(@viewButtonHeight + 7.5px);
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        #imgBox{
          position: relative;
          &.p-vb{
            margin-bottom: @viewButtonHeight;
          }
          img{
            position: absolute;
            left: 50%;
            top: 50%;
            cursor: pointer;
          }
        }
        .el-image-viewer__wrapper{
          .el-icon-circle-close{
            height: auto;
          }
        }
      }
    }
  }

</style>
