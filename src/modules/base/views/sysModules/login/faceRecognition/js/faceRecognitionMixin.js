import LoginHeader from '../../components/LoginHeader'
import LoginFooter from '../../components/LoginFooter'
export default {
    name: "FaceRecognition",
    components: {
        LoginHeader,LoginFooter
    },
    methods:{
      mapMethod(){
        let obj = this.agreeList.find(item => item.coreEntName === this.agreeEntActive)
        return obj ? obj.coreEntName : ''
      },
    },
    mounted() {
      this.getRow()
      this.userInfos = Object.assign({},this.row)
      this.userName = this.userInfos.loginRes.userName
      // 人脸识别所需信息 -- yanyangkai
      // this.qrodeData = {
      //     // icno:'452224199712302014', // newInfo.loginRes.icon
      //     loginName: newInfo.loginInfo.loginName,
      //     // userName:newInfo.loginRes.userName
      // }
      // 人脸识别所需信息
      this.qrodeData = {
        loginName: this.userInfos.loginRes.loginName
      }
      // 发生变化立即查询是否需要人脸识别以及签协议
      this.userHandle()
    },
    beforeRouteLeave(to,from,next){
      if(to.name !== 'faceRecognition'){
        localStorage.removeItem('faceRecognitionData')
      }
      next()
    }
}
