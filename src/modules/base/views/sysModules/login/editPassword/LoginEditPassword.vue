<template>
    <el-dialog  :visible.sync="dialogVisible"  ref="determinePassword" :show-close="false" :close-on-click-modal="false" class="determinePassword" width="450px">
        <!--   头部title     -->
        <div class="editHeader">
            修改密码
        </div>
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="140px" class="demo-ruleForm zj-p-t-30 zj-p-r-30 zj-p-b-3 zj-p-l-30">
<!--            <el-form-item label="请输入旧密码：" prop="oldPassword" style="margin-bottom: 8px">-->
<!--                <el-input type="password" v-model="passwordForm.oldPassword" maxlength="20"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item style="margin-bottom: 0">-->
<!--                <span class="promptMessage">*8-20位英文字母加数字，可含有标点符号，注意区分大小写。不能与初始密码相同</span>-->
<!--            </el-form-item>-->
            <el-form-item label="请输入新的密码：" prop="newPassword" class="zj-m-b-14">
                <el-input type="password" v-model="passwordForm.newPassword" maxlength="20" :show-password="true"></el-input>
                <i class="el-icon-success some-pwd" v-show="passwordForm.newPassword && passwordForm.againPassword && passwordForm.newPassword == passwordForm.againPassword"></i>
            </el-form-item>
            <el-form-item label="请再次输入新密码：" prop="againPassword" class="zj-m-b-25">
                <el-input type="password" v-model="passwordForm.againPassword" maxlength="20" :show-password="true"></el-input>
                <i class="el-icon-success some-pwd" v-show="passwordForm.newPassword && passwordForm.againPassword && passwordForm.newPassword == passwordForm.againPassword"></i>
                <div class="promptMessage">*8-20位英文字母加数字，可含有标点符号，注意区分大小写。不能与初始密码相同</div>
            </el-form-item>
            <el-form-item>
                <el-button :style="isSubmit? {borderColor:'#5494F2',color:'#5494F2'} : {borderColor:'',color: ''}" :disabled="!isSubmit" @click="determinePassword">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import editPassword from "./js/editPassword";
export default editPassword
</script>
<style lang="less" src="./css/loginEditPassword.less"></style>
<style scoped lang="less" src="./css/loginEditPassword_scoped.less"></style>
