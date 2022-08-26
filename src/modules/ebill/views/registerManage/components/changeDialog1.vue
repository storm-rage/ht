<template>
    <el-dialog class="login" :visible.sync="show" width="700px" center :close-on-click-modal="false" @close="close"
        title="合同信息修改">
        <el-form label-width="200px" class="zj-m-t-20" v-show="mmdl">
            <!-- 合同信息修改 -->
            <el-form label-width="200px" class="zj-m-t-20">
                <zj-content-block>
                    <el-row>

                        <el-form-item label="融资合同号码：">
                            <el-input type="text" v-model="row.mainContractNo" name="loginName" size="medium" />
                        </el-form-item>
                        <el-form-item label="融资合同金额：">
                            <el-input type="text" v-model="row.mainContractSum" name="loginName" size="medium" />
                        </el-form-item>
                        <el-form-item label="转让财产价值：">
                            <el-input type="text" v-model="row.collateralSum" name="loginName" size="medium" />
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
                changeManage: this.$api.zhongdengManage.changeManage,//修改出让人
            },
            row: {},
            idList: []
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

            console.log(row, idList);
            this.show = true
            this.row = row
            this.idList = idList
        },
        save() {

            let params = {
                collateralSum: this.row.collateralSum,
                contractCurrency: this.row.contractCurrency,
                mainContractCurrency: this.row.mainContractCurrency,
                mainContractNo: this.row.mainContractNo,
                mainContractSum: this.row.mainContractSum,
                idList: [22],
            }
            console.log(params);
            this.zjControl.changeManage(params).then(res => {
                this.show = false
            })
        },
        close() {
            this.show = false
        },
    }
}
</script>

<style lang="less" scoped>
</style>