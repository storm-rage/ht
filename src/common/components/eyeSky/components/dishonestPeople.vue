<template>
    <div class="eyeSky-dishonestPeople" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 失信人 -->
        <h3 class="siTitle">
            失信被执行人<label class="red">{{total}}</label>
        </h3>
        <vxe-table
            header-cell-class-name="headerCell"
            highlight-hover-row
            auto-resize
            border
            align="center"
            :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" widtd="60"/>
            <vxe-table-column field="publishdate" title="发布日期">
                <template v-slot="{row}">
                    {{tycDates(row.publishdate)}}
                </template>
            </vxe-table-column>
            <vxe-table-column field="regdate" title="立案日期">
                <template v-slot="{row}">
                    {{tycDates(row.regdate)}}
                </template>
            </vxe-table-column>
            <vxe-table-column field="casecode" title="案号"></vxe-table-column>
            <vxe-table-column field="courtname" title="执行法院"></vxe-table-column>
            <vxe-table-column field="performance" title="履行情况"></vxe-table-column>
            <vxe-table-column field="gistid" title="执行依据文号"></vxe-table-column>
            <vxe-table-column fixed="right" title="操作">
                <template v-slot="{row}">
                    <zj-button type="text" @click="details(row)">详情</zj-button>
                </template>
            </vxe-table-column>
        </vxe-table>

        <vxe-pager
                align="right"
                :current-page="currentPage"
                :page-size="pageSize"
                 @page-change="pageChang"

                :total="total">
        </vxe-pager>

        <!-- 详情页面 -->
        <el-dialog
            title="详情"
            center
            :visible="detailsDialog"
            @close="detailsDialog = false"
            :close-on-click-modal="false"
            class="detailsDialog"
        >
                <table class="one-table">
                    <tr>
                        <th>法人、负责人姓名</th>
                        <td>{{dataDialog.businessentity}}</td>
                        <th>省份地区</th>
                        <td>{{dataDialog.areaname}}</td>
                    </tr>
                    <tr>
                        <th>法院</th>
                        <td>{{dataDialog.courtname}}</td>
                        <th>未履行部分</th>
                        <td>{{dataDialog.unperformPart}}</td>
                    </tr>
                    <tr>
                        <th>失信人类型</th>
                        <td>{{dataDialog.type | dpType}}</td>
                        <th>已履行部分</th>
                        <td>{{dataDialog.performedPart}}</td>
                    </tr>
                    <tr>
                        <th>失信人名称</th>
                        <td>{{dataDialog.iname}}</td>
                        <th>失信被执行人行为具体情形</th>
                        <td>{{dataDialog.disrupttypename}}</td>
                    </tr>
                    <tr>
                        <th>身份证号码/组织机构代码</th>
                        <td>{{dataDialog.cardnum}}</td>
                        <th>案号</th>
                        <td>{{dataDialog.casecode}}</td>
                    </tr>
                    <tr>
                        <th>立案时间</th>
                        <td>{{tycDates(dataDialog.regdate)}}</td>
                        <th>履行情况</th>
                        <td>{{dataDialog.performance}}</td>
                    </tr>
                    <tr>
                        <th>发布时间</th>
                        <td>{{tycDates(dataDialog.publishdate)}}</td>
                        <th>做出执行的依据单位</th>
                        <td>{{dataDialog.gistunit}}</td>
                    </tr>
                    <tr>
                        <th>生效法律文书确定的义务</th>
                        <td>{{dataDialog.duty}}</td>
                        <th>执行依据文号</th>
                        <td>{{dataDialog.gistid}}</td>
                    </tr>
                </table>
                <el-row>法定负责人/主要负责人信息</el-row>
                <table class="two-table">
                    <tr>
                        <th>角色</th>
                        <th>法人姓名</th>
                    </tr>
                    <template v-if="this.dataDialog.staff">
                        <tr v-for="(item,index) in this.dataDialog.staff" :key="index">
                            <td>{{item.role || '-'}}</td>
                            <td>{{item.name || '-'}}</td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td colspan="2">暂无数据</td>
                    </tr>
                </table>

        </el-dialog>
    </div>
</template>

<script>
    import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "dishonestPeople",
        mixins:[pagingMixin],
        data(){return{
            modelName:'dishonestPeople',
            //dialog
            detailsDialog:false,//显示与否
            dataDialog:{}, //渲染的数据
            pageSize:50
        }},
        methods:{
            //点击详情
            details(row){
                this.dataDialog = row
                //处理法定负责人信息
                if( typeof(this.dataDialog.staff) === 'string'){
                    this.dataDialog.staff = JSON.parse(this.dataDialog.staff)
                }
                // console.log(this.dataDialog)
                this.detailsDialog = true
            }
        },
        filters:{
            dpType(value){
                if(!value){return}
                let type = ''
                if(value === '0'){
                    type = '个人'
                }else if(value === '1'){
                    type = '公司'
                }
                return type
            }
        }
    }
</script>
<style lang="less">
.eyeSky-dishonestPeople{
    .vxe-pager--wrapper{
        .vxe-select,.vxe-pager--sizes{
            display: none;
        }
    }
    //详情
    .detailsDialog{
        //主体内容
        .el-dialog__body {
            //法定负责人信息
            .el-row {
                text-align: center;
                padding: 20px 0 4px 0;
                font-weight: bold;
            }
            //表格
            table {
                width: 100%;
                text-align: center;

                //第一个表格
                &.one-table {
                    tr {
                        th{
                            width: 25%;
                            padding: 4px 2px;
                            border: 1px solid #98B6F1;
                            border-bottom: none;
                            background-color: #E1EFFC;
                        }
                        td{
                            width: 25%;
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

                //第二个表格
                &.two-table {
                    tr {
                        th{
                            background-color: #E1EFFC;
                        }
                        th,td{
                            width: 50%;
                            padding: 3px 2px;
                            border: 1px solid #98B6F1;
                            border-bottom: none;
                            &:first-of-type{
                                border-right: none;
                            }
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
    }
}
</style>
