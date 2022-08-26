<template>
    <zj-content-container>
        <zj-content-block>
            <zj-content-block>
                <el-form label-width="200px" class="zj-m-t-20">
                    <zj-content-block>
                        <zj-header title="费用确认" />
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="form.phasedAgreements"
                            :pager="false">
                            <zj-table-column field="agreementNo" title="登记类型" />
                            <zj-table-column field="agreementName" title="基准价（月）" />
                            <zj-table-column field="agreementStartDate" title="登记期限" />
                            <zj-table-column field="agreementNumber" title="合计（元）" />
                        </zj-table>
                        <p>友好提示：经国家价格主管部门批准，应收账款质押和转让登记的收费标准为初始登记、展期登记每笔30元/年；</p>
                        <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             变更登记、异议登记每笔10元；注销登记和查询不收费</p>
                    </zj-content-block>
                </el-form>
            </zj-content-block>

        </zj-content-block>
        <zj-content-footer>
            <zj-button class="back" @click="goBack">返回</zj-button>
            <zj-button class="back" @click="next1()">放弃</zj-button>
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
            form: {},
            dictionary: {},
            zjControl: {
                getFinancingTransDetail: this.$api.zhongdengManage.detailssq,//融资交易查询-详情
                getFinancingTransDirectory: this.$api.zhongdengManage.getDictionary,//数据字典
                getFinancingBillInfos: this.$api.zhongdengManage.getFinancingBillInfos,//凭证信息
                getOtherInfoByBill: this.$api.zhongdengManage.detailspz,//凭证信息-详情
            },
        }
    },
    created() {
        this.getApi()
        // this.getRow()
        // console.log(this.row);
        // this.getDictionary()
        // this.getDetail()
    },
    methods: {
        // submit(){
        //     let row={
        //         a:1,
        //         b:2
        //     }
        //     this.goChild('zhongdengManagexq3',row)
        // },
        // next1(){
        //     let row={
        //         a:1,
        //         b:2
        //     }
        //     this.goChild('zhongdengManagexq3',row)
        // }
        // getDictionary() {
        //     this.zjControl.getFinancingTransDirectory().then(res => {
        //         this.dictionary = Object.assign({}, res.data)
        //     })
        // },
        // getDetail() {
        //     let params = {
        //         id: this.row.id,
        //         serialNo: this.row.serialNo,
        //     }
        //     this.zjControl.getFinancingTransDetail(params).then(res => {
        //         this.form = res.data
        //     })
        //     this.zjControl.getOtherInfoByBill(params).then(res => {
        //         this.ebillInfo.rows = res.data.rows
        //     })
        // },
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
.ipt{
    width: 80vw;
    height: 200px;
}
</style>