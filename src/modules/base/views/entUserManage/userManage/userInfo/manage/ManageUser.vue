<template>
<div class="ManageUser bg-white">
    <div class="user_manage_center_box">
        <div class="userDetail">
            <table class="userManageTable zj-static-table" cellspacing="0" cellpadding="0">
                <tr>
                    <th class="title-td">所属企业</th>
                    <td>
                        {{userInfos.entName}}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">姓名</th>
                    <td>
                        {{userInfos.userName || '-'}}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">证件</th>
                    <td>
                        <span>
                            {{typeMap(dictionary.certType,userInfos.certType)}}
                            | {{userInfos.certNo}}
                        </span>
                        <span class="zj-m-l-20" v-if="userInfos.idCardAttach && userInfos.idCardAttach.length > 0">
                            <zj-button type="text" @click="previewFile(userInfos.idCardAttach[0])">查看证件</zj-button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th class="title-td">证件有效期</th>
                    <td>
                        {{date(userInfos.certStartDate) || '-'}} 至 {{date(userInfos.certEndDate) || '-'}}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">用户名</th>
                    <td>
                        {{userInfos.loginName || '-'}}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">手机号码</th>
                    <td>
                        {{userInfos.mobileNo || '-' }}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">邮箱</th>
                    <td>
                        {{userInfos.email || '-'}}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">角色</th>
                    <td>
                        <template v-if="userInfos.roles">
                            <span v-for="(item,index) in userInfos.roles" :key="index">
                                {{ index === 0 ? '' : '、' }}
                                {{rolesFilters(item.roleId)}}
                            </span>
                        </template>
                        <template v-else> - </template>
                    </td>
                </tr>
                <tr>
                    <th class="title-td">证书类型</th>
                    <td>
                        {{
                            userInfos.userCertList ?
                            typeMap(dictionary.keyCertType,userInfos.userCertList[0].certType) : '-'
                        }}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">证书序列号</th>
                    <td>
                        {{
                        userInfos.userCertList ?
                        userInfos.userCertList[0].serialNo : '-'
                        }}
                    </td>
                </tr>
            </table>
        </div>
        <!--  管理时显示  -->
        <div class="ManageHandle" v-show="$route.meta.isManage">
            <zj-button  @click="editUserInfo" :api="zjBtn.updateUser">修改信息</zj-button>
            <zj-button @click="freeze" :api="zjBtn.freeze" v-if="userInfos.frozenState === '0'">账户冻结</zj-button>
            <zj-button @click="thaw" :api="zjBtn.unfreeze" v-if="userInfos.frozenState === '1'">账户解冻</zj-button>
            <zj-button @click="wroteOff" :api="zjBtn.cancel">账户注销</zj-button>
            <zj-button @click="resetPassword" :api="zjBtn.reset">重置密码</zj-button>
        </div>
        <div class="ManageHandle">
            <zj-button class="back" @click="goParent">返回</zj-button>
        </div>
    </div>

    <!--  修改个人信息显示  -->
    <add-edit-user ref="addEditUser" :editInfo="editInfo" :uDictionary="dictionary" @showIndex="showIndex"/>
    <!-- 查看证件 -->
  <!-- 查看器 -->
  <zj-preview :visible.sync="viewShow" :fileUrl="viewUrl" :showFooter="false" :fileType="viewType" @close="viewShow=false"/>
<!--    @close="viewClose"-->

</div>
</template>

<script>
import manage from "./js/manage.js";
export default manage
</script>

<style lang="less" src="./css/manageUser.less"></style>
<style scoped lang="less" src="./css/manageUser_scoped.less"></style>
