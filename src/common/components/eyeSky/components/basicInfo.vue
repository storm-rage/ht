<template>
    <div class="eyeSky-basicInfo" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 基本信息 -->
        <table class="zj-static-table" cellspacing="0" cellpadding="0">
            <tr>
                <th class="title-td">法定代表人</th>
                <td class="textCenter">{{dataList.legalPersonName}}</td>
                <th class="title-td">评分</th>
                <td class="textCenter">
                    <el-tooltip effect="light" placement="bottom">
<!--                        <div slot="content">-->
<!--                            {{'提示信息'}}-->
<!--                        </div>-->
                        <label>{{dataList.percentileScore}}</label>
                    </el-tooltip>
                </td>
            </tr>
            <tr>
                <th class="title-td">注册资本</th>
                <td>{{dataList.regCapital}}</td>
                <th class="title-td">成立日期</th>
                <td>{{tycDates(dataList.estiblishTime)}}</td>
            </tr>
            <tr>
                <th class="title-td">经营状态</th>
                <td>{{dataList.regStatus}}</td>
                <th class="title-td">工商注册号</th>
                <td>{{dataList.regNumber}}</td>
            </tr>
            <tr>
                <th class="title-td">统一社会信用代码</th>
                <td>{{dataList.creditCode}}</td>
                <th class="title-td">组织结构代码</th>
                <td>{{dataList.orgNumber}}</td>
            </tr>
            <tr>
                <th class="title-td">纳税人识别号</th>
                <td>{{dataList.taxNumber}}</td>
                <th class="title-td">公司类型</th>
                <td>{{dataList.companyOrgType}}</td>
            </tr>
            <tr>
                <th class="title-td">营业期限</th>
                <td>{{tycDates(dataList.fromTime)}} {{'  至  '}} {{tycDates(dataList.toTime)}}</td>
                <th class="title-td">行业</th>
                <td>{{dataList.industry}}</td>
            </tr>
            <tr>
                <th class="title-td">纳税人资质</th>
                <td>{{'-'}}</td>
                <th class="title-td">核准日期</th>
                <td>{{tycDates(dataList.approvedTime)}}</td>
            </tr>
            <tr>
                <th class="title-td">缴纳资本</th>
                <td>{{dataList.actualCapital}}</td>
                <th class="title-td">人员规模</th>
                <td>{{dataList.staffNumRange}}</td>
            </tr>
            <tr>
                <th class="title-td">参保人数</th>
                <td>{{dataList.socialStaffNum}}</td>
                <th class="title-td">登记机关</th>
                <td>{{dataList.regInstitute}}</td>
            </tr>
            <tr>
                <th class="title-td">曾用名</th>
                <td>{{dataList.historyNames ? dataList.historyNames : '-'}}</td>
                <th class="title-td">英文名称</th>
                <td>{{dataList.property3}}</td>
            </tr>
            <tr>
                <th class="title-td">注册地址</th>
                <td colspan="3" class="text-left">{{dataList.regLocation}}</td>
            </tr>
            <tr>
                <th class="title-td">经营范围</th>
                <td colspan="3" class="text-left" style="word-wrap: break-word;word-break: break-all;">{{dataList.businessScope}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "basicInfo",
        props:{
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
                // if(!this.isOne){return} //不是第一次请求
                //更新请求变量
                this.requestForm = this.request
                setTimeout(() => {
                  //第一次则进行请求
                  this.queryTycInfo()
                }, 200)
                this.isOne = false
            },
            request:{
                deep:true,
                handler(newObj){
                    this.requestForm = this.request
                }
            }
        },
        data(){return{
            modelName:'basicInfo',
            //是否是第一次打开
            isOne: false,
            //请求的数据
            requestForm:{},
            //请求回来的数据
            createDate:'',//获取日期
            createTime:'',//获取时间
            dataList:{},

            //
            zjControl:{
              queryTycInfo:this.$api.tyc.queryTycInfo
            }
        }},
        methods:{
            //不分页
            queryTycInfo(flag){
                //判断是否实时请求（重新获取）
                if(flag){
                    this.requestForm.realTimeFlag = flag
                }else{
                    this.requestForm.realTimeFlag = '0'
                }
                //发送请求
                // console.error('requestForm：', this.requestForm)
                this.zjControl.queryTycInfo(this.requestForm).then(res => {
                    this.createDate = res.data.createDate
                    this.createTime = res.data.createTime
                    this.dataList = res.data.data ?? {}

                    let params = Object.assign({},res.data)
                    params.modelName = this.modelName
                    this.$emit('eyeSkyChange',params)
                }).catch(err => {
                  let params = Object.assign({},err)
                  params.modelName = this.modelName
                  this.$emit('eyeSkyChange',params)
                })
            },
            //重新获取
            realClick(flag){
                this.queryTycInfo(flag)
            }
        },
        filters:{
            //企业评分
            pScore(num){
                if(!num){return}
                return num.slice(0,2) + '.' + num.slice(2,num.length)
            }
        }
    }
</script>

<style scoped lang="less">
.eyeSky-basicInfo{
    table{
        width: 100%;
        //border-color: #8cc5ff;
        tr{
            th,td{
                padding: 2px 6px;
                text-align: center;
            }
            .text-left{
                text-align: left;
            }
            th{
                background-color: #E1EFFC;
                /*width: 200px;*/
                width: 20%;
            }
            td{
                width: 30%;
              /*style="word-wrap: break-word;word-break: break-all;*/
              word-wrap: break-word;
              word-break: break-all;
            }
        }
    }
    .textCenter{
        text-align: center;
    }
}
</style>
