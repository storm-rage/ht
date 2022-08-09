<template>
  <div class="sign-content-body" :style="{paddingTop:!isMultipleEnt ? '3vh' : '7vh'}">
    <div class="centerBox">
      <!--     标题      -->
      <content-header  :is-success="isSuccess"></content-header>
      <!--     主体部分       -->
      <div class="centerBody" :class="{'largeWd':showAgreement&&!showFace,'zj-center': showFace&&!showAgreement}">
        <div class="floatBox">
          <!-- 人脸识别 -->
          <face-recognition v-if="showFace"
                            :loginName="userInfos.loginRes.loginName"
                            :is-only-face="showFace&&!showAgreement"
                             @done="handleDone"
                             @setFaceStatus="setFaceStatus"></face-recognition>
          <!-- 向右箭头 -->
          <div class="arrowsBox" v-if="showFace&&showAgreement">
            <img src="~@assets/img/faceRecognition/arrows.png"/>
<!--            <img src="~@assets/img/faceRecognition/arrows.png" :class=" getNewFace ? 'resetArrows' : ''"/>-->
          </div>
          <!-- 协议 -->
          <agreement v-if="showAgreement"
                     :entId="userInfos.loginRes.entId"
                     :is-only-agreement="showAgreement&&!showFace"
                     @setIsSuccess="setIsSuccess"
                     @done="handleDone"></agreement>
        </div>
        <!-- 人脸识别用户提示 -->
        <div class="footer-msg zj-center" v-if="showFace">
          您当前账户的使用者为：&nbsp;{{userInfos.loginRes.userName}} <b/>需本人进行该操作，方能审批通过
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContentHeader from  './contentHeader.vue';
import Agreement from './agreement';
import FaceRecognition from './faceRecognition';
import {getMenuPower} from "@utils/menuTree";
export default {
  props: {
    userInfos: {
      type: Object,
      required: true,
      default:() => {
        return {
          loginRes: {}
        }
      }
    }
  },
  components: {
    ContentHeader,
    Agreement,
    FaceRecognition
  },
  mounted() {
    this.userHandle();
  },
  data() {
    return {
      zjControl:{
        getFaceQrode:this.$api.login.getFaceQrode,//获取二维码
        queryFaceResult:this.$api.login.queryFaceResult,//结果查询
        queryUserProtocol:this.$api.login.queryUserProtocol,//协议查询
        signUserProtocol:this.$api.login.signUserProtocol,//人脸签署
      },
      //是否成功
      isSuccess: true,
      // 是否显示人脸识别
      showFace: false,
      // 是否显示协议
      showAgreement: false,
      //是否多企业列表
      isMultipleEnt: true
    };
  },
  methods: {
    userHandle(){
      // 是否同时需要  人脸识别 与  签署协议
      if(this.userInfos.loginRes.userServiceAgreementFlag === '1' && this.userInfos.loginRes.faceCheck){
        this.showFace = true //显示二维码
        this.showAgreement = true // 显示协议
      }else if (this.userInfos.loginRes.faceCheck){
        // 只需要需要人脸识别
        this.showFace = true //显示二维码
      }else if (this.userInfos.loginRes.userServiceAgreementFlag === '1'){
        // 只需要签协议
        this.showAgreement = true // 显示协议
        this.isMultipleEnt = false
      }
    },
    /**
     * 协议请求成功
     * @param val
     */
    setIsSuccess(val) {
      this.isSuccess = val;
    },
    /**
     * 设置人脸识别的值
     * @param val
     */
    setFaceStatus (val) {
      this.showFace = val //显示二维码
    },
    /**
     * 处理成功
     */
    handleDone () {
      this.removeRow()
      this.saveInfo(this.userInfos.loginRes) // 保存所需信息
      this.$router.push('/home') //进入系统
    },
    //保存相关信息
    saveInfo(loginRes){
      // 设置项目列表
      this.$store.dispatch('enterprise/setEntList', loginRes.projectList);
      if (loginRes.entInfoList&&loginRes.entInfoList.length&&!loginRes.currentEnt) {
        this.$store.dispatch('enterprise/setEntInfo', loginRes.projectList[0]);
      } else if(loginRes.currentEnt) {
        this.$store.dispatch('enterprise/setEntInfo', loginRes.currentEnt);
      }
      // 保存菜单树
      this.$store.dispatch('menu/setMenuTreeList', JSON.parse(JSON.stringify(loginRes.resList)));
      // 保存菜单列表
      this.$store.dispatch('menu/setMenuList', JSON.parse(JSON.stringify(loginRes.resList)));
      // 保存用户信息
      this.$store.dispatch('user/setUserInfo', {
        userName: loginRes.userName,
        loginName: loginRes.loginName,
        entName: loginRes.entName,
        entType:loginRes.entType,
        entId:loginRes.entId,
        mobileNo:loginRes.mobileNo,
        power:getMenuPower(loginRes.resList),
        signZJDJBFlag:loginRes.signZJDJBFlag
      })
      //设置默认到账户中心
      this.$store.dispatch('menu/setNavMenuActive', '0')
    }
  }
};
</script>
<style lang="less" scoped>
.sign-content-body {
  position: relative;
  min-height: calc(100% - 68px - 165px) !important;
  box-sizing: border-box;
  padding: 7vh 0 3vh 0;
  color: #333;
  //居中内容
  .centerBox{
    margin:0 auto;
    height: 100%;
    width: 65%;
    //身体
    .centerBody{
      width: 70%;
      margin: auto;
      &.largeWd{
        width: 80%;
      }
      .floatBox{
        display: flex;
        justify-items: center;
        //向右箭头
        .arrowsBox{
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 45px;
            height: 53px;
            &.resetArrows{
              width: 45px;
              height: 93px;
              padding-bottom: 40px;
            }
          }
        }
      }
      //人脸识别身份
      .footer-msg{
        text-align: center;
        color: #999999;
        font-size: 14px;
        padding-top: 20px;
        b{
          display: inline-block;
          width: 22px;
        }
      }
    }
  }
}
</style>
