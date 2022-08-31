<template>
    <el-dialog class="login" :visible.sync="show" width="600px" center :close-on-click-modal="false"
        @close="close" title="登录">
        <el-form label-width="200px" class="zj-m-t-20" v-show="mmdl">
            <zj-content-block>
                <el-row>
                    <el-form-item label="登录名:">
                        <el-input type="text" v-model="userData.loginName" name="loginName" placeholder="请输入账户名"
                            size="medium" />
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input type="text" v-model="userData.password" show-password name="loginName"
                            placeholder="请输入密码" size="medium" />
                    </el-form-item>
                    <el-form-item label="校验码:">
                        <el-input type="number" v-model="userData.captcha" name="loginName" placeholder="请输入校验码"
                            size="medium" />
                    </el-form-item>
                    <el-form-item label="">
                        <img :src="imgCodeString" @click="getCaptcha" class="code-img" />
                    </el-form-item>
                </el-row>
            </zj-content-block>
        </el-form>
        <el-form label-width="200px" class="zj-m-t-20" v-show="sjdl">
            <zj-content-block>
                <el-row>
                    <el-form-item label="手机号:">
                        <el-input type="text" v-model="userData.mbNumber" name="loginName" size="medium" />
                    </el-form-item>
                    <el-form-item label="">
                        <zj-button class="back" @click="getcode()">获取验证码</zj-button>
                    </el-form-item>
                    <el-form-item label="验证码:">
                        <el-input type="text" v-model="userData.password" name="loginName" placeholder="请输入密码"
                            size="medium" />
                    </el-form-item>

                </el-row>
            </zj-content-block>
        </el-form>
        <el-row slot="footer" class="dialog-footer">
            <zj-button status="primary" @click="next1()" v-show="mmdl">下一步</zj-button>
            <zj-button status="primary" @click="next2()" v-show="sjdl">下一步</zj-button>
            <!-- <zj-button class="back" @click="close">取消</zj-button> -->
        </el-row>
    </el-dialog>
</template>

<script>
export default {
    name: "frozenDialog",
    // props: ["checkLogin","idlist"],
    data() {
        return {
            mmdl: true,
            sjdl: false,
            show: false,
            phone: '',
            zjControl: {
                getCode: this.$api.zhongdengManage.getCode,//获取验证码
                getPictureCode: this.$api.zhongdengManage.getPictureCode,//获取图形验证码
                zdLongin: this.$api.zhongdengManage.zdLongin,//登录中登
            },
            userData: {
                loginName: '', // 用户名
                password: '', // 密码
                captcha: '', // 图片验证码
                smsCode: '', // 手机验证码
                resId: "0",
                mbNumber: ""
            },
            imgCodeString: "",//秃瓢校验码地址
            loginToken: "",
            row:{},
        }
    },
    created() {
        // this.getApi();
        // this.getDetail();
        console.log("登录弹框的created");
    },
    methods: {
        open(row) {
            console.log("登录弹框的open");
            console.log(row);
            this.getCaptcha()
            this.show = true
            this.row=row
        },
        next1() {
            let params = {
                userCode: this.userData.loginName,
                password: this.userData.password,
                verifyCode: this.userData.captcha,
                operationStep: "1"
            }
            console.log(params);
            this.zjControl.zdLongin(params).then(res => {
                console.log(res.data);
                this.userData.mbNumber = res.data.mbNumber
                this.mmdl = false
                this.sjdl = true
            })
        },
        next2() {
            let params = {
                userCode: this.userData.loginName,
                password: this.userData.password,
                verifyCode: this.userData.captcha,
                operationStep: "2",
                loginToken: this.loginToken,
                mbNumber: this.userData.mbNumber,
                mbNumberCode: this.userData.smsCode,
            }
            console.log(params);
            this.zjControl.zdLongin(params).then(res => {
                this.show = false

                let row = this.row
                console.log(row);
                this.goChild('zhongdengManagexq1', row)
            })
        },

        close() {
            this.show = false
        },
        getcode() {
            this.zjControl.getCode().then(res => {
            })
        },
        getCaptcha() {
            this.zjControl.getPictureCode().then(res => {
                this.imgCodeString = `data:image/png;base64,${res.data.codeBase64}`
            })
        },
    }
}
</script>

<style lang="less">
</style>
