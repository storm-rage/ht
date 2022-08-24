<template>
    <zj-content-container>
        <!-- 中登-凭证融资详情  -->
        <zj-top-header title="融资交易详情"></zj-top-header>
        <zj-content-block v-if="workflow === 'sqxx'">
            <el-form :model="form" ref="form" label-width="200px" class="zj-m-t-20">
                <zj-content-block>
                    <zj-header title="交易信息" />
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="融资流水号：">{{ sqxx.serialNo }}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="融资产品：">{{ sqxx.financingProductType }}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="申请时间：">{{ sqxx.applyDatetime }}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="业务状态：">{{ sqxx.workflowState }}</el-form-item>
                    </el-row>
                </zj-content-block>
                <zj-content-block>
                    <zj-header title="融资申请信息" />
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="融资企业：">{{ sqxx.fromEntName }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="融资金额：">{{ sqxx.buyerEntName }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="融资折扣率：">{{ sqxx.interestRate }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="买方企业名称：">{{ sqxx.buyerEntName }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="融资月利率：">{{ sqxx.interestRate }}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="融资申请金额：">
                                {{ sqxx.tranAmt }}
                                <div>{{ digitUp(sqxx.tranAmt) }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="申请转让金额：">
                                {{ sqxx.tranAmt }}
                                <div>
                                    <zj-content-tip text="（申请转让金额 = 融资申请金额/折扣率）" v-if="sqxx.tranAmt"></zj-content-tip>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="融资开始日：">{{ sqxx.loanDate }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="融资到期日：">{{ sqxx.expireDate }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="融资月利率：">{{ sqxx.interestRate }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="融资开始日：">{{ sqxx.loanDate }}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="预计融资期限：">
                                {{ date(sqxx.estimateTimeStart) }}
                                {{ sqxx.estimateTimeEnd ? `至` + date(sqxx.estimateTimeEnd) : '' }}
                                {{ sqxx.totalDay ? `共${sqxx.totalDay}天` : '' }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="预计利息：">
                                {{ sqxx.interestAmt }}
                                <div>
                                    <zj-content-tip text="（预计利息 = 融资申请金额*融资月利率/30*预计融资天数）" v-if="form.interestAmt">
                                    </zj-content-tip>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <zj-collapse title="收款账户" class="zj-m-t-10">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收款账户户名：">{{ sqxx.receiptAcctName }}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="收款银行开户行：">{{ sqxx.receiptBankName }}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="收款银行银行账号：">{{ sqxx.receiptAcctNo }}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收款银行联行号：">{{ sqxx.receiptBankNo }}</el-form-item>
                            </el-col>
                        </el-row>
                    </zj-collapse>
                    <zj-table ref="searchTable" class="zj-search-table" :dataList="sqxx.phasedAgreements" :pager="false"
                        v-if="row.financingProductType === '0'">
                        <zj-table-column field="agreementNo" title="阶段性协议编号" />
                        <zj-table-column field="agreementName" title="阶段性协议名称" />
                        <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date" />
                        <zj-table-column field="agreementEstimateEndDate" title="协议到期日" :formatter="date" />
                        <zj-table-column field="agreementNumber" title="数量" />
                        <zj-table-column field="price" title="单价" :formatter="money" />
                        <zj-table-column field="agreementEstimatedPrice" title="协议预估总价" :formatter="money" />
                        <zj-table-column field="agreementStatus" title="状态" />
                        <zj-table-column field="fileName" title="附件" />
                        <zj-table-column title="操作">
                            <template v-slot="{ row }">
                                <zj-button type="text" @click="attaDownLoad(row)">下载</zj-button>
                            </template>
                        </zj-table-column>
                        <el-row slot="pager-left" class="slotRows">
                            订单预估总额：{{ moneyNoSynbol(sqxx.totalAmt) }}
                        </el-row>
                    </zj-table>
                    <zj-table ref="searchTable" class="zj-search-table" :dataList="sqxx.phasedAgreements" :pager="false"
                        v-if="row.financingProductType !== '0'">
                        <zj-table-column field="agreementNo" title="凭证编号" />
                        <zj-table-column field="agreementName" title="原始凭证编号" />
                        <zj-table-column field="agreementStartDate" title="凭证签发人" />
                        <zj-table-column field="agreementEstimateEndDate" title="转让企业" />
                        <zj-table-column field="agreementNumber" title="凭证金额" :formatter="money" />
                        <zj-table-column field="price" title="凭证持有日期" :formatter="date" />
                        <zj-table-column field="agreementEstimatedPrice" title="凭证到期日" :formatter="date" />
                        <el-row slot="pager-left" class="slotRows">
                            凭证金额合计：{{ moneyNoSynbol(form.totalAmt) }}
                        </el-row>
                    </zj-table>
                </zj-content-block>
                <zj-content-block>
                    <zj-header title="协议信息" />
                    <zj-table ref="searchTable" class="zj-search-table" :dataList="sqxx.financingAgreement"
                        :pager="false">
                        <zj-table-column field="seq" title="序号" />
                        <zj-table-column field="agreementNo" title="协议编号" />
                        <zj-table-column field="fileName" title="协议名称" />
                        <zj-table-column title="操作">
                            <template v-slot="{ row }">
                                <zj-button type="text" @click="agreementDownLoad(row.fileId)">下载</zj-button>
                            </template>
                        </zj-table-column>
                    </zj-table>
                </zj-content-block>
                <zj-content-block>
                    <zj-header title="保理合同信息" />
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="保理合同编号：">{{ sqxx.contractNo }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="保理类型：">{{ sqxx.contractType }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="总金额：">{{ sqxx.factoringCreditAmount }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="合同金额：">{{ sqxx.contractAmount }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="剩余可用金额：">{{ sqxx.availableCreditAmount }}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="剩余可用金额：">{{ sqxx.availableCreditAmount }}</el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType === '0'">
                            <el-form-item label="额度有效期：">{{ date(form.factoringCreditStartDate) }}
                                {{ sqxx.factoringCreditStartDate ? `至${date(sqxx.factoringCreditStartDate)}` : '' }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="row.financingProductType !== '0'">
                            <el-form-item label="保理合同到期日：">{{ sqxx.availableCreditAmount }}</el-form-item>
                        </el-col>
                    </el-row>
                </zj-content-block>
                <zj-content-block v-if="row.financingProductType !== '0'">
                    <zj-header title="总控额度信息" />
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="供应商总控额度：">{{ sqxx.contractNo }}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="剩余可用额度：">{{ sqxx.contractNo }}</el-form-item>
                        </el-col>
                    </el-row>
                </zj-content-block>
                <zj-content-block>
                    <zj-header title="其他附件" />
                    <zj-table ref="searchTable" class="zj-search-table" :dataList="form.otherAttachs" :pager="false">
                        <zj-table-column field="seq" title="序号" />
                        <zj-table-column field="bizType" title="附件类型" />
                        <zj-table-column field="addNote" title="补充说明" />
                        <zj-table-column title="操作">
                            <template v-slot="{ row }">
                                <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
                            </template>
                        </zj-table-column>
                    </zj-table>
                </zj-content-block>
                <!--  操作记录  -->
                <operate-log  />
                <!-- :logList="form.operEbTranTxListLogs" -->
            </el-form>
        </zj-content-block>

        <zj-content-block v-if="workflow === 'pzxx'">
            <el-content-block>
                <zj-header title="凭证信息" />
                <zj-table ref="searchTable" class="zj-search-table" :dataList="list"
                    :radio-config="{ highlight: true }">
                    <zj-table-column type="radio" width="40" />
                    <zj-table-column field="voucherNo" title="凭证编号" />
                    <zj-table-column field="voucherNo" title="原始凭证编号" />
                    <zj-table-column field="voucherSigner" title="凭证签发人" />
                    <zj-table-column field="entName" title="转让企业" />
                    <zj-table-column field="voucherAcc" title="签发日期" :formatter="date" />
                    <zj-table-column field="voucherAcc" title="凭证金额" :formatter="money" />
                    <zj-table-column field="voucherAcc" title="凭证到期日" :formatter="date" />
                </zj-table>
            </el-content-block>
            <el-content-block>
                <zj-header title="对账单信息-${}" />
                <zj-table ref="searchTable" :dataList="list" :radio-config="{ highlight: true }">
                    <!-- <zj-table-column type="radio" width="40"/> -->
                    <zj-table-column field="field2" title="对账单名称" />
                    <zj-table-column field="field3" title="买方名称" />
                    <zj-table-column field="field5" title="供应商业务系统编码" />
                    <zj-table-column field="field5" title="供应商名称" />
                    <zj-table-column field="field5" title="对账日期" :formatter="date" />
                    <zj-table-column field="field5" title="入库日期" :formatter="date" />
                    <zj-table-column field="field5" title="预计付款日期" :formatter="date" />
                    <zj-table-column field="field5" title="对账单金额" :formatter="money" />
                    <zj-table-column field="field5" title="是否申请开立债权凭证"
                        :formatter="(obj) => typeMap(dictionary, obj.cellValue)" />
                    <zj-table-column field="field5" title="对账人" />
                    <zj-table-column field="field5" title="对账单来源" />
                </zj-table>
            </el-content-block>
            <el-content-block>
                <zj-header title="贸易背景资料（资产编号：12345）" />
                <el-tabs v-model="tabs" class="zj-tabs-card">
                    <el-tab-pane label="贸易合同信息" name="tradeContract">
                        <el-form :model="form" label-width="200px" v-if="form">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="贸易合同编号：">{{ form.contractNo }}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="买方：">{{ form.buyerSigner }}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="卖方：">{{ form.sellerSigner }}</el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="合同期限（月）：">{{ form.contractMonthLimit }}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同金额：">{{ form.contractAmt }}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="签订日期：">{{ form.signDate }}</el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="货物名称：">
                                        {{ form.goodsName }}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同附件：">
                                        <div class="atta-name-box">
                                            <span class="atta-name">
                                                {{ form.fileName }}
                                            </span>
                                            <zj-button type="text" @click="attaDownload">下载</zj-button>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="阶段性协议编号：">{{ form.agreementNo }}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="阶段性协议名称：">{{ form.agreementName }}</el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="发票信息" name="invoice">
                        <zj-table ref="searchTable" :dataList="invoiceList">
                            <zj-table-column field="invoiceType" title="发票类型" />
                            <zj-table-column field="invoiceNumber" title="发票号码" />
                            <zj-table-column field="invoiceCode" title="发票代码" />
                            <zj-table-column field="sellAmount" title="发票金额" />
                            <zj-table-column field="seller" title="销售方" />
                            <zj-table-column field="buyer" title="购买方" />
                            <zj-table-column field="invoiceDate	" title="发票日期" :formatter="date" />
                            <zj-table-column field="fileName" title="发票附件" />
                            <zj-table-column title="操作" fixed="right">
                                <template v-slot="{ row }">
                                    <zj-button type="text" @click="downs(row)">下载</zj-button>
                                </template>
                            </zj-table-column>
                        </zj-table>
                    </el-tab-pane>
                    <el-tab-pane label="其他附件" name="attaList">
                        <zj-table ref="searchTable" :dataList="attaList">
                            <zj-table-column type="seq" title="序号" />
                            <zj-table-column field="fileName" title="文件名称" />
                            <zj-table-column title="操作" fixed="right">
                                <template v-slot="{ row }">
                                    <zj-button type="text" @click="downs(row)">下载</zj-button>
                                </template>
                            </zj-table-column>
                        </zj-table>
                    </el-tab-pane>
                </el-tabs>
            </el-content-block>
        </zj-content-block>

        <!-- 底部工作流状态 -->
        <zj-workflow v-model="workflow" :list="workflowList">
            <!-- 审核时 -->
            <el-row slot="right">
                <el-row class="btn-w85 zj-center">
                    <zj-button class="back" @click="goParent">返回</zj-button>
                </el-row>
            </el-row>
        </zj-workflow>

    </zj-content-container>
</template>

<script>
import operateLog from "@modules/workflow/views/components/operateLog";
export default {
    name: "toDoDetail",
    components: {
        operateLog,
    },
    created() {
        this.getApi()
        // this.getDictionary()
        this.getRow()
        console.log(this.row);
    },
    data() {
        return {
            zjControl: {
                detailssq: this.$api.zhongdengManage.detailssq,//中登-融资详情申请信息
                detailspz: this.$api.zhongdengManage.detailspz,//中登-融资详情凭证信息
            },
            form: {},
            detail: {},
            tabs: 'tradeContract',
            uDictionary: {},
            mDictionary: {},
            pzxx: {},//凭证信息详情
            sqxx: {},//申请信息详情
            workflow: 'sqxx',
            workflowList: [
                { label: '申请信息', value: 'sqxx' }, { label: '凭证信息', value: 'pzxx' }
            ],
            list: [
                {
                    field1: 'scm00001',
                    field2: '某某产品一号',
                    field3: '上游',
                    field4: '订单保理',
                    field5: '2022.09.08 11:18:19',
                    field6: '生效',
                    field7: '是'
                }
            ],

        }
    },
    created() {
        this.getApi()
        this.getRow()
        this.getDetails()
    },
    methods: {

        getDetails() {
            console.log(this.row);
            let parms = { serialNo: this.row.serialNo,id:this.row.id }
            //凭证信息详情
            this.zjControl.detailspz(parms).then(res => {
                this.pzxx = res.data
                console.log(res.data, "凭证信息");
            })
            //融资申请详情
            this.zjControl.detailssq(parms).then(res => {
                this.sqxx = res.data
                console.log(res.data, "申请信息");
            })
        },
        agreementDownLoad() {

        },
        attaDownLoad() { },
        submit() {
            this.$refs.submitDialog.open({ form: this.form }, true)
        },
    }
}
</script>

<style scoped lang="less">
/deep/.workflow-bottom {
    .right {
        float: none !important;
        width: calc(100% - 400px) !important;
        display: flex;
        justify-content: center;
    }
}

.quota-manage {
    height: 40px;
    line-height: 40px;
    text-align: right;
    margin-bottom: 20px;
    color: #e6a23c;
    background-color: #fdf6ec;
}

.financingForm {
    margin-top: 20px;
}

.explain-text {
    display: flex;
    padding-bottom: 20px;
    background-color: rgba(2, 167, 240, 0);

    .explain-item {
        color: #555;
        font-size: 14px;
        margin-left: 20px;
    }
}

.hd-row {
    position: relative;

    &:after {
        position: absolute;
        top: 36px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed #cbcbcb;
    }
}
</style>
