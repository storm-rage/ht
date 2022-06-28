<template>
  <div style="background: rgba(0,0,0,0)">
    <div class="zj-home" ref="zjHome" style="height: auto;">
      <!--    <div class="banner-box">
              <img src="@assets/img/home/homeBanner.png"/>
          </div>-->
      <div class="notice-box" ref="noticeBox">
        <!--        <img class="img-notice" src="@assets/img/home/homeBackgroud.png" :style="{height:noticeBoxHeight+'px'}"/>-->
        <div class="content-notice" ref="contentNotice">
          <div class="notice-message">
            <div class="message-top-title">
              <div class="left-title"><b>站内信</b></div>
              <div class="text-blue zj-right right-icon" v-if="messageList.length" @click="moreMsg">更多>></div>
            </div>
            <!--            <div v-if="messageList.length"><span class="message-title">{{messageList[0].messageTitle}}</span> <span class="more" @click="moreMsg">更多》</span></div>-->
            <ul class="message-content" v-if="messageList.length" style="min-height: 152px;">
              <li
                v-for="(item) in messageList"
                :key="item.id"
              >
                <div>
                  <div @click="toDetail(item.id)" class="message-title-item" v-html="item.messageContent"></div>
                  <div>
                    <span class="zj-f-l grey">{{item.createDatetime}}</span>
                    <!--                    <span class="fr more" @click="toDetail(item.id)">详情》</span>-->
                  </div>
                </div>
              </li>
            </ul>
            <div class="empty-content-box" style="min-height: 152px;" v-else>
              暂无站内信
            </div>
          </div>

        </div>
      </div>

      <div :class="['menu-box',{'menu-content--display-none': menuEnableCount == 0}]" ref="menuBox">
        <div  v-for="(item,index) in menuList" :key="item.name + index" @click="fastMenuClick(item)"
              :class="['menu-content',{'menu-content--disable': item.disable==1},{'menu-content--display-none': menuEnableCount == 0}]">
          <div class="img-item-box">
            <img :src="getImg(item)" class="img-item"  />
          </div>

          <div class="img-item-box-title over-hidden">{{ item.nameCn }}</div>
        </div>


        <div class="empty-content-box" v-if="menuEnableCount == 0">暂无常用菜单</div>
        <!--
        <div class="empty-content-box" v-if="menuList.length == 0">暂无常用菜单</div>-->
        <div class="menu-content for-align" v-for="i in 7" :key="i" v-else></div>
      </div>

      <!-- 运营弹框 -->
      <notice ref="notice"/>
      <!-- 签署弹框 -->
      <sign-agree :userInfo="userInfo" ref="signAgree"/>
    </div>
    <div class="zj-home" style="height: auto;margin-top: 10px;" v-if="zjControl.queryBackLog">
      <div class="notice-box todoBox" v-if="todoList.length">
        <el-row style="background: #e2ecff;">
          <el-col :span="12" class="todoHeader">待办任务</el-col>
          <el-col :span="12" class="todoHeader">数目</el-col>
        </el-row>
        <el-row v-for="(item,index) in todoList" :key="index">
          <el-col :span="12" class="todoItem">
            <span class="todoName">{{item.name}}</span>
          </el-col>
          <el-col :span="12" class="todoItem">
            <span class="todoNum" v-if="item.number > 0" @click="todoItemClick(item)">({{item.number}})</span>
            <span v-else>({{item.number}})</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import notice from "./components/notice";
import signAgree from "./components/signAgree";
import message from "../../../api/messageApi";
export default {
  components:{
    notice,signAgree
  },
  data(){
    return {
      zjControl:{
      //   bizParamValidateDic: this.$api.bizParamValidate.getDirectory,
      //   getDirectory: this.$api.bizParamValidate.getDirectory,
      queryBackLog:this.$api.message.queryBackLog,//发票模式切换
      },
      collapseActive:['1'],
      noticeBoxHeight:0,
      messageList: [],
      menuList: [],
      //常用的可用菜单总数
      menuEnableCount: 0,
      todoList:[],
    }
  },
  created() {
    this.getMsg();
    this.getApi();

    this.menuList = [
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"待办事宜",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["daiban.png","daibanDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"已办事宜",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["yiban.png","yibanDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"我的申请",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["wodeshenqing.png","wodeshenqingDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"我的草稿",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["wodecaogao.png","wodecaogaoDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"开具发票",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["invoice.png","invoiceDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"凭证打印",
        //path:"/moreVoucherPrint",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["pzPrint.png","pzPrintDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"注册审核",
        //path:"/registerAudit",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["zuceshenhe.png","zuceshenheDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"融资审核",
        //path:"/auditFinancingData",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["rongzishenhe.png","rongzishenheDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
      {
        //$api中的name
        name:"bizParamValidate",
        nameCn:"业务参数验证",
        path:"/bizParamValidate",
        //验证权限的方法，必须与XXAPI.js中的方法一致
        func: "getDirectory",
        imgSrc:["bizParamValidate.png","bizParamValidateDisable.png"],
        disable: 1, //0:可用；1:不可用
      },
    ];

    this.permission();

  },
  methods:{
    getApiAfter(){
      this.getTodoList()
    },
    todoItemClick(item){
      this.$router.push(item.router)
    },
    getWindowHW(){
      if(!this.$refs.zjHome){return}
      // let homeHeight = this.$refs.zjHome.offsetHeight - 180

      let homeHeight = window.innerHeight - 180

      let noticeHeight = this.$refs.contentNotice.offsetHeight
      if(noticeHeight <= homeHeight){
        this.noticeBoxHeight = homeHeight
      }else {
        this.noticeBoxHeight = noticeHeight
      }
    },
    getMsg () {
      this.$api.message.getList().then(ret => {
        this.messageList = ret.data
      })
    },
    moreMsg () {
      this.$router.push({ name: 'message' })
    },
    toDetail (id) {
      this.$router.push({ name: 'messageDetail', params: { id: id } })
    },
    permission(){
      let clazz = "";
      let func = "";
      this.menuEnableCount = 0;

      for(let i=0; i<this.menuList.length; i++){
        clazz = this.menuList[i].name;
        func = this.menuList[i].func;

        if(this.$api[clazz] != null){
          this.$api.baseCommon.getPermission(this.$api[clazz]).then(res => {
            this.zjBtn = Object.assign({}, res)
            //console.log("res: " ,res.data)

            if(this.zjBtn[func] == ""){
              this.menuList[i].disable = 1;
            } else{
              this.menuList[i].disable = 0;
              this.menuEnableCount++;
            }
            //console.log(clazz, func, this.menuList[i].disable);
          });
        }

      }


    },
    getImg(item){
      return require(`@assets/img/home/fastMenu/${item.imgSrc[item.disable]}`);
    },
    fastMenuClick(item){
      if(item.disable) {
        return;
      }

      this.$router.push({ path:item.path});
    },

    //获取代办列表信息
    getTodoList(){
      if(this.zjBtn.queryBackLog){
        // this.zjControl.queryBackLog().then(res => {
        //     this.todoList = res.data.innerList
        //   }
        // )
      }
    }
  },
  mounted() {
    let _this = this
    window.onresize = () => {
      _this.getWindowHW()
    }
    _this.getWindowHW()
    // console.log(this.$store)
    //打开dialog
    // this.$refs.notice.show = true
    //是否需要签署
    if(this.userInfo.signZJDJBFlag){
      this.$nextTick(() => {
        this.$refs.signAgree.open()
      })
    }
  },
}
</script>
<style lang="less">
@import "less/index.less";

.menu-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  flex-shrink: 0;

  width: 49.5%;
  //height: 180px;

  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  //box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
  //color: #000;

  //height: auto !important;

  .menu-content {
    margin: 8px;
    width: 72px;
    height: 72px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;

    cursor: pointer;

    & .img-item-box {
      width: 48px;
      height: 48px;
      border-radius: 5px;
      background-color: #E8F4FE;
      display: flex;
      justify-content: center;
      align-items:center;

      & .img-item {
        width:32px;
        height: 32px;
      }
    }

    & .img-item-box-title {
      color: #000;
      font-size: 12px;
      overflow: hidden;
    }

  }


}

.menu-content--disable {
  cursor: default !important;
  //display: none !important;
  .img-item-box {
    background-color: #EDEDED !important;
  }
  .img-item-box-title {
    color: #C6C3C3 !important;
  }
}

.menu-content--display-none {
  display: none !important;
}
.todoBox {
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  .todoHeader {
    border-bottom: 1px solid #f0f0f0;
    color: #666;
    font-weight: bold;
  }
  .todoItem {
    border-bottom: 1px solid #f0f0f0;
    font-size: 12px;
    color: #000;
    .todoNum {
      cursor:pointer;
      color: #0aa7f7;
      text-decoration: underline;
    }
  }
  .el-col-12 {
    border-left: 1px solid #f0f0f0;
    padding: 5px 15px;
  }
}



</style>
