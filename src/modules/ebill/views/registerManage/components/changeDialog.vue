<template>
    <el-dialog class="login" :visible.sync="show" width="700px" center :close-on-click-modal="false" @close="close"
        title="出让人信息修改">
        <el-form label-width="200px" class="zj-m-t-20" v-show="mmdl">
            <!-- 出让人信息修改 -->
            <el-form label-width="200px" class="zj-m-t-20">
                <zj-content-block>
                    <el-row>
                        <el-form-item label="出让人名称：">{{ row.debtorName }}</el-form-item>
                        <!-- <el-form-item label="出让人名称："> 
                             <el-input type="text" v-model="row.debtorName" name="loginName" size="medium" />
                        </el-form-item> -->
                        <el-form-item label="出让人类型：">{{ row.debtorType }}</el-form-item>
                        <el-form-item label="统一社会信用代码：">
                            <el-input type="text" v-model="row.organizationCode" name="loginName" size="medium" />
                        </el-form-item>
                        <el-form-item label="法人名称：">
                            <el-input type="text" v-model="row.corporationName" name="loginName" size="medium" />
                        </el-form-item>
                        <el-form-item label="所属行业：">
                            <el-input type="text" v-model="row.industryCode" name="loginName" size="medium" />
                        </el-form-item>
                        <el-form-item label="企业规模：">
                            <el-input type="text" v-model="row.scale" name="loginName" size="medium" />
                        </el-form-item>
                        <el-form-item label="住所：">
                            无家可归
                            <!-- <el-cascader size="large" :options="options" v-model="selectedOptions"
                                @change="handleChange">
                            </el-cascader> -->
                        </el-form-item>
                        <el-form-item label="详细地址：">
                            <el-input type="textarea" v-model="row.address" name="loginName" :rows="3" />
                        </el-form-item>
                    </el-row>
                </zj-content-block>
            </el-form>
        </el-form>
        <el-form label-width="200px" class="zj-m-t-20" v-show="sjdl">

        </el-form>
        <el-row slot="footer" class="dialog-footer">
            <zj-button status="primary" @click="save()">提交</zj-button>
        </el-row>
    </el-dialog>
</template>

<script>
// import { provinceAndCityData } from 'element-china-area-data'
export default {
    name: "frozenDialog",
    // props: ["idlist"],
    data() {
        return {
            // options: provinceAndCityData,
            // selectedOptions: [],
            mmdl: true,
            sjdl: false,
            show: false,
            phone: '',
            zjControl: {
                changePerson: this.$api.zhongdengManage.changePerson,//修改出让人
            },
            row: {},
            idList:[]
        }
    },
    created() {
        this.getApi()
        this.getRow()
        console.log(this.row, "传来的row");
        // this.getDictionary()
        // this.getDetail()
    },
    methods: {
        handleChange(value) {
            console.log(value)
        },
        open(row, idList) {

            console.log(row,idList);
            this.show = true
            this.row = row
            this.idList=idList
        },
        save() {

            let params = {
                address:this.row.address,
                // city:this.row.city,
                city:460100,
                corporationName:this.row.corporationName,
                debtorId:this.row.debtorId,
                industryCode:this.row.industryCode,
                organizationCode:this.row.organizationCode,
                // province:this.row.province
                province:460000,
                scale:this.row.scale,
                idList:[22],
            }
            console.log(params);
            this.zjControl.changePerson(params).then(res => {
                this.show = false
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

<style lang="less" scoped>
.city {
    width: 10px;

}
</style>