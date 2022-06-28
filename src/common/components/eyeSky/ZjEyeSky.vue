<template>
    <div class="eyeskyBox" v-show="show">
        <el-row
                class="info-row"
                v-for="(ritem,rindex) in eyeList" :key="rindex"
                :style="{display:ritem.show ? '' : 'none'}"
        >
            <label style="color: #666666">{{ritem.label}}</label>
            <span
                    v-for="(citem,cindex) in ritem.children" :key="cindex"
                    :class=" (rindex +',' + cindex) === (rowindex +',' + colindex) ? 'check' : 'nocheck' "
                    @click="eyeClick(rindex,cindex,citem)"
            >
                    {{citem.span}}
            </span>
        </el-row>
        <!--   每项对应的内容    -->
        <div class="itemBox" v-if="show">
            <!-- 企业基本信息  -->
            <basic-info ref="basicInfo"
                  :show="eyeList[0].children[0].show" :request="eyeList[0].children[0].request"
                        @eyeSkyChange="eyeSkyChange"
            />
            <shareholders-info ref="shareholdersInfo"
                  :show="eyeList[0].children[1].show" :request="eyeList[0].children[1].request"
                               @eyeSkyChange="eyeSkyChange"
            />
            <external-investment ref="externalInvestment"
                   :show="eyeList[0].children[2].show" :request="eyeList[0].children[2].request"
                                 @eyeSkyChange="eyeSkyChange"
            />
            <branch-agency ref="branchAgency"
                  :show="eyeList[0].children[3].show" :request="eyeList[0].children[3].request"
                           @eyeSkyChange="eyeSkyChange"
            />
            <enterprise-annual-report ref="enterpriseAnnualReport"
                  :show="eyeList[0].children[4].show" :request="eyeList[0].children[4].request"
                                      @eyeSkyChange="eyeSkyChange"
            />
            <change-record  ref="changeRecord"
                  :show="eyeList[0].children[5].show" :request="eyeList[0].children[5].request"
                            @eyeSkyChange="eyeSkyChange"
            />
            <!-- 司法经营 -->
            <dishonest-people ref="dishonestPeople"
                  :show="eyeList[1].children[0].show" :request="eyeList[1].children[0].request"
                              @eyeSkyChange="eyeSkyChange"
            />
            <legal-action ref="legalAction"
                    :show="eyeList[1].children[1].show" :request="eyeList[1].children[1].request"
                          @eyeSkyChange="eyeSkyChange"
            />
            <the-person-subjected-to-execution ref="thePersonSubjectedToExecution"
                    :show="eyeList[1].children[2].show" :request="eyeList[1].children[2].request"
                                               @eyeSkyChange="eyeSkyChange"
            />
            <!-- 经营风险 -->
            <administrative-punishment ref="administrativePunishment"
                    :show="eyeList[2].children[0].show" :request="eyeList[2].children[0].request"
                                       @eyeSkyChange="eyeSkyChange"
            />
            <equity-pledge ref="equityPledge"
                    :show="eyeList[2].children[1].show" :request="eyeList[2].children[1].request"
                           @eyeSkyChange="eyeSkyChange"
            />
            <chattel-mortgage ref="chattelMortgage"
                    :show="eyeList[2].children[2].show" :request="eyeList[2].children[2].request"
                              @eyeSkyChange="eyeSkyChange"
            />
            <the-news-public-opinion ref="theNewsPublicOpinion"
                    :show="eyeList[2].children[3].show" :request="eyeList[2].children[3].request"
                                     @eyeSkyChange="eyeSkyChange"
            />
            <!-- 知识产权 -->
            <trademark-information ref="trademarkInformation"
                    :show="eyeList[3].children[0].show" :request="eyeList[3].children[0].request"
                                   @eyeSkyChange="eyeSkyChange"
            />
            <patent ref="patent"
                    :show="eyeList[3].children[1].show" :request="eyeList[3].children[1].request"
                    @eyeSkyChange="eyeSkyChange"
            />
        </div>
    </div>
</template>

<script>
    //企业基本信息
    import basicInfo from "@pubComponent/eyeSky/components/basicInfo";
    import shareholdersInfo from "@pubComponent/eyeSky/components/shareholdersInfo";
    import externalInvestment from "@pubComponent/eyeSky/components/externalInvestment";
    import branchAgency from "@pubComponent/eyeSky/components/branchAgency";
    import enterpriseAnnualReport from "@pubComponent/eyeSky/components/enterpriseAnnualReport";
    import changeRecord from "@pubComponent/eyeSky/components/changeRecord";
    //司法经营
    import dishonestPeople from "@pubComponent/eyeSky/components/dishonestPeople";
    import legalAction from "@pubComponent/eyeSky/components/legalAction";
    import thePersonSubjectedToExecution from "@pubComponent/eyeSky/components/thePersonSubjectedToExecution";
    //经营风险
    import administrativePunishment from "@pubComponent/eyeSky/components/administrativePunishment";
    import equityPledge from "@pubComponent/eyeSky/components/equityPledge";
    import chattelMortgage from "@pubComponent/eyeSky/components/chattelMortgage";
    import theNewsPublicOpinion from "@pubComponent/eyeSky/components/theNewsPublicOpinion";
    //知识产权
    import trademarkInformation from "@pubComponent/eyeSky/components/trademarkInformation";
    import patent from "@pubComponent/eyeSky/components/patent";
    export default {
        name: "eyeSky",
        components:{
            //企业基本信息
            basicInfo,shareholdersInfo,externalInvestment,branchAgency,enterpriseAnnualReport,changeRecord,
            //司法经营
            dishonestPeople,legalAction,thePersonSubjectedToExecution,
            //经营风险
            administrativePunishment,equityPledge,chattelMortgage,theNewsPublicOpinion,
            //知识产权
            trademarkInformation,patent
        },
        props:{
            //是否显示--默认不显示
            show:{
                 type:Boolean,
                 default:false
            },
            //企业id
            entId:[String,Number],
            //企业名称
            entName:String,
            //是否挂载完成后查询
            mountKey:Boolean,
			//天眼重置
			rioFlag:{
				type:Boolean,
				default:true
			},
            //每次打开都获取
            oneYes:{
                type:Boolean,
                default:false
            },
            //是否开启id/name变化即获取
            openChange:{
                type:Boolean,
                default:false
            }
        },
        watch:{
            show(boo){
                if(!boo){return}
                // if(!this.isOne){return} //不是第一次打开
                // 等待组件渲染完成，再操作
                //第一次打开则进行开通模块查询
                this.getTycList()
                setTimeout(() => {
					if(this.rioFlag){
						this.resetIsOne()
					}
                }, 200)
                //设置为不是第一次查询
                // this.isOne = false
            },
            entId(newEntId){
                //当企业ID发生改变时重新调用
                if(this.openChange){
                    this.resetIsOne()
                    this.getTycList()
                }

            },
            entName(){
                //当企业名称发生改变时重新调用
                if(this.openChange){
                    this.resetIsOne()
                    this.getTycList()
                }
            }
        },
        data(){return{
            //是否第一次打开
            isOne: false,
            //天眼查的html
            eyeList:[
                {
                    label:"企业基本信息",
                    show:true,
                    children:[
                        {
                            span:'基本信息',
                            tycCode:'101',
                            show:false,
                            request:{},
                            refs:'basicInfo'
                        },
                        {
                            span:'股东信息',
                            tycCode:'102',
                            show:false,
                            request:{},
                            refs:'shareholdersInfo'
                        },
                        {
                            span:'对外投资',
                            tycCode:'103',
                            show:false,
                            request:{},
                            refs:'externalInvestment'
                        },
                        {
                            span:'分支机构',
                            tycCode:'104',
                            show:false,
                            request:{},
                            refs:'branchAgency'
                        },
                        {
                            span:'企业年报',
                            tycCode:'105',
                            show:false,
                            request:{},
                            refs:'enterpriseAnnualReport'
                        },
                        {
                            span:'变更记录',
                            tycCode:'106',
                            show:false,
                            request:{},
                            refs:'changeRecord'
                        }
                    ]
                },
                {
                    label:"司法风险",
                    show:true,
                    children:[
                        {
                            span:'失信人',
                            tycCode:'201',
                            show:false,
                            request:{},
                            refs:'dishonestPeople'
                        },
                        {
                            span:'法律诉讼',
                            tycCode:'202',
                            show:false,
                            request:{},
                            refs:'legalAction'
                        },
                        {
                            span:'被执行人',
                            tycCode:'203',
                            show:false,
                            request:{},
                            refs:'thePersonSubjectedToExecution'
                        }
                    ]
                },
                {
                    label:"经营风险",
                    show:true,
                    children:[
                        {
                            span:'行政处罚',
                            tycCode:'301',
                            show:false,
                            request:{},
                            refs:'administrativePunishment'
                        },
                        {
                            span:'股权出质',
                            tycCode:'302',
                            show:false,
                            request:{},
                            refs:'equityPledge'
                        },
                        {
                            span:'动产抵押',
                            tycCode:'303',
                            show:false,
                            request:{},
                            refs:'chattelMortgage'
                        },
                        {
                            span:'新闻舆情',
                            tycCode:'304',
                            show:false,
                            request:{},
                            refs:'theNewsPublicOpinion'
                        }
                    ]
                },
                {
                    label:"知识产权",
                    show:true,
                    children:[
                        {
                            span:'商标信息',
                            tycCode:'401',
                            show:false,
                            request:{},
                            refs:'trademarkInformation'
                        },
                        {
                            span:'专利',
                            tycCode:'402',
                            show:false,
                            request:{},
                            refs:'patent'
                        }
                    ]
                }
            ],
            rowindex:0, //选中的行
            colindex:0, //选中的列,

            //
            zjControl:{
              getTycList:this.$api.tyc.getTycList,//查询开通模块
              checkTycInfo:this.$api.tyc.checkTycInfo,//查询报红模块
            }
        }},
        methods:{
            //0.获取那些模块开通了天眼查
            getTycList(){
                this.zjControl.getTycList().then(ret =>{
                    let res = ret.data
                    //1.设置大模块显示

                    if (res.tycModels) {
                      res.tycModels.forEach((item,index)=>{
                        this.eyeList[index].show = item === '1'
                      })
                    }

                    //2.1 设置默认显示的小模块
                    // console.log('this.entId-eye:', this.entId)
                    this.eyeList.forEach((item,index) => {
                        item.children.forEach((citem,cindex)=>{
                            //2.2.设置每个模块的请求参数
                            citem.request = {
                                entId:this.entId, //企业id
                                entName:this.entName, //企业名称
                                realTimeFlag:'0', //实时更新 0否 1是
                                page:1,//当前页
                                rows: this.eyeList[index].children[cindex].tycCode === '201' ?
                                        50 : 20, //每页数量 ---每页都是返回20  失信人50
                                tycCode:this.eyeList[index].children[cindex].tycCode
                            }
                            //2.3决定是否显示
                            if(citem.tycCode === res.tycCodeList[0]){
                                //将其显示
                                citem.show = true
                                //设置默认选中
                                this.rowindex = index
                                this.colindex = cindex
                            }else{
                                //将其隐藏
                                citem.show = false
                            }
                        })
                    })
                    //追加---企业信息关系需要--每次打开都获取
                    if(this.oneYes){
                        let index = res.tycModels.findIndex(item => item === '1')
                        this.$nextTick(() => {
                            this.$refs[ this.eyeList[index].children[0].refs ].queryTycInfo
                                ? this.$refs[ this.eyeList[index].children[0].refs ].queryTycInfo('1')
                                : this.$refs[ this.eyeList[index].children[0].refs ].realClick('1')
                        })
                    }

                    // console.error('eyeList:', this.eyeList)
                })
            },
            //1.1切换选中
            eyeClick(rindex,cindex,child){
                //1.设置选中
                this.rowindex = rindex
                this.colindex = cindex
                //2.决定显示那一项
                this.eyeList.forEach(item => {
                    item.children.forEach(citem=>{
                        citem.show = citem.tycCode === child.tycCode
                    })
                })
            },
            //查询报红
            checkTycInfo(){
                let params = {
                  entId:this.entId,
                  entName:this.entName,
                  tycCode:['201','202','203','301','302','303']
                }
            },
            //当id改变时重置所有组件变为不是第一次请求
            resetIsOne(){
                let refArr = [
                    'basicInfo','shareholdersInfo','externalInvestment','branchAgency','enterpriseAnnualReport','changeRecord',
                    'dishonestPeople','legalAction','thePersonSubjectedToExecution',
                    'administrativePunishment','equityPledge','chattelMortgage','theNewsPublicOpinion',
                    'trademarkInformation','patent'
                ]
                refArr.forEach(item => {
                    this.$nextTick(() => {
                        if(this.$refs[item]){
                            this.$refs[item].isOne = true
                        }
                    })
                })
            },
            //追加抛出
            eyeSkyChange(data){
              this.$emit('eyeSkyChange',data)
            }
        },
		mounted(){
			if(this.mountKey){
				this.$nextTick(() => {
					this.getTycList()
					setTimeout(() => {
					  if(this.rioFlag){
							this.resetIsOne()
                      }
					}, 500)
				})
			}
		}
    }
</script>

<style lang="less">
    //天眼查
    .eyeskyBox{
        min-width: 1000px;
        margin-top: 10px;
        //设置隐藏分页显示数量选择框隐藏
        .vxe-select.vxe-pager--sizes{
            display: none;
        }
        //设置表格内部文字可以换行
        .vxe-cell{
            white-space:pre-wrap!important;
        }
        .el-row.info-row{
            margin: 5px 0;
            label,span{
                display: inline-block;
            }
            label{
                min-width: 100px;
                font-weight: bold;
                text-align: right;
                font-size: 14px;
            }
            span{
                min-width: 80px;
                margin-left: 20px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                /*color: #409EFF;*/
              color: #999999;
                &:hover{
                    /*color: #D3B366;*/
                  color: #5494F2;
                }
            }
            .check{
                font-weight: bold;
                font-size: 14px;
                /*color: #1482f0;*/
                /*text-decoration: underline;*/

                /*color: white;*/
                /*background-color: #5494F2;*/
                color: #5494F2;
              /*&:hover{*/
              /*  color: white;*/
              /*}*/

            }
            .nocheck{
              color: #333333;
            }
            .red{
                color: #EF6666!important;
            }
        }
        //更新时间
        .time{
            padding: 8px 0 8px 5px;
            color: #9F9F9F;
            cursor: default;
            border-top: 1px solid rgba(155,155,155,0.4);
            .realBtn{
                margin-left: 20px;
                height: 26px;
                padding: 0 8px;
            }
        }
        .itemBox{
            padding: 0 20px;
            min-height: 50px;
            margin: 0 auto;
            .siTitle{
                padding-bottom: 5px;
                label{
                    margin-left: 5px;
                }
                .n-b{
                    font-weight: normal;
                    font-size: 12px;
                    display: inline-block;
                }
            }
        }
    }
    //表格
    .eyeSky-basicInfo,.eyeSky-shareholdersInfo,.eyeSky-enterpriseAnnualReport,.eyeSky-dishonestPeople,

    .eyeSky-equityPledge,.eyeSky-chattelMortgage
    {
        table{
            border-spacing: 0;
            text-align: center;
            tr{
                th{
                    font-weight: normal;
                    //禁止复制
                    -moz-user-select: none;/* Firefox私有属性 */
                    -webkit-user-select: none; /* WebKit内核私有属性 */
                    -ms-user-select: none; /* IE私有属性(IE10及以后) */
                    -khtml-user-select: none; /* KHTML内核私有属性 */
                    -o-user-select: none; /* Opera私有属性 */
                    user-select: none;/* CSS3属性 */
                }

            }
            //col
            &.col{
                tr{
                    th{
                        padding: 4px 2px;
                        border: 1px solid #98B6F1;
                        border-bottom: none;
                        background-color: #E1EFFC;
                    }
                    td{
                        padding: 1px 2px;
                        border-top: 1px solid #98B6F1;
                        &:nth-of-type(2){
                            border-right: 1px solid #98B6F1;
                        }
                    }
                    &:last-of-type {
                        td,th{
                            border-bottom: 1px solid #98B6F1;
                        }
                    }
                }
            }
            &.row{
                tr{
                    th{
                        background-color: #E1EFFC;
                    }
                    th,td{
                        border: 1px solid #98B6F1;
                        border-bottom: none;
                        border-right: none;
                        &:last-of-type{
                            border-right: 1px solid #98B6F1;
                        }
                    }
                    td{
                        padding: 1px 2px;
                    }
                    &:last-of-type{
                        td{
                            border-bottom: 1px solid #98B6F1;
                        }
                    }
                }
            }
        }
    }
    //dialog
    .detailsDialog{
        text-align: center;
        .el-dialog__header,.el-dialog__body{
            min-width: 788px;
            background-color: #FFFFFF;
        }
        //头部
        .el-dialog__header{
            position: relative;
            padding: 10px 20px;
            font-weight: bold;
        }
        //主体内容
        .el-dialog__body {
            padding-top: 0
        }
        //表格
        table{
            /*min-width: 740px;*/
            width: 100%;
            text-align: center;
            border-spacing: 0;
        }
    }
</style>
