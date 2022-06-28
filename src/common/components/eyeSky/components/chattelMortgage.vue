<template>
    <div class="eyeSky-chattelMortgage" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 动产抵押 -->
        <h3 class="siTitle">动产抵押<label class="red">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column title="登记日期" width="120">
                <template v-slot="{row}">
                    {{row.baseInfo.regDate || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column title="登记编号">
                <template v-slot="{row}">
                    {{row.baseInfo.regNum || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column title="被担保债权类型">
                <template v-slot="{row}">
                    {{row.baseInfo.type || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column title="被担保债权数额">
                <template v-slot="{row}">
                    {{row.baseInfo.amount || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column title="登记机关">
                <template v-slot="{row}">
                    {{row.baseInfo.regDepartment || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column title="状态" width="80">
                <template v-slot="{row}">
                    {{row.baseInfo.status || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column fixed="right" title="操作" width="80">
                <template v-slot="{row}">
                    <zj-button type="text" @click="details(row)">详情</zj-button>
                </template>
            </vxe-table-column>
        </vxe-table>
        <!-- 分页 -->
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
            <table class="col" v-if="dataDialog.baseInfo">
                <tr>
                    <th>担保范围</th>
                    <td colspan="3">{{dataDialog.baseInfo.scope || '-'}}</td>
                </tr>
                <tr>
                    <th>状态</th>
                    <td>{{dataDialog.baseInfo.status || '-'}}</td>
                    <th>备注</th>
                    <td>{{dataDialog.baseInfo.remark || '-'}}</td>
                </tr>
                <tr>
                    <th>登记机关</th>
                    <td>{{dataDialog.baseInfo.regDepartment || '-'}}</td>
                    <th>登记日期</th>
                    <td>{{dataDialog.baseInfo.regDate || '-'}}</td>
                </tr>
                <tr>
                    <th>登记编号</th>
                    <td>{{dataDialog.baseInfo.regNum || '-'}}</td>
                    <th>公示日期</th>
                    <td>{{tycDates(dataDialog.baseInfo.publishDate)}}</td>
                </tr>
                <tr>
                    <th>被担保债权种类</th>
                    <td>{{dataDialog.baseInfo.type || '-'}}</td>
                    <th>被担保债权数额</th>
                    <td>{{dataDialog.baseInfo.amount || '-'}}</td>
                </tr>
                <tr>
                    <th>债务人履行债务的期限</th>
                    <td>{{dataDialog.baseInfo.term || '-'}}</td>
                    <th>省份</th>
                    <td>{{dataDialog.baseInfo.base || '-'}}</td>
                </tr>
                <tr>
                    <th>注销日期</th>
                    <td>{{tycDates(dataDialog.baseInfo.cancelDate)}}</td>
                    <th>注销原因</th>
                    <td>{{dataDialog.baseInfo.cancelReason || '-'}}</td>
                </tr>

            </table>
            <table class="row">
                <tr>
                    <th>变更日期</th>
                    <th>变更内容</th>
                </tr>
                <template v-if="dataDialog.changeInfoList && dataDialog.changeInfoList.length > 0">
                    <tr v-for="(item,index) in dataDialog.changeInfoList" :key="index">
                        <td>{{tycDates(item.changeDate)}}</td>
                        <td>{{item.changeContent}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="2">暂无数据</td>
                </tr>
            </table>
            <table class="row">
                <tr>
                    <th>数量、质量、状况、所在地等情况</th>
                    <th>所属权归属</th>
                    <th>名称</th>
                    <th>备注</th>
                </tr>
                <template v-if="dataDialog.pawnInfoList && dataDialog.pawnInfoList.length>0">
                    <tr v-for="(item,index) in dataDialog.pawnInfoList" :key="index">
                        <td>{{item.detail || '-'}}</td>
                        <td>{{item.ownership || '-'}}</td>
                        <td>{{item.pawnName || '-'}}</td>
                        <td>{{item.remark || '-'}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="4">暂无数据</td>
                </tr>
            </table>
            <table class="row">
                <tr>
                    <th>证照/证件号码</th>
                    <th>抵押权人名称</th>
                    <th>抵押权人证照/证件类型</th>
                </tr>
                <template v-if="dataDialog.peopleInfo && dataDialog.peopleInfo.length > 0">
                    <tr v-for="(item,index) in dataDialog.peopleInfo" :key="index">
                        <td>{{item.licenseNum || '-'}}</td>
                        <td>{{item.peopleName || '-'}}</td>
                        <td>{{item.liceseType || '-'}}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="3">暂无数据</td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
    import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "chattelMortgage",
        data(){
          return {
            modelName:'chattelMortgage',
          }
        },
        mixins:[pagingMixin]
    }
</script>

<style scoped lang="less">
.eyeSky-chattelMortgage{
    table{
        border-spacing: 0;
        margin-bottom: 18px;
        th,td{
            width: 25%;
        }
        &.col{
            tr{
                th{
                    width: 20%;
                }
                &:first-of-type{
                    td{
                        border-right: 1px solid #98B6F1;
                    }
                }
            }
        }
        &.row{
            &:nth-of-type(3){
                th,td{
                    &:first-of-type{
                        width: 33.3%;
                    }
                }
            }
        }
    }
}
</style>
