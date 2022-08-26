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
                            <el-select v-model="row.industryCode" placeholder="请选择" clearable
                                :popper-append-to-body="false">
                                <el-option v-for="item in dictionary.industryCode" :key="item.code" :label="item.desc"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="企业规模：">
                            <el-select v-model="row.scale" placeholder="请选择" clearable :popper-append-to-body="false">
                                <el-option v-for="item in dictionary.entScale" :key="item.code" :label="item.desc"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-select v-model="searchForm.state" placeholder="请选择" clearable
                            :popper-append-to-body="false">
                            <el-option value="" label="全部"></el-option>
                            <el-option v-for="item in dictionary.state" :key="item.code" :label="item.desc"
                                :value="item.code">
                            </el-option>
                        </el-select> 
                        row.scale-->
                        <el-form-item label="住所：">

                            <el-cascader size="large" :options="options" v-model="selectedOptions"
                                @change="handleChange">
                            </el-cascader>
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
import { provinceAndCityData } from 'element-china-area-data'
export default {
    name: "frozenDialog",
    props: ["dictionary"],
    data() {
        return {
            options: provinceAndCityData,
            selectedOptions: [],
            mmdl: true,
            sjdl: false,
            show: false,
            phone: '',
            zjControl: {
                changePerson: this.$api.zhongdengManage.changePerson,//修改出让人
            },
            row: {},
            idList: [],
            city: "",
            province: "",
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
            this.province = value[0]
            this.city = value[1]
        },
        open(row, idList) {

            console.log(row, idList);
            this.show = true
            this.row = row
            this.idList = idList
            console.log(this.dictionary);
        },
        save() {

            let params = {
                address: this.row.address,
                city: this.city,
                // city:460100,
                corporationName: this.row.corporationName,
                debtorId: this.row.debtorId,
                industryCode: this.row.industryCode,
                organizationCode: this.row.organizationCode,
                province: this.province,
                // province:460000,
                scale: this.row.scale,
                idList: this.row.idList,
            }
            console.log(params);
            this.zjControl.changePerson(params).then(res => {
                this.show = false

                // this.getDetail()
            })
            // this.$parent.getDetail();
            // this.$emit('getDetail')
            // console.log("试图调详情接口");
            
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