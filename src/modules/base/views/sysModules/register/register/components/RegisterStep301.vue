<template>
  <div class="register">
    <RegisterHeader/>
    <div class="register-inline">
<!--      <div class="register-tip">-->
<!--        <div class="register-tip-icon"></div>-->
<!--        <span class="zj-m-l-5">提示：如果您已经申请注册，可录入企业名称和注册使用的手机号查看注册进度以及下载资料。</span>-->
<!--      </div>-->
      <register-progress-bar :active="3"></register-progress-bar>
      <div class="register-msg">
        <div class="fa fa-circle register-point success-point"></div>
        <div class="zj-inline">
          恭喜您的注册申请已审核通过。
        </div>
      </div>
      <div class="register-desc">
<!--        【签署与填写说明】<br/>-->
        请点击“下载协议”后将资料双面打印，按照要求完成签署或盖章；并根据下表要求准备相应资料，多页需加盖骑缝章。将所有资料一并邮寄：<br/>
        收件地址：{{entInfoObj.fastMailAddress}}<br/>
        <label class="s301-sjr">收件人：</label>{{entInfoObj.fastMailName}}<br/>
        联系电话： {{entInfoObj.fastMailTel}}
      </div>
      <div class="downloadButton">
        <zj-button type="text" @click="download">下载协议</zj-button>
      </div>
      <table style="width: 87%">
        <thead>
        <th width="40">序号</th>
        <th>资料名称</th>
        <th width="80">份数</th>
        <th width="80">企业公章</th>
        <th  width="80">法人私章</th>
        </thead>
        <tbody>
        <tr>
          <td width="40">1</td>
          <td>用户注册协议</td>
          <td width="80">2</td>
          <td width="80">√</td>
          <td width="80">√</td>
        </tr>

        <tr>
          <td width="40">2</td>
          <td>授权确认书</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr>
          <td width="40">3</td>
          <td>个人信息授权书</td>
          <td width="80">1</td>
          <td width="80"></td>
          <td width="80"></td>
        </tr>
        <tr>
          <td width="40">4</td>
          <td>用户操作权限申请表</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr>
          <td width="40">5</td>
          <td>营业执照（副本）复印件</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr>
          <td width="40">6</td>
          <td>经办员与复核员证件复印件</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr>
          <td width="40">7</td>
          <td>风险信息接收人证件复印件</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr>
          <td width="40">8</td>
          <td>法人身份证复印件</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr>
          <td width="40">9</td>
          <td>公司开票信息</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>

        <tr v-if="entInfoObj.entType === 'S'">
          <td width="40">10</td>
          <td>与邀请企业的“贸易合同复印件”或“银行转账凭证复印件”或“银行背书记录(间接供应商需提供)</td>
          <td width="80">1</td>
          <td width="80">√</td>
          <td width="80"></td>
        </tr>
        </tbody>
      </table>
      <div class="zj-center">
        <zj-button @click="zjControl.toLogin">返回登录</zj-button>
      </div>
    </div>
    <RegisterFooter/>
  </div>
</template>

<script>
import RegisterProgressBar from './RegisterProgressBar.vue'
import RegisterHeader from "./RegisterHeader.vue";
import RegisterFooter from "./RegisterFooter.vue";
export default {
  name: 'RegisterStep301',
  components: {
    RegisterProgressBar,RegisterHeader,RegisterFooter
  },
  props: {
    step: String,
    entInfoObj:Object,
    zjControl:Object
  },
  methods:{
    download(){
      this.zjControl.downloadRegisterZip()
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #EEEEEE;
  /*background-color: #E7E7E7;*/
  z-index: -9999;
  overflow-y: auto;
}
.register-inline {
  position: relative;
  z-index: -9998;
  width: 800px;
  margin: 20px auto 30px;
  background: #FFFFFF;
  box-shadow: 0 1px 5px 0 rgba(133,133,133,0.50);
  padding: 20px 0 20px 0;

  table{ border-collapse:collapse; width: 50%;margin: 20px 0 20px 50px;}
  th,td{ border:#ccc solid 1px; padding:5px;text-align: center}
  tr td:nth-of-type(2) {
    text-align: left;
  }
}
.register-tip {
  background: #E2F1FF;
  border: 1px solid #5494F2;
  width: 553px;
  margin: 0 auto;
  font-size: 12px;
  color: #666666;
  line-height: 16px;
  padding: 3px 10px;
}
.register-tip-icon {
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  background: url(~@assets/img/register/icon-tip.png) no-repeat center;
}
.register-msg {
  background: #F4F9FF;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  margin: 20px 50px;
  padding: 10px 20px;
}
.register-point {
  display: inline-block;
  color: rgb(84, 148, 242);
  vertical-align: top;
  margin-top: 4px;
  margin-right: 5px;
  transform: scale(0.5);
}

.success-point{
    color: rgb(145,212,92);
}

.register-desc {
  padding: 0 50px;
  color: rgba(153, 153, 153, 0.97);
}
  .downloadButton{
    text-align: center;
    margin-left: 40px;
  }
  .s301-sjr{
    margin-left: 0.9em;
  }
</style>
