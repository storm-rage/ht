<template>
<!-- 我的基本信息 -->
<div id="myBasicInformation">
  <div class="mbi-center-box">
    <el-collapse ref="elCollapse" class="zjcoll-noSelect" v-model="activeNames">
      <el-collapse-item name="ent" class="ent" :disabled="true">
        <!--  标题   -->
        <h4 slot="title" class="orderTitle">您的企业信息</h4>

        <table class="order-table" cellspacing="0">
          <tr>
            <th>企业名称</th><td>{{entInfo.name}}</td>
          </tr>
          <tr>
            <th>统一社会信用代码</th><td>{{entInfo.bizLicence}}</td>
          </tr>
          <tr>
            <th>纳税人识别号</th><td>{{entInfo.invoiceTaxpayerId}}</td>
          </tr>
          <tr>
            <th>法定代表人姓名</th><td>{{entInfo.legalPersonName}}</td>
          </tr>
          <tr>
            <th>注册地址</th><td>{{entInfo.provinceZh + '  ' + entInfo.cityZh+'  '+entInfo.address}}</td>
          </tr>
          <tr>
            <th>公司类型</th><td>{{entInfo.entType}}</td>
          </tr>
          <tr>
            <th>经营范围</th><td>{{''}}</td>
          </tr>
          <tr>
            <th>曾用名</th><td>{{entInfo.beforeName}}</td>
          </tr>
        </table>
      </el-collapse-item>

      <el-collapse-item name="user" class="user" :disabled="true">
        <!--  标题   -->
        <h4 slot="title" class="orderTitle">您的个人信息</h4>

        <table class="order-table" cellspacing="0">
          <tr>
            <th>姓名</th><td>{{userInfos.userName}}</td>
          </tr>
          <tr>
            <th>登录名</th><td>{{userInfos.loginName}}</td>
          </tr>
          <tr>
            <th>平台角色</th><td>{{userInfos.roleName}}</td>
          </tr>
          <tr>
            <th>绑定手机</th><td>{{userInfos.mobileNo}}</td>
          </tr>
          <tr>
            <th>邮箱地址</th>
            <td>
              <el-form ref="form" :model="userInfos" :rules="userRules">
                <el-form-item prop="email" class="zj-m-b-0">
                  <span class="zj-m-r-10" v-show="!editFlag">{{userInfos.email}}</span>
                  <el-input v-model="userInfos.email" class="zj-m-r-10" v-show="editFlag"/>
                  <span v-show="editFlag" v-if="zjBtn.updateUserInfo">
                <zj-button type="text" @click="save">保存</zj-button>
                <zj-button type="text" @click="cancel">取消</zj-button>
              </span>
                  <span v-show="!editFlag" v-if="zjBtn.updateUserInfo">
                <zj-button  type="text" @click="edit">修改</zj-button>
              </span>
                </el-form-item>
              </el-form>
            </td>
          </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
  </div>

</div>
</template>

<script>
    import {validateEmail} from "@utils/rules";

    export default {
        name: "myBasicInformation",
        data(){
          return {
            activeNames:['ent','user'],
            zjControl:{
              getEntInfo:this.$api.myBasicInformation.getEntInfo,//企业信息
              getUserInfo:this.$api.myBasicInformation.getUserInfo,//个人信息
              updateUserInfo:this.$api.myBasicInformation.updateUserInfo,//修改邮箱地址
            },
            entInfo:{},
            userInfos:{},
            oldUserInfo:{},
            userRules:{
              email:[{required:false,validator:validateEmail,trigger: 'blur'}],
            },
            editFlag:false, //修改状态
          }
        },
        created() {
          this.getEntInfo()
          this.getUserInfo()
          this.getApi()
        },
        methods:{
          //获取企业信息
          getEntInfo(){
            this.zjControl.getEntInfo().then(res => {
              this.entInfo = res.data
            })
          },
          //获取个人信息
          getUserInfo(){
            this.zjControl.getUserInfo().then(res => {
              this.userInfos = res.data
            })
          },
          edit(){
            this.oldUserInfo = Object.assign({},this.userInfos)
            this.editFlag = true
          },
          //取消
          cancel(){
            this.editFlag = false
            this.userInfos.email = this.oldUserInfo.email
            this.$refs.form.clearValidate()
          },
          //保存
          save(){
            if(!this.userInfos.email){
              return this.$log.alert('请填写邮箱地址！')
            }
            this.$refs.form.validate(boo => {
              if(!boo){return}
              let params = {
                email:this.userInfos.email,
                userId:this.userInfos.id
              }
              this.zjControl.updateUserInfo(params).then(() => {
                this.editFlag = false
                this.$Message.success('邮箱地址修改成功！')
              })
            })
          }
        }
    }
</script>

<style lang="less">
#myBasicInformation{
    width: 100%;
    height: 100%;
    min-height: 400px;
    background: url("~@assets/img/accountCenter/myBasicInformation.png") no-repeat;
    background-size: 100% 250px;
    position: relative;
  .mbi-center-box {
    position: absolute;
    left: 5%;
    top: 10%;
    right: 5%;
    bottom: 10%;
    padding-top: 20px;
    /*height: 100%;*/
    background: white;
    .order-title{
      display: block;
      padding:1px 0 1px 5px;
      border-left: 7px solid #4A90E1;
    }
    .order-table{
      border:1px solid #EDEDED;
      width: 94%;
      margin: 0 3%;
      th{
        background: #EFF6FF;
        width: 20%;
        text-align: right;
        padding-right: 2%;
      }
      td{
        width: 80%;
        padding-left: 2%;
      }
    }
  }
    .ent,.user{
      .el-row{
        label{
          display: inline-block;
          text-align: right;
          width: 120px;
          margin-right: 10px;
          color: #999;
        }
      }
    }
    .user{
      .el-form-item__label{
        padding-right: 0!important;
        margin-right: 0!important;
      }
      .el-form-item__error{
        padding-left: 8px;
      }
    }
}
</style>
