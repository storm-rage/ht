<template>
    <zj-content-container>
        <zj-content-block>
            <zj-content-block>
                <el-form label-width="200px" class="zj-m-t-20">
                    <zj-content-block>
                        <zj-header title="费用确认" />
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="form" :pager="false">
                            <zj-table-column field="type" title="登记类型" />
                            <zj-table-column field="price" title="基准价（月）" />
                            <zj-table-column field="limitTime" title="登记期限" />
                            <zj-table-column field="sum" title="合计（元）" />
                        </zj-table>
                        <p>友好提示：经国家价格主管部门批准，应收账款质押和转让登记的收费标准为初始登记、展期登记每笔30元/年；</p>
                        <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            变更登记、异议登记每笔10元；注销登记和查询不收费</p>
                    </zj-content-block>
                </el-form>
            </zj-content-block>

        </zj-content-block>
        <zj-content-footer>
            <zj-button class="back" @click="back()">返回</zj-button>
            <zj-button class="back" @click="giveup()">放弃</zj-button>
            <zj-button class="back" @click="submit()">提交</zj-button>
        </zj-content-footer>
    </zj-content-container>
</template>

<script>
export default {
    name: "toDoDetail",
    components: {
    },
    data() {
        return {
            form: [],
            dictionary: {},
            zjControl: {
                registerFee: this.$api.zhongdengManage.registerFee,//计算登记费用
                confirmFee: this.$api.zhongdengManage.confirmFee,//确认登记费用
                //     getFinancingBillInfos: this.$api.zhongdengManage.getFinancingBillInfos,//凭证信息
                //     getOtherInfoByBill: this.$api.zhongdengManage.detailspz,//凭证信息-详情
            },
            validateFlownNo: "",
            initRegisterToken2: "",

        }
    },
    created() {
        this.getApi()
        this.getRow()
        console.log(this.row);
        // this.getDictionary()
        this.getDetail()
    },
    methods: {
        submit() {
            let params = {
                initRegisterToken2: this.initRegisterToken2,
                validateFlownNo: this.validateFlownNo,
                idList: this.row.idList,
            }
            console.log(params);
            this.zjControl.confirmFee(params).then(res => {
                this.form = res.data.CalculateZhongDengRegisterFeeRes

            })
            this.goParent('zhongdengManage')
        },
        giveup() {
            this.goParent('zhongdengManage')
        },
        back() { this.$router.go(-1) },
        getDetail() {
            let params = {
                validateFlownNo: this.row.validateFlownNo,

            }
            this.zjControl.registerFee(params).then(res => {
                // console.log(res.data);
                // this.form = res.data.CalculateZhongDengRegisterFeeRes
                this.initRegisterToken2 = res.data.initRegisterToken2
                this.validateFlownNo = res.data.validateFlownNo
                this.form.unshift(res.data);
            })

        },
    },
}
</script>

<style scoped lang="less">
h1 {
    margin-bottom: 20px
}

.zz {
    width: 10px;
    height: 10px;
    margin-top: 200px;
}

.ipt {
    width: 80vw;
    height: 200px;
}
</style>