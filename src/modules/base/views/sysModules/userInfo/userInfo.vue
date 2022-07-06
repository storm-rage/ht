<template>
<div class="layout-userInfo">
        <div class="layout-userInfo-centerBox">
                    <el-row>
                        <el-col :span="8">用户类型：</el-col>
                        <el-col :span="16">{{userShowInfo.roleName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">用户名：</el-col>
                        <el-col :span="16">{{userShowInfo.loginName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">姓名：</el-col>
                        <el-col :span="16">{{userShowInfo.userName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">证件号码：</el-col>
                        <el-col :span="16">{{userShowInfo.certNo ? noFilters(userShowInfo.certNo) : '-'}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">手机号码：</el-col>
                        <el-col :span="16">{{userShowInfo.mobileNo ? phoneFilters(userShowInfo.mobileNo) : '-'}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">邮箱：</el-col>
                        <el-col :span="16">{{userShowInfo.email || '-'}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">用户状态：</el-col>
                        <el-col :span="16">{{userShowInfo.state}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">注册时间：</el-col>
                        <el-col :span="16">{{userShowInfo.createDatetime}}</el-col>
                    </el-row>
                    <el-row class="searchForm zj-p-t-10 zj-p-b-0 zj-p-x-0 tf-x_30" style="text-align: left;">
                        <el-col class="searchForm-button-row w120">
                            <vxe-button class="blue" @click="editInfo('email')" :api="zjBtn.editEmail">修改邮箱</vxe-button>
                            <vxe-button class="green" @click="editInfo('password')" :api="zjBtn.editPassword">修改登录密码</vxe-button>
                        </el-col>
                    </el-row>
        </div>
        <el-dialog
                class="layout-userInfo-dialog"
                :visible.sync="editFlag"
                :close-on-click-modal="false"
                @close="editClose"
                center="center"
                width="500px"
        >

            <el-row slot="title" class="zj-f-s-20" style="font-weight: bold">{{isEmail ? '邮箱变更' : '修改登录密码'}}</el-row>
                <el-form :model="editForm" ref="editForm" :rules="editRules" class="passForm" label-width="130px">
                    <div v-if="isEmail">
                        <el-row>
                            <el-form-item label="旧邮箱：">
                                {{userShowInfo.email || '-'}}
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="email" label="新邮箱：">
                                <el-input v-model="editForm.email" maxLength="40" placeholder="请输入新邮箱" class="w300px"/>
                            </el-form-item>
                        </el-row>
                        <el-row class="zj-m-l-30" style="text-align: center;">
                            <zj-button @click="editEmail">提交</zj-button>
                        </el-row>
                    </div>
                    <div v-else>
                        <el-row>
                            <el-form-item prop="oldPassword" label="旧密码:">
                                <el-input type="password" v-model="editForm.oldPassword" maxLength="20" placeholder="" class="w300px"/>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="newPassword" label="新密码:">
                                <el-input type="password" v-model="editForm.newPassword" maxLength="20" placeholder=""  class="w300px"/>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="againPassword" label="再次输入新密码:">
                                <el-input type="password" v-model="editForm.againPassword" maxLength="20" placeholder=""  class="w300px"/>
                            </el-form-item>
                        </el-row>
                        <el-row style="text-align: center;">
                            <zj-button @click="editPassWord">提交</zj-button><zj-button @click="editClose">返回</zj-button>
                        </el-row>
                    </div>
                </el-form>
        </el-dialog>
</div>
</template>

<script>
    import userInfo from "./userInfo.js";
    export default userInfo
</script>

<style lang="less">
    .layout-userInfo-dialog{
        .el-dialog__header{
            border-bottom: none!important;
        }
        .el-dialog__body{

        }
    }
</style>

<style scoped lang="less">


.layout-userInfo{
    widel-col: 100%;
    height: 100%;
    position: relative;
    .layout-userInfo-centerBox{
        widel-col: 600px;
        height: 600px;
        margin: 0  auto;
        padding: 60px;
        .el-row{
            width: 420px;
            margin: 0 auto 10px;
            .el-col.el-col-8{
                text-align: right;
            }
            .el-col.el-col-16{
                text-indent: 30px;
            }
        }
    }
    .passForm{
        .el-form-item{
            margin-bottom: 30px!important;
        }
    }
}
</style>
