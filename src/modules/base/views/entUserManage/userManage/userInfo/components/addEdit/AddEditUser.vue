<template>
<el-dialog
   class="AddUser"
   :show-close="false"
   :center="true"
   :close-on-click-modal="false"
   width="45%"
   :visible.sync="show"
>
    <!--  头部信息  -->
    <span slot="title" class="dialog-title">{{isAdd ? '新增用户' : '修改信息'}}</span>
    <!--  中间表单  -->
    <el-form :model="addFormData" :rules="addFormRules" ref="addFormData" label-width="110px" class="demo-ruleForm">
        <el-form-item label="所属企业：" prop="entId" :class="this.isAdd ? 'required' : ''">
            <!--    新增时   -->
            <el-select v-model="addFormData.entId" filterable
                       placeholder="请选择" v-if="isAdd"
                       :popper-append-to-body="false"
            >
                <template v-if="selectList && selectList.enterprises">
                    <el-option
                      v-for="item in selectList.enterprises"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </template>
            </el-select>
            <!--    修改时   -->
            <span v-else>
                {{addFormData.entName || '-'}}
            </span>
        </el-form-item>
        <el-form-item label="姓名：" prop="userName" class="required">
        <el-input v-model="addFormData.userName"></el-input>
      </el-form-item>
        <el-form-item label="用户名：" :prop="this.isAdd ?'loginName' : ''" :class="this.isAdd ? 'required' : ''">
            <!--    新增时   -->
            <el-input v-model="addFormData.loginName" v-if="isAdd"></el-input>
            <!--    修改时   -->
            <span v-else>{{addFormData.loginName}}</span>
        </el-form-item>
        <el-form-item label="证件类型：" prop="certType" class="required">
            <el-select v-model="addFormData.certType"
                       filterable placeholder="请选择"
                       :popper-append-to-body="false"
                       @change="certTypeChange"
            >
                <template v-if=" uDictionary && Array.isArray(uDictionary.certType)">
                    <el-option
                            v-for="item in uDictionary.certType"
                            :key="item.code"
                            :label="item.desc"
                            :value="item.code">
                    </el-option>
                </template>
            </el-select>
        </el-form-item>
        <el-form-item label="证件号码：" prop="certNo" class="required">
            <el-input v-model="addFormData.certNo"></el-input>
        </el-form-item>
        <el-form-item label="证件有效期：" class="certDate required" prop="certStartDate">
            <zj-date-range-picker  class="searchFormDate"
                   :startDate.sync="addFormData.certStartDate"
                   :endDate.sync="addFormData.certEndDate"
                   @startChange="certStartChange"
                   @endChange="certEndChange"
            />
            <el-form-item prop="certEndDate" class="certEndDate"/>
        </el-form-item>
        <el-form-item label="手机号码：" prop="mobileNo" class="required">
            <el-input v-model="addFormData.mobileNo"/>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email" class="required">
            <el-input v-model="addFormData.email"/>
        </el-form-item>
        <el-form-item label="角色：" prop="roles" class="required">
            <el-row v-show="addFormData.roles ? addFormData.roles.length > 0 : false" class="roleList">
                <el-tag
                    size="medium"
                    v-for="(item,index) in addFormData.roles"
                    :key="index"
                    closable
                    @close="removeRole(item)">
                        {{selectList.rolesFilters(item.roleId)}}
                </el-tag>
            </el-row>

            <el-row><!-- class="roleOption" -->
                <el-select v-model="roleTran" filterable
                           placeholder="请选择" @change="addRole"
                           :popper-append-to-body="false"
                >
                    <el-option
                            v-for="item in selectList.roles"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled"
                    >
                    </el-option>
                </el-select>
<!--                <el-button-->
<!--                        style="color: #000;border-color: #000"-->
<!--                        type="warning"-->
<!--                        plain-->
<!--                        size="mini"-->
<!--                        @click="addRole">-->
<!--                        新增-->
<!--                </el-button>-->
            </el-row>
        </el-form-item>
        <el-form-item label="证件扫描件：" prop="idCardAttach">
            <zj-button type="text" class="zj-m-r-15" style="text-decoration: underline" @click="downFile(addFormData.idCardAttach[0])">
                {{
                    addFormData.idCardAttach ?
                    (addFormData.idCardAttach.length > 0 ?
                    addFormData.idCardAttach[0].fileName || addFormData.idCardAttach[0].attachName : '') : ''
                }}
            </zj-button>
            <zj-upload class="zj-m-r-10"
                       :httpRequest="certUpload"
                       style="display: inline-block"
            >
                <zj-button type="text">
                    {{
                        addFormData.idCardAttach ?
                        (addFormData.idCardAttach.length > 0 ? '重新上传' : '上传附件' ) :
                        '上传附件'
                    }}
                </zj-button>
            </zj-upload>
            <zj-button type="text" @click="$delete(addFormData.idCardAttach,0)"
                       v-if="addFormData.idCardAttach && addFormData.idCardAttach.length>0">删除</zj-button>
        </el-form-item>
    </el-form>
    <!--  底部按钮  -->
    <span slot="footer" class="dialog-footer">
        <zj-button class="save-btn" @click="save">{{isAdd?'保 存' : '提 交'}}</zj-button>
        <zj-button class="back" @click="showOff">取 消</zj-button>
    </span>
</el-dialog>
</template>

<script>
import addedit from "./js/addEdit.js";
export default addedit
</script>

<style lang="less" src="./css/addEdit.less" />
