<template>
<div class="eyeSky-enterpriseAnnualReport" v-show="show">
    <div class="center-box">
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 年份 -->
        <el-row class="year">
            <label v-for="(item,index) in yearList" :key="index"
                   @click="yearClick(item,index)"
                   :class=" index === yearCheck ? 'check' :''"
            >
                {{item}}
            </label>
        </el-row>
        <!-- 内容 -->
        <div class="etnAnReBox">
            <el-row class="earTitle" v-if="tableData.baseInfo">
                <b>{{tableData.baseInfo.companyName + tableData.baseInfo.reportYear +'年度报告'}}</b>
            </el-row>
            <!--企业基本信息-->
            <el-row class="tableTitle">企业基本信息</el-row>
            <table cellspacing="0" cellpadding="0" class="zj-static-table" v-if="tableData.baseInfo">
                <tr>
                    <th class="title-td">统一社会信用代码/注册号</th>
                    <td>
                        {{
                            tableData.baseInfo.creditCode ?
                            tableData.baseInfo.creditCode :
                            tableData.regNumber || '-'
                        }}
                    </td>
                    <th class="title-td">企业名称</th>
                    <td>{{tableData.baseInfo.companyName || '-'}}</td>
                </tr>
                <tr>
                    <th class="title-td">企业联系电话</th>
                    <td>{{tableData.baseInfo.phoneNumber || '-'}}</td>
                    <th class="title-td">邮政编码</th>
                    <td>{{tableData.baseInfo.postcode || '-'}}</td>
                </tr>
                <tr>
                    <th class="title-td">企业经营状态</th>
                    <td>{{tableData.baseInfo.manageState || '-'}}</td>
                    <th class="title-td">从业人数</th>
                    <td>{{tableData.baseInfo.employeeNum || '-'}}</td>
                </tr>
                <tr>
                    <th class="title-td">电子邮箱</th>
                    <td>{{tableData.baseInfo.email || '-' }}</td>
                    <th class="title-td">是否有网站或者网店</th>
                    <td>
                        {{
                            tableData.webInfoList ? '是' : '否'
                        }}
                    </td>
                </tr>
                <tr>
                    <th class="title-td">企业通信地址</th>
                    <td>{{tableData.baseInfo.postalAddress || '-'}}</td>
                    <th class="title-td">企业是否有投资信息或购买其他公司股权</th>
                    <td>
                        {{
                            tableData.outboundInvestmentList ? '是' : '否'
                        }}
                    </td>
                </tr>
                <tr class="ent-money">
                    <th class="title-td">资产总额</th>
                    <td>{{tableData.baseInfo.totalAssets || '-'}}</td>
                    <th class="title-td">所有者权益合计</th>
                    <td>{{tableData.baseInfo.totalEquity || '-'}}</td>
                </tr>
                <tr class="ent-money">
                    <th class="title-td">销售总额</th>
                    <td>{{tableData.baseInfo.totalSales || '-'}}</td>
                    <th class="title-td">利润总额</th>
                    <td>{{tableData.baseInfo.totalProfit || '-'}}</td>
                </tr>
                <tr class="ent-money">
                    <th class="title-td">主营业务收入</th>
                    <td>{{tableData.baseInfo.primeBusProfit || '-'}}</td>
                    <th class="title-td">净利润</th>
                    <td>{{tableData.baseInfo.retainedProfit || '-'}}</td>
                </tr>
                <tr class="ent-money">
                    <th class="title-td">纳税总额</th>
                    <td>{{tableData.baseInfo.totalTax || '-'}}</td>
                    <th class="title-td">负债总额</th>
                    <td>{{tableData.baseInfo.totalLiability}}</td>
                </tr>
            </table>
            <!--网站或网店信息-->
            <el-row class="tableTitle">网站或网店信息</el-row>
            <table class="zj-static-table">
                <tr>
                    <td width="60"  class="title-td">序号</td>
                    <td width="180"  class="title-td">类型</td>
                    <td width="300"  class="title-td">名称</td>
                    <td  class="title-td">网址</td>
                </tr>
                <template v-if="tableData.webInfoList">
                    <tr v-for="(item,index) in tableData.webInfoList" :key="index">
                        <td width="60">{{index+1}}</td>
                        <td width="180">{{item.webType || '-'}}</td>
                        <td width="300">{{item.name || '-'}}</td>
                        <td>
                            <a target="_blank" :href="'http://' + item.website">{{item.website}}</a>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="4">暂无数据</td>
                </tr>
            </table>
            <!--年报变更-->
            <el-row class="tableTitle">年报变更</el-row>
            <table class="zj-static-table">
                <tr>
                    <td class="title-td">变更事项</td>
                    <td class="title-td">变更前</td>
                    <td class="title-td">变更后</td>
                    <td class="title-td">变更时间</td>
                </tr>
                <template v-if="tableData.changeRecordList">
                    <tr v-for="(item,index) in tableData.changeRecordList" :key="index">
                        <td>{{item.changeItem || '-'}}</td>
                        <td>{{item.contentBefore || '-'}}</td>
                        <td>{{item.contentAfter || '-'}}</td>
                        <td>{{item.changeTime || '-'}}</td>
                    </tr>
                </template>
                <tr  v-else>
                    <td colspan="4">暂无数据</td>
                </tr>
            </table>
            <!--股东股权变更信息-->
            <el-row class="tableTitle">股东股权变更信息</el-row>
            <table class="zj-static-table">
                <tr>
                    <td class="title-td">股东（发起人）</td>
                    <td class="title-td">变更前股权比例</td>
                    <td class="title-td">变更后股权比例</td>
                    <td class="title-td">股权变更日期</td>
                </tr>
                <template v-if="tableData.equityChangeInfoList">
                    <tr v-for="(item,index) in tableData.equityChangeInfoList" :key="index">
                        <td>{{item.investorName || '-'}}</td>
                        <td>{{item.ratioBefore ||'-'}}</td>
                        <td>{{item.ratioAfter || '-'}}</td>
                        <td>{{item.changeTime || '-'}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="4">暂无数据</td>
                </tr>
            </table>
            <!--对外提供担保信息-->
            <el-row class="tableTitle">对外提供担保信息</el-row>
            <table class="zj-static-table">
                <tr>
                    <td class="title-td">债权人</td>
                    <td class="title-td">债务人</td>
                    <td class="title-td">主债种类</td>
                    <td class="title-td">主债权额数</td>
                    <td class="title-td">履行债务的期限</td>
                    <td class="title-td">保证的期间</td>
                    <td class="title-td">保证的方式</td>
                    <td class="title-td">保证担保的范围</td>
                </tr>
                <template v-if="tableData.outGuaranteeInfoList">
                    <tr v-for="(item,index) in tableData.outGuaranteeInfoList" :key="index">
                        <td>{{item.creditor || '-'}}</td>
                        <td>{{item.obligor || '-'}}</td>
                        <td>{{item.creditoType || '-'}}</td>
                        <td>{{item.creditoAmount || '-'}}</td>
                        <td>{{item.creditoTerm || '-'}}</td>
                        <td>{{item.guaranteeTerm ||'-'}}</td>
                        <td>{{item.guaranteeWay || '-'}}</td>
                        <td>{{item.guaranteeScope || '-'}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="8">暂无数据</td>
                </tr>
            </table>
            <!--对外投资信息-->
            <el-row class="tableTitle">对外投资信息</el-row>
            <table class="zj-static-table">
                <tr class="table-header">
                    <td class="title-td">被投资公司</td>
                    <td class="title-td">注册码</td>
                    <td class="title-td">社会统一信用代码</td>
                </tr>
                <template v-if="tableData.outboundInvestmentList">
                    <tr v-for="(item,index) in tableData.outboundInvestmentList" :key="index">
                        <td>{{item.outcompanyName || '-'}}</td>
                        <td>{{item.regNum || '-'}}</td>
                        <td>{{ item.creditCode || '-'}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="3">暂无数据</td>
                </tr>
            </table>
            <!--股东及出资信息-->
            <el-row class="tableTitle">股东及出资信息</el-row>
            <table class="zj-static-table">
                <tr class="table-header">
                    <td class="title-td">股东名称</td>
                    <td class="title-td">认缴出资额</td>
                    <td class="title-td">认缴出资时间</td>
                    <td class="title-td">认缴出资方式</td>
                    <td class="title-td">实缴出资额</td>
                    <td class="title-td">实缴出资时间</td>
                    <td class="title-td">实缴出资方式</td>
                </tr>
                <template v-if="tableData.shareholderList">
                    <tr v-for="(item,index) in tableData.shareholderList" :key="index">
                        <td>{{item.investorName || '-'}}</td>
                        <td>{{item.subscribeAmount || '-'}}</td>
                        <td>{{item.subscribeTime || '-'}}</td>
                        <td>{{item.subscribeType || '-'}}</td>
                        <td>{{item.paidAmount || '-'}}</td>
                        <td>{{item.paidTime || '-'}}</td>
                        <td>{{item.paidType || '-'}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="7">暂无数据</td>
                </tr>
            </table>
            <!--社保信息-->
            <template v-if="tableData.reportSocialSecurityInfo">
                <el-row class="tableTitle">社保信息</el-row>
                <table class="zj-static-table" >
                    <tr>
                        <td class="title-td">城镇职工基本养老保险人数</td>
                        <td>{{tableData.reportSocialSecurityInfo.endowmentInsurance || '-'}}</td>
                        <td class="title-td">失业保险人数</td>
                        <td>{{tableData.reportSocialSecurityInfo.unemploymentInsurance || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">职工基本医疗保险人数</td>
                        <td>{{tableData.reportSocialSecurityInfo.medicalInsurance || '-'}}</td>
                        <td class="title-td">工伤保险</td>
                        <td>{{tableData.reportSocialSecurityInfo.employmentInjuryInsurance || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">生育保险人数</td>
                        <td>{{tableData.reportSocialSecurityInfo.maternityInsurance || '-'}}</td>
                        <td class="title-td">单位参加城镇职工基本养老保险缴费基数</td>
                        <td>{{tableData.reportSocialSecurityInfo.endowmentInsuranceBase || '-'}}</td>
                    </tr>
                    <tr>
                        <td>单位参加失业保险缴费基数</td>
                        <td>{{tableData.reportSocialSecurityInfo.unemploymentInsuranceBase || '-'}}</td>
                        <td>单位参加职工基本医疗保险缴费基数</td>
                        <td>{{tableData.reportSocialSecurityInfo.medicalInsuranceBase || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">单位参加生育保险缴费基数</td>
                        <td>{{tableData.reportSocialSecurityInfo.maternityInsuranceBase || '-'}}</td>
                        <td class="title-td">参加城镇职工基本养老保险本期实际缴费金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.endowmentInsurancePayAmount || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">参加失业保险本期实际缴费金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.unemploymentInsurancePayAmount || '-'}}</td>
                        <td class="title-td">参加职工基本医疗保险本期实际缴费金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.medicalInsurancePayAmount || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">参加工伤保险本期实际缴费金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.employmentInjuryInsurancePayAmount || '-'}}</td>
                        <td class="title-td">参加生育保险本期实际缴费金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.maternityInsurancePayAmount || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">单位参加城镇职工基本养老保险累计欠缴金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.endowmentInsuranceOweAmount || '-'}}</td>
                        <td class="title-td">单位参加失业保险累计欠缴金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.unemploymentInsuranceOweAmount || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">单位参加职工基本医疗保险累计欠缴金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.medicalInsuranceOweAmount || '-'}}</td>
                        <td class="title-td">单位参加工伤保险累计欠缴金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.employmentInjuryInsuranceOweAmount || '-'}}</td>
                    </tr>
                    <tr>
                        <td class="title-td">单位参加生育保险累计欠缴金额</td>
                        <td>{{tableData.reportSocialSecurityInfo.maternityInsuranceOweAmount || '-'}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </template>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "enterpriseAnnualReport",
        props:{
            //是否显示本页面
            show:{
                type:Boolean,
                default:false
            },
            request:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        watch:{
            show(boo){
                if(!boo){return}
                if(!this.isOne){return} //不是第一次请求
                //更新请求变量
                this.requestForm = this.request
                //第一次则进行请求
                this.queryTycInfoPage()
                this.isOne = !this.isOne
            }
        },
        data(){return{
          modelName:'enterpriseAnnualReport',
            //是否是第一次打开
            isOne:true,
            //请求的数据
            requestForm:{},
            //请求回来的数据
            createDate:'',//获取日期
            createTime:'',//获取时间
            dataList:[],
            //年份
            yearList:[],
            yearCheck:0,
            //显示的年报数据
            tableData:{},

            //
            zjControl:{
              queryTycInfoPage:this.$api.tyc.queryTycInfoPage
            }
        }},
        methods:{
            //分页
            queryTycInfoPage(flag){
                //判断是否实时请求（重新获取）
                if(flag){
                    this.requestForm.realTimeFlag = flag
                }else{
                    this.requestForm.realTimeFlag = '0'
                }
                //发送请求
                this.zjControl.queryTycInfoPage(this.requestForm).then(ret => {

                    let res = ret.data

                    this.createDate = res.createDate
                    this.createTime = res.createTime
                    this.dataList = res.rows ? res.rows : []
                    this.disposeYear()//处理年份
                    this.$emit('eyeSkyChange',res.data)
                }).catch(error => {
                  this.$emit('eyeSkyChange',error)
                })
            },
            //年份处理
            disposeYear(){
                //添加年份数组
                this.yearList = []
                this.dataList.map((item) => {
                    this.yearList.push(item.baseInfo.reportYear)
                })
                //年份数组排序
                for(let i = 0; i<this.yearList.length; i++){
                    for(let j=0; j < this.yearList.length; j++){
                        if ( Number(this.yearList[j]) >  Number(this.yearList[j + 1]) ) {
                            let s = this.yearList[j];
                            this.yearList[j] = this.yearList[j + 1];
                            this.yearList[j + 1] = s;
                        }
                    }
                }
                //获取该年份的数据
                this.yearClick( this.yearList[this.yearList.length - 1], this.yearList.length - 1)
            },
            //点击年份获取
            yearClick(year,index){
                this.yearCheck = index
                this.tableData = Object.assign(this.tableData, this.dataList.find(item => item.baseInfo.reportYear === year))
                console.log(this.tableData)
            },
            //重新获取
            realClick(flag){
                this.queryTycInfoPage(flag)
            },
        },
        filters:{
            earType(value){
                if(!value){return}
                let type = ''
                if(value === '1'){
                    type = '个人'
                }else if(value === '2'){
                    type = '公司'
                }else {
                    type = '-'
                }
                return type
            }
        }
    }
</script>

<style scoped lang="less">
.eyeSky-enterpriseAnnualReport{
    //年份
    .year{
        margin-left: 10%;
        label{
            margin-left: 6px;
            color: #409EFF;
            cursor: pointer;
            &:hover{
                color: #FF431B;
            }
            &.check{
                font-weight: bold;
                color: #0440BC;
            }
        }
    }
    .etnAnReBox{
        text-align: center;
        //企业名称加年份
        .earTitle{
            font-size: 16px;
        }
        //表格头部--简明
        .el-row.tableTitle{
            margin: 0 auto;
            padding-top: 10px;
            width: 1000px;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
        }
        //表格
        table{
            margin: 0 auto;
            width: 1000px;
            //企业基本信息
            &.entInfo {
                border-color: #E1EFFC;
                tr{
                    height: 40px;
                }
                th, td {
                    text-align: center;
                    vertical-align: middle;
                    padding: 2px 4px;
                }
                th {
                    width: 170px;
                    background-color: #E1EFFC;
                }
                td{
                    width: 320px;
                }
                .ent-money{
                    th,td{
                        border: 2px solid #409EFF;
                        border-bottom-color: rgba(0,0,0,0);
                    }
                    td{
                        border-left-color: rgba(0,0,0,0);
                        &:first-of-type{
                            border-right-color: rgba(0,0,0,0);
                        }
                    }
                    &:last-of-type{
                        th,td{
                            border-bottom-color:#409EFF;
                        }
                    }
                }
            }
            //下边表格的统一样式
            &.storeInfo,&.arEdit,&.equity,&.guarantee,&.investment,&.contribution,&.security{
                /*border: 1px solid #98B6F1;*/
                tr{
                    td{
                        border: 1px solid #98B6F1;
                        border-bottom: none;
                        border-right: none;
                        &:last-of-type{
                            border-right: 1px solid #98B6F1;
                        }
                    }
                    &:last-of-type{
                        td{
                            border-bottom: 1px solid #98B6F1;
                        }
                    }
                }
                //表格头部
                .table-header{
                    td{
                        background-color: #E1EFFC;
                        line-height: 32px;
                    }
                }
            }
            //网站或者网店信息
            &.storeInfo{
                td {
                    height: 32px;
                    a {
                        color: #6FAEFF;

                        &:hover {
                            color: #008489;
                            text-decoration: underline;
                        }
                    }
                }
            }
            //年报变更信息
            &.arEdit{
                tr{
                    height: 30px;
                    td{
                        width: 25%;
                    }
                }
            }
            //股权变更信息
            &.equity{
                tr{
                    height: 30px;
                    td{
                        width: 25%;
                    }
                }
            }
            //对外提供担保信息
            &.guarantee{
                tr{
                    height: 30px;
                }
            }
            //对外投资信息
            &.investment{
                tr{
                    height: 30px;
                    td{
                        width: 33.33333333333333%;
                    }
                }
            }
            //股东及出资信息
            &.contribution{
                tr{
                    height: 30px;
                }
            }
            //社保信息
            &.security{
                tr{
                    height: 43px;
                    td{
                        width: 25%;
                        &:first-of-type,&:nth-of-type(3){
                            background-color: #E1EFFC;
                        }
                    }
                }
            }
        }
    }
}
</style>
