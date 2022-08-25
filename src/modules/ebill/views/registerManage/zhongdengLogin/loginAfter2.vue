<template>
    <zj-content-container>
        <zj-content-block>
            <zj-content-block>
                <el-form label-width="200px" class="zj-m-t-20">
                    <zj-content-block>
                        <zj-header title="填表人/基本信息" />
                        <el-row>
                            <el-form-item label="填表人名称：">{{ form.workflowState }}</el-form-item>
                            <el-form-item label="填报人住所：">{{ form.workflowState }}</el-form-item>
                            <el-form-item label="交易业务类型：">{{ form.workflowState }}</el-form-item>
                            <el-form-item label="登记期限（月）：">{{ form.workflowState }}</el-form-item>
                            <el-form-item label="登记到期日：">{{ form.workflowState }}</el-form-item>
                            <el-form-item label="填表人归档号：">{{ form.workflowState }}</el-form-item>
                        </el-row>
                    </zj-content-block>
                    <zj-content-block>
                        <zj-header title="出让人信息" />
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="form.phasedAgreements"
                            :pager="false">
                            <zj-table-column field="agreementNo" title="名称" />
                            <zj-table-column field="agreementName" title="类型" />
                            <zj-table-column field="agreementStartDate" title="组织机构代码/统一社会信用代码/金融机构填码" />
                            <zj-table-column field="agreementStartDate" title="住所" />
                            <zj-table-column field="agreementStartDate" title="工商注册号/统一社会信用代码/事业单位法人证书号/机构注册登记证号" />
                            <zj-table-column field="agreementEstimateEndDate" title="法定代表人/负责人" />
                            <zj-table-column field="agreementNumber" title="全球法人机构识别码" />
                        </zj-table>
                    </zj-content-block>
                    <zj-content-block>
                        <zj-header title="受让人信息" />
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="form.phasedAgreements"
                            :pager="false">
                            <zj-table-column field="agreementNo" title="名称" />
                            <zj-table-column field="agreementName" title="类型" />
                            <zj-table-column field="agreementStartDate" title="组织机构代码/统一社会信用代码/金融机构填码" />
                            <zj-table-column field="agreementStartDate" title="住所" />
                            <zj-table-column field="agreementStartDate" title="工商注册号/统一社会信用代码/事业单位法人证书号/机构注册登记证号" />
                            <zj-table-column field="agreementEstimateEndDate" title="法定代表人/负责人" />
                            <zj-table-column field="agreementNumber" title="全球法人机构识别码" />
                        </zj-table>
                    </zj-content-block>
                    <zj-content-block>
                        <zj-header title="转让财产信息" />
                        <!-- <zj-header title="合同信息" /> -->
                        <h1>合同信息</h1>
                        <zj-table ref="searchTable" class="zj-search-table" :dataList="form.phasedAgreements"
                            :pager="false">
                            <zj-table-column field="agreementNo" title="融资合同号码" />
                            <zj-table-column field="agreementName" title="融资合同币种" />
                            <zj-table-column field="agreementStartDate" title="融资合同金额" />
                            <zj-table-column field="agreementEstimateEndDate" title="转让财产币种" />
                            <zj-table-column field="agreementNumber" title="转让财产价值" />
                            <zj-table-column title="操作">
                                <template v-slot="{ row }">
                                    <zj-button type="text">修改{{ row.aaa }}</zj-button>
                                </template>
                            </zj-table-column>
                        </zj-table>
                        <h1>转让财产描述信息</h1>
                        <strong>转让财产描述</strong>
                        <div class="ipt">
                            玛卡巴卡
                        </div>
                        <!-- <el-input type="textarea" :rows="3" :autosize="{ mixRows: 5, maxRows: 5 }" placeholder="请输入" /> -->
                        <strong>转让财产附件</strong>
                              <br>  附件***上传
                        <div class="zz"></div>
                    </zj-content-block>

                </el-form>
            </zj-content-block>

        </zj-content-block>
        <zj-content-footer>
            <zj-button class="back" @click="goParent">返回</zj-button>
            <zj-button class="back" @click="next()">提交</zj-button>
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
        this.getRow()
        console.log(this.row);
        // this.getDictionary()
        // this.getDetail()
    },
    methods: {
        next(){
            let row={
                a:1,
                b:2
            }
            this.goChild('zhongdengManagexq3',row)
        }
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